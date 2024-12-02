"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  color: string;
  isActive: boolean;
}

export default function SidebarLink({
  href,
  label,
  icon: Icon,
  color,
  isActive,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-accent rounded-lg transition",
        isActive ? "bg-accent" : "transparent"
      )}
    >
      <div className="flex items-center flex-1">
        <Icon className={cn("h-5 w-5 mr-3", color)} />
        {label}
      </div>
    </Link>
  );
}