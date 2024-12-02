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

const COLLECTION_NAME = 'customers';

export interface Customer {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  address?: string;
  totalPurchases: number;
  createdAt?: string;
  updatedAt?: string;
}

export const createCustomer = async (data: Omit<Customer, 'id' | 'totalPurchases'>) => {
  return createDocument(COLLECTION_NAME, { ...data, totalPurchases: 0 });
};

export const updateCustomer = async (id: string, data: Partial<Customer>) => {
  return updateDocument(COLLECTION_NAME, id, data);
};

export const deleteCustomer = async (id: string) => {
  return deleteDocument(COLLECTION_NAME, id);
};

export const getCustomer = async (id: string) => {
  return getDocument(COLLECTION_NAME, id) as Promise<Customer>;
};

export const getCustomers = async (constraints: QueryConstraint[] = []) => {
  return getDocuments(COLLECTION_NAME, [
    orderBy('createdAt', 'desc'),
    ...constraints
  ]) as Promise<Customer[]>;
};

export const searchCustomers = async (searchTerm: string) => {
  return getDocuments(COLLECTION_NAME, [
    where('fullName', '>=', searchTerm),
    where('fullName', '<=', searchTerm + '\uf8ff')
  ]) as Promise<Customer[]>;
};