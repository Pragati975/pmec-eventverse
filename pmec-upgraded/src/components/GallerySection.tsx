import { useState } from "react";
import { X, Filter } from "lucide-react";
import { motion } from "framer-motion";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop", alt: "Tech Event", title: "Annual Tech Symposium", category: "Technical" },
  { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop", alt: "Coding Workshop", title: "Coding Workshop", category: "Technical" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=700&fit=crop", alt: "Presentation", title: "Project Presentations", category: "Technical" },
  { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop", alt: "Innovation Lab", title: "Innovation Lab", category: "Workshop" },
  { src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop", alt: "Hackathon", title: "48-Hour Hackathon", category: "Technical" },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop", alt: "Collaboration", title: "Team Collaboration", category: "Cultural" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=650&fit=crop", alt: "Cultural Night", title: "Cultural Night", category: "Cultural" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop", alt: "Conference", title: "Tech Conference", category: "Technical" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop", alt: "Sports", title: "Sports Meet", category: "Sports" },
];

const cats = ["All", "Technical", "Cultural", "Sports", "Workshop"];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? galleryImages : galleryImages.filter(i => i.category === filter);

  return (
    <section id="gallery" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(187,94%,10%,0.1),transparent_65%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-eyebrow">Memories</span>
          <h2 className="text-4xl md:text-5xl font-black gradient-text inline-block font-display">Event Gallery</h2>
          <div className="section-divider" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Capturing moments of innovation, celebration, and community spirit at PMEC.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          <Filter size={14} className="text-muted-foreground self-center mr-1" />
          {cats.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-1.5 text-xs font-bold transition-all duration-300 font-display tracking-widest uppercase ${
                filter === cat
                  ? "bg-gradient-to-r from-secondary to-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
              style={{ clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="masonry">
          {filtered.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="masonry-item glass border border-border/40 hover:border-secondary/30 transition-all duration-400 hover:shadow-[0_16px_40px_hsl(187,94%,43%,0.12)]"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src} alt={image.alt}
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-display tracking-widest uppercase text-secondary mr-2">{image.category}</span>
                  <h4 className="text-foreground font-bold text-sm font-display mt-1">{image.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          style={{ minHeight: "100vh" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} />
            </button>
            <div className="glass border border-primary/20 rounded-2xl overflow-hidden">
              <img src={selectedImage.src} alt={selectedImage.alt} className="w-full max-h-[75vh] object-contain" />
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-display tracking-widest uppercase text-secondary">{selectedImage.category}</span>
                  <h4 className="text-foreground font-bold font-display">{selectedImage.title}</h4>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
