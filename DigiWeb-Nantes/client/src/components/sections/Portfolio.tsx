import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import p1 from "@/assets/portfolio-1_1.jpg";
import p2 from "@/assets/portfolio-1_2.jpg";
import p3 from "@/assets/portfolio-1_3.jpg";

const projects = [
  {
    title: "EcoNantes",
    category: "Site Vitrine",
    image: p1,
    tags: ["Design", "Développement", "SEO"]
  },
  {
    title: "Bistro Moderne",
    category: "E-commerce",
    image: p2,
    tags: ["UX/UI", "Shopify", "Branding"]
  },
  {
    title: "TechStart",
    category: "App Web",
    image: p3,
    tags: ["React", "Dashboard", "SaaS"]
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Réalisations</h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full"></div>
          </div>
          <p className="text-slate-600 max-w-md text-lg">
            Découvrez comment nous avons aidé nos clients nantais à atteindre leurs objectifs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-md bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <Badge className="w-fit mb-2 bg-secondary text-secondary-foreground border-none">
                  {project.category}
                </Badge>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs text-slate-300 bg-white/10 px-2 py-1 rounded backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
