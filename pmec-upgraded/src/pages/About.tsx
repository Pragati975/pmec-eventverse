
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GraduationCap, Users, Award, BookOpen } from "lucide-react";

const stats = [
  { icon: GraduationCap, label: "Students", target: 3000, suffix: "+" },
  { icon: Users, label: "Faculty", target: 150, suffix: "+" },
  { icon: Award, label: "Achievements", target: 200, suffix: "+" },
  { icon: BookOpen, label: "Programs", target: 12, suffix: "" },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-4xl font-black text-primary">{count}{suffix}</div>;
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black mb-6 gradient-text inline-block">About PMEC</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Parala Maharaja Engineering College (PMEC) is a premier engineering institution located in Berhampur, Odisha.
              Established with a vision to foster technical excellence, innovation, and holistic development,
              PMEC has been at the forefront of engineering education for decades.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <stat.icon size={32} className="text-secondary mx-auto mb-4" />
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="container mx-auto px-4 py-16">
          <div className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To provide world-class engineering education, promote research and innovation,
                and develop technically competent, socially responsible professionals who contribute
                to the advancement of society.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                PMEC believes in nurturing not just engineers, but well-rounded individuals.
                Through our diverse clubs, events, and cultural programs, we ensure every student
                discovers their passion and develops skills beyond the classroom.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
