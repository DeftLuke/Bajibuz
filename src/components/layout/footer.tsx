
"use client";
import Link from 'next/link';
import { Logo } from './logo';
import { useLanguage } from '@/context/language-context';

const footerLinkDetails = [
  { href: '/support', labelEn: 'Help Center', labelBn: 'সহায়তা কেন্দ্র' },
  { href: '/terms', labelEn: 'Terms of Service', labelBn: 'ব্যবহারের শর্তাবলী' },
  { href: '/privacy', labelEn: 'Privacy Policy', labelBn: 'গোপনীয়তা নীতি' },
  { href: '/responsible-gaming', labelEn: 'Responsible Play', labelBn: 'দায়িত্বশীল গেমিং' },
  { href: '/about', labelEn: 'About Bajibuz', labelBn: 'বাজিবাজ সম্পর্কে' },
  { href: '/contact', labelEn: 'Contact Us', labelBn: 'যোগাযোগ করুন' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  const footerLinks = footerLinkDetails.map(link => ({
    ...link,
    label: language === 'bn' ? link.labelBn : link.labelEn
  }));


  return (
    <footer className="border-t border-border/40 bg-background/95 mt-auto">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="Bajibuz Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              {language === 'bn' ? 'বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন বাজির জায়গা' : "Bangladesh's Most Trusted Online Casino Platform"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gold">
              {language === 'bn' ? 'দ্রুত লিঙ্ক' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.slice(0,3).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gold">
              {language === 'bn' ? 'সহায়তা ও তথ্য' : 'Support & Info'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Bajibuz. {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'bn' 
              ? 'অনুগ্রহ করে দায়িত্বের সাথে খেলুন। জুয়া আসক্তি হতে পারে। খেলার জন্য বয়স ১৮+ হতে হবে।' 
              : 'Please play responsibly. Gambling can be addictive. Must be 18+ to play.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
