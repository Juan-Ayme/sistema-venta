"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils/calculations";

interface ProductDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: number;
    name: string;
    price: number;
    description?: string;
    image: string;
  };
}

export default function ProductDetails({
  open,
  onOpenChange,
  product,
}: ProductDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles Producto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-xl font-bold text-purple-500">
              {formatCurrency(product.price)}
            </p>
            {product.description && (
              <p className="text-muted-foreground">{product.description}</p>
            )}
            {/*<Button* className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button*/}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}