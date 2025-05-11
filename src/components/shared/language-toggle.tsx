
"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, type Language as AppLanguage } from '@/context/language-context';

export default function LanguageToggle() {
  const { language, setLanguage: setGlobalLanguage } = useLanguage();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSetLanguage = (lang: AppLanguage) => {
    if (!isClient) return;
    
    setGlobalLanguage(lang);
    
    let toastMessage = "";
    let toastTitle = "";

    if (lang === 'en') {
      toastMessage = "Language set to English. Some content is bilingual.";
      toastTitle = "Language Selection";
    } else if (lang === 'bn') {
      toastMessage = "ভাষা বাংলায় পরিবর্তন করা হয়েছে। কিছু বিষয়বস্তু বাংলায় দেখা যাবে। সম্পূর্ণ বাংলা সমর্থন শীঘ্রই আসছে।";
      toastTitle = "ভাষা নির্বাচন";
    }

    toast({
      title: toastTitle,
      description: toastMessage,
      duration: 7000, 
    });
  };

  if (!isClient) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" disabled aria-label="Toggle language">
        <Languages className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" aria-label={`Current language: ${language.toUpperCase()}. Toggle language.`}>
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        <DropdownMenuItem 
          onClick={() => handleSetLanguage("en")} 
          className={`hover:bg-accent focus:bg-accent cursor-pointer ${language === 'en' ? 'bg-accent text-accent-foreground' : ''}`}
          aria-selected={language === 'en'}
        >
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleSetLanguage("bn")} 
          className={`hover:bg-accent focus:bg-accent cursor-pointer ${language === 'bn' ? 'bg-accent text-accent-foreground' : ''}`}
          aria-selected={language === 'bn'}
        >
          বাংলা (BN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
