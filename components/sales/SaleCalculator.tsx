"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { calculateSubtotal, calculateIGV, calculateTotal, formatCurrency } from "@/lib/utils/calculations";

interface SaleCalculatorProps {
  price: number;
  quantity: number;
}

export default function SaleCalculator({ price, quantity }: SaleCalculatorProps) {
  const [subtotal, setSubtotal] = useState(0);
  const [igv, setIgv] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = calculateSubtotal(price, quantity);
    const newIgv = calculateIGV(newSubtotal);
    const newTotal = calculateTotal(newSubtotal, newIgv);

    setSubtotal(newSubtotal);
    setIgv(newIgv);
    setTotal(newTotal);
  }, [price, quantity]);

  return (
    <Card className="p-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal:</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">IGV (18%):</span>
        <span>{formatCurrency(igv)}</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Total:</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </Card>
  );
}