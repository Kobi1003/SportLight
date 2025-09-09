
import type { Player } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Cake, Star, Award, Ruler, Scale } from "lucide-react";
import Image from "next/image";

interface PlayerProfileModalProps {
  player: Player | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlayerProfileModal({ player, open, onOpenChange }: PlayerProfileModalProps) {
  if (!player) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
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
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{player.location}</span>
            </div>
            <div className="flex items-center">
              <Cake className="mr-2 h-4 w-4" />
              <span>{player.age} years old</span>
            </div>
            <div className="flex items-center">
              <Ruler className="mr-2 h-4 w-4" />
              <span>{player.height} cm</span>
            </div>
            <div className="flex items-center">
              <Scale className="mr-2 h-4 w-4" />
              <span>{player.weight} kg</span>
            </div>
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
            <h4 className="font-semibold mb-2 flex items-center gap-2"><Award className="w-4 h-4 text-primary"/> Achievements</h4>
            <div className="bg-muted/50 p-3 rounded-md space-y-3">
              {player.achievementsImage && (
                <Image
                    src={player.achievementsImage}
                    alt="Player achievements visualization"
                    width={400}
                    height={300}
                    className="rounded-md object-cover w-full"
                    data-ai-hint="achievement award"
                />
              )}
              <p className="text-sm text-foreground/80">{player.achievementsText}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
