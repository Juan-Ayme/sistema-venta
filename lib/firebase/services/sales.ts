import {
  collection,
  query,
  where,
  orderBy,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import {
  createDocument,
  getDocument,
  getDocuments
} from './firestore';
import { updateProduct } from './products';
import { updateCustomer } from './customers';

const COLLECTION_NAME = 'sales';

export interface SaleItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id?: string;
  customerId: string;
  items: SaleItem[];
  subtotal: number;
  igv: number;
  total: number;
  receiptNumber?: string;
  createdAt?: string;
}

export const createSale = async (data: Omit<Sale, 'id' | 'receiptNumber'>) => {
  try {
    // Generate receipt number (YYYYMMDD-XXXX format)
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const receiptNumber = `${timestamp}-${random}`;

    // Create sale document
    const saleId = await createDocument(COLLECTION_NAME, {
      ...data,
      receiptNumber,
    });

    // Update product sales counts
    for (const item of data.items) {
      await updateProduct(item.productId, {
        sales: item.quantity,
      });
    }

    // Update customer total purchases
    await updateCustomer(data.customerId, {
      totalPurchases: data.total,
    });

    return saleId;
  } catch (error) {
    throw error;
  }
};

export const getSale = async (id: string) => {
  return getDocument(COLLECTION_NAME, id) as Promise<Sale>;
};

export const getSales = async (constraints: QueryConstraint[] = []) => {
  return getDocuments(COLLECTION_NAME, [
    orderBy('createdAt', 'desc'),
    ...constraints
  ]) as Promise<Sale[]>;
};

export const getCustomerSales = async (customerId: string) => {
  return getDocuments(COLLECTION_NAME, [
    where('customerId', '==', customerId),
    orderBy('createdAt', 'desc')
  ]) as Promise<Sale[]>;
};

export const getSalesByDateRange = async (startDate: Date, endDate: Date) => {
  return getDocuments(COLLECTION_NAME, [
    where('createdAt', '>=', startDate.toISOString()),
    where('createdAt', '<=', endDate.toISOString()),
    orderBy('createdAt', 'desc')
  ]) as Promise<Sale[]>;
};