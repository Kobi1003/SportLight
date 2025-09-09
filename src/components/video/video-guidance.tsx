'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleVideoGuidance, handleVideoGeneration } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Check, Camera, PersonStanding, Clapperboard, Loader, Video as VideoIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useState } from 'react';

const initialState = {
  guidance: null,
  error: null,
};

const initialVideoState = {
    videoUrl: null,
    error: null,
}

function GuidanceSubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? 'Getting Guidance...' : 'Get Guidance'}</Button>;
}

function VideoSubmitButton({ sport }: { sport: string }) {
    const { pending } = useFormStatus();
    return <Button type="submit" size="sm" variant="secondary" disabled={pending || !sport} className="w-full">
        {pending ? <><Loader className="w-4 h-4 mr-2 animate-spin"/> Generating...</> : <><VideoIcon className="w-4 h-4 mr-2" /> Generate Example Video</>}
    </Button>;
}

const sportCriteria = {
    "Cricket": {
        prompt: "A video showing the correct camera setup for recording a cricket bowler. The shot should be wide-angle, capturing the bowler's full run-up and delivery, the batsman's stance, and the wickets. The camera angle should be from the side, slightly elevated, to see the player's technique and the ball's trajectory clearly. The video should have annotations or diagrams showing the ideal camera placement.",
        criteria: [
            "Bowler’s run-up and batsman stance fully visible.",
            "Entire delivery from start to finish is in the frame.",
            "Avoid over-zooming; maintain a wide shot.",
            "Player's gear (pads, helmet, etc.) must be clearly visible.",
        ],
    },
    "Long Jump": {
        prompt: "A video illustrating the correct camera placement for a long jump. The camera should be positioned to the side of the runway to capture the athlete's entire approach, the take-off from the board, their flight through the air, and the landing in the pit, all in one continuous frame.",
        criteria: ["Full runway must be in the frame.", "Clear view of the take-off board.", "Entire landing pit should be visible."],
    },
    "High Jump": {
        prompt: "A video showing the ideal camera angle for a high jump. The camera is placed perpendicular to the bar to clearly show whether the athlete clears it. The entire approach, the bar, and the landing mat must be visible.",
        criteria: ["Entire approach run is visible.", "The bar and landing mat are fully in frame.", "Use a camera angle perpendicular to the bar for clearance view."],
    },
    "Kabaddi": {
        prompt: "A video showing the recommended camera setup for a Kabaddi match. The view should be from a high angle, covering the full ground, to clearly capture the raider's movements, defensive formations, tackles, and lunges without cropping any players.",
        criteria: ["Full view of the kabaddi ground.", "Clearly captures tackles, lunges, and raids.", "Do not crop the player's limbs or torso."],
    },
    "Volleyball": {
        prompt: "A video diagram of the best camera position for recording volleyball. The camera should be elevated and to the side to capture the entire court, the net, and player movements, including spikes, blocks, and serves.",
        criteria: ["Entire court, including the net, is visible.", "Captures spikes and blocks effectively.", "Player's hand and arm motions are clear."],
    },
    "Football": {
        prompt: "A video showing the correct way to film football skills. The camera angle should capture the player's interaction with the ball, their body posture during dribbling, passing, and shooting, and keep the goal area visible for shooting drills.",
        criteria: ["Clear view of ball interaction.", "Posture during dribbles, passes, and kicks.", "Goal area is visible for shooting drills."],
    },
    "Archery": {
        prompt: "A video detailing the ideal camera setup for archery. The frame must capture both the shooter and the target. A split-screen or a side-on view is needed to see the archer's form, extension, and aiming posture clearly.",
        criteria: ["Both shooter and target are in the frame.", "Archer's extension and aiming posture are clearly visible."],
    },
     "Shooting": {
        prompt: "A video showing the correct way to film a shooter. The frame must include both the shooter and the target to judge aim and stability. Their aiming posture is key.",
        criteria: ["Both shooter and target are in the frame.", "Shooter's aiming posture is clear and stable."],
    },
    "Badminton": {
        prompt: "A video illustrating the proper camera angle for a badminton match, focusing on footwork. A slightly elevated, side-court view is best to see the full court, racket and wrist motions, and player movement.",
        criteria: ["Full court is visible.", "Racket and wrist motions are clear.", "Player's footwork is a primary focus."],
    },
    "Javelin": {
        prompt: "A video showing the ideal camera placement for a javelin throw. It must capture the full runway, the complete throwing motion, the release, and the follow-through in one continuous shot from the side.",
        criteria: ["Full runway is visible.", "The complete throwing motion is captured.", "Release and follow-through are clearly shown."],
    },
};

type Sport = keyof typeof sportCriteria;

export function VideoGuidance() {
  const [guidanceState, guidanceAction] = useFormState(handleVideoGuidance, initialState);
  const [videoState, videoAction] = useFormState(handleVideoGeneration, initialVideoState);
  const [selectedSport, setSelectedSport] = useState<Sport | ''>('');


  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card>
        <form action={guidanceAction}>
          <CardHeader>
            <CardTitle className="font-headline">AI Video Guidance</CardTitle>
            <CardDescription>Get real-time feedback on your video recording setup.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sport">Sport</Label>
              <Select name="sport" required>
                <SelectTrigger id="sport">
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(sportCriteria).map(sport => (
                         <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill">Skill</Label>
              <Input id="skill" name="skill" placeholder="e.g., Free Kick, Dribbling" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cameraAngle">Camera Angle</Label>
              <Input id="cameraAngle" name="cameraAngle" placeholder="e.g., Side view, 45 degrees" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="playerVisibility">Player Visibility</Label>
              <Input id="playerVisibility" name="playerVisibility" placeholder="e.g., Full body visible, from the waist up" required />
            </div>
          </CardContent>
          <CardFooter>
            <GuidanceSubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <div className="space-y-4">
        {guidanceState.guidance && (
          <Alert className="border-primary text-primary">
            <Lightbulb className="h-4 w-4 !text-primary" />
            <AlertTitle className="font-headline">AI Suggestion</AlertTitle>
            <AlertDescription>{guidanceState.guidance}</AlertDescription>
          </Alert>
        )}
        {guidanceState.error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{guidanceState.error}</AlertDescription>
          </Alert>
        )}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="font-headline">Sport-Specific Criteria</CardTitle>
            <CardDescription>Follow these guidelines and watch the example video.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
                <form action={videoAction} className="space-y-2">
                    <Select name="sport" required value={selectedSport} onValueChange={(value: Sport) => setSelectedSport(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a sport to see criteria & example" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(sportCriteria).map(sport => (
                                <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     <input type="hidden" name="prompt" value={selectedSport ? sportCriteria[selectedSport].prompt : ''} />
                    <VideoSubmitButton sport={selectedSport} />
                </form>
            </div>

            {videoState.videoUrl && (
                <div className='mb-4 rounded-lg overflow-hidden'>
                    <video src={videoState.videoUrl} controls className='w-full aspect-video bg-muted' />
                </div>
            )}
            {videoState.error && (
                <Alert variant="destructive">
                    <AlertTitle>Video Generation Failed</AlertTitle>
                    <AlertDescription>{videoState.error}</AlertDescription>
                </Alert>
            )}

            <Accordion type="single" collapsible value={selectedSport || undefined}>
                {Object.entries(sportCriteria).map(([sport, { criteria }]) => (
                    <AccordionItem value={sport} key={sport}>
                        <AccordionTrigger>{sport}</AccordionTrigger>
                        <AccordionContent className="space-y-2">
                            {criteria.map((item, index) => (
                                <p key={index} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 mt-1 text-primary shrink-0"/> 
                                    <span>{item}</span>
                                </p>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
