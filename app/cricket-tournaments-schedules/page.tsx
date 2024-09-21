"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for schedules, tournaments, and teams
const upcomingMatches = [
  { id: 1, date: "2023-07-01", teams: ["India", "Australia"], venue: "Melbourne Cricket Ground", format: "Test" },
  { id: 2, date: "2023-07-05", teams: ["England", "New Zealand"], venue: "Lord's", format: "ODI" },
  { id: 3, date: "2023-07-10", teams: ["South Africa", "West Indies"], venue: "Newlands", format: "T20" },
  { id: 4, date: "2023-07-15", teams: ["Pakistan", "Sri Lanka"], venue: "Gaddafi Stadium", format: "Test" },
  { id: 5, date: "2023-07-20", teams: ["Bangladesh", "Afghanistan"], venue: "Shere Bangla Stadium", format: "ODI" },
]

const tournaments = [
  {
    id: 1,
    name: "ICC Cricket World Cup 2023",
    teams: ["India", "Australia", "England", "New Zealand", "South Africa", "Pakistan", "Bangladesh", "Sri Lanka", "Afghanistan", "West Indies"],
    stages: [
      { name: "Group Stage", matches: [
        { id: 1, teams: ["India", "Australia"], result: "India won by 36 runs" },
        { id: 2, teams: ["England", "New Zealand"], result: "England won by 6 wickets" },
        // Add more group stage matches here
      ]},
      { name: "Semi Finals", matches: [
        { id: 3, teams: ["India", "England"], result: "India won by 18 runs" },
        { id: 4, teams: ["Australia", "New Zealand"], result: "Australia won by 5 wickets" },
      ]},
      { name: "Final", matches: [
        { id: 5, teams: ["India", "Australia"], result: "Final to be played" },
      ]},
    ],
  },
  {
    id: 2,
    name: "Indian Premier League 2023",
    teams: ["Mumbai Indians", "Chennai Super Kings", "Royal Challengers Bangalore", "Delhi Capitals", "Kolkata Knight Riders", "Rajasthan Royals", "Sunrisers Hyderabad", "Punjab Kings"],
    stages: [
      { name: "League Stage", matches: [
        { id: 1, teams: ["Mumbai Indians", "Chennai Super Kings"], result: "Mumbai Indians won by 5 wickets" },
        { id: 2, teams: ["Royal Challengers Bangalore", "Delhi Capitals"], result: "Delhi Capitals won by 4 runs" },
        // Add more league stage matches here
      ]},
      { name: "Playoffs", matches: [
        { id: 3, teams: ["Mumbai Indians", "Delhi Capitals"], result: "Mumbai Indians won by 6 wickets" },
        { id: 4, teams: ["Chennai Super Kings", "Royal Challengers Bangalore"], result: "Chennai Super Kings won by 3 wickets" },
      ]},
      { name: "Final", matches: [
        { id: 5, teams: ["Mumbai Indians", "Chennai Super Kings"], result: "Final to be played" },
      ]},
    ],
  },
]

const teams = [
  { id: 1, name: "India", fixtures: [
    { date: "2023-07-01", opponent: "Australia", venue: "Melbourne Cricket Ground", format: "Test" },
    { date: "2023-07-25", opponent: "England", venue: "Oval", format: "ODI" },
    { date: "2023-08-10", opponent: "South Africa", venue: "Eden Gardens", format: "T20" },
  ]},
  { id: 2, name: "Australia", fixtures: [
    { date: "2023-07-01", opponent: "India", venue: "Melbourne Cricket Ground", format: "Test" },
    { date: "2023-07-30", opponent: "New Zealand", venue: "Sydney Cricket Ground", format: "ODI" },
    { date: "2023-08-15", opponent: "England", venue: "Adelaide Oval", format: "T20" },
  ]},
  // Add more teams here
]

export default function CricketTournamentsSchedules() {
  const [selectedTournament, setSelectedTournament] = useState(tournaments[0])
  const [selectedTeam, setSelectedTeam] = useState(teams[0])

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Tabs defaultValue="schedules">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedules">Match Schedules</TabsTrigger>
          <TabsTrigger value="tournaments">Tournament Brackets</TabsTrigger>
          <TabsTrigger value="team-fixtures">Team Fixtures</TabsTrigger>
        </TabsList>

        <TabsContent value="schedules">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Matches</CardTitle>
              <CardDescription>Stay updated with the latest cricket fixtures</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Teams</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Format</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingMatches.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell>{match.date}</TableCell>
                      <TableCell>{match.teams.join(" vs ")}</TableCell>
                      <TableCell>{match.venue}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{match.format}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Full Schedule</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tournaments">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Brackets</CardTitle>
              <CardDescription>Explore the structure and results of cricket tournaments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select onValueChange={(value) => setSelectedTournament(tournaments.find(t => t.id.toString() === value) || tournaments[0])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tournament" />
                  </SelectTrigger>
                  <SelectContent>
                    {tournaments.map((tournament) => (
                      <SelectItem key={tournament.id} value={tournament.id.toString()}>{tournament.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedTournament && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{selectedTournament.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedTournament.teams.map((team, index) => (
                        <Badge key={index} variant="outline">{team}</Badge>
                      ))}
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {selectedTournament.stages.map((stage, index) => (
                        <AccordionItem key={index} value={`stage-${index}`}>
                          <AccordionTrigger>{stage.name}</AccordionTrigger>
                          <AccordionContent>
                            <ScrollArea className="h-[200px]">
                              {stage.matches.map((match) => (
                                <div key={match.id} className="py-2">
                                  <div className="font-medium">{match.teams.join(" vs ")}</div>
                                  <div className="text-sm text-muted-foreground">{match.result}</div>
                                </div>
                              ))}
                            </ScrollArea>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team-fixtures">
          <Card>
            <CardHeader>
              <CardTitle>Team Fixtures</CardTitle>
              <CardDescription>View upcoming matches for specific teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select onValueChange={(value) => setSelectedTeam(teams.find(t => t.id.toString() === value) || teams[0])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedTeam && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{selectedTeam.name} Fixtures</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Opponent</TableHead>
                          <TableHead>Venue</TableHead>
                          <TableHead>Format</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedTeam.fixtures.map((fixture, index) => (
                          <TableRow key={index}>
                            <TableCell>{fixture.date}</TableCell>
                            <TableCell>{fixture.opponent}</TableCell>
                            <TableCell>{fixture.venue}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{fixture.format}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}