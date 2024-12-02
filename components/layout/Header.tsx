"use client";

import { Bell, Mail, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store/useStore";
import { useToast } from "@/components/ui/use-toast";

export default function Header() {
  const router = useRouter();
  const { toast } = useToast();
  const { notifications, toggleNotifications } = useStore();

  const handleNotificationClick = () => {
    toggleNotifications();
    toast({
      title: notifications ? "Notificaciones deshabilitadas" : "Notificaciones habilitadas",
      duration: 2000,
    });
  };

  const handleMailClick = () => {
    toast({
      title: "Mensajes de apertura",
      description: "Tus mensajes aparecerán aquí pronto.",
      duration: 2000,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Cierre de sesión",
      description: "Se ha cerrado la sesión con éxito.",
      duration: 2000,
    });
    router.push("/login");
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 justify-end space-x-4">
        <Button variant="ghost" size="icon" onClick={handleMailClick}>
          <Mail className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
          <Bell className={`h-5 w-5 ${notifications ? "text-purple-500" : ""}`} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}