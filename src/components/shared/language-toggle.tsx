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
  const [currentLang, setCurrentLang] = useState("EN");
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const setLanguage = (lang: string) => {
    if (!isClient) return;
    setCurrentLang(lang);
    // Placeholder for actual language change logic
    // For a real app, you'd use a library like next-intl or i18next here
    // and manage the locale state globally.
    toast({
      title: "Language Selection",
      description: `You selected ${lang === 'EN' ? 'English' : 'বাংলা'}. Full multilingual support is a demo feature and not yet implemented. The UI will remain in English.`,
      duration: 5000, 
    });
  };

  if (!isClient) {
    // Render a placeholder or null on the server to avoid hydration mismatch for currentLang
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
