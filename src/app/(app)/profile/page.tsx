"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePlayers } from "@/hooks/use-players";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { AchievementGenerator } from "@/components/profile/achievement-generator";
import { useState } from "react";

const playerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sport: z.enum(["Football", "Basketball", "Tennis", "Cricket", "Long Jump", "High Jump", "Archery", "Shooting", "Badminton", "Javelin"]),
  age: z.coerce.number().min(1, "Age is required"),
  location: z.string().min(1, "Location is required"),
  height: z.coerce.number().min(1, "Height is required"),
  weight: z.coerce.number().min(1, "Weight is required"),
  skills: z.string().min(1, "Skills are required"),
  achievementsText: z.string().min(1, "Achievements text is required"),
});

export default function ProfilePage() {
  const { addPlayer } = usePlayers();
  const router = useRouter();
  const { toast } = useToast();
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);


  const form = useForm<z.infer<typeof playerFormSchema>>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      name: "",
      sport: "Football",
      age: undefined,
      location: "",
      height: undefined,
      weight: undefined,
      skills: "",
      achievementsText: "",
    },
  });

  function onSubmit(values: z.infer<typeof playerFormSchema>) {
    const achievementImage = generatedImage || referenceImage;

    if (!achievementImage) {
        toast({
            variant: "destructive",
            title: "Achievement image missing",
            description: "Please generate or upload an image for the player's achievements.",
        });
        return;
    }

    const newPlayer = {
      id: new Date().toISOString(),
      ...values,
      skills: values.skills.split(",").map((s) => s.trim()),
      avatar: `https://picsum.photos/seed/${Math.random()}/200/200`,
      verified: false,
      achievementsImage: achievementImage,
    };
    addPlayer(newPlayer);
    toast({
      title: "Player Created",
      description: `${values.name} has been added to the dashboard.`,
    });
    router.push("/dashboard");
  }

  return (
    <div className="container mx-auto">
        <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline tracking-tight">Profile Management</h1>
            <p className="text-muted-foreground">Create and manage your player or club profile.</p>
        </div>
      <Tabs defaultValue="player" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto">
          <TabsTrigger value="player">Player Profile</TabsTrigger>
          <TabsTrigger value="club">Club Registration</TabsTrigger>
        </TabsList>
        <TabsContent value="player">
          <Card className="max-w-lg mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle className="font-headline">Create Player Profile</CardTitle>
                  <CardDescription>
                    Add a new player profile. Click create when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Alex Johnson" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="sport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sport</FormLabel>
                        <FormControl>
                          <select {...field} className="w-full p-2 border rounded-md bg-background">
                            <option value="Football">Football</option>
                            <option value="Basketball">Basketball</option>
                            <option value="Tennis">Tennis</option>
                            <option value="Cricket">Cricket</option>
                            <option value="Long Jump">Long Jump</option>
                            <option value="High Jump">High Jump</option>
                            <option value="Archery">Archery</option>
                            <option value="Shooting">Shooting</option>
                            <option value="Badminton">Badminton</option>
                            <option value="Javelin">Javelin</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 22" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. London, UK" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                            <Input type="number" placeholder="e.g. 180" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                            <Input type="number" placeholder="e.g. 75" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                   </div>
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                          <Input placeholder="Dribbling, Passing, Shooting" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter skills separated by commas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="achievementsText"
                    render={({ field }) => (
                        <AchievementGenerator
                            textValue={field.value}
                            onTextChange={field.onChange}
                            onImageGenerated={setGeneratedImage}
                            onReferenceImageSelected={setReferenceImage}
                        />
                    )}
                    />
                </CardContent>
                <CardFooter>
                  <Button type="submit">Create Player</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        <TabsContent value="club">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="font-headline">Club Registration</CardTitle>
              <CardDescription>
                Register your club to start scouting for talent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="club-name">Club Name</Label>
                <Input id="club-name" placeholder="e.g., FC Barcelona" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="criteria">Player Selection Criteria</Label>
                <Textarea id="criteria" placeholder="Describe the type of players you are looking for..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="verification">Verification Documents</Label>
                <Input id="verification" type="file" />
                <p className="text-xs text-muted-foreground">Upload official documents for club verification.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Register Club</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
