export const IGV_RATE = 0.18; // 18% IGV rate for Peru

export function calculateSubtotal(price: number, quantity: number): number {
  return price * quantity;
}

export function calculateIGV(subtotal: number): number {
  return subtotal * IGV_RATE;
}

export function calculateTotal(subtotal: number, igv: number): number {
  return subtotal + igv;
}

export function formatCurrency(amount: number): string {
  const formatted = new Intl.NumberFormat('es-PE', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
  return `S/ ${formatted}`;
}