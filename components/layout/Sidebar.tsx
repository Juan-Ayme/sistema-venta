"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, DollarSign, UserCircle, Menu } from "lucide-react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <button
        className="md:hidden p-4"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}></div>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:w-64`}>
        <div className="space-y-4 py-4 flex flex-col h-full">
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
      </div>
    </div>
  );
}