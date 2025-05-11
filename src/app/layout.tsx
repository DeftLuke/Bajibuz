import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import DailySpinPopupWrapper from '@/components/shared/daily-spin-popup-wrapper';
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'bengali'], // Ensure bengali subset is included
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bajibuz - বাংলার প্রথম বিশ্বস্ত অনলাইন ক্যাসিনো',
  description: 'Bajibuz is Bangladesh’s most trusted online casino. Play slots, roulette, poker, and more. Enjoy secure payments with bKash, Nagad, Rocket. Get 100% welcome bonus!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false} 
          storageKey="bajibuz-theme"
        >
          <div className="flex flex-col flex-1"> {/* Wrapper for consistent full height */}
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <DailySpinPopupWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
