"use client"

import { useState, useEffect } from "react"
import { motion} from "framer-motion"
import {  MessageSquare, PieChart, Trophy,  ThumbsUp, Share2, Send, Loader2, RefreshCcw,  } from "lucide-react"
import { Card, CardContent, CardDescription,   CardHeader,   CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


const quizQuestions = [
  {
    id: 1,
    question: "Who holds the record for the highest individual score in Test cricket?",
    options: ["Sachin Tendulkar", "Brian Lara", "Virender Sehwag", "Don Bradman"],
    correctAnswer: "Brian Lara",
  },
  {
    id: 2,
    question: "Which country has won the most Cricket World Cups?",
    options: ["India", "Australia", "West Indies", "England"],
    correctAnswer: "Australia",
  },
  {
    id: 3,
    question: "Who is known as the 'God of Cricket'?",
    options: ["Virat Kohli", "Sachin Tendulkar", "Ricky Ponting", "Jacques Kallis"],
    correctAnswer: "Sachin Tendulkar",
  },
]

const polls = [
  {
    id: 1,
    question: "Who will win the upcoming India vs Australia series?",
    options: ["India", "Australia", "Draw"],
    votes: [250, 180, 70],
  },
  {
    id: 2,
    question: "Who will be the top run-scorer in the next IPL season?",
    options: ["Virat Kohli", "Rohit Sharma", "David Warner", "Kane Williamson"],
    votes: [300, 280, 220, 200],
  },
]

const forumPosts = [
  {
    id: 1,
    user: "CricketFan123",
    avatar: "CF",
    message: "What do you think about the new ICC rules for Test cricket?",
    replies: 15,
    likes: 32,
  },
  {
    id: 2,
    user: "BowlingExpert",
    avatar: "BE",
    message: "Is spin bowling becoming less effective in modern cricket?",
    replies: 23,
    likes: 41,
  },
  {
    id: 3,
    user: "StatGuru",
    avatar: "SG",
    message: "Analyzing the impact of T20 leagues on international cricket schedules.",
    replies: 18,
    likes: 37,
  },
]

export default function EnhancedCricketInteractiveFeatures() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const [userVotes, setUserVotes] = useState<{ [key: number]: number }>({})
  const [newPost, setNewPost] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [quizTimer, setQuizTimer] = useState(30)
  const [isQuizTimerRunning, setIsQuizTimerRunning] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isQuizTimerRunning && quizTimer > 0) {
      timer = setTimeout(() => setQuizTimer(quizTimer - 1), 1000)
    } else if (quizTimer === 0) {
      handleQuizAnswer("")
    }
    return () => clearTimeout(timer)
  }, [quizTimer, isQuizTimerRunning])

  const handleQuizAnswer = (answer: string) => {
    setIsQuizTimerRunning(false)
    const currentQuestion = quizQuestions[currentQuestionIndex]
    const isCorrect = answer === currentQuestion.correctAnswer
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: answer })

    if (isCorrect) {
      setScore(score + 1)
      toast({
        title: "Correct!",
        description: "Great job! You got the right answer.",
        variant: "default",
      })
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${currentQuestion.correctAnswer}`,
        variant: "destructive",
      })
    }

    setShowExplanation(true)
    setTimeout(() => {
      setShowExplanation(false)
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuizTimer(30)
        setIsQuizTimerRunning(true)
      } else {
        setShowResult(true)
      }
    }, 3000)
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswers({})
    setQuizTimer(30)
    setIsQuizTimerRunning(true)
  }

  const handleVote = (pollId: number, optionIndex: number) => {
    setIsLoading(true)
    setTimeout(() => {
      if (!userVotes[pollId]) {
        setUserVotes({ ...userVotes, [pollId]: optionIndex })
        // const updatedPolls = polls.map(poll => {
        //   if (poll.id === pollId) {
        //     const newVotes = [...poll.votes]
        //     newVotes[optionIndex] += 1
        //     return { ...poll, votes: newVotes }
        //   }
        //   return poll
        // })
        toast({
          title: "Vote Recorded",
          description: "Thank you for participating in the poll!",
        })
      } else {
        toast({
          title: "Already Voted",
          description: "You have already participated in this poll.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleNewPost = () => {
    if (newPost.trim()) {
      setIsLoading(true)
      setTimeout(() => {
        toast({
          title: "Post Created",
          description: "Your message has been posted to the forum.",
        })
        setNewPost("")
        setIsLoading(false)
      }, 1000)
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container mx-auto p-4 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Cricket Interactive Hub
          </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Dark Mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Tabs defaultValue="quiz" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quiz">Cricket Quiz</TabsTrigger>
            <TabsTrigger value="polls">Polls & Votes</TabsTrigger>
            <TabsTrigger value="forum">Fan Forum</TabsTrigger>
          </TabsList>

          <TabsContent value="quiz">
            <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  <span>Cricket Trivia Challenge</span>
                </CardTitle>
                <CardDescription>Test your cricket knowledge and earn badges!</CardDescription>
              </CardHeader>
              <CardContent>
                {!showResult ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Progress value={(currentQuestionIndex / quizQuestions.length) * 100} className="w-2/3" />
                      <Badge variant="outline" className="text-lg">
                        {quizTimer}s
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </h3>
                    <p className="text-lg">{quizQuestions[currentQuestionIndex].question}</p>
                    <RadioGroup
                      onValueChange={handleQuizAnswer}
                      value={selectedAnswers[quizQuestions[currentQuestionIndex].id] || ""}
                      className="space-y-2"
                    >
                      {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg"
                      >
                        <p className="font-semibold">Explanation:</p>
                        <p>This is where you`&apos;`d put an explanation for the correct answer.</p>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">Quiz Complete!</h3>
                    <p className="text-xl">Your score: {score} out of {quizQuestions.length}</p>
                    {score === quizQuestions.length && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center space-x-2 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg"
                      >
                        <Trophy className="h-8 w-8 text-yellow-500" />
                        <span className="text-lg font-semibold">Perfect Score! You`&apos;`ve earned the Cricket Expert badge!</span>
                      </motion.div>
                    )}
                    <Button onClick={resetQuiz} className="w-full">
                      <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="polls">
            <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-6 w-6 text-blue-500" />
                  <span>Cricket Polls</span>
                </CardTitle>
                <CardDescription>Share your opinion on current cricket topics!</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {polls.map((poll) => (
                    <AccordionItem value={`poll-${poll.id}`} key={poll.id}>
                      <AccordionTrigger>{poll.question}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {poll.options.map((option, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span>{option}</span>
                                <span>{Math.round((poll.votes[index] / poll.votes.reduce((a, b) => a + b, 0)) * 100)}%</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Progress value={(poll.votes[index] / poll.votes.reduce((a, b) => a + b, 0)) * 100} className="flex-grow" />
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleVote(poll.id, index)}
                                  disabled={userVotes[poll.id] !== undefined || isLoading}
                                >
                                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Vote"}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forum">
            <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-green-500" />
                  <span>Cricket Fan Forum</span>
                </CardTitle>
                <CardDescription>Discuss cricket with fans from around the world!</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  {forumPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4"
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/40?u=${post.user}`} />
                          <AvatarFallback>{post.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{post.user}</p>
                          <p className="text-sm text-muted-foreground">{post.message}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <Badge variant="secondary">{post.replies} replies</Badge>
                        <Badge variant="secondary">{post.likes} likes</Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Like
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Like this post</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Share this post</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Separator className="my-2" />
                    </motion.div>
                  ))}
                </ScrollArea>
                <div className="mt-4 space-y-2">
                  <Textarea 
                    placeholder="Share your thoughts..." 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Posting Guidelines</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Forum Posting Guidelines</DialogTitle>
                          <DialogDescription>
                            Please follow these guidelines when posting:
                            <ul className="list-disc list-inside mt-2">
                              <li>Be respectful to other users</li>
                              <li>Stay on topic</li>
                              <li>No spam or self-promotion</li>
                              <li>Use appropriate language</li>
                            </ul>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Button onClick={handleNewPost} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Send className="h-4 w-4 mr-2" />
                      )}
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}