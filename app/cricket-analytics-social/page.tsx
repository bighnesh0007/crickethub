"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { BarChart, Radar, PieChart } from "lucide-react"

// Mock data for predictions and analytics
const matchPredictions = [
  { id: 1, teams: "India vs Australia", prediction: "India (65% chance)", confidence: 65 },
  { id: 2, teams: "England vs New Zealand", prediction: "England (55% chance)", confidence: 55 },
  { id: 3, teams: "South Africa vs Pakistan", prediction: "South Africa (60% chance)", confidence: 60 },
]

const playerPerformance = [
  { id: 1, name: "Virat Kohli", role: "Batsman", predictedScore: "45-65 runs", form: 85 },
  { id: 2, name: "Jasprit Bumrah", role: "Bowler", predictedWickets: "2-3 wickets", form: 80 },
  { id: 3, name: "Ben Stokes", role: "All-rounder", predictedPerformance: "30-40 runs, 1-2 wickets", form: 75 },
]

const teamInsights = [
  { id: 1, team: "India", strength: "Batting", weakness: "Death bowling", keyPlayer: "Rohit Sharma" },
  { id: 2, team: "Australia", strength: "All-round balance", weakness: "Spin bowling", keyPlayer: "Pat Cummins" },
  { id: 3, team: "England", strength: "Aggressive batting", weakness: "Middle overs bowling", keyPlayer: "Jos Buttler" },
]

const socialFeed = [
  { id: 1, platform: "Twitter", username: "@cricketfan", content: "What an amazing century by Virat Kohli! 🏏💯 #INDvAUS", likes: 1200, retweets: 500 },
  { id: 2, platform: "Instagram", username: "cricket_lover", content: "Match day vibes at the stadium! 🏟️ #CricketFever", likes: 3500, comments: 120 },
  { id: 3, platform: "Twitter", username: "@iccofficial", content: "Congratulations to England on winning the T20 World Cup! 🏆 #T20WorldCup", likes: 10000, retweets: 5000 },
]

const memes = [
  { id: 1, title: "When the umpire gives you out", imageUrl: "/placeholder.svg", likes: 500 },
  { id: 2, title: "That moment when you drop an easy catch", imageUrl: "/placeholder.svg", likes: 750 },
  { id: 3, title: "Trying to explain cricket rules to non-cricket fans", imageUrl: "/placeholder.svg", likes: 1000 },
]

export default function CricketAnalyticsAndSocial() {
  interface Meme {
    id: number;
    title: string;
    imageUrl: string;
    likes: number;
  }
  
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null)

  const { toast } = useToast();

  const handleMemeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Meme submitted!")
  }

  const handleShare = (content: string) => {
    // In a real app, this would open a share dialog
    toast({
      title: "Shared!",
      description: `You &apos; ve shared: "${content}"`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cricket Analytics and Social Hub</h1>

      <Tabs defaultValue="predictions" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="social">Social Feed</TabsTrigger>
          <TabsTrigger value="memes">Memes & Fun</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="w-6 h-6 mr-2" />
                  Match Predictions
                </CardTitle>
                <CardDescription>AI-driven match outcome predictions</CardDescription>
              </CardHeader>
              <CardContent>
                {matchPredictions.map((match) => (
                  <div key={match.id} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{match.teams}</span>
                      <Badge variant="outline">{match.prediction}</Badge>
                    </div>
                    <Progress value={match.confidence} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Radar className="w-6 h-6 mr-2" />
                  Player Performance Analysis
                </CardTitle>
                <CardDescription>Predicted player performances</CardDescription>
              </CardHeader>
              <CardContent>
                {playerPerformance.map((player) => (
                  <div key={player.id} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{player.name}</span>
                      <Badge variant="secondary">{player.role}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Predicted: {player.predictedScore || player.predictedWickets || player.predictedPerformance}
                    </p>
                    <Progress value={player.form} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-6 h-6 mr-2" />
                  Team Strategy Insights
                </CardTitle>
                <CardDescription>Data-driven team analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamInsights.map((team) => (
                    <div key={team.id} className="bg-muted p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">{team.team}</h3>
                      <p><span className="font-medium">Strength:</span> {team.strength}</p>
                      <p><span className="font-medium">Weakness:</span> {team.weakness}</p>
                      <p><span className="font-medium">Key Player:</span> {team.keyPlayer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Live Social Feed</CardTitle>
              <CardDescription>Latest updates from the cricket world</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {socialFeed.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 p-4 border rounded-lg"
                  >
                    <div className="flex items-center mb-2">
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src={`https://i.pravatar.cc/32?u=${post.username}`} />
                        <AvatarFallback>{post.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.username}</p>
                        <p className="text-sm text-muted-foreground">{post.platform}</p>
                      </div>
                    </div>
                    <p className="mb-2">{post.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Badge variant="secondary">{post.likes} likes</Badge>
                        {post.retweets && <Badge variant="secondary">{post.retweets} retweets</Badge>}
                        {post.comments && <Badge variant="secondary">{post.comments} comments</Badge>}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleShare(post.content)}>Share</Button>
                    </div>
                  </motion.div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cricket Memes Gallery</CardTitle>
                <CardDescription>Enjoy the funniest cricket memes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {memes.map((meme) => (
                    <motion.div
                      key={meme.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer"
                      onClick={() => setSelectedMeme(meme)}
                    >
                      <Image
                        src={meme.imageUrl}
                        alt={meme.title}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                      <p className="text-sm mt-2">{meme.title}</p>
                      <p className="text-xs text-muted-foreground">{meme.likes} likes</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submit Your Meme</CardTitle>
                <CardDescription>Share your cricket humor with the community</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMemeSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="meme-title">Meme Title</Label>
                    <Input id="meme-title" placeholder="Enter a catchy title" required />
                  </div>
                  <div>
                    <Label htmlFor="meme-image">Meme Image</Label>
                    <Input id="meme-image" type="file" accept="image/*" required />
                  </div>
                  <div>
                    <Label htmlFor="meme-description">Description (optional)</Label>
                    <Textarea id="meme-description" placeholder="Add a funny description" />
                  </div>
                  <Button type="submit">Submit Meme</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {selectedMeme && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setSelectedMeme(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-card p-4 rounded-lg shadow-lg max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedMeme.imageUrl}
                  alt={selectedMeme.title}
                  width={400}
                  height={400}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{selectedMeme.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedMeme.likes} likes</p>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedMeme(null)}>Close</Button>
                  <Button onClick={() => handleShare(selectedMeme.title)}>Share Meme</Button>
                </div>
              </motion.div>
            </motion.div>
          )}

          <Separator className="my-8" />

          <Card>
            <CardHeader>
              <CardTitle>Cricket Jokes Corner</CardTitle>
              <CardDescription>Laugh out loud with these cricket-themed jokes</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Why don`&apos;`t cricket players ever sweat?</p>
                    <p className="text-muted-foreground">Because they have so many fans!</p>
                  </div>
                  <div>
                    <p className="font-medium">What`&apos;`s a cricket players favorite type of music?</p>
                    <p className="text-muted-foreground">Cricket Rock!</p>
                  </div>
                  <div>
                    <p className="font-medium">Why was the cricket stadium so cool?</p>
                    <p className="text-muted-foreground">Because it was full of fans!</p>
                  </div>
                  <div>
                    <p className="font-medium">What do you call a cricket player with a hearing problem?</p>
                    <p className="text-muted-foreground">Deaf and stumped!</p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Submit a Joke</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}