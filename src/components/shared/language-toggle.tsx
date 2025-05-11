// src/components/shared/language-toggle.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";


export default function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState("EN"); // Default to English
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app with next-i18next, you would get the current language from the router or context.
    // For now, we'll just keep it client-side.
  }, []);


  const setLanguage = (lang: string) => {
    if (!isClient) return;
    setCurrentLang(lang);
    
    let toastMessage = "";
    if (lang === 'EN') {
      toastMessage = "Language set to English. The primary UI is in English.";
    } else if (lang === 'BN') {
      toastMessage = "ভাষা বাংলায় পরিবর্তন করা হয়েছে। সম্পূর্ণ বাংলা সমর্থন এখনো উন্নয়নের অধীনে। কিছু প্রচারমূলক বিষয়বস্তু বাংলায় দেখা যাবে। (Language changed to Bengali. Full Bengali support is still under development. Some promotional content will be visible in Bengali.)";
    }

    toast({
      title: "ভাষা নির্বাচন (Language Selection)",
      description: toastMessage,
      duration: 7000, 
    });
    // Placeholder for actual language change logic using next-i18next or similar.
    // This would typically involve changing the locale in the router or a global state.
  };

  if (!isClient) {
    // Render a placeholder or null on the server to avoid hydration mismatch
    return (
      <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" disabled>
        <Languages className="h-5 w-5" />
        <span className="sr-only">Toggle language</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Toggle language ({currentLang})</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        <DropdownMenuItem onClick={() => setLanguage("EN")} className="hover:bg-accent focus:bg-accent cursor-pointer">
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("BN")} className="hover:bg-accent focus:bg-accent cursor-pointer">
          বাংলা (BN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
