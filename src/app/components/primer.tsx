import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check,ShoppingCart, ChevronDown } from "lucide-react";

interface Price {
  tienda: string;
  price: number;
  stock: number;
  link: string;
}

interface Product {
  sku: string;
  name: string;
  description: string;
  category: string;
  marca: string;
  links: string; // Asume que links es una URL de la imagen
  prices: Price[];
}

interface ProductListProps {
  sku: string;
}

const ProductList: React.FC<ProductListProps> = ({ sku }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("price-asc");
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dotupetpublic-production.up.railway.app/product/${sku}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [sku]);

  const filteredAndSortedPrices = useMemo(() => {
    if (!product?.prices) return []; // Retorna un array vacío si product.prices es undefined
    return product.prices
      .filter((price) => price.stock > 0)
      .filter((price) => price.tienda.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "store-asc") return a.tienda.localeCompare(b.tienda);
        if (sortOption === "store-desc") return b.tienda.localeCompare(a.tienda);
        return 0;
      });
  }, [product?.prices, searchTerm, sortOption]);

  const bestPrice = filteredAndSortedPrices[0] || {}; // Asegúrate de manejar el caso en que filteredAndSortedPrices sea un array vacío

  const formatPrice = (price: number | null | undefined): string => {
    if (price === null || price === undefined) {
      return "$0"; // O cualquier valor predeterminado que prefieras
    }
    return `$${price.toLocaleString()}`;
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">No product data available</div>;
  }

  return (
    <div id='maincontentsearch' className="container mx-auto  p-4 max-w-4xl bg-[#1a0140] text-gray-100">
      <Button onClick={() => window.location.href = '/'} variant="ghost" className="mb-4 text-gray-300 hover:text-gray-100 hover:bg-[#2f026c]">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>
      <Card className="bg-[#2f026c] border-[#4a0ca4]">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-100">{product.name}</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Badge variant="secondary" className="bg-[#4a0ca4] text-gray-200">{product.category}</Badge>
            <Separator orientation="vertical" className="h-4 bg-[#6614df]" />
            <Badge variant="outline" className="text-gray-200 border-[#6614df]">{product.marca}</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <Image
              src={product.links || '/placeholder.svg'}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-md object-cover"
            />
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
                  {filteredAndSortedPrices.map((price) => (
                    <div
                      key={price.tienda}
                      className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                        selectedStore === price.tienda ? 'bg-[#4a0ca4]' : 'hover:bg-[#4a0ca4]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 p-0 text-gray-300 hover:text-gray-100 hover:bg-[#6614df]"
                          onClick={() => setSelectedStore(price.tienda)}
                        >
                          {selectedStore === price.tienda ? (
                            <Check className="h-4 w-4 text-gray-100" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-[#6614df]" />
                          )}
                        </Button>
                        <span className="font-medium text-gray-100">{price.tienda}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-100">{formatPrice(price.price)}</span>
                        {price === bestPrice && (
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
          {bestPrice && (
            <a
              href={bestPrice.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              Buy at the best price!
            </a>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductList;
