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

export default function ProfilePage() {
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
            <CardHeader>
              <CardTitle className="font-headline">Player Profile</CardTitle>
              <CardDescription>
                Make changes to your player profile here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Alex Johnson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sport">Sport</Label>
                <Input id="sport" defaultValue="Football" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements & Bio</Label>
                <Textarea id="achievements" defaultValue="A dynamic forward with a knack for scoring crucial goals..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videos">Skill Videos</Label>
                <Input id="videos" type="file" />
                <p className="text-xs text-muted-foreground">Upload videos showcasing your skills.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
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
