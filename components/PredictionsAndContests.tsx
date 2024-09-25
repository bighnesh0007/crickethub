'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Trophy, Clock, Share2, MessageSquare, Bell } from "lucide-react"

interface Prediction {
  id: number
  match: string
  prediction: string
  result: string
  date: string
}

interface Contest {
  id: number
  title: string
  description: string
  endDate: string
  prize: string
}

export default function PredictionsAndContests() {
  const [predictionTeam, setPredictionTeam] = useState("")
  const [predictionHistory, setPredictionHistory] = useState<Prediction[]>([])
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([])
  const [contests, setContests] = useState<Contest[]>([])
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null)
  const [storyContent, setStoryContent] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [countdown, setCountdown] = useState(3600) // 1 hour in seconds
  const [userPoints, setUserPoints] = useState(0)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    // Simulating data fetching
    setPredictionHistory([
      { id: 1, match: "India vs Australia", prediction: "India", result: "Correct", date: "2023-07-10" },
      { id: 2, match: "England vs New Zealand", prediction: "England", result: "Incorrect", date: "2023-07-15" },
    ])
    setLeaderboard([
      { name: "John Doe", score: 150 },
      { name: "Jane Smith", score: 120 },
      { name: "Bob Johnson", score: 100 },
    ])
    setContests([
      { id: 1, title: "Best Cricket Story", description: "Share your most memorable cricket experience", endDate: "2023-08-01", prize: "Signed bat" },
      { id: 2, title: "Cricket Fan Art", description: "Show off your artistic skills with cricket-themed artwork", endDate: "2023-08-15", prize: "VIP match tickets" },
    ])
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handlePrediction = () => {
    if (predictionTeam) {
      toast({
        title: "Prediction Submitted",
        description: `You've predicted ${predictionTeam} to win. Good luck!`,
      })
      setUserPoints((prevPoints) => prevPoints + 10)
    } else {
      toast({
        title: "Prediction Error",
        description: "Please select a team before submitting your prediction.",
        variant: "destructive",
      })
    }
  }

  const handleStorySubmission = () => {
    if (storyContent) {
      toast({
        title: "Story Submitted",
        description: "Your cricket story has been submitted successfully!",
      })
      setStoryContent("")
      setUserPoints((prevPoints) => prevPoints + 50)
    } else {
      toast({
        title: "Submission Error",
        description: "Please write your story before submitting.",
        variant: "destructive",
      })
    }
  }

  const handleArtworkSubmission = () => {
    if (selectedImage) {
      toast({
        title: "Artwork Submitted",
        description: "Your cricket fan art has been uploaded successfully!",
      })
      setSelectedImage(null)
      setUserPoints((prevPoints) => prevPoints + 50)
    } else {
      toast({
        title: "Submission Error",
        description: "Please select an image before uploading.",
        variant: "destructive",
      })
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Match Predictions and Contests</CardTitle>
          <CardDescription>Test your cricket knowledge and win prizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Tabs defaultValue="predictions">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="contests">Contests</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            <TabsContent value="predictions">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Match Prediction</CardTitle>
                  <CardDescription>Predict the winning team for the upcoming match</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Time left to predict: {formatTime(countdown)}</span>
                  </div>
                  <Select onValueChange={setPredictionTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select winning team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="England">England</SelectItem>
                      <SelectItem value="New Zealand">New Zealand</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handlePrediction}>Submit Prediction</Button>
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Prediction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Match</TableHead>
                          <TableHead>Prediction</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {predictionHistory.map((prediction) => (
                          <TableRow key={prediction.id}>
                            <TableCell>{prediction.match}</TableCell>
                            <TableCell>{prediction.prediction}</TableCell>
                            <TableCell>
                              <Badge variant={prediction.result === "Correct" ? "default" : "destructive"}>
                                {prediction.result}
                              </Badge>
                            </TableCell>
                            <TableCell>{prediction.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="contests">
              <div className="space-y-4">
                {contests.map((contest) => (
                  <Card key={contest.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{contest.title}</CardTitle>
                      <CardDescription>{contest.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>Ends on: {contest.endDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-4 w-4" />
                          <span>Prize: {contest.prize}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => setSelectedContest(contest)}>Participate</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="leaderboard">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prediction Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaderboard.map((user, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{user.name}</span>
                            </TableCell>
                            <TableCell>{user.score}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Predictions Submitted</span>
                <Badge>{predictionHistory.length}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Reward Points</span>
                  <span>{userPoints}</span>
                </div>
                <Progress value={(userPoints / 1000) * 100} />
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible>
            <AccordionItem value="rules">
              <AccordionTrigger>Contest Rules and Guidelines</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>All predictions must be submitted before the match starts.</li>
                  <li>Each correct prediction earns you 10 points.</li>
                  <li>Contest submissions are limited to one per user.</li>
                  <li>Artwork submissions must be original and cricket-themed.</li>
                  <li>The decision of the judges for contests is final.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex items-center space-x-2">
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
            <Label htmlFor="notifications">Enable notifications for upcoming matches and contests</Label>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Dialog open={!!selectedContest} onOpenChange={() => setSelectedContest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedContest?.title}</DialogTitle>
            <DialogDescription>{selectedContest?.description}</DialogDescription>
          </DialogHeader>
          {selectedContest?.title === "Best Cricket Story" && (
            <div className="space-y-4">
              <Textarea
                placeholder="Type your cricket story here..."
                value={storyContent}
                onChange={(e) => setStoryContent(e.target.value)}
              />
              <Button onClick={handleStorySubmission}>Submit Story</Button>
            </div>
          )}
          {selectedContest?.title === "Cricket Fan Art" && (
            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              />
              {selectedImage && (
                <div className="relative aspect-video">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected artwork"
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <Button onClick={handleArtworkSubmission}>Upload Artwork</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <motion.div
        className="fixed bottom-4 right-4 space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button size="icon" variant="outline">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline">
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline">
          <Bell className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}