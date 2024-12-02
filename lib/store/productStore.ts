import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/types/products';

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'sales'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  incrementSales: (id: number, quantity: number) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [
        {
          id: 1,
          name: "FundFlex - Kit UI de Gestión Financiera",
          price: 49.99,
          description: "Kit UI completo para aplicaciones de gestión financiera",
          image: "/products/ultimate-ui.png",
          sales: 1246
        },
        {
          id: 2,
          name: "Rently - Kit UI de Aplicación de Alquiler",
          price: 39.99,
          description: "Kit UI profesional para aplicaciones de alquiler",
          image: "/products/pro-ui.png",
          sales: 892
        },
        {
          id: 3,
          name: "Taskly - Kit UI de Gestión de Tareas",
          price: 29.99,
          description: "Kit UI elegante para aplicaciones de gestión de tareas",
          image: "/products/elegant-ui.png",
          sales: 754
        },
        {
          id: 4,
          name: "DashPro - Kit UI de Panel de Control",
          price: 59.99,
          description: "Kit UI profesional para paneles de control",
          image: "/products/pixel-perfect.png",
          sales: 1102
        }
      ],
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { 
              ...product, 
              id: Math.max(...state.products.map(p => p.id), 0) + 1, 
              sales: 0 
            }
          ]
        })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          )
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id)
        })),
      incrementSales: (id, quantity) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id 
              ? { ...product, sales: product.sales + quantity }
              : product
          )
        })),
    }),
    {
      name: 'product-storage',
    }
  )
);