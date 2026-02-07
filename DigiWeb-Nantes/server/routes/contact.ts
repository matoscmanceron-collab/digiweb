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

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Create transporter once at module initialization for reuse
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate email format to prevent header injection
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
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
