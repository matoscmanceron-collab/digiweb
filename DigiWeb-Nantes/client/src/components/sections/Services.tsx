import { Code, Palette, Smartphone, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description: "Des interfaces modernes et intuitives conçues pour captiver votre audience et renforcer votre image de marque."
  },
  {
    icon: Code,
    title: "Développement",
    description: "Sites vitrines, e-commerce ou applications sur-mesure, développés avec les technologies les plus performantes."
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description: "Une expérience utilisateur fluide sur tous les appareils : ordinateurs, tablettes et mobiles."
  },
  {
    icon: Search,
    title: "Référencement SEO",
    description: "Optimisation de votre visibilité sur les moteurs de recherche pour attirer plus de clients qualifiés."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos Expertises</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Nous combinons créativité et technique pour propulser votre activité sur le web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                    <service.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
