"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSection from "./profile-section";
import WalletSection from "./wallet-section";
import TransactionHistorySection from "./transaction-history-section";
import { User, Wallet, History, CreditCard } from "lucide-react";

export function DashboardClient() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6 bg-card-foreground/5 p-1 h-auto">
        <TabsTrigger value="profile" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <User className="mr-2 h-5 w-5" /> Profile
        </TabsTrigger>
        <TabsTrigger value="wallet" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <Wallet className="mr-2 h-5 w-5" /> Wallet
        </TabsTrigger>
        <TabsTrigger value="history" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <History className="mr-2 h-5 w-5" /> Transaction History
        </TabsTrigger>
      </TabsList>
      <div className="p-2 md:p-6">
        <TabsContent value="profile">
          <ProfileSection />
        </TabsContent>
        <TabsContent value="wallet">
          <WalletSection />
        </TabsContent>
        <TabsContent value="history">
          <TransactionHistorySection />
        </TabsContent>
      </div>
    </Tabs>
  );
}
