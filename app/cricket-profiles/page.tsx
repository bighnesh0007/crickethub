"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {  Calendar, Flag, Globe,  Shield, Star, Trophy, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

// Mock data for players and teams
const players = [
  {
    id: 1,
    name: "Virat Kohli",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    dateOfBirth: "November 5, 1988",
    stats: {
      matches: 254,
      runs: 12169,
      average: 59.07,
      strikeRate: 93.17,
      centuries: 43,
      fifties: 58,
      highestScore: 183,
    },
    achievements: [
      "ICC ODI Player of the Year (2012, 2017, 2018)",
      "Wisden Leading Cricketer in the World (2016, 2017, 2018)",
      "Padma Shri (2017)",
    ],
  },
  {
    id: 2,
    name: "Steve Smith",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm leg break",
    dateOfBirth: "June 2, 1989",
    stats: {
      matches: 128,
      runs: 7540,
      average: 43.61,
      strikeRate: 87.55,
      centuries: 12,
      fifties: 29,
      highestScore: 164,
    },
    achievements: [
      "ICC Test Player of the Year (2015, 2017)",
      "Allan Border Medal (2015, 2018)",
      "Compton–Miller Medal (2017–18)",
    ],
  },
  {
    id: 3,
    name: "Kane Williamson",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm off break",
    dateOfBirth: "August 8, 1990",
    stats: {
      matches: 151,
      runs: 6173,
      average: 47.83,
      strikeRate: 80.88,
      centuries: 13,
      fifties: 39,
      highestScore: 148,
    },
    achievements: [
      "ICC Test Player of the Year (2015)",
      "Wisden Cricketer of the Year (2016)",
      "New Zealand Player of the Year (2015, 2016)",
    ],
  },
  {
    id: 4,
    name: "Joe Root",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm off break",
    dateOfBirth: "December 30, 1990",
    stats: {
      matches: 158,
      runs: 6207,
      average: 51.33,
      strikeRate: 87.25,
      centuries: 16,
      fifties: 36,
      highestScore: 180,
    },
    achievements: [
      "ICC Test Player of the Year (2021)",
      "Wisden Cricketer of the Year (2014)",
      "ODI Team of the Year (2016, 2018)",
    ],
  },
  {
    id: 5,
    name: "Babar Azam",
    country: "Pakistan",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm off break",
    dateOfBirth: "October 15, 1994",
    stats: {
      matches: 83,
      runs: 3985,
      average: 56.93,
      strikeRate: 88.70,
      centuries: 14,
      fifties: 17,
      highestScore: 158,
    },
    achievements: [
      "ICC ODI Cricketer of the Year (2021)",
      "Pakistan Captain (2020-present)",
      "Fastest to 1000 T20I Runs",
    ],
  },
  {
    id: 6,
    name: "Rohit Sharma",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm off break",
    dateOfBirth: "April 30, 1987",
    stats: {
      matches: 233,
      runs: 9205,
      average: 48.96,
      strikeRate: 88.90,
      centuries: 29,
      fifties: 43,
      highestScore: 264,
    },
    achievements: [
      "ICC ODI Cricketer of the Year (2019)",
      "Fastest to 4000 T20I Runs",
      "Four IPL Titles as Captain (Mumbai Indians)",
    ],
  },
  {
    id: 7,
    name: "David Warner",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-handed",
    bowlingStyle: "Right-arm leg break",
    dateOfBirth: "October 27, 1986",
    stats: {
      matches: 128,
      runs: 5455,
      average: 45.31,
      strikeRate: 95.88,
      centuries: 18,
      fifties: 24,
      highestScore: 179,
    },
    achievements: [
      "Allan Border Medal (2017, 2020)",
      "ICC Test Player of the Year (2016)",
      "Wisden Leading Cricketer (2016)",
    ],
  },
  {
    id: 8,
    name: "Jasprit Bumrah",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    dateOfBirth: "December 6, 1993",
    stats: {
      matches: 70,
      wickets: 126,
      bowlingAverage: 24.43,
      economyRate: 4.66,
      fiveWicketHauls: 3,
      bestBowlingFigures: "5/27",
    },
    achievements: [
      "ICC ODI Player of the Year (2020)",
      "Fastest Indian to 100 ODI Wickets",
      "Wisden Cricketer of the Year (2022)",
    ],
  },
  {
    id: 9,
    name: "Ben Stokes",
    country: "England",
    role: "All-rounder",
    battingStyle: "Left-handed",
    bowlingStyle: "Right-arm fast-medium",
    dateOfBirth: "June 4, 1991",
    stats: {
      matches: 101,
      runs: 4500,
      wickets: 84,
      bowlingAverage: 31.50,
      centuries: 10,
      fifties: 25,
      highestScore: 182,
    },
    achievements: [
      "ICC Player of the Year (2019)",
      "BBC Sports Personality of the Year (2019)",
      "Wisden Cricketer of the Year (2016)",
    ],
  },
  {
    id: 10,
    name: "Pat Cummins",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    dateOfBirth: "May 8, 1993",
    stats: {
      matches: 69,
      wickets: 127,
      bowlingAverage: 23.34,
      economyRate: 4.63,
      fiveWicketHauls: 2,
      bestBowlingFigures: "5/70",
    },
    achievements: [
      "ICC Test Cricketer of the Year (2019)",
      "Allan Border Medal (2020)",
      "Wisden Cricketer of the Year (2020)",
    ],
  },
  {
    id: 11,
    name: "Rashid Khan",
    country: "Afghanistan",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm leg break",
    dateOfBirth: "September 20, 1998",
    stats: {
      matches: 74,
      wickets: 140,
      bowlingAverage: 18.57,
      economyRate: 4.15,
      fiveWicketHauls: 4,
      bestBowlingFigures: "7/18",
    },
    achievements: [
      "ICC T20 Player of the Year (2017, 2018)",
      "Fastest to 100 ODI Wickets",
      "Afghanistan Captain (2021)",
    ],
  },
  {
    id: 12,
    name: "Quinton de Kock",
    country: "South Africa",
    role: "Wicketkeeper-Batsman",
    battingStyle: "Left-handed",
    bowlingStyle: "Right-arm off break",
    dateOfBirth: "December 17, 1992",
    stats: {
      matches: 125,
      runs: 5355,
      average: 45.58,
      strikeRate: 94.12,
      centuries: 15,
      fifties: 27,
      highestScore: 178,
    },
    achievements: [
      "ICC ODI Cricketer of the Year (2016)",
      "South Africa Player of the Year (2017, 2019)",
    ],
  },
  {
    id: 13,
    name: "Shaheen Afridi",
    country: "Pakistan",
    role: "Bowler",
    battingStyle: "Left-handed",
    bowlingStyle: "Left-arm fast",
    dateOfBirth: "April 6, 2000",
    stats: {
      matches: 32,
      wickets: 62,
      bowlingAverage: 22.88,
      economyRate: 5.18,
      fiveWicketHauls: 2,
      bestBowlingFigures: "6/35",
    },
    achievements: [
      "ICC Cricketer of the Year (2021)",
      "Pakistan Super League Best Bowler (2020)",
    ],
  },
  {
    id: 14,
    name: "Shakib Al Hasan",
    country: "Bangladesh",
    role: "All-rounder",
    battingStyle: "Left-handed",
    bowlingStyle: "Slow left-arm orthodox",
    dateOfBirth: "March 24, 1987",
    stats: {
      matches: 221,
      runs: 6764,
      wickets: 277,
      battingAverage: 37.86,
      bowlingAverage: 29.89,
    },
    achievements: [
      "ICC Player of the Year (2009)",
      "ICC ODI Player of the Year (2019)",
      "Wisden Cricketer of the Year (2021)",
    ],
  },
  {
    id: 15,
    name: "Trent Boult",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Left-arm fast",
    dateOfBirth: "July 22, 1989",
    stats: {
      matches: 93,
      wickets: 169,
      bowlingAverage: 24.99,
      economyRate: 5.07,
      fiveWicketHauls: 5,
      bestBowlingFigures: "7/34",
    },
    achievements: [
      "ICC ODI Bowler of the Year (2015)",
      "Fastest to 100 ODI Wickets (2016)",
      "Wisden Cricketer of the Year (2021)",
    ],
  },
  {
    id: 16,
    name: "Andre Russell",
    country: "West Indies",
    role: "All-rounder",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    dateOfBirth: "April 29, 1988",
    stats: {
      matches: 56,
      runs: 1034,
      wickets: 70,
      battingAverage: 27.21,
      bowlingAverage: 32.50,
      highestScore: 92,
    },
    achievements: [
      "ICC T20 Player of the Year (2019)",
      "West Indies Player of the Year (2018)",
    ],
  },
];

const teams = [
  {
    id: 1,
    name: "India",
    flag: "🇮🇳",
    ranking: {
      test: 1,
      odi: 2,
      t20: 1,
    },
    recentForm: ["W", "W", "L", "W", "W"],
    keyPlayers: ["Virat Kohli", "Rohit Sharma", "Jasprit Bumrah"],
    achievements: [
      "ICC Cricket World Cup winners (1983, 2011)",
      "ICC Champions Trophy winners (2013)",
      "ICC T20 World Cup winners (2007)",
    ],
  },
  {
    id: 2,
    name: "Australia",
    flag: "🇦🇺",
    ranking: {
      test: 2,
      odi: 1,
      t20: 3,
    },
    recentForm: ["W", "W", "W", "L", "W"],
    keyPlayers: ["Steve Smith", "Pat Cummins", "David Warner"],
    achievements: [
      "ICC Cricket World Cup winners (1987, 1999, 2003, 2007, 2015)",
      "ICC Champions Trophy winners (2006, 2009)",
      "ICC T20 World Cup winners (2021)",
    ],
  },
  {
    id: 3,
    name: "England",
    flag: "🏴",
    ranking: {
      test: 4,
      odi: 3,
      t20: 2,
    },
    recentForm: ["L", "W", "L", "W", "W"],
    keyPlayers: ["Joe Root", "Ben Stokes", "Jofra Archer"],
    achievements: [
      "ICC Cricket World Cup winners (2019)",
      "ICC T20 World Cup winners (2010, 2022)",
    ],
  },
  {
    id: 4,
    name: "New Zealand",
    flag: "🇳🇿",
    ranking: {
      test: 3,
      odi: 5,
      t20: 4,
    },
    recentForm: ["L", "L", "W", "W", "L"],
    keyPlayers: ["Kane Williamson", "Trent Boult", "Ross Taylor"],
    achievements: [
      "ICC Test Championship winners (2021)",
      "ICC Cricket World Cup runners-up (2015, 2019)",
    ],
  },
  {
    id: 5,
    name: "South Africa",
    flag: "🇿🇦",
    ranking: {
      test: 5,
      odi: 6,
      t20: 5,
    },
    recentForm: ["W", "L", "W", "L", "W"],
    keyPlayers: ["Quinton de Kock", "Kagiso Rabada", "Anrich Nortje"],
    achievements: [
      "ICC Champions Trophy winners (1998)",
    ],
  },
  {
    id: 6,
    name: "Pakistan",
    flag: "🇵🇰",
    ranking: {
      test: 6,
      odi: 4,
      t20: 6,
    },
    recentForm: ["L", "W", "W", "L", "L"],
    keyPlayers: ["Babar Azam", "Shaheen Afridi", "Mohammad Rizwan"],
    achievements: [
      "ICC Cricket World Cup winners (1992)",
      "ICC Champions Trophy winners (2017)",
      "ICC T20 World Cup winners (2009)",
    ],
  },
  {
    id: 7,
    name: "Sri Lanka",
    flag: "🇱🇰",
    ranking: {
      test: 8,
      odi: 7,
      t20: 8,
    },
    recentForm: ["W", "L", "L", "W", "W"],
    keyPlayers: ["Dimuth Karunaratne", "Wanindu Hasaranga", "Angelo Mathews"],
    achievements: [
      "ICC Cricket World Cup winners (1996)",
      "ICC T20 World Cup winners (2014)",
    ],
  },
  {
    id: 8,
    name: "West Indies",
    flag: "🇱🇨",
    ranking: {
      test: 7,
      odi: 8,
      t20: 7,
    },
    recentForm: ["L", "L", "W", "W", "L"],
    keyPlayers: ["Kieron Pollard", "Jason Holder", "Andre Russell"],
    achievements: [
      "ICC Cricket World Cup winners (1975, 1979)",
      "ICC T20 World Cup winners (2012, 2016)",
    ],
  },
  {
    id: 9,
    name: "Bangladesh",
    flag: "🇧🇩",
    ranking: {
      test: 9,
      odi: 9,
      t20: 9,
    },
    recentForm: ["W", "L", "L", "W", "L"],
    keyPlayers: ["Shakib Al Hasan", "Tamim Iqbal", "Mustafizur Rahman"],
    achievements: [
      "ICC Champions Trophy semi-finalists (2017)",
    ],
  },
  {
    id: 10,
    name: "Afghanistan",
    flag: "🇦🇫",
    ranking: {
      test: 10,
      odi: 10,
      t20: 10,
    },
    recentForm: ["W", "L", "W", "L", "W"],
    keyPlayers: ["Rashid Khan", "Mohammad Nabi", "Mujeeb Ur Rahman"],
    achievements: [
      "ICC Cricket World Cup qualification (2015, 2019)",
      "ICC T20 World Cup semi-finalists (2016)",
    ],
  },
];


export default function CricketProfiles() {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0])
  const [selectedTeam, setSelectedTeam] = useState(teams[0])

  return (
    <div className="container mx-auto p-4 space-y-8 no-scrollbar overflow-scroll">
      <Tabs defaultValue="players" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="players">Player Profiles</TabsTrigger>
          <TabsTrigger value="teams">Team Profiles</TabsTrigger>
        </TabsList>
        <TabsContent value="players" className="space-y-4">
          <div className="flex space-x-4 overflow-x-auto py-4 no-scrollbar overflow-scroll">
            {players.map((player) => (
              <motion.div
                key={player.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPlayer(player)}
              >
                <Avatar className="w-20 h-20 cursor-pointer">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${player.id}`} alt={player.name} />
                  <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </motion.div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPlayer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${selectedPlayer.id}`} alt={selectedPlayer.name} />
                      <AvatarFallback>{selectedPlayer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedPlayer.name}</CardTitle>
                      <CardDescription>{selectedPlayer.country}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{selectedPlayer.role}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedPlayer.dateOfBirth}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>{selectedPlayer.battingStyle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>{selectedPlayer.bowlingStyle}</span>
                      </div>
                    </div>
                  </div>
                  <Accordion type="single" collapsible className="w-full mt-4">
                    <AccordionItem value="stats">
                      <AccordionTrigger>Career Statistics</AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableBody>
                            {Object.entries(selectedPlayer.stats).map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                                <TableCell>{value}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="achievements">
                      <AccordionTrigger>Achievements</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside space-y-2">
                          {selectedPlayer.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Star className="w-4 h-4 mr-2" />
                    Add to Favorites
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
        <TabsContent value="teams" className="space-y-4">
          <div className="flex space-x-4 overflow-x-auto py-4">
            {teams.map((team) => (
              <motion.div
                key={team.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTeam(team)}
              >
                <Avatar className="w-20 h-20 cursor-pointer">
                  <AvatarImage src={`https://flagcdn.com/w160/${team.name.toLowerCase()}.png`} alt={team.name} />
                  <AvatarFallback>{team.flag}</AvatarFallback>
                </Avatar>
              </motion.div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTeam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={`https://flagcdn.com/w160/${selectedTeam.name.toLowerCase()}.png`} alt={selectedTeam.name} />
                      <AvatarFallback>{selectedTeam.flag}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedTeam.name}</CardTitle>
                      <CardDescription>National Cricket Team</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Current Rankings</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(selectedTeam.ranking).map(([format, rank]) => (
                          <HoverCard key={format}>
                            <HoverCardTrigger asChild>
                              <Button variant="outline" className="w-full">
                                {format.toUpperCase()}: {rank}
                              </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <div className="flex justify-between space-x-4">
                                <div className="space-y-1">
                                  <h4 className="text-sm font-semibold">{format.toUpperCase()} Ranking</h4>
                                  <p className="text-sm">
                                    Current world ranking in {format.toUpperCase()} cricket format.
                                  </p>
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Recent Form</h4>
                      <div className="flex space-x-2">
                        {selectedTeam.recentForm.map((result, index) => (
                          <Badge
                            key={index}
                            variant={result === 'W' ? 'default' : 'destructive'}
                          >
                            {result}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Players</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTeam.keyPlayers.map((player, index) => (
                          <Badge key={index} variant="outline">
                            {player}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="achievements">
                        <AccordionTrigger>Major Achievements</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside space-y-2">
                            {selectedTeam.achievements.map((achievement, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Trophy className="w-4 h-4" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Flag className="w-4 h-4 mr-2" />
                    Follow Team
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  )
}