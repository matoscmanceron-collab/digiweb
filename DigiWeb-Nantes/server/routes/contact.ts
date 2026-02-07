import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

// Helper function to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Helper function to validate email format with strict checks
function isValidEmail(email: string): boolean {
  // Check for basic format and prevent header injection
  if (!email || typeof email !== 'string' || email.length > 254) {
    return false;
  }
  
  // Check for newlines and other injection characters
  if (/[\r\n\0]/.test(email)) {
    return false;
  }
  
  // Basic email format validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

// Validate required environment variables at startup
const requiredEnvVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0 && process.env.NODE_ENV === 'production') {
  console.warn(`Warning: Missing SMTP environment variables: ${missingEnvVars.join(', ')}`);
}

// Create transporter once at module initialization for reuse
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate presence and type
  if (!name || !email || !message || 
      typeof name !== 'string' || 
      typeof email !== 'string' || 
      typeof message !== 'string') {
    return res.status(400).json({ error: 'All fields are required and must be strings' });
  }

  // Enforce length limits to prevent DoS
  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return res.status(400).json({ error: 'Input exceeds maximum length' });
  }

  // Validate email format to prevent header injection
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Check if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.error('SMTP not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const mailOptions = {
    from: `"DigiWeb Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || 'mail@digiwebfr.studio',
    replyTo: email,
    subject: `Nouveau message de ${escapeHtml(name)}`,
    html: `
      <h2>Nouveau message depuis le formulaire de contact</h2>
      <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    // Log only sanitized error message without exposing credentials
    console.error('Email error: Failed to send email');
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
