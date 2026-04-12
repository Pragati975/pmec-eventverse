import { useState, useRef, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { EventRegistrationModal } from "./EventRegistrationModal";

const upcomingEvents = [
  { title:"Tech Symposium 2025", date:"2025-08-15", time:"10:00 AM", location:"Main Auditorium", attendees:"500+", totalSeats:500, seatsLeft:120, description:"Annual technical symposium featuring industry experts and innovative projects.", category:"Technical", gradient:"hsl(263,70%,8%), hsl(187,94%,10%)", icon:"💻", prize:"₹30,000" },
  { title:"Cultural Fest", date:"2025-09-22", time:"6:00 PM", location:"Open Ground", attendees:"1000+", totalSeats:1000, seatsLeft:300, description:"Celebrate diversity through dance, music, and cultural performances.", category:"Cultural", gradient:"hsl(300,70%,8%), hsl(263,70%,10%)", icon:"🎭", prize:"₹25,000" },
  { title:"Hackathon 2025", date:"2025-10-05", time:"9:00 AM", location:"Computer Lab", attendees:"200+", totalSeats:200, seatsLeft:30, description:"48-hour coding marathon to solve real-world problems.", category:"Technical", gradient:"hsl(187,94%,5%), hsl(210,80%,10%)", icon:"⚙️", prize:"₹1,50,000" },
  { title:"Sports Meet", date:"2025-11-10", time:"8:00 AM", location:"Sports Ground", attendees:"800+", totalSeats:800, seatsLeft:200, description:"Annual inter-departmental sports competition with multiple disciplines.", category:"Sports", gradient:"hsl(40,80%,8%), hsl(20,70%,10%)", icon:"⚽", prize:"₹20,000" },
  { title:"AI Workshop", date:"2025-08-28", time:"2:00 PM", location:"Seminar Hall", attendees:"150+", totalSeats:150, seatsLeft:40, description:"Hands-on workshop covering machine learning and deep learning fundamentals.", category:"Workshop", gradient:"hsl(187,90%,6%), hsl(160,70%,8%)", icon:"🤖", prize:"₹10,000" },
  { title:"Dance Competition", date:"2025-09-30", time:"5:00 PM", location:"Auditorium", attendees:"600+", totalSeats:600, seatsLeft:90, description:"Inter-college dance competition with solo and group categories.", category:"Cultural", gradient:"hsl(320,70%,8%), hsl(280,60%,10%)", icon:"💃", prize:"₹15,000" },
];

const categories = ["All","Technical","Cultural","Sports","Workshop"];

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [t, setT] = useState({ days:0, hours:0, mins:0, secs:0 });
  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setT({ days:0, hours:0, mins:0, secs:0 }); return; }
      setT({ days:Math.floor(diff/86400000), hours:Math.floor((diff%86400000)/3600000), mins:Math.floor((diff%3600000)/60000), secs:Math.floor((diff%60000)/1000) });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return (
    <div className="flex items-center gap-1 text-xs text-secondary font-display">
      <Timer size={11} /><span>{t.days}d {t.hours}h {t.mins}m {t.secs}s</span>
    </div>
  );
};

const SeatsBar = ({ total, left }: { total:number; left:number }) => {
  const filled = Math.round(((total - left) / total) * 100);
  const colorClass = left < total*0.2 ? "from-red-500 to-orange-500" : left < total*0.5 ? "from-amber-500 to-yellow-400" : "from-primary to-secondary";
  return (
    <div className="mt-2">
      <div className="seats-bar"><div className={`seats-fill bg-gradient-to-r ${colorClass}`} style={{ width:`${filled}%` }} /></div>
      <p className={`text-xs mt-1 ${left < total*0.2 ? "text-red-400" : "text-muted-foreground"}`}>
        {left} seats remaining{left < total*0.2 ? " — Almost full!" : ""}
      </p>
    </div>
  );
};

const EventCard = ({ event, index, onRegister }: { event: typeof upcomingEvents[0]; index: number; onRegister: (title: string) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ delay: index * 0.08 }}
      className="event-card shimmer-card glass rounded-2xl overflow-hidden group border border-border/50 hover:shadow-[0_0_40px_hsl(263,70%,55%,0.15)] cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="h-44 flex flex-col items-center justify-center relative overflow-hidden scan-container"
        style={{ background:`linear-gradient(135deg, ${event.gradient})` }}
      >
        <span className="text-7xl group-hover:scale-110 transition-transform duration-500 select-none">{event.icon}</span>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-bold font-display tracking-widest uppercase text-primary-foreground"
            style={{ background:"rgba(0,0,0,0.5)", clipPath:"polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)", backdropFilter:"blur(8px)" }}>
            {event.category}
          </span>
        </div>
        <div className="absolute top-3 right-3"><Countdown targetDate={event.date} /></div>
        <div className="absolute bottom-3 right-3">
          <span className="text-xs font-bold font-display text-amber-300 tracking-wider">{event.prize}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-2 font-display">{event.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
        <div className="space-y-1.5 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Calendar size={13} className="text-primary flex-shrink-0" /><span>{event.date}</span></div>
          <div className="flex items-center gap-2"><Clock size={13} className="text-primary flex-shrink-0" /><span>{event.time}</span></div>
          <div className="flex items-center gap-2"><MapPin size={13} className="text-primary flex-shrink-0" /><span>{event.location}</span></div>
          <div className="flex items-center gap-2"><Users size={13} className="text-secondary flex-shrink-0" /><span>{event.attendees} expected</span></div>
        </div>
        <SeatsBar total={event.totalSeats} left={event.seatsLeft} />
        <button
          onClick={() => onRegister(event.title)}
          className="btn-angular w-full py-3 mt-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all hover:shadow-[0_8px_25px_hsl(263,70%,55%,0.3)] font-display"
        >
          Register Now →
        </button>
      </div>
    </motion.div>
  );
};

export const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = activeCategory === "All"
    ? upcomingEvents
    : upcomingEvents.filter(e => e.category === activeCategory);

  return (
    <section id="events" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(263,70%,10%,0.15),transparent_60%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-14">
          <span className="section-eyebrow">Explore</span>
          <h2 className="text-4xl md:text-5xl font-black gradient-text inline-block font-display">Upcoming Events</h2>
          <div className="section-divider" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Join us for exciting events that inspire learning, creativity, and community building.
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-xs font-bold transition-all duration-300 font-display tracking-widest uppercase ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground glow-violet"
                  : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
              style={{ clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
            >{cat}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.title} event={event} index={index} onRegister={(title) => { setSelectedEvent(title); setIsModalOpen(true); }} />
          ))}
        </div>
      </div>

      <EventRegistrationModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedEvent(""); }}
        eventTitle={selectedEvent}
      />
    </section>
  );
};
