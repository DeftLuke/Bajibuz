
"use client";
import WalletSection from "@/components/dashboard/wallet-section";
import { Card, CardContent } from "@/components/ui/card";
import { WalletIcon } from "lucide-react";
import { useLanguage } from "@/context/language-context";

// export const metadata = { // Static or server-generated
//   title: "My Wallet - Bajibuz",
//   description: "Manage your funds, deposit with bKash, Nagad, Rocket, and withdraw winnings on Bajibuz.",
// };

export default function WalletPage() {
  const { language } = useLanguage();

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
      
      <Card className="shadow-xl">
        <CardContent className="p-0 md:p-6">
          <WalletSection />
        </CardContent>
      </Card>
    </div>
  );
}
