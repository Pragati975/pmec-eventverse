
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

export const EventRegistrationModal = ({ isOpen, onClose, eventTitle }: EventRegistrationModalProps) => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "", email: "", registrationNumber: "", phone: "", year: "", branch: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setFormData(prev => ({ ...prev, email: session.user.email || "" }));
      }
    });
  }, [isOpen]);

  if (!user && isOpen) {
    toast.error("Please login to register for events");
    onClose();
    navigate("/login");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    toast.success(`Successfully registered for ${eventTitle}!`);
    setFormData({ name: "", email: "", registrationNumber: "", phone: "", year: "", branch: "" });
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Register for {eventTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">Registration Number *</label>
            <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">Phone *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Year *</label>
              <select name="year" value={formData.year} onChange={handleInputChange} className={inputClass} required>
                <option value="">Select Year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Branch *</label>
              <select name="branch" value={formData.branch} onChange={handleInputChange} className={inputClass} required>
                <option value="">Select Branch</option>
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electronics & Communication</option>
                <option value="EEE">Electrical & Electronics</option>
                <option value="MECH">Mechanical</option>
                <option value="CIVIL">Civil</option>
                <option value="IT">Information Technology</option>
              </select>
            </div>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-[1.02] transition-all text-primary-foreground">
            Register Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
