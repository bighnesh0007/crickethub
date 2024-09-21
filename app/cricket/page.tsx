"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, ChevronDown, ChevronUp, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data
const matchData = {
  team1: "India",
  team2: "Australia",
  score1: "287/5",
  score2: "230/4",
  overs1: "50.0",
  overs2: "42.3",
  currentBatsman: "Smith",
  currentBowler: "Bumrah",
  recentBalls: ["1", "W", "0", "4", "2", "6"],
}

const playerStats = [
  { name: "Virat Kohli", runs: 82, balls: 68, fours: 7, sixes: 2 },
  { name: "Rohit Sharma", runs: 56, balls: 42, fours: 5, sixes: 3 },
  { name: "Steve Smith", runs: 78, balls: 84, fours: 6, sixes: 1 },
]

export default function CricketLiveUpdates() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Live Cricket Match</CardTitle>
          <CardDescription>{matchData.team1} vs {matchData.team2}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{matchData.team1}</h3>
              <p className="text-2xl font-bold">{matchData.score1}</p>
              <p className="text-sm text-muted-foreground">Overs: {matchData.overs1}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{matchData.team2}</h3>
              <p className="text-2xl font-bold">{matchData.score2}</p>
              <p className="text-sm text-muted-foreground">Overs: {matchData.overs2}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm">
              <span className="font-semibold">Current Batsman:</span> {matchData.currentBatsman}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Current Bowler:</span> {matchData.currentBowler}
            </p>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Recent Balls</h4>
            <div className="flex space-x-2">
              {matchData.recentBalls.map((ball, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    ball === "W" ? "bg-red-500" : ball === "4" || ball === "6" ? "bg-green-500" : "bg-blue-500"
                  }`}
                >
                  {ball}
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="highlights">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="highlights">Match Highlights</TabsTrigger>
          <TabsTrigger value="statistics">In-depth Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="highlights">
          <Card>
            <CardHeader>
              <CardTitle>Match Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Key Moment</AlertTitle>
                <AlertDescription>
                  Virat Kohli scores his 50th ODI century, breaking Sachin Tendulkar`&apos;`s record!
                </AlertDescription>
              </Alert>
              <div className="mt-4 space-y-2">
                <p>• Steve Smith reaches his half-century with a beautiful cover drive</p>
                <p>• Jasprit Bumrah takes his 3rd wicket of the match</p>
                <p>• Australia loses quick wickets in the middle overs</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>In-depth Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Runs</TableHead>
                    <TableHead>Balls</TableHead>
                    <TableHead>4s</TableHead>
                    <TableHead>6s</TableHead>
                    <TableHead>Strike Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playerStats.map((player) => (
                    <TableRow key={player.name}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.runs}</TableCell>
                      <TableCell>{player.balls}</TableCell>
                      <TableCell>{player.fours}</TableCell>
                      <TableCell>{player.sixes}</TableCell>
                      <TableCell>{((player.runs / player.balls) * 100).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Run Rate Comparison</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm">{matchData.team1}</p>
                    <Progress value={66} className="h-2" />
                  </div>
                  <div>
                    <p className="text-sm">{matchData.team2}</p>
                    <Progress value={58} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <Card>
          <CardHeader>
            <CardTitle>Match Commentary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>42.3 Bumrah to Smith, no run, good length delivery outside off, Smith defends</p>
              <p>42.2 Bumrah to Smith, FOUR, short and wide, Smith cuts it past point for a boundary</p>
              <p>42.1 Bumrah to Maxwell, 1 run, full toss on the pads, Maxwell flicks it to fine leg</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full"
        >
          {isExpanded ? (
            <>
              Hide Commentary <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show Commentary <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div className="fixed bottom-4 right-4">
        <Button size="icon" className="rounded-full">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}