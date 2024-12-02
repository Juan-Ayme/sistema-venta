"use client";

import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProductList from "@/components/products/ProductList";
import ProductHeader from "@/components/products/ProductHeader";
import { useState } from "react";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Productos</h1>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <ProductHeader />
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar producto" 
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <ProductList searchTerm={searchTerm} />
      </Card>
    </div>
  );
}