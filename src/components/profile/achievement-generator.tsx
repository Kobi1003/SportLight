"use client";

import { useState, useRef, useTransition } from "react";
import { handleAchievementImage } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import { FormLabel, FormMessage, FormDescription, FormItem, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Image as ImageIcon, FileUp, Loader } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface AchievementGeneratorProps {
  textValue: string;
  onTextChange: (value: string) => void;
  onImageGenerated: (imageUrl: string) => void;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending}>
        {pending ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><Sparkles className="mr-2 h-4 w-4" /> Generate Image</>}
      </Button>
    );
}

export function AchievementGenerator({ textValue, onTextChange, onImageGenerated }: AchievementGeneratorProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const action = async (formData: FormData) => {
        setError(null);
        setGeneratedImageUrl(null);

        if (previewUrl) {
            formData.set("image", previewUrl);
        }

        startTransition(async () => {
            const result = await handleAchievementImage(null, formData);
            if (result.error) {
                setError(result.error);
                toast({ variant: 'destructive', title: "Generation Failed", description: result.error });
            } else if (result.imageUrl) {
                setGeneratedImageUrl(result.imageUrl);
                onImageGenerated(result.imageUrl);
                toast({ title: "Image Generated", description: "Your achievement image is ready." });
            }
        });
    };


  return (
    <div className="space-y-4">
        <FormItem>
            <FormLabel>Achievements & Bio</FormLabel>
            <FormControl>
            <Textarea
                placeholder="A dynamic forward with a knack for scoring crucial goals..."
                value={textValue}
                onChange={(e) => onTextChange(e.target.value)}
            />
            </FormControl>
            <FormDescription>
                Describe the player's achievements. This will be used to generate a unique visual.
            </FormDescription>
            <FormMessage />
        </FormItem>

        <Card className="bg-muted/50">
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> AI Achievement Image
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={action} className="space-y-4">
                    <input type="hidden" name="text" value={textValue} />
                    
                    <FormItem>
                        <FormLabel>Reference Image (Optional)</FormLabel>
                        <FormControl>
                            <Input type="file" accept="image/*" onChange={handleFileChange} />
                        </FormControl>
                        <FormDescription>
                            Upload an image to influence the generation.
                        </FormDescription>
                    </FormItem>

                    {(previewUrl || generatedImageUrl) && (
                        <div className="grid grid-cols-2 gap-4">
                            {previewUrl && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Your Image</p>
                                    <Image src={previewUrl} alt="Reference preview" width={200} height={150} className="rounded-md object-cover w-full aspect-[4/3]" />
                                </div>
                            )}
                             {generatedImageUrl && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Generated Image</p>
                                    <Image src={generatedImageUrl} alt="Generated achievement" width={200} height={150} className="rounded-md object-cover w-full aspect-[4/3]" />
                                </div>
                            )}
                        </div>
                    )}
                    
                    {isPending && !generatedImageUrl && (
                         <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
                            <Loader className="w-12 h-12 text-muted-foreground animate-spin" />
                            <h3 className="font-headline mt-4 text-xl font-semibold">Generating...</h3>
                            <p className="text-muted-foreground mt-1">The AI is creating your image. This might take a moment.</p>
                        </div>
                    )}
                    
                    <SubmitButton />
                </form>

            </CardContent>
        </Card>
    </div>
  );
}
