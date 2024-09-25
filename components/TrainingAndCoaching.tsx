'use client'

import { useState } from "react"
import { Play, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CoachingVideo {
    id: number
    title: string
    coach: string
    duration: string
    url: string
}

interface ExpertAdvice {
    id: number
    expert: string
    advice: string
}

interface TrainingAndCoachingProps {
    coachingVideos: CoachingVideo[]
    expertAdvice: ExpertAdvice[]
}

export default function TrainingAndCoaching({ coachingVideos, expertAdvice }: TrainingAndCoachingProps) {
    const [selectedSkill, setSelectedSkill] = useState("batting")
    const [skillLevel, setSkillLevel] = useState(50)
    const [currentVideo, setCurrentVideo] = useState<CoachingVideo | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [generatedPlan, setGeneratedPlan] = useState<string | null>(null)

    const handleCoachingPlanGeneration = () => {
        // Simulate plan generation
        const plans = {
            batting: [
                "Practice front foot defense for 30 minutes",
                "Work on pull shots against short balls",
                "Improve timing with shadow batting exercises",
            ],
            bowling: [
                "Focus on consistent line and length for 45 minutes",
                "Practice yorkers and slower balls",
                "Work on variations in pace and spin",
            ],
            fielding: [
                "Improve catching reflexes with rapid-fire drills",
                "Practice ground fielding and direct hits",
                "Enhance throwing accuracy from different positions",
            ],
        }

        const selectedPlan = plans[selectedSkill as keyof typeof plans]
        const adjustedPlan = selectedPlan.map(item => `${item} (Adjust intensity based on ${skillLevel}% skill level)`)

        setGeneratedPlan(adjustedPlan.join("\n"))
        toast({
            title: "Coaching Plan Generated",
            description: `A personalized ${selectedSkill} plan for skill level ${skillLevel}% has been created.`,
        })
    }

    const handleVideoSelect = (video: CoachingVideo) => {
        setCurrentVideo(video)
        setIsPlaying(true)
    }

   
    const getYouTubeEmbedUrl = (url: string) => {
        const videoId = url.split('v=')[1];
        return `https://www.youtube.com/embed/${videoId}`;
      };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Cricket Training and Coaching</CardTitle>
                <CardDescription>Improve your cricket skills with expert guidance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <Tabs defaultValue="videos" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="videos">Coaching Videos</TabsTrigger>
                        <TabsTrigger value="plan">Interactive Coaching Plan</TabsTrigger>
                        <TabsTrigger value="advice">Expert Advice</TabsTrigger>
                    </TabsList>
                    <TabsContent value="videos">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {coachingVideos.map((video) => (
                                <Card key={video.id} className="overflow-hidden">
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-base">{video.title}</CardTitle>
                                        <CardDescription>Coach: {video.coach}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div
                                            className="aspect-video bg-muted relative cursor-pointer"
                                            onClick={() => handleVideoSelect(video)}
                                        >
                                            {currentVideo?.id === video.id && isPlaying ? (
                                                <iframe
                                                src={getYouTubeEmbedUrl(video.url)}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video.title}
                                              ></iframe>
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Play className="h-12 w-12 text-primary" />
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4 flex justify-between items-center">
                                        <Badge variant="secondary">{video.duration}</Badge>
                                        <Button variant="outline" size="sm" onClick={() => handleVideoSelect(video)}>
                                            {currentVideo?.id === video.id && isPlaying ? 'Pause' : 'Play'}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="plan">
                        <Card>
                            <CardHeader>
                                <CardTitle>Interactive Coaching Plan</CardTitle>
                                <CardDescription>Customize your training plan</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="skill">Skill to Improve</Label>
                                        <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                                            <SelectTrigger id="skill">
                                                <SelectValue placeholder="Select a skill" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="batting">Batting</SelectItem>
                                                <SelectItem value="bowling">Bowling</SelectItem>
                                                <SelectItem value="fielding">Fielding</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="level">Skill Level</Label>
                                        <Slider
                                            id="level"
                                            min={0}
                                            max={100}
                                            step={1}
                                            value={[skillLevel]}
                                            onValueChange={(value) => setSkillLevel(value[0])}
                                        />
                                        <p className="text-sm text-muted-foreground text-right">{skillLevel}%</p>
                                    </div>
                                </div>
                                <Button onClick={handleCoachingPlanGeneration} className="w-full">Generate Coaching Plan</Button>
                            </CardContent>
                            {generatedPlan && (
                                <CardFooter>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">View Generated Plan</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Your Personalized Coaching Plan</DialogTitle>
                                                <DialogDescription>
                                                    Follow this plan to improve your {selectedSkill} skills
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="mt-4 space-y-4">
                                                {generatedPlan.split('\n').map((item, index) => (
                                                    <div key={index} className="flex items-start space-x-2">
                                                        <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                        <p>{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <Progress value={skillLevel} className="mt-4" />
                                            <p className="text-sm text-muted-foreground mt-2">Current skill level: {skillLevel}%</p>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            )}
                        </Card>
                    </TabsContent>
                    <TabsContent value="advice">
                        <Card>
                            <CardHeader>
                                <CardTitle>Expert Coaching Advice</CardTitle>
                                <CardDescription>Learn from the best in the game</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                    {expertAdvice.map((advice) => (
                                        <div key={advice.id} className="mb-4">
                                            <p className="font-semibold text-lg">{advice.expert}</p>
                                            <p className="text-sm text-muted-foreground mt-1">{advice.advice}</p>
                                            <Separator className="my-2" />
                                        </div>
                                    ))}
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}