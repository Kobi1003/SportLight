
import type { Player } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Cake, Star, Award, Ruler, Scale, Heart, VenetianMask, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { usePlayers } from "@/hooks/use-players";


interface PlayerProfileModalProps {
  player: Player | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlayerProfileModal({ player, open, onOpenChange }: PlayerProfileModalProps) {
  const { deletePlayer } = usePlayers();

  if (!player) return null;

  const handleDelete = () => {
    if (player) {
      deletePlayer(player.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-primary/50">
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
        <div className="space-y-3 py-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
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
            <div className="flex items-center">
              <VenetianMask className="mr-2 h-4 w-4" />
              <span>{player.gender}</span>
            </div>
             <div className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              <span>{player.dreamClub}</span>
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
            <div className="bg-muted/50 p-3 rounded-md space-y-2">
              {player.achievementsImage && (
                <Image
                    src={player.achievementsImage}
                    alt="Player achievements visualization"
                    width={300}
                    height={225}
                    className="rounded-md object-cover w-full"
                    data-ai-hint="achievement award"
                />
              )}
              <p className="text-sm text-foreground/80">{player.achievementsText}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between pt-2">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Profile
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the
                        player profile for {player.name}.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
