"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const TEST_CREDENTIALS = {
    username: "admin",
    password: "admin123"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.username === TEST_CREDENTIALS.username && 
        formData.password === TEST_CREDENTIALS.password) {
      toast({
        title: "Login Exitoso",
        description: "Bienvenido al sistema",
        duration: 2000,
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Credenciales incorrectas",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        {/* Logo SVG */}
        <div className="flex justify-center mb-8">
          <svg
            className="w-16 h-16 text-purple-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">Sistema de Ventas</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="pl-10"
                placeholder="Ingrese su usuario"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10"
                placeholder="Ingrese su contraseña"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">
            <LogIn className="w-4 h-4 mr-2 text-white" />
            <p className = "text-white">Ingresar</p>
          </Button>
        </form>
      </div>
    </div>
  );
}