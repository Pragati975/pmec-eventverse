
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setSent(true);
    toast.success("Password reset email sent!");
  };

  const inputClass = "w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/50";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <ParticleBackground />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md p-8 glass rounded-2xl mx-4">
        <Link to="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm">
          <ArrowLeft size={16} /> Back to login
        </Link>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground">Reset Password</h1>
          <p className="text-muted-foreground mt-2">Enter your email to receive a reset link</p>
        </div>

        {sent ? (
          <div className="text-center text-muted-foreground">
            <p>Check your email for the reset link. If you don't see it, check spam.</p>
            <Link to="/login" className="text-primary font-semibold mt-4 inline-block hover:underline">Back to login</Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@pmec.ac.in" required />
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-[1.02] transition-all disabled:opacity-50">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
