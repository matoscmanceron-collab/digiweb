import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Directrice Marketing",
    content: "Une équipe à l'écoute et très professionnelle. Notre nouveau site a doublé nos leads en 3 mois. Je recommande vivement DigiWeb pour leur expertise locale.",
    rating: 5
  },
  {
    name: "Thomas Bernard",
    role: "Fondateur",
    content: "Le design est exactement ce que je voulais : moderne et épuré. Le processus de création a été fluide et rapide. Merci pour ce beau travail !",
    rating: 5
  },
  {
    name: "Sophie Martin",
    role: "Architecte d'intérieur",
    content: "Un grand merci à DigiWeb pour leur patience et leur créativité. Ils ont su capter l'essence de mon travail dans un portfolio magnifique.",
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 border-none backdrop-blur-sm text-white">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-secondary fill-secondary" : "text-slate-400"}`} 
                    />
                  ))}
                </div>
                <p className="text-slate-200 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-secondary text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
