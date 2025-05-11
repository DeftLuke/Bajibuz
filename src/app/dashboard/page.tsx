
"use client";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import { useLanguage } from "@/context/language-context";

// export const metadata = { // Metadata should be static or server-generated
//   title: "User Dashboard - Bajibuz",
//   description: "Manage your profile, wallet, and view transaction history on Bajibuz.",
// };

export default function DashboardPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'bn' 
              ? 'স্বাগতম, খেলোয়াড়! আপনার অ্যাকাউন্ট এখানে পরিচালনা করুন।' 
              : 'Welcome back, Player! Manage your account here.'}
          </p>
        </div>
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
