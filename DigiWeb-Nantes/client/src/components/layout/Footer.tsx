export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white">DigiWeb</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Agence web créative à Nantes. Nous concevons des expériences digitales mémorables pour propulser votre business.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                L
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                T
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                I
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Liens Rapides</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-secondary transition-colors">Accueil</a></li>
              <li><a href="#services" className="hover:text-secondary transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-secondary transition-colors">Portfolio</a></li>
              <li><a href="#testimonials" className="hover:text-secondary transition-colors">Témoignages</a></li>
              <li><a href="#contact" className="hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Légal</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-secondary transition-colors">Mentions Légales</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">CGV</a></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} DigiWeb Nantes. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
