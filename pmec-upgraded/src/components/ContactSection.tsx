import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail,  label: "Email",   value: "pmecbam@gmail.com",      sub: "We reply within 24 hours" },
    { icon: Phone, label: "Phone",   value: "+91 680-229-1040",        sub: "Mon–Sat, 9am–6pm" },
    { icon: MapPin,label: "Address", value: "Berhampur, Odisha 760003",sub: "Parala Maharaja Engineering College" },
    { icon: Clock, label: "Office Hours", value: "Mon – Sat",         sub: "9:00 AM – 5:00 PM IST" },
  ];

  const inputClass = "w-full px-4 py-3 bg-muted/30 border border-border text-foreground focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none placeholder:text-muted-foreground/40 text-sm";

  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(187,94%,10%,0.12),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-eyebrow">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-black gradient-text inline-block font-display">Contact Us</h2>
          <div className="section-divider" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Have questions or want to get involved? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold text-foreground mb-8 font-display">Reach Out</h3>
            <div className="space-y-5">
              {contactInfo.map(info => (
                <div key={info.label} className="flex items-start space-x-4 p-4 glass rounded-xl border border-border/50 hover:border-secondary/30 transition-all group">
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-border/50 group-hover:border-secondary/40 transition-colors"
                    style={{ clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)", background: "rgba(0,229,255,0.05)" }}
                  >
                    <info.icon className="text-secondary" size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-0.5">{info.label}</p>
                    <p className="font-semibold text-foreground text-sm">{info.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{info.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-border/50 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="your@email.com" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange} className={inputClass} required>
                  <option value="">Select a subject</option>
                  <option>Event Registration</option>
                  <option>Club Membership</option>
                  <option>Sponsorship</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-display font-bold text-foreground/70 mb-2 tracking-widest uppercase">Message</label>
                <textarea
                  id="message" name="message" rows={5} value={formData.message} onChange={handleChange}
                  className={`${inputClass} resize-none`} placeholder="Tell us how we can help..." required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-angular w-full py-3.5 bg-gradient-to-r from-secondary to-primary text-primary-foreground font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 font-display"
              >
                {sending ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
