
"use client";
import Link from 'next/link';
import { Logo } from './logo';
import { useLanguage } from '@/context/language-context';
import { useState, useEffect } from 'react'; 
import { Button } from '@/components/ui/button';
import { MessageSquare, Facebook, Twitter, Instagram, Youtube, Rss } from 'lucide-react';

const footerLinkDetails = [
  { href: '/about', labelEn: 'About Bajibuz', labelBn: 'বাজিবাজ সম্পর্কে' },
  { href: '/terms', labelEn: 'Terms of Service', labelBn: 'ব্যবহারের শর্তাবলী' },
  { href: '/privacy', labelEn: 'Privacy Policy', labelBn: 'গোপনীয়তা নীতি' },
  { href: '/responsible-gaming', labelEn: 'Responsible Play', labelBn: 'দায়িত্বশীল গেমিং' },
  { href: '/faq', labelEn: 'FAQ', labelBn: 'সাধারণ জিজ্ঞাসা' },
  { href: '/contact', labelEn: 'Contact Us', labelBn: 'যোগাযোগ করুন' },
  { href: '/promotions', labelEn: 'Promotions', labelBn: 'প্রমোশন'},
  { href: '/leaderboard', labelEn: 'Leaderboard', labelBn: 'লিডারবোর্ড'},
];

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/bajibuz' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/bajibuz' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/bajibuz' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/bajibuz' },
    { name: 'Blog', icon: Rss, href: '/blog' }, // Assuming a blog exists or will exist
];

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { language } = useLanguage();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/40 bg-background/95 mt-auto">
      <div className="container mx-auto max-w-screen-2xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Bajibuz */}
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="Bajibuz Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'bn' ? 'বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন বাজির জায়গা' : "Bangladesh's Most Trusted Online Casino Platform"}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'bn' ? 'নিরাপদ, সুরক্ষিত এবং বিনোদনমূলক গেমিং অভিজ্ঞতা।' : 'Safe, secure, and entertaining gaming experiences.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">
              {language === 'bn' ? 'দ্রুত লিঙ্ক' : 'Quick Links'}
            </h3>
            <ul className="space-y-2.5">
              {footerLinkDetails.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {language === 'bn' ? link.labelBn : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">
              {language === 'bn' ? 'সহায়তা ও তথ্য' : 'Support & Info'}
            </h3>
            <ul className="space-y-2.5">
              {footerLinkDetails.slice(4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {language === 'bn' ? link.labelBn : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Live Chat */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">
              {language === 'bn' ? 'যোগাযোগ ও সহায়তা' : 'Contact & Support'}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {language === 'bn' ? 'সাহায্য প্রয়োজন? আমাদের সাথে যোগাযোগ করুন!' : 'Need help? Get in touch with us!'}
            </p>
            <Button asChild variant="default" className="w-full sm:w-auto mb-4">
              <Link href="/support">
                <MessageSquare className="mr-2 h-5 w-5" />
                {language === 'bn' ? 'লাইভ চ্যাট' : 'Live Chat'}
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Email: <a href="mailto:support@bajibuz.com" className="hover:text-primary">support@bajibuz.com</a>
            </p>
             <div className="mt-4 flex space-x-3">
                {socialLinks.map(social => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label={social.name}>
                        <social.icon className="h-5 w-5"/>
                    </a>
                ))}
            </div>
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
