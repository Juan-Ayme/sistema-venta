"use client";

import { Card } from "@/components/ui/card";
import SalesOverview from "@/components/sales/SalesOverview";
import SalesHistory from "@/components/sales/SalesHistory";
import NewSale from "@/components/sales/NewSale";

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sales</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <NewSale />
        </Card>

        <Card className="p-6">
          <SalesOverview />
        </Card>
        
        <Card className="p-6">
          <SalesHistory />
        </Card>
      </div>
    </div>
  );
}