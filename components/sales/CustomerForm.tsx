"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Customer } from "@/lib/types/sales";

interface CustomerFormProps {
  customer: Customer;
  onChange: (customer: Customer) => void;
}

export default function CustomerForm({ customer, onChange }: CustomerFormProps) {
  const handleChange = (field: keyof Customer) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...customer,
      [field]: e.target.value,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Información del cliente</h3>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Nombre Completo *</Label>
          <Input
            id="fullName"
            value={customer.fullName}
            onChange={handleChange("fullName")}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Numero de Celular *</Label>
          <Input
            id="phone"
            value={customer.phone}
            onChange={handleChange("phone")}
            placeholder="+51 954613521"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={customer.email}
            onChange={handleChange("email")}
            placeholder="john@example.com"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Dirección de domicilio  </Label>
          <Input
            id="address"
            value={customer.address}
            onChange={handleChange("address")}
            placeholder="A 50 Carmen Alto, Ayacucho"
          />
        </div>
      </div>
    </div>
  );
}