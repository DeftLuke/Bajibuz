import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownToLine, ArrowUpFromLine, Banknote, Landmark } from "lucide-react";
import PaymentOptions from "./payment-options"; // Assumes PaymentOptions is updated or used appropriately

export default function WalletSection() {
  const balance = {
    currency: "BDT",
    amount: 1500.75,
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">আমার ওয়ালেট (My Wallet)</CardTitle>
        <CardDescription>আপনার ব্যালেন্স দেখুন, ফান্ড জমা দিন এবং জেতা টাকা উত্তোলন করুন। (View your balance, deposit funds, and withdraw winnings.)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Card className="bg-primary/10 border-primary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">বর্তমান ব্যালেন্স (Current Balance)</CardTitle>
            <Banknote className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {balance.currency} {balance.amount.toLocaleString("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-primary/80">
              সর্বশেষ আপডেট: এইমাত্র (Last updated: Just now)
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Deposit Section */}
          <div className="space-y-4 p-6 rounded-lg border border-border bg-card-foreground/5">
            <h3 className="text-xl font-semibold flex items-center"><ArrowDownToLine className="mr-2 h-5 w-5 text-primary" /> টাকা জমা দিন (Deposit Funds)</h3>
            <div>
              <Label htmlFor="depositAmount">পরিমাণ ({balance.currency}) (Amount)</Label>
              <Input id="depositAmount" type="number" placeholder="যেমন: ৫০০ (e.g., 500)" className="mt-1 bg-background" />
            </div>
            <PaymentOptions /> {/* This component should list bKash, Nagad, Rocket, Bank */}
            <Button className="w-full">ডিপোজিট করুন (Proceed to Deposit)</Button>
          </div>

          {/* Withdraw Section */}
          <div className="space-y-4 p-6 rounded-lg border border-border bg-card-foreground/5">
            <h3 className="text-xl font-semibold flex items-center"><ArrowUpFromLine className="mr-2 h-5 w-5 text-primary" /> টাকা উত্তোলন করুন (Withdraw Winnings)</h3>
            <div>
              <Label htmlFor="withdrawAmount">পরিমাণ ({balance.currency}) (Amount)</Label>
              <Input id="withdrawAmount" type="number" placeholder="যেমন: ২০০ (e.g., 200)" className="mt-1 bg-background" />
            </div>
            <p className="text-sm text-muted-foreground">আপনার উত্তোলনের মাধ্যম নির্বাচন করুন: (Select your withdrawal method:)</p>
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  {/* Placeholder for bKash icon */}
                  bKash
                </Button>
                <Button variant="outline" className="w-full">
                  {/* Placeholder for Nagad icon */}
                  Nagad
                </Button>
                <Button variant="outline" className="w-full">
                  {/* Placeholder for Rocket icon */}
                  Rocket
                </Button>
                <Button variant="outline" className="w-full">
                  <Landmark className="mr-2 h-4 w-4" />
                  ব্যাংক ট্রান্সফার (Bank Transfer)
                </Button>
            </div>
            <Button className="w-full">উত্তোলনের অনুরোধ (Request Withdrawal)</Button>
            <p className="text-xs text-muted-foreground mt-2">উত্তোলন প্রক্রিয়া করতে ২৪ ঘন্টা পর্যন্ত সময় লাগতে পারে। (Withdrawals may take up to 24 hours to process.)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
