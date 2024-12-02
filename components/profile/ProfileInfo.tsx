"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileInfo() {
  return (
    <div className="text-center">
      <Avatar className="w-24 h-24 mx-auto mb-4">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-semibold">Gerente</h2>
      <p className="text-sm text-muted-foreground">John Leo Vargas Lopez</p>
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">john.doe@example.com</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Ubicacion</p>
          <p className="font-medium">Carmen Alto, Ayacucho</p>
        </div>
      </div>
    </div>
  );
}