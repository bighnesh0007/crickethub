"use client"

import { useState,  useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Gift, Plus, Save, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {useToast } from "@/hooks/use-toast"

// Mock data for players, leaderboard, and rewards
const players = [
  { id: 1, name: "Virat Kohli", role: "Batsman", price: 12, points: 350 },
  { id: 2, name: "Jasprit Bumrah", role: "Bowler", price: 11, points: 320 },
  { id: 3, name: "Ben Stokes", role: "All-rounder", price: 10, points: 300 },
  { id: 4, name: "Kane Williamson", role: "Batsman", price: 9, points: 280 },
  { id: 5, name: "Rashid Khan", role: "Bowler", price: 9, points: 270 },
  { id: 6, name: "Jos Buttler", role: "Wicket-keeper", price: 8, points: 260 },
  { id: 7, name: "Babar Azam", role: "Batsman", price: 10, points: 290 },
  { id: 8, name: "Pat Cummins", role: "Bowler", price: 9, points: 275 },
  { id: 9, name: "Shakib Al Hasan", role: "All-rounder", price: 8, points: 265 },
  { id: 10, name: "Quinton de Kock", role: "Wicket-keeper", price: 8, points: 255 },
]

const leaderboard = [
  { rank: 1, name: "FantasyCricketPro", points: 1250 },
  { rank: 2, name: "CricketMaster99", points: 1200 },
  { rank: 3, name: "WicketWizard", points: 1150 },
  { rank: 4, name: "BoundaryBoss", points: 1100 },
  { rank: 5, name: "SpinKing", points: 1050 },
]

const rewards = [
  { rank: 1, prize: "₹100,000 Cash Prize + Signed Cricket Bat" },
  { rank: 2, prize: "₹50,000 Cash Prize + Cricket Jersey" },
  { rank: 3, prize: "₹25,000 Cash Prize + Match Tickets" },
  { rank: 4, prize: "₹10,000 Cash Prize" },
  { rank: 5, prize: "₹5,000 Cash Prize" },
]

export default function CricketFantasyLeague() {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])
  const [budget, setBudget] = useState(100)
  const { toast } = useToast()

  interface Player {
    id: number;
    name: string;
    role: string;
    price: number;
    points: number;
  }

  const addPlayer = (player: Player) => {
    if (selectedPlayers.length < 11 && budget >= player.price) {
      setSelectedPlayers([...selectedPlayers, player])
      setBudget(budget - player.price)
      toast({
        title: "Player Added",
        description: `${player.name} has been added to your team.`,
      })
    } else {
      toast({
        title: "Cannot Add Player",
        description: "You've reached the maximum team size or exceeded your budget.",
        variant: "destructive",
      })
    }
  }

  const removePlayer = (player: Player) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id))
    setBudget(budget + player.price)
    toast({
      title: "Player Removed",
      description: `${player.name} has been removed from your team.`,
    })
  }

  const teamBuilderRef = useRef(null)
  const leaderboardRef = useRef(null)
  const rewardsRef = useRef(null)

  const { scrollYProgress: scrollYTeamBuilder } = useScroll({
    target: teamBuilderRef,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: scrollYLeaderboard } = useScroll({
    target: leaderboardRef,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: scrollYRewards } = useScroll({
    target: rewardsRef,
    offset: ["start end", "end start"],
  })

  const opacityTeamBuilder = useTransform(scrollYTeamBuilder, [0, 0.5, 1], [0.5, 1, 0.5])
  const scaleTeamBuilder = useTransform(scrollYTeamBuilder, [0, 0.5, 1], [0.8, 1, 0.8])

  const opacityLeaderboard = useTransform(scrollYLeaderboard, [0, 0.5, 1], [0.5, 1, 0.5])
  const scaleLeaderboard = useTransform(scrollYLeaderboard, [0, 0.5, 1], [0.8, 1, 0.8])

  const opacityRewards = useTransform(scrollYRewards, [0, 0.5, 1], [0.5, 1, 0.5])
  const scaleRewards = useTransform(scrollYRewards, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div className="container mx-auto p-4 space-y-16">
      <motion.div
        ref={teamBuilderRef}
        style={{ opacity: opacityTeamBuilder, scale: scaleTeamBuilder }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Fantasy Team Builder</CardTitle>
            <CardDescription>Create your dream cricket team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">Available Players</h3>
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {players.map((player) => (
                        <TableRow key={player.id}>
                          <TableCell>{player.name}</TableCell>
                          <TableCell>{player.role}</TableCell>
                          <TableCell>₹{player.price}M</TableCell>
                          <TableCell>{player.points}</TableCell>
                          <TableCell>
                            <Button size="sm" onClick={() => addPlayer(player)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">Your Team</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Budget Remaining: ₹{budget}M</span>
                    <span>Players: {selectedPlayers.length}/11</span>
                  </div>
                  <Progress value={(budget / 100) * 100} />
                  <ScrollArea className="h-[300px]">
                    {selectedPlayers.map((player) => (
                      <div key={player.id} className="flex justify-between items-center py-2">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/40?u=${player.id}`} />
                            <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-muted-foreground">{player.role}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removePlayer(player)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Team
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        ref={leaderboardRef}
        style={{ opacity: opacityLeaderboard, scale: scaleLeaderboard }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Top performing fantasy teams</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((team) => (
                  <TableRow key={team.rank}>
                    <TableCell>
                      <Badge variant={team.rank <= 3 ? "default" : "secondary"}>
                        {team.rank}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Trophy className="w-4 h-4 mr-2" />
              View Full Leaderboard
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        ref={rewardsRef}
        style={{ opacity: opacityRewards, scale: scaleRewards }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Prizes and Rewards</CardTitle>
            <CardDescription>What you can win in our fantasy league</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Prize</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rewards.map((reward, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant={index < 3 ? "default" : "secondary"}>
                        {reward.rank}
                      </Badge>
                    </TableCell>
                    <TableCell>{reward.prize}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Gift className="w-4 h-4 mr-2" />
              View All Rewards
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}