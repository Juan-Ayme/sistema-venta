"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import { useProductStore } from "@/lib/store/productStore";
import { useToast } from "@/components/ui/use-toast";
import { DialogClose } from "@/components/ui/dialog";

interface AddProductFormProps {
  isEditing?: boolean;
  productId?: number;
  onClose?: () => void;
}

export default function AddProductForm({ isEditing, productId, onClose }: AddProductFormProps) {
  const { addProduct, products, updateProduct } = useProductStore();
  const { toast } = useToast();
  const editingProduct = productId ? products.find(p => p.id === productId) : null;

  const [formData, setFormData] = useState({
    name: editingProduct?.name || "",
    price: editingProduct?.price || 0,
    description: editingProduct?.description || "",
    image: editingProduct?.image || ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(editingProduct?.image || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && productId) {
      updateProduct(productId, formData);
      toast({
        title: "Producto Actualizado ",
        description: "El producto ha sido actualizado correctamente.",
        duration: 2000,
      });
    } else {
      addProduct(formData);
      toast({
        title: "Producto Agregado",
        description: "El producto ha sido agregado correctamente.",
        duration: 2000,
      });
    }
    
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="productName">Nombre del Producto</Label>
          <Input
            id="productName"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Entra el nombre del producto"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Entra la descripción del producto"
            className="resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Product Image</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-[120px] h-[120px] flex flex-col items-center justify-center gap-2"
              onClick={() => document.getElementById("image")?.click()}
            >
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImagePlus className="h-8 w-8" />
                  <span className="text-xs">Subir imagen</span>
                </>
              )}
            </Button>
            <Input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit">
          {isEditing ? "Actualizar Producto " : "Agregar Producto"}
        </Button>
      </div>
    </form>
  );
}