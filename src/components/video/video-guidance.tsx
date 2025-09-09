'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleVideoGuidance } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Check, Camera, PersonStanding } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const initialState = {
  guidance: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? 'Getting Guidance...' : 'Get Guidance'}</Button>;
}

export function VideoGuidance() {
  const [state, formAction] = useFormState(handleVideoGuidance, initialState);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card>
        <form action={formAction}>
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
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
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
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <div className="space-y-4">
        {state.guidance && (
          <Alert className="border-primary text-primary">
            <Lightbulb className="h-4 w-4 !text-primary" />
            <AlertTitle className="font-headline">AI Suggestion</AlertTitle>
            <AlertDescription>{state.guidance}</AlertDescription>
          </Alert>
        )}
        {state.error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="font-headline">Sport-Specific Criteria</CardTitle>
            <CardDescription>Follow these guidelines for the best results.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="football">
                <AccordionItem value="football">
                    <AccordionTrigger>Football</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        <p className="flex items-center gap-2"><Camera className="w-4 h-4 text-primary"/> Use a stable, landscape-oriented camera.</p>
                        <p className="flex items-center gap-2"><PersonStanding className="w-4 h-4 text-primary"/> Ensure your full body is visible for skill demonstrations.</p>
                        <p className="flex items-center gap-2"><Check className="w-4 h-4 text-primary"/> Record for at least 30 seconds per skill.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="basketball">
                    <AccordionTrigger>Basketball</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        <p className="flex items-center gap-2"><Camera className="w-4 h-4 text-primary"/> Side-court angle is preferred for shooting form.</p>
                        <p className="flex items-center gap-2"><PersonStanding className="w-4 h-4 text-primary"/> Include clips of both offense and defense.</p>
                        <p className="flex items-center gap-2"><Check className="w-4 h-4 text-primary"/> Good lighting is crucial to see ball handling.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
