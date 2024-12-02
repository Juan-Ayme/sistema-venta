"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function ProfileSettings() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "John Leo Vargas Lopez",
    email: "john.doe@example.com",
    location: "Carmen Alto, Ayacucho"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
      duration: 2000,
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Profile Settings</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}