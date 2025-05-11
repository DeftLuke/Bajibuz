import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowDownToLine, ArrowUpFromLine, Banknote } from "lucide-react";
import PaymentOptions from "./payment-options";

export default function WalletSection() {
  // Placeholder data
  const balance = {
    currency: "BDT",
    amount: 1500.75,
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">My Wallet</CardTitle>
        <CardDescription>View your balance, deposit funds, and withdraw winnings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Card className="bg-primary/10 border-primary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Current Balance</CardTitle>
            <Banknote className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {balance.currency} {balance.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-primary/80">
              Last updated: Just now
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Deposit Section */}
          <div className="space-y-4 p-6 rounded-lg border border-border bg-card-foreground/5">
            <h3 className="text-xl font-semibold flex items-center"><ArrowDownToLine className="mr-2 h-5 w-5 text-primary" /> Deposit Funds</h3>
            <div>
              <Label htmlFor="depositAmount">Amount ({balance.currency})</Label>
              <Input id="depositAmount" type="number" placeholder="e.g., 500" className="mt-1 bg-background" />
            </div>
            <PaymentOptions />
            <Button className="w-full">Proceed to Deposit</Button>
          </div>

          {/* Withdraw Section */}
          <div className="space-y-4 p-6 rounded-lg border border-border bg-card-foreground/5">
            <h3 className="text-xl font-semibold flex items-center"><ArrowUpFromLine className="mr-2 h-5 w-5 text-primary" /> Withdraw Winnings</h3>
            <div>
              <Label htmlFor="withdrawAmount">Amount ({balance.currency})</Label>
              <Input id="withdrawAmount" type="number" placeholder="e.g., 200" className="mt-1 bg-background" />
            </div>
            {/* Simplified payment options for withdrawal or selection */}
             <p className="text-sm text-muted-foreground">Select your withdrawal method:</p>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="flex-1 min-w-[100px]">bKash</Button>
                <Button variant="outline" className="flex-1 min-w-[100px]">Nagad</Button>
                <Button variant="outline" className="flex-1 min-w-[100px]">Rocket</Button>
            </div>
            <Button className="w-full">Request Withdrawal</Button>
            <p className="text-xs text-muted-foreground mt-2">Withdrawals may take up to 24 hours to process.</p>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
}
