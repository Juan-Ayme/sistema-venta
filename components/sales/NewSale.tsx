"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductStore } from "@/lib/store/productStore";
import { useSaleStore } from "@/lib/store/saleStore";
import SaleCalculator from "./SaleCalculator";
import CustomerForm from "./CustomerForm";
import type { Customer } from "@/lib/types/sales";
import { formatCurrency } from "@/lib/utils/calculations";
import { useToast } from "@/components/ui/use-toast";

export default function NewSale() {
  const { toast } = useToast();
  const { products, incrementSales } = useProductStore();
  const { addSale } = useSaleStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customer, setCustomer] = useState<Customer>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const selectedProductData = products.find(p => p.id.toString() === selectedProduct);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductData) return;

    const sale = {
      customer,
      product: {
        id: selectedProductData.id,
        name: selectedProductData.name,
        price: selectedProductData.price,
        quantity,
      },
      subtotal: selectedProductData.price * quantity,
      igv: selectedProductData.price * quantity * 0.18,
      total: selectedProductData.price * quantity * 1.18,
      date: new Date(),
      receiptNumber: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };

    addSale(sale);
    incrementSales(selectedProductData.id, quantity);

    toast({
      title: "Venta Completada",
      description: `Venta procesada exitosamente por ${quantity} ${selectedProductData.name}`,
      duration: 3000,
    });

    setQuantity(1);
    setSelectedProduct("");
    setCustomer({
      fullName: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Nueva Venta</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <CustomerForm customer={customer} onChange={setCustomer} />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Detalles del Producto</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Seleccionar Producto</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Elegir un producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          <div className="flex justify-between items-center gap-4">
                            <span>{product.name}</span>
                            <span className="text-purple-500 font-medium">
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            {selectedProductData && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Resumen del Pedido</h3>
                <SaleCalculator
                  price={selectedProductData.price}
                  quantity={quantity}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!selectedProductData}>
            Completar Venta
          </Button>
        </div>
      </form>
    </div>
  );
}