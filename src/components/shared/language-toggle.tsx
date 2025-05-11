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

const LANGUAGE_STORAGE_KEY = 'bajibuz_language_preference';

export default function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState("EN"); // Default to English
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // On component mount, try to load language from localStorage
    const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLang && (storedLang === 'EN' || storedLang === 'BN')) {
      setCurrentLang(storedLang);
    }
  }, []);


  const setLanguage = (lang: string) => {
    if (!isClient) return;
    setCurrentLang(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang); // Store preference
    
    let toastMessage = "";
    let toastTitle = "Language Selection";
    if (lang === 'EN') {
      toastMessage = "Language set to English. The primary UI is in English.";
      toastTitle = "Language Selection";
    } else if (lang === 'BN') {
      toastMessage = "ভাষা বাংলায় পরিবর্তন করা হয়েছে। সম্পূর্ণ বাংলা সমর্থন এখনো উন্নয়নের অধীনে। কিছু প্রচারমূলক বিষয়বস্তু বাংলায় দেখা যাবে।";
      toastTitle = "ভাষা নির্বাচন";
    }

    toast({
      title: toastTitle,
      description: toastMessage,
      duration: 7000, 
    });
    // Placeholder for actual language change logic using next-i18next or similar.
    // This would typically involve changing the locale in the router or a global state.
    // For now, it might involve a page reload if using next-i18next with path-based localization.
    // e.g., router.push(router.pathname, router.asPath, { locale: lang });
  };

  if (!isClient) {
    // Render a placeholder or null on the server to avoid hydration mismatch
    // The button will be disabled and show a generic icon until client-side hydration
    return (
      <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" disabled aria-label="Toggle language">
        <Languages className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" aria-label={`Current language: ${currentLang}. Toggle language.`}>
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        <DropdownMenuItem 
          onClick={() => setLanguage("EN")} 
          className={`hover:bg-accent focus:bg-accent cursor-pointer ${currentLang === 'EN' ? 'bg-accent text-accent-foreground' : ''}`}
          aria-selected={currentLang === 'EN'}
        >
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("BN")} 
          className={`hover:bg-accent focus:bg-accent cursor-pointer ${currentLang === 'BN' ? 'bg-accent text-accent-foreground' : ''}`}
          aria-selected={currentLang === 'BN'}
        >
          বাংলা (BN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
