export interface Customer {
  fullName: string;
  phone: string;
  email: string;
  address?: string;
}

export interface SaleProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: string;
  customer: Customer;
  product: SaleProduct;
  subtotal: number;
  igv: number;
  total: number;
  date: Date;
}