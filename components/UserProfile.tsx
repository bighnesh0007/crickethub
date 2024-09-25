'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Edit, Sun, Moon, Share2, Trophy, Eye, Calendar, Globe, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

interface UpcomingMatch {
  id: number
  teams: string
  date: string
  venue: string
}

interface UserProfileProps {
  upcomingMatches: UpcomingMatch[]
}

export default function UserProfile({ upcomingMatches }: UserProfileProps) {
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>(["India", "Australia", "England"])
  const [newTeam, setNewTeam] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [userName, setUserName] = useState("Cricket Enthusiast")
  const [favoritePlayers, setFavoritePlayers] = useState<string[]>(["Virat Kohli", "Steve Smith"])
  const [newPlayer, setNewPlayer] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [matchPreference, setMatchPreference] = useState<string[]>(["ODI", "T20"])
  const [userComment, setUserComment] = useState("")

  const handleAddFavoriteTeam = () => {
    if (newTeam && !favoriteTeams.includes(newTeam)) {
      setFavoriteTeams(prevTeams => [...prevTeams, newTeam])
      setNewTeam("")
      toast({
        title: "Team Added",
        description: `${newTeam} has been added to your favorite teams.`,
      })
    }
  }

  const handleRemoveFavoriteTeam = (team: string) => {
    setFavoriteTeams(prevTeams => prevTeams.filter(t => t !== team))
    toast({
      title: "Team Removed",
      description: `${team} has been removed from your favorite teams.`,
    })
  }

  const handleAddFavoritePlayer = () => {
    if (newPlayer && !favoritePlayers.includes(newPlayer)) {
      setFavoritePlayers(prevPlayers => [...prevPlayers, newPlayer])
      setNewPlayer("")
      toast({
        title: "Player Added",
        description: `${newPlayer} has been added to your favorite players.`,
      })
    }
  }

  const handleRemoveFavoritePlayer = (player: string) => {
    setFavoritePlayers(prevPlayers => prevPlayers.filter(p => p !== player))
    toast({
      title: "Player Removed",
      description: `${player} has been removed from your favorite players.`,
    })
  }

  const handleSetReminder = (match: UpcomingMatch) => {
    toast({
      title: "Reminder Set",
      description: `You'll be notified before the ${match.teams} match.`,
    })
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, you'd apply the theme change here
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    // In a real app, you'd apply the language change here
  }

  const handleMatchPreferenceChange = (value: string) => {
    setMatchPreference(prev => 
      prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
    )
  }

  const handleCommentSubmit = () => {
    if (userComment) {
      toast({
        title: "Comment Submitted",
        description: "Your comment has been posted successfully.",
      })
      setUserComment("")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">User Profile</CardTitle>
        <CardDescription>Manage your preferences and notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg" alt="User Avatar" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{userName}</h3>
            <p className="text-sm text-muted-foreground">Cricket Enthusiast</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" /> Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Update your profile information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar</Label>
                  <Input id="avatar" type="file" />
                </div>
              </div>
              <Button onClick={() => toast({ title: "Profile Updated" })}>Save Changes</Button>
            </DialogContent>
          </Dialog>
        </motion.div>

        <Tabs defaultValue="teams">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <AnimatePresence>
                    {favoriteTeams.map((team, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Badge className="flex items-center space-x-1">
                          <span>{team}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0" 
                            onClick={() => handleRemoveFavoriteTeam(team)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    value={newTeam}
                    onChange={(e) => setNewTeam(e.target.value)}
                    placeholder="New team"
                    className="w-full"
                  />
                  <Button onClick={handleAddFavoriteTeam}>
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Players</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <AnimatePresence>
                    {favoritePlayers.map((player, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Badge className="flex items-center space-x-1">
                          <span>{player}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0" 
                            onClick={() => handleRemoveFavoritePlayer(player)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    value={newPlayer}
                    onChange={(e) => setNewPlayer(e.target.value)}
                    placeholder="New player"
                    className="w-full"
                  />
                  <Button onClick={handleAddFavoritePlayer}>
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Teams</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingMatches.map((match) => (
                        <TableRow key={match.id}>
                          <TableCell>{match.teams}</TableCell>
                          <TableCell>{match.date}</TableCell>
                          <TableCell>{match.venue}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleSetReminder(match)}>
                              <Calendar className="h-4 w-4 mr-2" /> Set Reminder
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>User Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive match notifications</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">Toggle dark mode</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleThemeToggle}>
                    {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    {isDarkMode ? "Light" : "Dark"}
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Match Preferences</Label>
                  <div className="flex space-x-2">
                    {["Test", "ODI", "T20"].map((type) => (
                      <Button
                        key={type}
                        variant={matchPreference.includes(type) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleMatchPreferenceChange(type)}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>User Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Matches Viewed</span>
              <Badge variant="secondary"><Eye className="h-4 w-4 mr-1" />42</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Profile Completion</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Sharing</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Share2 className="h-4 w-4 mr-2" /> Share Your Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Badge variant="secondary"><Trophy className="h-4 w-4 mr-1" /> Super Fan</Badge>
              <Badge variant="secondary"><Globe className="h-4 w-4 mr-1" /> Globe Trotter</Badge>
              <Badge variant="secondary"><Eye className="h-4 w-4 mr-1" /> Match Expert</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Comments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share your thoughts on recent matches..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
            <Button onClick={handleCommentSubmit}>
              <MessageSquare className="h-4 w-4 mr-2" /> Post Comment
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}