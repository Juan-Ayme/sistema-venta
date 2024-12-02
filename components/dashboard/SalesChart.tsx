"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Lunes", value: 100 },
  { name: "Martes", value: 300 },
  { name: "Miercoles", value: 200 },
  { name: "Jueves", value: 278 },
  { name: "Viernes", value: 389 },
  { name: "Sabado", value: 349 },
  { name: "Domingo", value: 278 },
];

export default function SalesChart() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Total Ventas</h2>
        <div className="text-sm text-muted-foreground">Semanal</div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value) => `S/${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}