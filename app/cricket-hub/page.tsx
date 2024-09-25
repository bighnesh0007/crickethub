'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, ShoppingBag, User, Menu, Sun, Moon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import TrainingAndCoaching from "@/components/TrainingAndCoaching"
import UserProfile from "@/components/UserProfile"
import MerchandiseStore from "@/components/MerchandiseStore"
import PredictionsAndContests from "@/components/PredictionsAndContests"

// Types (you can move these to a separate types.ts file)
export interface CoachingVideo {
  id: number
  title: string
  coach: string
  duration: string
  url: string
}

export interface ExpertAdvice {
  id: number
  expert: string
  advice: string
}

export interface MerchandiseItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  rating: number
  reviews: { id: number; user: string; comment: string; rating: number }[]
  stock: number
  sizes?: string[]
  colors?: string[]
}

export interface UpcomingMatch {
  id: number
  teams: string
  date: string
  venue: string
}

export default function CricketWebsite() {
  const [cartItems, setCartItems] = useState<MerchandiseItem[]>([])
  const [loading, setLoading] = useState(true)
  const [coachingVideos, setCoachingVideos] = useState<CoachingVideo[]>([])
  const [expertAdvice, setExpertAdvice] = useState<ExpertAdvice[]>([])
  const [merchandise, setMerchandise] = useState<MerchandiseItem[]>([])
  const [upcomingMatches, setUpcomingMatches] = useState<UpcomingMatch[]>([])
  const [activeTab, setActiveTab] = useState("training")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000))

        setCoachingVideos([
          { id: 1, title: "Mastering the Cover Drive", coach: "Virat Kohli", duration: "15:30", url: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
          { id: 2, title: "Spin Bowling Techniques", coach: "Shane Warne", duration: "20:45", url: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
          { id: 3, title: "Fielding Drills for Agility", coach: "Jonty Rhodes", duration: "18:20", url: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
        ])

        setExpertAdvice([
          { id: 1, expert: "Ricky Ponting", advice: "The key to consistent batting is maintaining a still head and watching the ball closely." },
          { id: 2, expert: "Dale Steyn", advice: "For fast bowlers, it's crucial to focus on rhythm and consistency rather than just raw pace." },
          { id: 3, expert: "MS Dhoni", advice: "As a wicketkeeper, always anticipate the ball and stay light on your feet for quick movements." },
        ])

        setMerchandise([
          {
            id: 1,
            name: "Official Team Jersey",
            price: 79.99,
            image: "/placeholder.svg",
            category: "Apparel",
            description: "High-quality official team jersey with breathable fabric and vibrant team colors.",
            rating: 4.5,
            reviews: [
              { id: 1, user: "JohnDoe", comment: "Great quality, fits perfectly!", rating: 5 },
              { id: 2, user: "JaneSmith", comment: "Colors fade after washing.", rating: 3 },
            ],
            stock: 15,
            sizes: ["S", "M", "L", "XL"],
            colors: ["Blue", "Red", "White"],
          },
          {
            id: 2,
            name: "Professional Cricket Bat",
            price: 199.99,
            image: "/placeholder.svg",
            category: "Equipment",
            description: "Premium-grade cricket bat made from high-quality willow wood.",
            rating: 4.8,
            reviews: [
              { id: 1, user: "CricketFan99", comment: "Amazing bat, great balance and power.", rating: 5 },
              { id: 2, user: "PlayerX", comment: "A bit expensive, but worth it!", rating: 4 },
            ],
            stock: 8,
          },
          {
            id: 3,
            name: "Cricket Gloves",
            price: 49.99,
            image: "/placeholder.svg",
            category: "Equipment",
            description: "Comfortable and durable cricket gloves with extra padding for protection.",
            rating: 4.2,
            reviews: [
              { id: 1, user: "SportsEnthusiast", comment: "Good fit, very comfortable.", rating: 4 },
              { id: 2, user: "BattingPro", comment: "Offers good protection, but a little tight.", rating: 3 },
            ],
            stock: 25,
            sizes: ["S", "M", "L"],
            colors: ["Black", "White"],
          },
        ])

        setUpcomingMatches([
          { id: 1, teams: "India vs Australia", date: "2023-07-15", venue: "Melbourne Cricket Ground" },
          { id: 2, teams: "England vs New Zealand", date: "2023-07-20", venue: "Lord's Cricket Ground" },
          { id: 3, teams: "South Africa vs Pakistan", date: "2023-07-25", venue: "Newlands Cricket Ground" },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load data. Please try again later.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handlePurchase = (item: MerchandiseItem) => {
    setCartItems(prevItems => [...prevItems, item])
    toast({
      title: "Item Added to Cart",
      description: `${item.name} has been added to your shopping cart.`,
    })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, you'd apply the theme change here
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  const tabContentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div 
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto p-4 space-y-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">CricketHub</h1>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost"><User className="mr-2 h-4 w-4" /> Profile</Button>
            <Button variant="ghost"><Bell className="mr-2 h-4 w-4" /> Notifications</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Cart ({cartItems.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Cart Items</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cartItems.map((item) => (
                  <DropdownMenuItem key={item.id}>
                    {item.name} - ${item.price.toFixed(2)}
                  </DropdownMenuItem>
                ))}
                {cartItems.length === 0 && (
                  <DropdownMenuItem>Your cart is empty</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Access CricketHub features</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingBag className="mr-2 h-4 w-4" /> Cart ({cartItems.length})
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => { toggleDarkMode(); setIsMobileMenuOpen(false); }}>
                  {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />} Toggle Theme
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="training">Training & Coaching</TabsTrigger>
              <TabsTrigger value="profile">User Profile</TabsTrigger>
              <TabsTrigger value="store">Merchandise Store</TabsTrigger>
              <TabsTrigger value="predictions">Predictions & Contests</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <TabsContent value="training">
                  <TrainingAndCoaching coachingVideos={coachingVideos} expertAdvice={expertAdvice} />
                </TabsContent>

                <TabsContent value="profile">
                  <UserProfile upcomingMatches={upcomingMatches} />
                </TabsContent>

                <TabsContent value="store">
                  <MerchandiseStore merchandise={merchandise} onPurchase={handlePurchase} />
                </TabsContent>

                <TabsContent value="predictions">
                  <PredictionsAndContests />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        )}
      </div>
    </motion.div>
  )
}