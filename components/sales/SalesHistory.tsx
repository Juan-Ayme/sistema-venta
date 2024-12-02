"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useSaleStore } from "@/lib/store/saleStore";
import { formatCurrency } from "@/lib/utils/calculations";
import { generateReceipt } from "@/lib/utils/receipt";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";

export default function SalesHistory() {
  const { sales } = useSaleStore();
  const { toast } = useToast();

  const handleDownloadReceipt = (sale: any) => {
    const receiptData = {
      customer: sale.customer,
      product: sale.product,
      subtotal: sale.subtotal,
      igv: sale.igv,
      total: sale.total,
      date: sale.date,
      receiptNumber: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };

    generateReceipt(receiptData);
    
    toast({
      title: "Recibo Descargado",
      description: "El recibo ha sido descargado exitosamente.",
      duration: 2000,
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Ventas Recientes</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell className="font-medium">{sale.product.name}</TableCell>
              <TableCell>{sale.customer.fullName}</TableCell>
              <TableCell>{format(sale.date, 'dd/MM/yyyy', { locale: es })}</TableCell>
              <TableCell>{formatCurrency(sale.product.price)}</TableCell>
              <TableCell>{sale.product.quantity}</TableCell>
              <TableCell>{formatCurrency(sale.total)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownloadReceipt(sale)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Recibo
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}