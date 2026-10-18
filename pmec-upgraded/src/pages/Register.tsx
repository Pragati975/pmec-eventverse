import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserPlus, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", branch: "", year: "", phone: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formData.email, password: formData.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: formData.name, branch: formData.branch, year: formData.year, phone: formData.phone },
      },
    });
    setLoading(false);
    if (error) { toast.error(error.message); }
    else { toast.success("Account created! Check your email to verify."); navigate("/login"); }
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) toast.error(error.message);   // on success the browser redirects to Google
  };

  const inputClass = "w-full px-4 py-3 bg-muted/30 border border-border text-foreground focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none placeholder:text-muted-foreground/40 text-sm rounded-none";

  const benefits = [
    "Instant event registration",
    "Real-time seat availability",
    "Digital participation certificate",
    "Event reminder notifications",
    "Club membership tracking",
  ];

  return (
    <div className="min-h-screen auth-grid bg-background relative overflow-hidden">
      <ParticleBackground />

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(187,94%,10%,0.35),transparent_60%)]" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative z-10">
          <Link to="/" className="inline-block mb-10">
            <img src="/lovable-uploads/c6ad273d-c889-4afe-9d55-c5bafc990ce0.png" alt="PMEC" className="w-16 h-16" />
          </Link>
          <span className="section-eyebrow">Join the fest</span>
          <h2 className="text-4xl font-black font-display mb-2 text-white">Create your</h2>
          <h2 className="text-4xl font-black font-display gradient-text mb-6">EventVerse account</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed max-w-sm text-sm">
            Register once and unlock access to all events, clubs, and the full PMEC festival experience.
          </p>
          <div className="space-y-3">
            {benefits.map(b => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle2 size={15} className="text-secondary flex-shrink-0" />
                <span className="text-sm text-foreground/80">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(263,70%,20%,0.2),transparent_60%)] lg:hidden" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
          <div className="glass border border-border/50 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

            <div className="text-center mb-7">
              <Link to="/" className="inline-block mb-4 lg:hidden">
                <img src="/lovable-uploads/c6ad273d-c889-4afe-9d55-c5bafc990ce0.png" alt="PMEC" className="w-14 h-14 mx-auto" />
              </Link>
              <h1 className="text-2xl font-black gradient-text inline-block font-display">Join EventVerse</h1>
              <p className="text-muted-foreground mt-2 text-sm">Create your account to get started</p>
            </div>

            <button onClick={handleGoogleSignup} className="w-full py-3 border border-border/60 text-foreground font-semibold hover:bg-muted/30 transition-all flex items-center justify-center gap-2 mb-5 text-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 h-px bg-border" /><span className="text-muted-foreground text-xs">or register with email</span><div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">College Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@pmec.ac.in" required />
              </div>
              <div>
                <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Password *</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className={inputClass} placeholder="Min 6 characters" required minLength={6} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Branch *</label>
                  <select name="branch" value={formData.branch} onChange={handleChange} className={inputClass} required>
                    <option value="">Select</option>
                    {["CSE","ECE","EEE","MECH","CIVIL","IT"].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Year *</label>
                  <select name="year" value={formData.year} onChange={handleChange} className={inputClass} required>
                    <option value="">Select</option>
                    {["1","2","3","4"].map(y => <option key={y} value={y}>{y === "1" ? "1st" : y === "2" ? "2nd" : y === "3" ? "3rd" : "4th"} Year</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Phone *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 9876543210" required />
              </div>
              <button type="submit" disabled={loading}
                className="btn-angular w-full py-3.5 bg-gradient-to-r from-secondary to-primary text-primary-foreground font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-display"
              >
                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</>
                : <><UserPlus size={14} /> Create Account</>}
              </button>
            </form>

            <p className="text-center text-muted-foreground text-xs mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline font-display tracking-wider">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
