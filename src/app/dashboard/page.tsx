import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export const metadata = {
  title: "User Dashboard - DeshiSpin",
  description: "Manage your profile, wallet, and view transaction history.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Player! Manage your account here.</p>
        </div>
        {/* Placeholder for user avatar or quick actions */}
        <UserCircle className="h-10 w-10 text-primary" />
      </header>
      
      <Card className="shadow-xl">
        <CardContent className="p-0 md:p-2"> {/* Remove padding for tabs to control it internally */}
          <DashboardClient />
        </CardContent>
      </Card>
    </div>
  );
}
