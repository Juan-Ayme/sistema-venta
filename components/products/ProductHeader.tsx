"use client";

import AddProductButton from "./AddProductButton";
import { useProductStore } from "@/lib/store/productStore";

export default function ProductHeader() {
  const { products } = useProductStore();

  return (
    <div className="flex items-center gap-4">
      <h2 className="text-lg font-semibold">Todos los Productos</h2>
      <span className="text-sm text-muted-foreground">
        Mostrando {products.length} productos
      </span>
      <div className="ml-auto">
        <AddProductButton />
      </div>
    </div>
  );
}