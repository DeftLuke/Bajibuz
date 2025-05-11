
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WalletSection from "@/components/dashboard/wallet-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WalletIcon, UserCheck, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";

export default function WalletPage() {
  const { language } = useLanguage();
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
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

  const getKycStatusText = (status: string | undefined) => {
    if (!status) return { text: language === 'bn' ? 'অজানা' : 'Unknown', variant: 'outline' as any, icon: ShieldAlert };
    switch (status) {
      case 'pending': return { text: language === 'bn' ? 'বিবেচনাধীন' : 'Pending', variant: 'secondary' as any, icon: ShieldAlert };
      case 'verified': return { text: language === 'bn' ? 'যাচাইকৃত' : 'Verified', variant: 'default' as any, icon: UserCheck };
      case 'rejected': return { text: language === 'bn' ? 'প্রত্যাখ্যাত' : 'Rejected', variant: 'destructive' as any, icon: ShieldAlert };
      case 'not_submitted': return { text: language === 'bn' ? 'জমা দেওয়া হয়নি' : 'Not Submitted', variant: 'outline' as any, icon: ShieldAlert };
      default: return { text: status, variant: 'outline' as any, icon: ShieldAlert };
    }
  };
  
  const kycInfo = getKycStatusText(currentUser.kycStatus);


  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'bn' ? 'আমার ওয়ালেট' : 'My Wallet'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'bn' 
              ? 'আপনার ফান্ড, ডিপোজিট এবং উইথড্রয়াল পরিচালনা করুন।' 
              : 'Manage your funds, deposits, and withdrawals.'}
          </p>
        </div>
         <WalletIcon className="h-10 w-10 text-primary" />
      </header>

      {currentUser.kycStatus !== 'verified' && (
        <Card className="border-destructive/50 bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center text-destructive-foreground">
              <ShieldAlert className="mr-2 h-5 w-5"/>
              {language === 'bn' ? 'কেওয়াইসি সম্পন্ন করুন' : 'Complete KYC Verification'}
            </CardTitle>
            <CardDescription className="text-destructive-foreground/80">
              {language === 'bn' ? 'সম্পূর্ণ কার্যকারিতা এবং উচ্চতর সীমা আনলক করতে আপনার অ্যাকাউন্ট যাচাই করুন।' : 'Verify your account to unlock full functionality and higher limits.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive-foreground/90 mb-1">
              {language === 'bn' ? 'আপনার বর্তমান কেওয়াইসি স্ট্যাটাস: ' : 'Your current KYC status: '}
              <Badge variant={kycInfo.variant} className="ml-1">{kycInfo.text}</Badge>
            </p>
            <Button variant="outline" size="sm" asChild className="bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90">
              <Link href="/dashboard?tab=profile">
                {language === 'bn' ? 'এখনই যাচাই করুন' : 'Verify Now'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
      
      <Card className="shadow-xl">
        <CardContent className="p-0 md:p-6">
          <WalletSection />
        </CardContent>
      </Card>
    </div>
  );
}
