"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, DollarSign, UserCircle } from "lucide-react";
import SidebarLink from "./SidebarLink";

const routes = [
  {
    label: "Panel",
    icon: LayoutDashboard,
    href: "/",
    color: "text-purple-500",
  },
  {
    label: "Productos",
    icon: Package,
    href: "/productos",
    color: "text-gray-500",
  },
  {
    label: "Ventas",
    icon: DollarSign,
    href: "/ventas",
    color: "text-gray-500",
  },
  {
    label: "Perfil",
    icon: UserCircle,
    href: "/perfil",
    color: "text-gray-500",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">Sistema de Ventas</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <SidebarLink
              key={route.href}
              href={route.href}
              label={route.label}
              icon={route.icon}
              color={route.color}
              isActive={pathname === route.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}