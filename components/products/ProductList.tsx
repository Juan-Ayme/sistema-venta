"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ProductActions from "./ProductActions";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/lib/utils/calculations";
import { useToast } from "@/components/ui/use-toast";
import { useProductStore } from "@/lib/store/productStore";

interface ProductListProps {
  searchTerm: string;
}

export default function ProductList({ searchTerm }: ProductListProps) {
  const { products, deleteProduct } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { toast } = useToast();

  // Filtrar productos basados en el término de búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(filteredProducts.map(p => p.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
    toast({
      title: "Product Deleted",
      description: "The product has been deleted successfully.",
      duration: 2000,
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]">
              <input 
                type="checkbox" 
                className="rounded border-gray-300"
                checked={selectedItems.length === filteredProducts.length}
                onChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Nombre del Producto</TableHead>
            <TableHead>Precio </TableHead>
            <TableHead>Total de venta </TableHead>
            <TableHead className="w-[70px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300"
                  checked={selectedItems.includes(product.id)}
                  onChange={() => handleSelectItem(product.id)}
                />
              </TableCell>
              <TableCell className="font-medium">
                <button
                  className="flex items-center gap-3 hover:text-purple-500 transition-colors"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg" />
                  {product.name}
                </button>
              </TableCell>
              <TableCell className="text-purple-500">{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.sales}</TableCell>
              <TableCell>
                <ProductActions 
                  productId={product.id} 
                  onDelete={() => handleDelete(product.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedProduct && (
        <ProductDetails
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </>
  );
}