
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import DailySpinPopupWrapper from '@/components/shared/daily-spin-popup-wrapper';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/context/language-context';
import { AuthProvider } from '@/context/auth-context'; // Import AuthProvider

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'bengali'], 
});

export const metadata: Metadata = {
  title: 'Bajibuz - বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন বাজির জায়গা',
  description: 'Bajibuz is Bangladesh’s most trusted online casino platform. Play slots, roulette, poker, and more. Secure payments with bKash, Nagad, Rocket. Get welcome bonus!',
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1A2E35' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bajibuz',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} flex flex-col min-h-screen`} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false} 
          storageKey="bajibuz-theme"
        >
          <LanguageProvider>
            <AuthProvider> {/* Wrap with AuthProvider */}
              <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
              <DailySpinPopupWrapper />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
