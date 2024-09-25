'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ShoppingBag, Heart, Star, CreditCard, Filter, Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"

interface MerchandiseItem {
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

interface MerchandiseStoreProps {
  merchandise: MerchandiseItem[]
  onPurchase: (item: MerchandiseItem, quantity: number) => void
}

export default function MerchandiseStore({ merchandise, onPurchase }: MerchandiseStoreProps) {
  const [cartItems, setCartItems] = useState<{ item: MerchandiseItem; quantity: number }[]>([])
  const [wishlist, setWishlist] = useState<MerchandiseItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showOutOfStock, setShowOutOfStock] = useState(false)

  const filteredMerchandise = merchandise
    .filter((item) => 
      (selectedCategory === "all" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.price >= priceRange[0] && item.price <= priceRange[1] &&
      (showOutOfStock || item.stock > 0)
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "price") return a.price - b.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  const addToCart = (item: MerchandiseItem, quantity: number = 1) => {
    const existingItem = cartItems.find((cartItem) => cartItem.item.id === item.id)
    if (existingItem) {
      setCartItems(cartItems.map((cartItem) => 
        cartItem.item.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ))
    } else {
      setCartItems([...cartItems, { item, quantity }])
    }
    onPurchase(item, quantity)
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.item.id !== itemId))
    toast({
      title: "Removed from Cart",
      description: "The item has been removed from your cart.",
    })
  }

  const updateCartItemQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
    } else {
      setCartItems(cartItems.map((cartItem) => 
        cartItem.item.id === itemId 
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      ))
    }
  }

  const toggleWishlist = (item: MerchandiseItem) => {
    if (wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      setWishlist(wishlist.filter((wishlistItem) => wishlistItem.id !== item.id))
      toast({
        title: "Removed from Wishlist",
        description: `${item.name} has been removed from your wishlist.`,
      })
    } else {
      setWishlist([...wishlist, item])
      toast({
        title: "Added to Wishlist",
        description: `${item.name} has been added to your wishlist.`,
      })
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, { item, quantity }) => total + item.price * quantity, 0)
  }

  const handleCheckout = () => {
    toast({
      title: "Checkout Initiated",
      description: "Redirecting to payment gateway...",
    })
    // In a real app, you would integrate with a payment gateway here
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Cricket Merchandise Store</CardTitle>
        <CardDescription>Official gear and fan accessories</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search merchandise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"

            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="apparel">Apparel</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Price Range</h4>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-out-of-stock"
                    checked={showOutOfStock}
                    onCheckedChange={setShowOutOfStock}
                  />
                  <Label htmlFor="show-out-of-stock">Show out of stock items</Label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredMerchandise.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <CardDescription>{item.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-square relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                          <Badge 
                            variant={item.stock > 0 ? "secondary" : "destructive"}
                            className="absolute top-2 right-2"
                          >
                            {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-bold">${item.price.toFixed(2)}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{item.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          onClick={() => addToCart(item)} 
                          disabled={item.stock === 0}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleWishlist(item)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${wishlist.some((wishlistItem) => wishlistItem.id === item.id) ? 'text-red-500 fill-red-500' : ''}`} 
                          />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
          <TabsContent value="list">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMerchandise.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={item.stock > 0 ? "secondary" : "destructive"}>
                        {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => addToCart(item)} 
                          disabled={item.stock === 0}
                          size="sm"
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleWishlist(item)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${wishlist.some((wishlistItem) => wishlistItem.id === item.id) ? 'text-red-500 fill-red-500' : ''}`} 
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" /> View Cart ({cartItems.length} items)
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Shopping Cart</DialogTitle>
              <DialogDescription>Review your items before checkout</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {cartItems.map(({ item, quantity }) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateCartItemQuantity(item.id, quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateCartItemQuantity(item.id, quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="mt-4">
              <p className="font-bold text-lg">Total: ${getTotalPrice().toFixed(2)}</p>
            </div>
            <Button className="w-full mt-4" onClick={handleCheckout}>
              <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
            </Button>
          </DialogContent>
        </Dialog>

        <Accordion type="single" collapsible>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping Information</AccordionTrigger>
            <AccordionContent>
              <p>Free shipping on orders over $50. Standard shipping takes 3-5 business days.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>Returns Policy</AccordionTrigger>
            <AccordionContent>
              <p>We offer a 30-day return policy for all unused items in original packaging.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}