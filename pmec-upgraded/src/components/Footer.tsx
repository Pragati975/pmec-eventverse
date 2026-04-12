import { Heart, Github, Twitter, Instagram, Linkedin, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const socialLinks = [
  { icon: Twitter,   href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin,  href: "#", label: "LinkedIn" },
  { icon: Github,    href: "#", label: "GitHub" },
];

const quickLinks = [
  { label: "Events",  href: "/#events" },
  { label: "Clubs",   href: "/#clubs" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! You'll get event updates.");
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background py-14 relative overflow-hidden">
      {/* Gradient top border */}
      <div className="footer-border" />

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(263,70%,10%,0.15),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-colors">
                <img src="/lovable-uploads/c6ad273d-c889-4afe-9d55-c5bafc990ce0.png" alt="PMEC" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display text-base font-bold text-white">PMEC</span>
                <span className="font-display text-base font-bold text-secondary"> EventVerse</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Parala Maharaja Engineering College — Fostering innovation, creativity, and excellence in Berhampur, Odisha.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-5 text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-muted-foreground hover:text-secondary transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-secondary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-5 text-sm tracking-widest uppercase">Connect</h4>
            <p className="text-muted-foreground text-sm mb-1 flex items-center gap-2">
              <Mail size={13} className="text-primary" /> pmecbam@gmail.com
            </p>
            <p className="text-muted-foreground text-sm mb-4">Berhampur, Odisha, India</p>
            <div className="flex space-x-2">
              {socialLinks.map(social => (
                <a
                  key={social.label} href={social.href}
                  className="w-9 h-9 glass flex items-center justify-center text-muted-foreground hover:text-secondary hover:border-secondary/40 hover:shadow-[0_0_15px_hsl(187,94%,43%,0.25)] transition-all"
                  style={{ clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)" }}
                  aria-label={social.label}
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-5 text-sm tracking-widest uppercase">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">Get notified about upcoming events and registrations.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-muted/40 border border-border text-foreground text-sm focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none placeholder:text-muted-foreground/40"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-gradient-to-r from-secondary to-primary text-primary-foreground hover:opacity-90 transition-all"
                style={{ clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)" }}
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            &copy; 2025 Parala Maharaja Engineering College. Made with <Heart size={13} className="text-destructive fill-current" /> for students.
          </p>
          <p className="text-xs text-muted-foreground/50 font-display tracking-widest uppercase">
            PMEC EventVerse v2.0
          </p>
        </div>
      </div>
    </footer>
  );
};
