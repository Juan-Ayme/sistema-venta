"use client";

import { Card } from "@/components/ui/card";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileSettings from "@/components/profile/ProfileSettings";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-12">
        <Card className="p-6 md:col-span-4">
          <ProfileInfo />
        </Card>
        
        <Card className="p-6 md:col-span-8">
          <ProfileSettings />
        </Card>
      </div>
    </div>
  );
}