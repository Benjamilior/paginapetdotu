import React, { useState, useMemo } from "react"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, Check, ChevronDown } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Price {
  store: string
  price: number
  stock: number
}

interface Product {
  name: string
  category: string
  brand: string
  image: string
  description: string
  prices: Price[]
}

export default function Component() {
  const product: Product = {
    name: "FELIWAY FRIEND DIFUSOR + RPTO.",
    category: "Conductual",
    brand: "FELIWAY",
    image: "/placeholder.svg",
    description: "Helps reduce conflict and tension between cats in multi-cat households.",
    prices: [
      { store: "Best For Pets", price: 36900, stock: 1 },
      { store: "SuperZoo", price: 34990, stock: 1 },
      { store: "Bigos", price: 37590, stock: 0 },
      { store: "Braloy", price: 22990, stock: 1 },
      { store: "Central Vet", price: 26854, stock: 1 },
      { store: "Punto Mascotas", price: 39990, stock: 0 },
      { store: "Petvet", price: 19990, stock: 1 },
      { store: "Tus Mascotas", price: 33110, stock: 1 },
      { store: "Petco", price: 46490, stock: 1 },
      { store: "Amigales", price: 34990, stock: 0 },
      { store: "p&k", price: 36600, stock: 1 },
    ],
  }

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("price-asc")
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  const filteredAndSortedPrices = useMemo(() => {
    return product.prices
      .filter((price) => price.stock > 0)
      .filter((price) => price.store.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price
        if (sortOption === "price-desc") return b.price - a.price
        if (sortOption === "store-asc") return a.store.localeCompare(b.store)
        if (sortOption === "store-desc") return b.store.localeCompare(a.store)
        return 0
      })
  }, [product.prices, searchTerm, sortOption])

  const bestPrice = filteredAndSortedPrices[0]

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-[#1a0140] text-gray-100">
      <Button variant="ghost" className="mb-4 text-gray-300 hover:text-gray-100 hover:bg-[#2f026c]">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>
      <Card className="bg-[#2f026c] border-[#4a0ca4]">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-100">{product.name}</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Badge variant="secondary" className="bg-[#4a0ca4] text-gray-200">{product.category}</Badge>
            <Separator orientation="vertical" className="h-4 bg-[#6614df]" />
            <Badge variant="outline" className="text-gray-200 border-[#6614df]">{product.brand}</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <AspectRatio ratio={4/3}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
            <p className="mt-4 text-sm text-gray-300">{product.description}</p>
          </div>
          <div className="space-y-4">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-100">Available Stores</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gray-100 hover:bg-[#4a0ca4]">
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
                    <span className="sr-only">Toggle stores list</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <Separator className="my-4 bg-[#6614df]" />
              <CollapsibleContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    type="text"
                    placeholder="Search stores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow bg-[#4a0ca4] border-[#6614df] text-gray-100 placeholder-gray-400"
                  />
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[140px] bg-[#4a0ca4] border-[#6614df] text-gray-100">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2f026c] border-[#4a0ca4]">
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="store-asc">Store: A to Z</SelectItem>
                      <SelectItem value="store-desc">Store: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  {filteredAndSortedPrices.map((price, index) => (
                    <div
                      key={price.store}
                      className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                        selectedStore === price.store ? 'bg-[#4a0ca4]' : 'hover:bg-[#4a0ca4]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 p-0 text-gray-300 hover:text-gray-100 hover:bg-[#6614df]"
                          onClick={() => setSelectedStore(price.store)}
                        >
                          {selectedStore === price.store ? (
                            <Check className="h-4 w-4 text-gray-100" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-[#6614df]" />
                          )}
                        </Button>
                        <span className="font-medium text-gray-100">{price.store}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-100">{formatPrice(price.price)}</span>
                        {index === 0 && (
                          <Badge variant="secondary" className="ml-2 bg-[#6614df] text-gray-200">
                            Best Price
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full bg-[#4a0ca4] text-gray-100 hover:bg-[#6614df]" disabled={!selectedStore}>
                <ShoppingCart className="mr-2 h-4 w-4" /> 
                {selectedStore 
                  ? `Add to Cart (${selectedStore}: ${formatPrice(filteredAndSortedPrices.find(p => p.store === selectedStore)?.price || 0)})`
                  : "Select a store to add to cart"
                }
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#2f026c] border-[#4a0ca4]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-100">Confirm Purchase</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300">
                  Are you sure you want to add this item to your cart?
                  <div className="mt-2 p-2 bg-[#4a0ca4] rounded-md text-gray-200">
                    <p><strong>Product:</strong> {product.name}</p>
                    <p><strong>Store:</strong> {selectedStore}</p>
                    <p><strong>Price:</strong> {formatPrice(filteredAndSortedPrices.find(p => p.store === selectedStore)?.price || 0)}</p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-[#4a0ca4] text-gray-100 hover:bg-[#6614df]">Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-[#6614df] text-gray-100 hover:bg-[#7d2df9]">Confirm Purchase</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  )
}