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
  updateDocument,
  deleteDocument,
  getDocument,
  getDocuments 
} from './firestore';

const COLLECTION_NAME = 'products';

export interface Product {
  id?: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  sales: number;
  createdAt?: string;
  updatedAt?: string;
}

export const createProduct = async (data: Omit<Product, 'id' | 'sales'>) => {
  return createDocument(COLLECTION_NAME, { ...data, sales: 0 });
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  return updateDocument(COLLECTION_NAME, id, data);
};

export const deleteProduct = async (id: string) => {
  return deleteDocument(COLLECTION_NAME, id);
};

export const getProduct = async (id: string) => {
  return getDocument(COLLECTION_NAME, id) as Promise<Product>;
};

export const getProducts = async (constraints: QueryConstraint[] = []) => {
  return getDocuments(COLLECTION_NAME, [
    orderBy('createdAt', 'desc'),
    ...constraints
  ]) as Promise<Product[]>;
};

export const getPopularProducts = async (limit: number = 5) => {
  return getDocuments(COLLECTION_NAME, [
    orderBy('sales', 'desc'),
    ...Array(limit).fill(limit)
  ]) as Promise<Product[]>;
};