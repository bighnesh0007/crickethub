"use client"

import { useState } from "react"
import { Bell, Play, Plus, ShoppingBag, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

// Mock data
const coachingVideos = [
  { id: 1, title: "Mastering the Cover Drive", coach: "Virat Kohli", duration: "15:30" },
  { id: 2, title: "Spin Bowling Techniques", coach: "Shane Warne", duration: "20:45" },
  { id: 3, title: "Fielding Drills for Agility", coach: "Jonty Rhodes", duration: "18:20" },
]

const expertAdvice = [
  { id: 1, expert: "Ricky Ponting", advice: "The key to consistent batting is maintaining a still head and watching the ball closely." },
  { id: 2, expert: "Dale Steyn", advice: "For fast bowlers, it's crucial to focus on rhythm and consistency rather than just raw pace." },
  { id: 3, expert: "MS Dhoni", advice: "As a wicketkeeper, always anticipate the ball and stay light on your feet for quick movements." },
]

const merchandise = [
  { id: 1, name: "Official Team Jersey", price: 79.99, image: "/placeholder.svg" },
  { id: 2, name: "Professional Cricket Bat", price: 199.99, image: "/placeholder.svg" },
  { id: 3, name: "Cricket Gloves", price: 49.99, image: "/placeholder.svg" },
]

const upcomingMatches = [
  { id: 1, teams: "India vs Australia", date: "2023-07-15", venue: "Melbourne Cricket Ground" },
  { id: 2, teams: "England vs New Zealand", date: "2023-07-20", venue: "Lord's Cricket Ground" },
  { id: 3, teams: "South Africa vs Pakistan", date: "2023-07-25", venue: "Newlands Cricket Ground" },
]

export default function CricketWebsite() {
  const [selectedSkill, setSelectedSkill] = useState("batting")
  const [skillLevel, setSkillLevel] = useState(50)
  const [notifications, setNotifications] = useState(true)
  const [predictionTeam, setPredictionTeam] = useState("")

  const handleCoachingPlanGeneration = () => {
    toast({
      title: "Coaching Plan Generated",
      description: `A personalized ${selectedSkill} plan for skill level ${skillLevel} has been created.`,
    })
  }

  const handlePurchase = (item: { id: number; name: string; price: number; image: string }) => {
    toast({
      title: "Item Added to Cart",
      description: `${item.name} has been added to your shopping cart.`,
    })
  }

  const handlePrediction = () => {
    if (predictionTeam) {
      toast({
        title: "Prediction Submitted",
        description: `You've predicted ${predictionTeam} to win. Good luck!`,
      })
    } else {
      toast({
        title: "Prediction Error",
        description: "Please select a team before submitting your prediction.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">CricketHub</h1>
        <nav className="flex space-x-4">
          <Button variant="ghost"><User className="mr-2 h-4 w-4" /> Profile</Button>
          <Button variant="ghost"><Bell className="mr-2 h-4 w-4" /> Notifications</Button>
          <Button variant="ghost"><ShoppingBag className="mr-2 h-4 w-4" /> Cart</Button>
        </nav>
      </header>

      <Tabs defaultValue="training">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="training">Training & Coaching</TabsTrigger>
          <TabsTrigger value="profile">User Profile</TabsTrigger>
          <TabsTrigger value="store">Merchandise Store</TabsTrigger>
          <TabsTrigger value="predictions">Predictions & Contests</TabsTrigger>
        </TabsList>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Cricket Training and Coaching</CardTitle>
              <CardDescription>Improve your cricket skills with expert guidance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Coaching Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coachingVideos.map((video) => (
                    <Card key={video.id}>
                      <CardHeader>
                        <CardTitle className="text-base">{video.title}</CardTitle>
                        <CardDescription>Coach: {video.coach}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          <Play className="h-12 w-12 text-muted-foreground" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Badge variant="secondary">{video.duration}</Badge>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Interactive Coaching Plan</h3>
                <div className="space-y-4">
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
                  <Button onClick={handleCoachingPlanGeneration}>Generate Coaching Plan</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Expert Coaching Advice</h3>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  {expertAdvice.map((advice) => (
                    <div key={advice.id} className="mb-4">
                      <p className="font-semibold">{advice.expert}</p>
                      <p className="text-sm text-muted-foreground">{advice.advice}</p>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your preferences and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">User Name</h3>
                  <p className="text-sm text-muted-foreground">Cricket Enthusiast</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-md font-semibold">Favorite Teams</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>India</Badge>
                  <Badge>Australia</Badge>
                  <Badge>England</Badge>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Team
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-md font-semibold">Notification Preferences</h4>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                  <Label htmlFor="notifications">Receive match notifications</Label>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold mb-2">Upcoming Matches</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teams</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Venue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingMatches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>{match.teams}</TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>{match.venue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Cricket Merchandise Store</CardTitle>
              <CardDescription>Official gear and fan accessories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {merchandise.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="font-bold">${item.price.toFixed(2)}</span>
                      <Button onClick={() => handlePurchase(item)}>Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingBag className="mr-2 h-4 w-4" /> View All Products
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>Match Predictions and Contests</CardTitle>
              <CardDescription>Test your cricket knowledge and win prizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Match Prediction</h3>
                <div className="space-y-4">
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
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Current Contests</h3>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Best Cricket Story Contest</CardTitle>
                      <CardDescription>Share your most memorable cricket experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea placeholder="Type your cricket story here..." />
                    </CardContent>
                    <CardFooter>
                      <Button>Submit Story</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cricket Fan Art Competition</CardTitle>
                      <CardDescription>Show off your artistic skills with cricket-themed artwork</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Input type="file" accept="image/*" />
                    </CardContent>
                    <CardFooter>
                      <Button>Upload Artwork</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}