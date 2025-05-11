import Link from 'next/link';
import { Logo } from './logo';

const footerLinks = [
  { href: '/support', label: 'Help Center' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/responsible-gaming', label: 'Responsible Play' },
  { href: '/about', label: 'About Bajibuz' },
  { href: '/contact', label: 'Contact Us' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 mt-auto"> {/* Added mt-auto */}
      <div className="container mx-auto max-w-screen-2xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="Bajibuz Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              বাংলার প্রথম বিশ্বস্ত অনলাইন ক্যাসিনো
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0,3).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gold">Support & Info</h3>
            <ul className="space-y-2">
              {footerLinks.slice(3).map((link) => (
                <li key={link.label}>
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
            &copy; {currentYear} Bajibuz. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Please play responsibly. Gambling can be addictive. Must be 18+ to play.
          </p>
        </div>
      </div>
    </footer>
  );
}
