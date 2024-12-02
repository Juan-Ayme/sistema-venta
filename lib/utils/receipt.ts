import { jsPDF } from "jspdf";
import { formatCurrency } from "./calculations";
import type { Customer, SaleProduct } from "@/lib/types/sales";

interface ReceiptData {
  customer: Customer;
  product: SaleProduct;
  subtotal: number;
  igv: number;
  total: number;
  date: Date;
  receiptNumber: string;
}

export function generateReceipt(data: ReceiptData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const centerX = pageWidth / 2;

  // Encabezado de la empresa
  doc.setFontSize(20);
  doc.setTextColor("#333");
  doc.text("Sistema de Ventas", centerX, 20, { align: "center" });

  // Línea divisoria
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 30, pageWidth - margin, 30);

  // Detalles del recibo
  doc.setFontSize(12);
  const receiptDate = new Date(data.date);
  doc.setFont("helvetica", "bold");
  doc.text(`Recibo #: ${data.receiptNumber}`, margin, 40);
  doc.text(`Fecha: ${receiptDate.toLocaleDateString()}`, margin, 50);

  // Información del cliente
  doc.setFontSize(14);
  doc.setTextColor("#555");
  doc.text("Información del Cliente:", margin, 70);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${data.customer.fullName}`, margin, 80);
  doc.text(`Teléfono: ${data.customer.phone}`, margin, 90);
  if (data.customer.email) {
    doc.text(`Email: ${data.customer.email}`, margin, 100);
  }
  if (data.customer.address) {
    doc.text(`Dirección: ${data.customer.address}`, margin, 110);
  }

  // Línea divisoria
  doc.line(margin, 120, pageWidth - margin, 120);

  // Detalles del producto
  doc.setFontSize(14);
  doc.setTextColor("#555");
  doc.text("Detalles del Producto:", margin, 130);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Producto: ${data.product.name}`, margin, 140);
  doc.text(`Cantidad: ${data.product.quantity}`, margin, 150);
  doc.text(`Precio por unidad: ${formatCurrency(data.product.price)}`, margin, 160);

  // Totales
  doc.line(margin, 170, pageWidth - margin, 170);
  doc.setFontSize(14);
  doc.setTextColor("#555");
  doc.text("Totales:", margin, 180);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Subtotal: ${formatCurrency(data.subtotal)}`, margin, 190);
  doc.text(`IGV (18%): ${formatCurrency(data.igv)}`, margin, 200);
  doc.text(`Total: ${formatCurrency(data.total)}`, margin, 210);

  // Guardar el PDF
  doc.save(`recibo-${data.receiptNumber}.pdf`);
}