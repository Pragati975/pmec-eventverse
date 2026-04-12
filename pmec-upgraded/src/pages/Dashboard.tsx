import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { User, Calendar, LogOut, Award, Clock, CheckCircle2, Circle } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) { navigate("/login"); return; }
      setUser(s.user); setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/login"); return; }
      setUser(session.user); setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm font-display tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Student";
  const avatarUrl = user?.user_metadata?.avatar_url;
  const branch = user?.user_metadata?.branch;
  const year = user?.user_metadata?.year;

  // Profile completion
  const fields = ["full_name", "branch", "year", "phone"];
  const filled = fields.filter(f => user?.user_metadata?.[f]).length;
  const profilePct = Math.round((filled / fields.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">

          {/* Profile header */}
          <div className="glass border border-border/50 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(263,70%,10%,0.2),transparent_60%)] pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              {/* Avatar */}
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-xl border-2 border-primary/40 object-cover" />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-black text-primary-foreground font-display"
                  style={{ clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}
                >
                  {userName[0]?.toUpperCase()}
                </div>
              )}

              <div className="flex-1">
                <p className="text-xs font-display tracking-widest uppercase text-secondary mb-1">Student Portal</p>
                <h1 className="text-3xl font-black text-foreground font-display">{userName}</h1>
                <p className="text-muted-foreground text-sm mt-0.5">{user?.email}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {branch && (
                    <span className="px-3 py-1 text-xs font-bold font-display tracking-widest uppercase text-primary"
                      style={{ background: "hsl(263,70%,55%,0.1)", clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)" }}>
                      {branch}
                    </span>
                  )}
                  {year && (
                    <span className="px-3 py-1 text-xs font-bold font-display tracking-widest uppercase text-secondary"
                      style={{ background: "hsl(187,94%,43%,0.1)", clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)" }}>
                      Year {year}
                    </span>
                  )}
                </div>
              </div>

              {/* Profile completion */}
              <div className="w-full md:w-48">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground font-display tracking-wider uppercase">Profile</span>
                  <span className="text-secondary font-bold font-display">{profilePct}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000" style={{ width: `${profilePct}%` }} />
                </div>
                <div className="mt-3 space-y-1.5">
                  {fields.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs">
                      {user?.user_metadata?.[f]
                        ? <CheckCircle2 size={12} className="text-secondary" />
                        : <Circle size={12} className="text-muted-foreground" />
                      }
                      <span className={user?.user_metadata?.[f] ? "text-foreground/70" : "text-muted-foreground"}>
                        {f === "full_name" ? "Full name" : f.charAt(0).toUpperCase() + f.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Calendar, label: "Registered Events", value: "0", color: "text-primary" },
              { icon: Award,    label: "Certificates Earned", value: "0", color: "text-secondary" },
              { icon: Clock,    label: "Upcoming Events",     value: "6", color: "text-amber-400" },
              { icon: User,     label: "Club Memberships",    value: "0", color: "text-pink-400" },
            ].map((s) => (
              <div key={s.label} className="dash-card glass border border-border/50 p-5">
                <s.icon size={24} className={`${s.color} mb-3`} />
                <p className={`text-3xl font-black font-display ${s.color}`}>{s.value}</p>
                <p className="text-muted-foreground text-xs mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Registered events placeholder */}
          <div className="glass border border-border/50 p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black font-display">My Registrations</h2>
              <button onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-angular text-xs px-4 py-2 border border-secondary/40 text-secondary hover:bg-secondary/10 transition-all font-display tracking-widest uppercase"
              >
                Browse Events
              </button>
            </div>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 flex items-center justify-center mb-4"
                style={{ background: "hsl(263,70%,55%,0.1)", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}
              >
                <Calendar size={28} className="text-primary" />
              </div>
              <p className="text-foreground font-bold mb-1 font-display">No registrations yet</p>
              <p className="text-muted-foreground text-sm max-w-xs">
                Register for events to see them here. Over 40 events are waiting for you!
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="dash-card glass border border-border/50 p-6 cursor-pointer">
              <User size={26} className="text-secondary mb-3" />
              <h3 className="text-base font-bold text-foreground mb-1 font-display">Edit Profile</h3>
              <p className="text-muted-foreground text-sm">Update your personal info and preferences.</p>
            </div>
            <div className="dash-card glass border border-border/50 p-6 cursor-pointer" onClick={handleLogout}>
              <LogOut size={26} className="text-destructive mb-3" />
              <h3 className="text-base font-bold text-foreground mb-1 font-display">Sign Out</h3>
              <p className="text-muted-foreground text-sm">Sign out of your EventVerse account.</p>
            </div>
          </div>

        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
