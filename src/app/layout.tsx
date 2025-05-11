// src/app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/context/language-context';
import { AuthProvider } from '@/context/auth-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import LoginBonusPopupWrapper from '@/components/shared/login-bonus-popup-wrapper'; 
import './globals.css';
// Removed GeistSans import as per new font requirement


export const metadata: Metadata = {
  title: 'Bajibuz - Bangladesh\'s Most Trusted Online Casino',
  description: 'বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন বাজির জায়গা (Bangladesh\'s Most Trusted Online Casino Platform)',
  manifest: '/manifest.json', 
  icons: {
    icon: '/icons/icon-192x192.png', 
    apple: '/icons/icon-192x192.png', 
    shortcut: '/favicon.ico', 
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#32CD32' },
    { media: '(prefers-color-scheme: dark)', color: '#1A202C' }, 
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning={true}> {/* Removed GeistSans.variable */}
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
              <LoginBonusPopupWrapper /> 
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

