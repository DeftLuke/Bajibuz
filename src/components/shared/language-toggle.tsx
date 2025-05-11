"use client";

import { useState } from 'react';
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

  const toggleLanguage = (lang: string) => {
    setCurrentLang(lang);
    // Placeholder for actual language change logic
    // For a real app, you'd use a library like next-intl or i18next here
    toast({
      title: "Language Switched",
      description: `Language changed to ${lang === 'EN' ? 'English' : 'Bengali'}. (UI Demo)`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Languages className="h-5 w-5 mr-2" />
          {currentLang}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        <DropdownMenuItem onClick={() => toggleLanguage("EN")} className="hover:bg-accent focus:bg-accent">
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleLanguage("BN")} className="hover:bg-accent focus:bg-accent">
          বাংলা (BN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
