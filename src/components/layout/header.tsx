import Link from 'next/link';
import { 
  Home, User, Wallet, MessageSquare, Menu, LogIn, UserPlus, Search,
  Gift, Dices, UsersRound, Trophy, Ticket, AlignJustify, HelpCircle, Settings2, Replace // Placeholder for Sports, Lottery
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import LanguageToggle from '@/components/shared/language-toggle';
import ThemeToggle from '@/components/shared/theme-toggle';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Separator } from '../ui/separator';

const desktopTopNavItems = [
  { href: '/', label: 'Home' },
  { href: '/promotions', label: 'Promotions' },
  { href: '/faq', label: 'FAQ' },
  { href: '/support', label: 'Support' },
];

const gameCategoriesNav = [
  { href: '/games?category=slots', label: 'Slots', icon: Dices },
  { href: '/games?category=live-casino', label: 'Live Casino', icon: UsersRound },
  { href: '/games?category=table-games', label: 'Table Games', icon: AlignJustify }, // Replaced icon
  { href: '/games?category=sports', label: 'Sports', icon: Trophy }, // Placeholder for sports icon
  { href: '/games?category=lottery', label: 'Lottery', icon: Ticket }, // Placeholder for lottery icon
  { href: '/games?category=crash', label: 'Crash', icon: Replace }, // Using Replace as placeholder for Crash
];

const mobileMainMenuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/promotions', label: 'Promotions', icon: Gift },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/dashboard', label: 'Dashboard', icon: User },
    { href: '/wallet', label: 'My Wallet', icon: Wallet },
    { href: '/support', label: 'Support Center', icon: MessageSquare },
    { href: '/responsible-gaming', label: 'Responsible Gaming', icon: Settings2 }
];


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Main Header Row */}
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-4">
        <div className="flex items-center flex-1"> {/* Left section container */}
          <Link href="/" className="flex items-center space-x-2 mr-4 lg:mr-6" aria-label="Bajibuz Home">
            <Logo className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
            {desktopTopNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-2.5 py-2 lg:px-3 transition-colors hover:text-primary rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right section (Search & Auth Buttons) */}
        <div className="flex items-center space-x-1 lg:space-x-2">
          <ThemeToggle />
          <LanguageToggle />
          <div className="hidden md:flex items-center space-x-2"> {/* Auth for Desktop */}
            <Button variant="outline" size="sm" asChild>
              <Link href="/login"><LogIn className="mr-1.5 h-4 w-4" /> Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup"><UserPlus className="mr-1.5 h-4 w-4" />Sign Up</Link>
            </Button>
          </div>
        
          {/* Mobile: Menu Trigger */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-1">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card p-0 flex flex-col">
                <SheetHeader className="p-4 border-b border-border">
                  <SheetTitle asChild>
                    <Link href="/" className="inline-block">
                      <Logo className="h-7 w-auto" />
                    </Link>
                  </SheetTitle>
                  <SheetClose className="absolute right-3 top-3.5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" />
                </SheetHeader>
                
                <nav className="flex-grow overflow-y-auto p-4 space-y-5">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground px-2">Game Categories</p>
                    {gameCategoriesNav.map((item) => (
                      <SheetClose key={item.label} asChild>
                        <Link
                          href={item.href}
                          className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground"
                        >
                          <item.icon className="h-5 w-5 text-primary" />
                          <span>{item.label}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <Separator />
                  <div>
                      <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground px-2">Menu</p>
                      {mobileMainMenuItems.map((item) => (
                          <SheetClose key={item.label} asChild>
                          <Link
                              href={item.href}
                              className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground"
                          >
                              <item.icon className="h-5 w-5 text-primary" />
                              <span>{item.label}</span>
                          </Link>
                          </SheetClose>
                      ))}
                  </div>
                </nav>

                <div className="border-t border-border p-4 space-y-2.5">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login"><LogIn className="mr-2 h-4 w-4" /> Login</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/signup"><UserPlus className="mr-2 h-4 w-4" />Sign Up</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Row (Game Categories) - Desktop Only */}
      <nav className="hidden md:block border-t border-border/40 bg-card/50 shadow-sm">
        <div className="container mx-auto max-w-screen-2xl px-4">
            <ul className="flex items-center justify-center space-x-1 lg:space-x-2 h-12">
            {gameCategoriesNav.map((item) => (
                <li key={item.label}>
                <Link
                    href={item.href}
                    className="flex items-center space-x-1.5 px-2.5 py-2 lg:px-3 text-sm font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
                >
                    <item.icon className="h-4 w-4 lg:h-[1.10rem] lg:w-[1.10rem]" />
                    <span>{item.label}</span>
                </Link>
                </li>
            ))}
            </ul>
        </div>
      </nav>
    </header>
  );
}
