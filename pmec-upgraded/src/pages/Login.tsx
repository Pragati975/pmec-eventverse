import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { LogIn, Eye, EyeOff, Rocket, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { toast.error(error.message); }
    else { toast.success("Welcome back!"); navigate("/dashboard"); }
  };

  const handleGoogleLogin = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) { toast.error(result.error.message); return; }
    if (result.redirected) return;
    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  const inputClass = "w-full px-4 py-3 bg-muted/30 border border-border text-foreground focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none placeholder:text-muted-foreground/40 text-sm rounded-none";

  return (
    <div className="min-h-screen auth-grid bg-background relative overflow-hidden">
      <ParticleBackground />

      {/* Left panel — desktop only */}
      <div className="hidden lg:flex flex-col justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(263,70%,15%,0.4),transparent_60%)]" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative z-10">
          <Link to="/" className="inline-block mb-10">
            <img src="/lovable-uploads/c6ad273d-c889-4afe-9d55-c5bafc990ce0.png" alt="PMEC" className="w-16 h-16" />
          </Link>
          <span className="section-eyebrow">Welcome back</span>
          <h2 className="text-4xl font-black font-display mb-2">
            <span className="gradient-text">PMEC</span>
          </h2>
          <h2 className="text-4xl font-black font-display text-white mb-6">EventVerse</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed max-w-sm">
            Odisha's premier inter-college event portal. Sign in to register for events and track your journey.
          </p>
          <div className="space-y-4">
            {[
              { icon: Rocket, label: "40+ Events", sub: "Technical, Cultural & Sports" },
              { icon: Trophy, label: "₹5 Lac Prize Pool", sub: "Win big across categories" },
              { icon: Users,  label: "50+ Colleges", sub: "From across Odisha & beyond" },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-4 p-3 glass rounded-xl border border-border/30">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(187,94%,43%,0.1)", clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)" }}
                >
                  <f.icon size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(263,70%,20%,0.2),transparent_60%)] lg:hidden" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="glass border border-border/50 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="text-center mb-8">
              <Link to="/" className="inline-block mb-4 lg:hidden">
                <img src="/lovable-uploads/c6ad273d-c889-4afe-9d55-c5bafc990ce0.png" alt="PMEC" className="w-14 h-14 mx-auto" />
              </Link>
              <h1 className="text-2xl font-black gradient-text inline-block font-display">Welcome Back</h1>
              <p className="text-muted-foreground mt-2 text-sm">Sign in to your EventVerse account</p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 border border-border/60 text-foreground font-semibold hover:bg-muted/30 transition-all flex items-center justify-center gap-2 mb-6 text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border" /><span className="text-muted-foreground text-xs">or sign in with email</span><div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="you@pmec.ac.in" required />
              </div>
              <div>
                <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <Link to="/forgot-password" className="text-xs text-secondary hover:underline font-display tracking-wider">Forgot password?</Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-angular w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-display"
              >
                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
                : <><LogIn size={14} /> Sign In</>}
              </button>
            </form>

            <p className="text-center text-muted-foreground text-xs mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-secondary font-bold hover:underline font-display tracking-wider">Register</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
