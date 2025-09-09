'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleVideoGuidance, handleVideoGeneration } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Check, Camera, PersonStanding, Clapperboard, Loader, Video } from 'lucide-react';
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
        {pending ? <><Loader className="w-4 h-4 mr-2 animate-spin"/> Generating...</> : <><Video className="w-4 h-4 mr-2" /> Generate Example</>}
    </Button>;
}

const sportCriteria = {
    "Cricket": {
        prompt: "A cinematic, wide-angle shot of a cricket bowler's run-up and delivery on a professional pitch. The batsman's stance and the entire delivery should be visible. No over-zoom. The player's gear should be clearly visible.",
        criteria: [
            "Bowler’s run-up and batsman stance fully visible.",
            "Entire delivery from start to finish is in the frame.",
            "Avoid over-zooming; maintain a wide shot.",
            "Player's gear (pads, helmet, etc.) must be clearly visible.",
        ],
    },
    "Long Jump": {
        prompt: "A video of a long jump athlete. The shot should cover the full runway, the take-off board, and the landing pit, all in one continuous frame.",
        criteria: ["Full runway must be in the frame.", "Clear view of the take-off board.", "Entire landing pit should be visible."],
    },
    "High Jump": {
        prompt: "A high jump attempt, filmed from an angle perpendicular to the bar. The entire approach, the bar, and the landing mat must be visible to show clearance.",
        criteria: ["Entire approach run is visible.", "The bar and landing mat are fully in frame.", "Use a camera angle perpendicular to the bar for clearance view."],
    },
    "Kabaddi": {
        prompt: "A dynamic Kabaddi raid in a match. The camera should capture the full ground, showing the raider's movements, tackles, and lunges without cropping limbs.",
        criteria: ["Full view of the kabaddi ground.", "Clearly captures tackles, lunges, and raids.", "Do not crop the player's limbs or torso."],
    },
    "Volleyball": {
        prompt: "A volleyball rally, showing the entire court and net. The shot should capture spikes, blocks, and clear hand/arm motions of the players.",
        criteria: ["Entire court, including the net, is visible.", "Captures spikes and blocks effectively.", "Player's hand and arm motions are clear."],
    },
    "Football": {
        prompt: "A football player dribbling, passing, and shooting towards a goal. The video should show ball interaction, player posture, and keep the goal area visible.",
        criteria: ["Clear view of ball interaction.", "Posture during dribbles, passes, and kicks.", "Goal area is visible for shooting drills."],
    },
    "Archery": {
        prompt: "An archer shooting an arrow. The frame must capture both the shooter and the target. The archer's extension and aiming posture must be visible.",
        criteria: ["Both shooter and target are in the frame.", "Archer's extension and aiming posture are clearly visible."],
    },
    "Shooting": {
        prompt: "A shooter firing at a target. The frame must include both the shooter and the target to judge aim and stability. Their aiming posture is key.",
        criteria: ["Both shooter and target are in the frame.", "Shooter's aiming posture is clear and stable."],
    },
    "Badminton": {
        prompt: "A badminton match highlighting footwork. The full court must be visible, with clear shots of the racket, wrist motions, and player movement.",
        criteria: ["Full court is visible.", "Racket and wrist motions are clear.", "Player's footwork is a primary focus."],
    },
    "Javelin": {
        prompt: "A javelin throw, capturing the full runway, the throw itself, the release, and the follow-through in one continuous shot.",
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
                    <video src={videoState.videoUrl} controls autoPlay loop muted className='w-full aspect-video bg-muted object-cover'></video>
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
