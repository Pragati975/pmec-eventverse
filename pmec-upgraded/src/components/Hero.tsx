import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";
import { Link } from "react-router-dom";
import pmecHeroBg from "@/assets/pmec-hero-bg.jpg";

const LINES = [
  "Tech. Culture. Sports.",
  "Compete. Collaborate. Conquer.",
  "PMEC's Biggest Fest.",
  "Where Ideas Ignite.",
];

const AnimatedCounter = ({ target, suffix = "+" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let cur = 0;
        const step = target / 60;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          setCount(Math.floor(cur));
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref} className="stat-num">{count}{suffix}</span>;
};

export const Hero = () => {
  const [typeText, setTypeText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const line = LINES[lineIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < line.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), 55);
    } else if (!deleting && charIdx === line.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), 28);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setLineIdx(i => (i + 1) % LINES.length);
    }
    setTypeText(line.substring(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, lineIdx]);

  const scrollToEvents = () => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${pmecHeroBg})` }} />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 grid-overlay opacity-60" />
        <ParticleBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(263,70%,20%,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(187,94%,30%,0.18),transparent_55%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/5 animate-pulse-ring pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-secondary/5 animate-pulse-ring pointer-events-none" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 glass mb-8 text-sm text-muted-foreground"
              style={{ clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}
            >
              <Sparkles size={14} className="text-secondary" />
              <span className="tracking-widest uppercase text-xs font-display">Parala Maharaja Engineering College</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight font-display">
              <span className="gradient-text">PMEC</span>
              <br />
              <span className="text-white/90">EventVerse</span>
            </h1>

            <div className="h-10 flex items-center justify-center mb-4">
              <p className="text-xl md:text-2xl font-semibold text-secondary tracking-wide">
                {typeText}<span className="typewriter-cursor" />
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-muted-foreground leading-relaxed"
          >
            Empowering Innovation, Celebrating Culture. Explore events, connect with clubs,
            and be part of the vibrant life at PMEC.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
          >
            <button
              onClick={scrollToEvents}
              className="btn-angular px-10 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(263,70%,55%,0.4)] min-w-[210px] font-display"
            >
              Explore Events
            </button>
            <Link
              to="/register"
              className="btn-angular px-10 py-4 border border-primary/40 text-foreground font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:border-secondary hover:text-secondary hover:shadow-[0_0_30px_hsl(187,94%,43%,0.25)] backdrop-blur-sm min-w-[210px] text-center font-display"
            >
              Register Now
            </Link>
          </motion.div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-10 bg-gradient-to-b from-secondary to-transparent" />
              <ArrowDown size={20} className="text-muted-foreground" />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </section>

      <div className="stats-bar relative z-10">
        {[
          { target: 40, label: "Events", suffix: "+" },
          { target: 2000, label: "Participants", suffix: "+" },
          { target: 50, label: "Colleges", suffix: "+" },
          { target: 5, label: "Lac Prize Pool", suffix: "L+" },
        ].map(s => (
          <div key={s.label} className="stat-cell">
            <AnimatedCounter target={s.target} suffix={s.suffix} />
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );
};
