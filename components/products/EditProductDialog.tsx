"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddProductForm from "./AddProductForm";

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: number;
}

export default function EditProductDialog({
  open,
  onOpenChange,
  productId,
}: EditProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        <AddProductForm isEditing productId={productId} />
      </DialogContent>
    </Dialog>
  );
}