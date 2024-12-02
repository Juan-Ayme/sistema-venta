import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Sale } from '@/lib/types/sales';

interface SaleStore {
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  getTotalSales: () => number;
  getTotalTransactions: () => number;
}

export const useSaleStore = create<SaleStore>()(
  persist(
    (set, get) => ({
      sales: [],
      addSale: (sale) =>
        set((state) => ({
          sales: [
            {
              ...sale,
              id: Math.random().toString(36).substr(2, 9),
              date: new Date()
            },
            ...state.sales
          ]
        })),
      getTotalSales: () => {
        return get().sales.reduce((total, sale) => total + sale.total, 0);
      },
      getTotalTransactions: () => {
        return get().sales.length;
      },
    }),
    {
      name: 'sale-storage',
    }
  )
);