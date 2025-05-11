import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Geist_Mono can be removed if not used for mono spaced code blocks.
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import DailySpinPopupWrapper from '@/components/shared/daily-spin-popup-wrapper';
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'bengali'], 
});

// If Geist_Mono is not actively used for <pre> or <code> tags styled with it, 
// it can be removed to save a font load.
// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Bajibuz - বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন বাজির জায়গা',
  description: 'Bajibuz is Bangladesh’s most trusted online casino platform. Play slots, roulette, poker, and more. Secure payments with bKash, Nagad, Rocket. Get welcome bonus!',
  manifest: '/manifest.json', // Link to the manifest file
  themeColor: [ // Add theme color for PWA theming
    { media: '(prefers-color-scheme: light)', color: '#ffffff' }, // White for light theme
    { media: '(prefers-color-scheme: dark)', color: '#1A2E35' }, // Dark Teal for dark theme (example dark teal)
  ],
  appleWebApp: { // iOS specific PWA settings
    capable: true,
    statusBarStyle: 'default',
    title: 'Bajibuz',
    // startupImage: [...] // Optional: startup images for different iOS devices
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Removed geistMono from className if not used */}
      <body className={`${geistSans.variable} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Default to light theme as requested
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
