
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSection from "./profile-section";
import WalletSection from "./wallet-section";
import TransactionHistorySection from "./transaction-history-section";
import { User, Wallet, History } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/language-context";

export function DashboardClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  const TABS_CONFIG = [
    { value: "profile", labelEn: "Profile", labelBn: "প্রোফাইল", icon: User },
    { value: "wallet", labelEn: "Wallet", labelBn: "ওয়ালেট", icon: Wallet },
    { value: "history", labelEn: "Transaction History", labelBn: "লেনদেনের ইতিহাস", icon: History },
  ];

  // Determine the active tab from URL or default to 'profile'
  const getActiveTabFromUrl = () => {
    const tabFromUrl = searchParams.get('tab');
    return tabFromUrl && TABS_CONFIG.find(t => t.value === tabFromUrl) ? tabFromUrl : 'profile';
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl());

  // Update activeTab if searchParams change from external navigation
  useEffect(() => {
    setActiveTab(getActiveTabFromUrl());
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('tab', value);
    const query = current.toString();
    // Using replace to avoid multiple history entries for tab switching
    router.replace(`${pathname}?${query}`, { scroll: false });
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 bg-card-foreground/5 p-1 h-auto">
        {TABS_CONFIG.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center gap-2"
          >
            <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            {language === 'bn' ? tab.labelBn : tab.labelEn}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="p-1 md:p-4 lg:p-6">
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
