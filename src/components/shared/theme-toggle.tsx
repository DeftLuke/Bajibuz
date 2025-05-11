// src/components/shared/theme-toggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark-teal:-rotate-90 dark-teal:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark-teal:rotate-0 dark-teal:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-accent focus:bg-accent cursor-pointer">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark-teal")} className="hover:bg-accent focus:bg-accent cursor-pointer">
          Dark Teal
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
