
import type { Player } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Cake, Star, Award, Ruler, Scale, Heart, VenetianMask, Trash2, ShieldAlert, AtSign } from "lucide-react";
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
import { MOCK_USER_EMAIL } from "@/lib/mock-data";


interface PlayerProfileModalProps {
  player: Player | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlayerProfileModal({ player, open, onOpenChange }: PlayerProfileModalProps) {
  const { deletePlayer } = usePlayers();

  if (!player) return null;

  const isOwner = player.creatorEmail === MOCK_USER_EMAIL;

  const handleDelete = () => {
    if (player && isOwner) {
      deletePlayer(player.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-primary/50">
              <AvatarImage src={player.avatar} alt={player.name} data-ai-hint="person portrait" />
              <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <DialogTitle className="font-headline text-2xl">{player.name}</DialogTitle>
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
        <div className="space-y-2 py-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-2 h-3 w-3" />
              <span>{player.location}</span>
            </div>
            <div className="flex items-center">
              <Cake className="mr-2 h-3 w-3" />
              <span>{player.age} years old</span>
            </div>
            <div className="flex items-center">
              <Ruler className="mr-2 h-3 w-3" />
              <span>{player.height} cm</span>
            </div>
            <div className="flex items-center">
              <Scale className="mr-2 h-3 w-3" />
              <span>{player.weight} kg</span>
            </div>
            <div className="flex items-center">
              <VenetianMask className="mr-2 h-3 w-3" />
              <span>{player.gender}</span>
            </div>
             <div className="flex items-center">
              <Heart className="mr-2 h-3 w-3" />
              <span>{player.dreamClub}</span>
            </div>
             <div className="flex items-center col-span-2">
              <AtSign className="mr-2 h-3 w-3" />
              <span>{player.creatorEmail}</span>
            </div>
          </div>
          <div className="pt-2">
            <h4 className="font-semibold mb-1 flex items-center gap-2 text-sm"><Star className="w-4 h-4 text-primary" /> Skills</h4>
            <div className="flex flex-wrap gap-1">
              {player.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-accent/20 text-accent-foreground text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <h4 className="font-semibold mb-1 flex items-center gap-2 text-sm"><Award className="w-4 h-4 text-primary"/> Achievements</h4>
            <div className="bg-muted/50 p-2 rounded-md space-y-2">
              {player.achievementsImage && (
                <Image
                    src={player.achievementsImage}
                    alt="Player achievements visualization"
                    width={200}
                    height={150}
                    className="rounded-md object-cover w-full"
                    data-ai-hint="achievement award"
                />
              )}
              <p className="text-xs text-foreground/80">{player.achievementsText}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between pt-2">
            {isOwner ? (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
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
            ) : (
                <div className="flex items-center gap-2 text-xs text-muted-foreground p-2 rounded-md bg-muted">
                    <ShieldAlert className="w-4 h-4" />
                    <span>You are not the owner of this profile.</span>
                </div>
            )}
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
