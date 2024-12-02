"use client";

import { DollarSign, Users, ShoppingCart, Package } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import SalesChart from "@/components/dashboard/SalesChart";
import { useProductStore } from "@/lib/store/productStore";
import { useSaleStore } from "@/lib/store/saleStore";
import AppLayout from "@/components/layout/AppLayout";

export default function DashboardContent() {
  const { products } = useProductStore();
  const { getTotalSales, getTotalTransactions } = useSaleStore();

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Panel Principal</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Ventas Totales"
            value={`S/${getTotalSales().toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4 text-purple-500" />}
          />
          <StatsCard
            title="Total Clientes"
            value={getTotalTransactions().toString()}
            icon={<Users className="h-4 w-4 text-purple-500" />}
          />
          <StatsCard
            title="Total Transacciones"
            value={getTotalTransactions().toString()}
            icon={<ShoppingCart className="h-4 w-4 text-purple-500" />}
          />
          <StatsCard
            title="Total Productos"
            value={products.length.toString()}
            icon={<Package className="h-4 w-4 text-purple-500" />}
          />
        </div>
        <SalesChart />
      </div>
    </AppLayout>
  );
}