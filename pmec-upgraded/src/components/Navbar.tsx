import { useState, useEffect } from "react";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (pathname !== "/") { navigate(`/#${id}`); return; }   // go home, Index scrolls to the section
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/"); };

  const navLinks = [
    { label: "Events",  action: () => scrollTo("events") },
    { label: "Clubs",   action: () => scrollTo("clubs") },
    { label: "Gallery", action: () => scrollTo("gallery") },
    { label: "About",   action: () => navigate("/about") },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? "glass-strong shadow-lg shadow-black/30" : "bg-transparent"
    }`}>
      {/* Top gradient line */}
      {isScrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      )}

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-colors">
              <img src="/lovable-uploads/c6ad273d-c889-4afe-9d55-c5bafc990ce0.png" alt="PMEC" className="w-full h-full object-contain" />
            </div>
            <span className="hidden md:block">
              <span className="font-display text-base font-bold text-white">PMEC</span>
              <span className="font-display text-base font-bold text-secondary"> EventVerse</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={link.action}
                className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium text-sm group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-secondary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-angular text-sm px-5 py-2 border border-primary/40 text-primary hover:bg-primary/10 transition-all font-display tracking-wider"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm px-5 py-2 border border-primary/40 text-primary hover:border-primary hover:shadow-[0_0_15px_hsl(263,70%,55%,0.3)] transition-all font-display tracking-wider"
                  style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
                >
                  <LogIn size={14} /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 text-sm px-5 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-105 transition-all font-display tracking-wider"
                  style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
                >
                  <UserPlus size={14} /> Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-16 right-0 bottom-0 w-72 glass-strong p-6 space-y-1 md:hidden"
            >
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="block w-full text-left py-3 px-2 text-foreground/70 hover:text-foreground border-b border-border/20 transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 space-y-3">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-3 border border-primary/40 text-primary font-display text-sm tracking-wider" style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}>Dashboard</Link>
                    <button onClick={handleLogout} className="block w-full text-center py-3 bg-primary/20 text-primary font-display text-sm tracking-wider" style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-3 border border-primary/40 text-primary font-display text-sm tracking-wider" style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}>Login</Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold font-display text-sm tracking-wider" style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}>Register</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
