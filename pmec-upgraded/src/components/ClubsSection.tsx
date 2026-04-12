import { useState } from "react";
import { Code, Bot, Palette, Music, Heart, PenTool, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ClubDetailsModal } from "./ClubDetailsModal";

const clubs = [
  {
    name: "CDD", fullName: "Code Debug Deploy",
    description: "Premier coding club nurturing innovation, hackathons, and AI excellence.",
    fullDescription: "CDD (Code Debug Deploy) is the premier coding club of PMEC, dedicated to fostering innovation and technical excellence among students.\n\nKey Activities:\n• National and international hackathons\n• Weekly competitive programming\n• AI/ML workshops covering deep learning\n• Open source collaboration\n• Industry expert talks",
    icon: Code, members: 120,
    gradient: "from-violet-600/20 to-cyan-500/10",
    accent: "text-violet-400", border: "hover:border-violet-500/40",
    glow: "hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)]",
  },
  {
    name: "Robostreak", fullName: "Robotics Club",
    description: "Exploring automation, hardware, drones, and AI-powered machines.",
    fullDescription: "Robostreak is PMEC's dynamic robotics club.\n\nOur Focus Areas:\n• Autonomous robot development\n• Arduino, Raspberry Pi projects\n• Drone technology\n• Industrial automation and IoT",
    icon: Bot, members: 85,
    gradient: "from-purple-600/20 to-pink-500/10",
    accent: "text-pink-400", border: "hover:border-pink-500/40",
    glow: "hover:shadow-[0_20px_50px_rgba(219,39,119,0.15)]",
  },
  {
    name: "Imagics", fullName: "Digital Arts Club",
    description: "Creative design, digital art, UI/UX, and multimedia storytelling.",
    fullDescription: "Imagics is the creative heart of PMEC.\n\nOur Creative Domains:\n• Digital illustration and concept art\n• Graphic design and branding\n• Photography and manipulation\n• UI/UX design and prototyping",
    icon: Palette, members: 70,
    gradient: "from-orange-600/20 to-red-500/10",
    accent: "text-orange-400", border: "hover:border-orange-500/40",
    glow: "hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)]",
  },
  {
    name: "Abhyudaya", fullName: "Performance Arts Club",
    description: "Dance, drama, anchoring, and performance arts for cultural expression.",
    fullDescription: "Abhyudaya is PMEC's premier performance club.\n\nCore Specializations:\n• Event hosting and anchoring\n• Public speaking\n• Drama and theatrical performances\n• Dance performances",
    icon: Music, members: 95,
    gradient: "from-emerald-600/20 to-teal-500/10",
    accent: "text-emerald-400", border: "hover:border-emerald-500/40",
    glow: "hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]",
  },
  {
    name: "Sanskruti", fullName: "Cultural Heritage Club",
    description: "Preserving and celebrating Indian heritage, art, and traditional values.",
    fullDescription: "Sanskruti is PMEC's cultural preservation society.\n\nCultural Focus Areas:\n• Indian classical music\n• Classical dance forms\n• Folk art and traditions\n• Traditional crafts",
    icon: Heart, members: 60,
    gradient: "from-yellow-600/20 to-amber-500/10",
    accent: "text-yellow-400", border: "hover:border-yellow-500/40",
    glow: "hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)]",
  },
  {
    name: "Writerea", fullName: "Literary Club",
    description: "For writers, poets, and creative thinkers who express through words.",
    fullDescription: "Writerea is PMEC's literary sanctuary.\n\nLiterary Genres:\n• Poetry in multiple languages\n• Creative writing and short stories\n• Article writing on social issues\n• Blog and digital content",
    icon: PenTool, members: 55,
    gradient: "from-indigo-600/20 to-purple-500/10",
    accent: "text-indigo-400", border: "hover:border-indigo-500/40",
    glow: "hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)]",
  },
];

export const ClubsSection = () => {
  const [selectedClub, setSelectedClub] = useState<typeof clubs[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="clubs" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(263,70%,12%,0.12),transparent_65%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-eyebrow">Communities</span>
          <h2 className="text-4xl md:text-5xl font-black gradient-text inline-block font-display">Our Clubs</h2>
          <div className="section-divider" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Discover diverse communities where passion meets purpose and innovation thrives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, index) => {
            const Icon = club.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`club-card shimmer-card glass rounded-2xl p-7 border border-border/50 cursor-pointer ${club.border} ${club.glow} transition-all duration-400`}
                onClick={() => { setSelectedClub(club); setIsModalOpen(true); }}
              >
                {/* Faded background icon */}
                <div className="club-card-icon-bg">
                  <Icon size={96} />
                </div>

                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${club.gradient.replace('/20','/60').replace('/10','/40')}`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${club.gradient} border border-white/5 flex items-center justify-center mb-5`}>
                  <Icon size={22} className={club.accent} />
                </div>

                {/* Name */}
                <div className="mb-1">
                  <span className={`text-xs font-display tracking-widest uppercase ${club.accent} font-bold`}>{club.name}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-display">{club.fullName}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{club.description}</p>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users size={12} /> {club.members} members
                  </span>
                  <span className={`flex items-center gap-1 text-xs font-bold ${club.accent} group-hover:gap-2 transition-all`}>
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ClubDetailsModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedClub(null); }} club={selectedClub} />
    </section>
  );
};
