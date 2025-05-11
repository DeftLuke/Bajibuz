
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const { language } = useLanguage();
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl text-muted-foreground">
                {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
            </p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'bn' 
              ? `স্বাগতম, ${currentUser.name}! আপনার অ্যাকাউন্ট এখানে পরিচালনা করুন।` 
              : `Welcome back, ${currentUser.name}! Manage your account here.`}
          </p>
        </div>
        {currentUser.avatar ? (
            <Image src={currentUser.avatar} alt={currentUser.name} width={40} height={40} className="rounded-full" />
        ) : (
            <UserCircle className="h-10 w-10 text-primary" />
        )}
      </header>
      
      <Card className="shadow-xl">
        <CardContent className="p-0 md:p-2">
          <DashboardClient />
        </CardContent>
      </Card>
    </div>
  );
}
