import WalletSection from "@/components/dashboard/wallet-section";
import { Card, CardContent } from "@/components/ui/card";
import { WalletIcon } from "lucide-react";

export const metadata = {
  title: "My Wallet - Bajibuz",
  description: "Manage your funds, deposit with bKash, Nagad, Rocket, and withdraw winnings on Bajibuz.",
};

export default function WalletPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">আমার ওয়ালেট (My Wallet)</h1>
          <p className="text-muted-foreground">আপনার ফান্ড, ডিপোজিট এবং উইথড্রয়াল পরিচালনা করুন। (Manage your funds, deposits, and withdrawals.)</p>
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
