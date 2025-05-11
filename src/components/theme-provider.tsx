// src/components/theme-provider.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = "light" | "dark-teal";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string; // Added to match next-themes like behavior, usually 'class'
  enableSystem?: boolean; // Added for completeness, though not fully implemented here
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "bajibuz-theme",
  attribute = "class", // Default to 'class' for applying to <html> or <body>
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme); // Initialize with defaultTheme
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Effect to load theme from localStorage once client is confirmed
  useEffect(() => {
    if (isClient) {
      const storedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark-teal')) {
        setTheme(storedTheme);
      }
    }
  }, [isClient, storageKey]); // Removed defaultTheme from deps as it's stable if not a prop

  // Effect to apply theme to DOM and update localStorage
  useEffect(() => {
    if (isClient) { 
      const element = document.documentElement; // Assumes 'class' attribute on <html>

      if (attribute === 'class') {
        element.classList.remove("light", "dark-teal");
        element.classList.add(theme);
      } else {
        element.setAttribute(attribute, theme);
      }
      localStorage.setItem(storageKey, theme);
    }
  }, [theme, isClient, storageKey, attribute]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
