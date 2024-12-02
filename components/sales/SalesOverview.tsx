"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Enero", value: 1000 },
  { name: "Febrero", value: 2000 },
  { name: "Marzo", value: 1500 },
  { name: "Abril", value: 3000 },
  { name: "Mayo", value: 2500 },
  { name: "Junio", value: 4000 }
];

export default function SalesOverview() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Resumen de ventas</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8b5cf6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}