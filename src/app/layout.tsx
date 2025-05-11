// src/app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/context/language-context';
import { AuthProvider } from '@/context/auth-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import DailySpinPopupWrapper from '@/components/shared/daily-spin-popup-wrapper';
import './globals.css';
// import localFont from 'next/font/local'; // Commented out to prevent error

// Define geistSans using next/font/local
// NOTE: Actual font files are not being added. If these paths are incorrect or files are missing,
// the site will fall back to system fonts (Arial, Helvetica, sans-serif as per globals.css),
// but the `geistSans.variable` will be defined, fixing the runtime error.

// Fallback for geistSans if font files are not present, to prevent build error.
// The CSS `var(--font-geist-sans)` will be undefined, and font-family will use its fallbacks.
const geistSans = {
  variable: '', // Effectively removes the custom font class, letting fallbacks in CSS take over.
};

// This was the original definition causing the "Font file not found" error
// const geistSans = localFont({
//   src: [
//     {
//       path: '../../public/fonts/Geist-Regular.woff2', // Example path
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/Geist-Medium.woff2', // Example path
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/Geist-Bold.woff2', // Example path
//       weight: '700',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-geist-sans', // This CSS variable is used in globals.css
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: 'Bajibuz - Bangladesh\'s Most Trusted Online Casino',
  description: 'বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন বাজির জায়গা (Bangladesh\'s Most Trusted Online Casino Platform)',
  manifest: '/manifest.json', // Assuming manifest.json is in /public
  icons: {
    icon: '/icons/icon-192x192.png', // General purpose icon
    apple: '/icons/icon-192x192.png', // For Apple devices
    shortcut: '/favicon.ico', // Example for shortcut icon
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#32CD32' },
    { media: '(prefers-color-scheme: dark)', color: '#1A202C' }, // Example dark theme color from dark-teal
  ],
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
            <AuthProvider>
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
