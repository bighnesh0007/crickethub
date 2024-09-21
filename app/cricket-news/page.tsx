"use client"

import { useState } from "react"
import { motion} from "framer-motion"
import { Bell,  ChevronRight, Menu, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for news, editorials, and interviews
const latestNews = [
  { id: 1, title: "India Wins T20 Series Against Australia", date: "2023-06-15", category: "Match Results" },
  { id: 2, title: "England Announces Squad for Ashes Series", date: "2023-06-14", category: "Team Updates" },
  { id: 3, title: "Virat Kohli Breaks Another Batting Record", date: "2023-06-13", category: "Player Achievements" },
  { id: 4, title: "ICC Introduces New Playing Conditions", date: "2023-06-12", category: "Cricket Rules" },
  { id: 5, title: "Pakistan's Tour of West Indies Confirmed", date: "2023-06-11", category: "Upcoming Series" },
]

const editorials = [
  { id: 1, title: "The Rise of T20 Leagues: Impact on International Cricket", author: "John Smith", date: "2023-06-15" },
  { id: 2, title: "Analyzing India's Bowling Strategy in ODIs", author: "Sarah Johnson", date: "2023-06-14" },
  { id: 3, title: "The Art of Spin Bowling in Test Matches", author: "Michael Lee", date: "2023-06-13" },
]

const interviews = [
  { id: 1, title: "Exclusive: Joe Root on Ashes Preparations", player: "Joe Root", date: "2023-06-15" },
  { id: 2, title: "Rashid Khan Discusses T20 Bowling Techniques", player: "Rashid Khan", date: "2023-06-14" },
  { id: 3, title: "Kane Williamson on New Zealand's World Cup Ambitions", player: "Kane Williamson", date: "2023-06-13" },
]

const topNews = [
  { id: 1, title: "Breaking: IPL 2024 Dates Announced", time: "2 hours ago" },
  { id: 2, title: "Injury Update: Star Player Out of Upcoming Series", time: "5 hours ago" },
  { id: 3, title: "New World Record Set in T20 International", time: "Yesterday" },
]

export default function CricketNewsUpdates() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">CricketHub</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="/news">News</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/editorials">Editorials</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/interviews">Interviews</a>
            </nav>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:text-accent-foreground h-10 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            aria-controls="radix-:R1mcq:"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
                <span className="hidden lg:inline-flex">Search documentation...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>
            <nav className="flex items-center">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Top News</h4>
                      <div className="text-sm">
                        {topNews.map((news) => (
                          <div key={news.id} className="flex items-center py-1">
                            <ChevronRight className="h-3 w-3 mr-2 text-muted-foreground" />
                            <span>{news.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>
      <div className="container py-6 space-y-8">
        <Tabs defaultValue="latest-news">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="latest-news">Latest News</TabsTrigger>
            <TabsTrigger value="editorials">Editorials & Analysis</TabsTrigger>
            <TabsTrigger value="interviews">Player Interviews</TabsTrigger>
          </TabsList>
          <TabsContent value="latest-news" className="space-y-4">
            {latestNews.map((news) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{news.title}</CardTitle>
                    <CardDescription>{news.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge>{news.category}</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Read More</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
          <TabsContent value="editorials" className="space-y-4">
            {editorials.map((editorial) => (
              <motion.div
                key={editorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{editorial.title}</CardTitle>
                    <CardDescription>By {editorial.author} | {editorial.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Read Full Article</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
          <TabsContent value="interviews" className="space-y-4">
            {interviews.map((interview) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{interview.title}</CardTitle>
                    <CardDescription>Interview with {interview.player} | {interview.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${interview.player}`} />
                        <AvatarFallback>{interview.player.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{interview.player}</p>
                        <p className="text-sm text-muted-foreground">International Cricketer</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Read Interview</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}