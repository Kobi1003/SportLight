
import type { Player } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Cake, Star } from "lucide-react";

interface PlayerProfileModalProps {
  player: Player | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlayerProfileModal({ player, open, onOpenChange }: PlayerProfileModalProps) {
  if (!player) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-24 w-24 border-4 border-primary/50">
              <AvatarImage src={player.avatar} alt={player.name} data-ai-hint="person portrait" />
              <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <DialogTitle className="font-headline text-3xl">{player.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                {player.sport}
                {player.verified && (
                  <Badge variant="outline" className="border-primary text-primary">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{player.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Cake className="mr-2 h-4 w-4" />
            <span>{player.age} years old</span>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> Skills</h4>
            <div className="flex flex-wrap gap-2">
              {player.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-accent/20 text-accent-foreground">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Bio & Achievements</h4>
            <p className="text-sm text-foreground/80 bg-muted/50 p-3 rounded-md">{player.bio}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
