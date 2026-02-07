import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Code, Palette, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Témoignages", href: "#testimonials" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl cursor-pointer">
            D
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-primary cursor-pointer">DigiWeb</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
          <Button 
            className="bg-primary hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300 rounded-full px-6"
            onClick={() => scrollToSection('#contact')}
          >
            Contactez-nous
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-slate-700" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-lg font-medium text-slate-800 hover:text-primary"
                  >
                    {item.name}
                  </a>
                ))}
                <Button 
                  className="w-full bg-primary hover:bg-secondary hover:text-secondary-foreground"
                  onClick={() => scrollToSection('#contact')}
                >
                  Contactez-nous
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
