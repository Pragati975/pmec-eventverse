
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ClubDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  club: { name: string; description: string; fullDescription: string; icon: any; color: string } | null;
}

export const ClubDetailsModal = ({ isOpen, onClose, club }: ClubDetailsModalProps) => {
  if (!club) return null;
  const IconComponent = club.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${club.color} flex items-center justify-center`}>
              <IconComponent size={24} className="text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">{club.name}</DialogTitle>
          </div>
        </DialogHeader>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{club.fullDescription}</p>
      </DialogContent>
    </Dialog>
  );
};
