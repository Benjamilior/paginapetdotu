import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

export default function Component() {
  const prices = [
    { store: "Best For Pets", price: 36900, stock: 1 },
    { store: "SuperZoo", price: 34990, stock: 1 },
    { store: "Bigos", price: 37590, stock: 1 },
    { store: "Braloy", price: 22990, stock: 1 },
    { store: "Central Vet", price: 26854, stock: 1 },
    { store: "Punto Mascotas", price: 39990, stock: 1 },
    { store: "Petvet", price: 19990, stock: 1 },
    { store: "Tus Mascotas", price: 33110, stock: 1 },
    { store: "Petco", price: 46490, stock: 1 },
    { store: "Amigales", price: 34990, stock: 1 },
    { store: "p&k", price: 36600, stock: 1 },
  ];

  const sortedPrices = prices.sort((a, b) => a.price - b.price);
  const bestPrice = sortedPrices[0];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          FELIWAY FRIEND DIFUSOR + RPTO.
        </CardTitle>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Category: Conductual</span>
          <span>•</span>
          <span>Brand: FELIWAY</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex justify-center items-center p-4 bg-muted rounded-lg">
            <img
              src="/placeholder.svg?height=300&width=300"
              alt="FELIWAY FRIEND DIFUSOR + RPTO."
              className="max-w-full h-auto"
              width={300}
              height={300}
            />
          </div>
          <div className="space-y-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Best Price</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">
                    ${(bestPrice.price / 100).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {bestPrice.store}
                  </p>
                </div>
                <Badge variant="secondary">
                  Save $
                  {((sortedPrices[1].price - bestPrice.price) / 100).toFixed(2)}
                </Badge>
              </div>
              <Button className="w-full mt-4">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">All Prices</h3>
              {sortedPrices.map((item, index) => (
                <div
                  key={item.store}
                  className="flex justify-between items-center p-2 rounded-md hover:bg-muted"
                >
                  <div>
                    <p className="font-medium">{item.store}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {item.stock}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${(item.price / 100).toFixed(2)}
                    </p>
                    {index === 0 && (
                      <Star className="h-4 w-4 text-yellow-400 inline-block ml-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
