// src/components/layout/header.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, Menu, LogIn, UserPlus, Search,
  Gift, Dices, UsersRound, Trophy, Ticket, AlignJustify, HelpCircle, Settings2, Replace,
  Banknote, CreditCard, Award, UserCog, Bell, WalletCards, Tv, ChevronDown, Star, ShieldQuestion, UserCircle,
  Gamepad2 // Added Gamepad2
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const casinoGameCategories = [
  { 
    title: "স্লট (Slots)", 
    href:"/games?category=slots", 
    icon: Dices, 
    description: "জনপ্রিয় সব স্লট গেম খেলুন আর জিতুন। (Play popular slot games and win.)",
    games: [
      { name: "Baji Slots Deluxe", thumbnail: "https://picsum.photos/100/120?random=101", dataAiHint: "slot machine", href: "/games/1" },
      { name: "Golden Wheels", thumbnail: "https://picsum.photos/100/120?random=102", dataAiHint: "gold wheel", href: "/games/1" },
      { name: "Treasure Hunt", thumbnail: "https://picsum.photos/100/120?random=103", dataAiHint: "treasure chest", href: "/games/1" },
    ]
  },
  { 
    title: "টেবিল গেম (Table Games)", 
    href:"/games?category=table-games", 
    icon: AlignJustify, 
    description: "রুলেট, ব্ল্যাকজ্যাক এবং আরও অনেক কিছু। (Roulette, Blackjack, and more.)",
    games: [
      { name: "Dhaka Roulette", thumbnail: "https://picsum.photos/100/120?random=104", dataAiHint: "roulette table", href: "/games/2" },
      { name: "Bengal Poker", thumbnail: "https://picsum.photos/100/120?random=105", dataAiHint: "poker cards", href: "/games/3" },
    ]
  },
  { 
    title: "ক্র্যাশ গেম (Crash Games)", 
    href:"/games?category=crash", 
    icon: Replace, 
    description: "জনপ্রিয় ক্র্যাশ গেম খেলুন। (Play popular crash games.)",
    games: [
      { name: "Rocket Crash", thumbnail: "https://picsum.photos/100/120?random=106", dataAiHint: "rocket graph", href: "/games/4" },
      { name: "Aviator Pro", thumbnail: "https://picsum.photos/100/120?random=107", dataAiHint: "airplane sky", href: "/games/8" },
    ]
  },
];

const liveGameOptions = [
  { 
    title: "লাইভ রুলেট (Live Roulette)", 
    href:"/games?category=live-casino&type=roulette", 
    icon: UsersRound, 
    description: "সরাসরি ডিলারদের সাথে রুলেট খেলুন। (Play Roulette with live dealers.)",
    games: [
      { name: "Live Speed Roulette", thumbnail: "https://picsum.photos/100/120?random=201", dataAiHint: "live dealer roulette", href: "/games/5" },
      { name: "VIP Roulette", thumbnail: "https://picsum.photos/100/120?random=202", dataAiHint: "luxury roulette", href: "/games/5" },
    ]
  },
  { 
    title: "লাইভ ব্ল্যাকজ্যাক (Live Blackjack)", 
    href:"/games?category=live-casino&type=blackjack", 
    icon: UsersRound, 
    description: "সরাসরি ডিলারদের সাথে ব্ল্যাকজ্যাক। (Blackjack with live dealers.)",
    games: [
      { name: "Sundarban Blackjack", thumbnail: "https://picsum.photos/100/120?random=203", dataAiHint: "blackjack dealer", href: "/games/5" },
    ]
  },
  { 
    title: "লাইভ পোকার (Live Poker)", 
    href:"/games?category=live-casino&type=poker", 
    icon: UsersRound, 
    description: "সরাসরি ডিলারদের সাথে পোকার খেলুন। (Play Poker with live dealers.)",
    games: [
       { name: "Live Casino Hold'em", thumbnail: "https://picsum.photos/100/120?random=204", dataAiHint: "live poker table", href: "/games/3" },
    ]
  }
];

const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  // Casino and Live Games will be handled by NavigationMenu
  { href: '/promotions', label: 'Promotions', icon: Gift },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/vip-club', label: 'VIP Club', icon: Award }, // Placeholder page
  { href: '/support', label: 'Help Center', icon: HelpCircle },
];

const userActionLinks = [
    { href: '/dashboard', label: 'Profile', icon: UserCircle },
    { href: '/wallet', label: 'KYC', icon: ShieldQuestion}, // Assuming KYC is part of wallet or profile page
    { href: '/dashboard', label: 'Settings', icon: Settings2 }, // Placeholder for settings page
];


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href || '#'}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center">
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {title}
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const GameThumbnailItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { name: string; thumbnail: string; dataAiHint: string }
>(({ className, name, thumbnail, dataAiHint, ...props }, ref) => {
  return (
    <Link
      href={props.href || '#'}
      ref={ref}
      className={cn(
        "group flex flex-col items-center space-y-1 rounded-md p-2 text-center transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      <div className="relative h-24 w-20 overflow-hidden rounded-md">
        <Image 
          src={thumbnail} 
          alt={name} 
          layout="fill" 
          objectFit="cover" 
          className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
          data-ai-hint={dataAiHint}
        />
      </div>
      <span className="text-[11px] font-medium leading-tight line-clamp-2">{name}</span>
    </Link>
  );
});
GameThumbnailItem.displayName = "GameThumbnailItem";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Placeholder data
  const walletBalance = "5,250.75";
  const notificationCount = 3;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-2 md:px-4">
        {/* Mobile Menu Trigger (Left for consistency) */}
        <div className="md:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-1">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-card p-0 flex flex-col">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle asChild>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Logo className="h-7 w-auto" />
                  </Link>
                </SheetTitle>
                <SheetClose className="absolute right-3 top-3.5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none" />
              </SheetHeader>
              
              <nav className="flex-grow overflow-y-auto p-4 space-y-2">
                <Input placeholder="Search games..." className="mb-3"/>
                {mainNavLinks.map((item) => (
                  <SheetClose key={item.label} asChild>
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      <span>{item.label}</span>
                    </Link>
                  </SheetClose>
                ))}

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="casino-games">
                    <AccordionTrigger className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground hover:no-underline">
                      <Gamepad2 className="h-5 w-5 text-primary" />
                      <span>ক্যাসিনো (Casino)</span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      {casinoGameCategories.map(category => (
                        <SheetClose key={category.title} asChild>
                          <Link href={category.href} className="flex items-center space-x-2 py-2 px-2 text-sm rounded-md hover:bg-accent/50" onClick={() => setIsMobileMenuOpen(false)}>
                            <category.icon className="h-4 w-4 text-muted-foreground" />
                            <span>{category.title}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="live-games">
                    <AccordionTrigger className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground hover:no-underline">
                      <Tv className="h-5 w-5 text-primary" />
                      <span>লাইভ গেম (Live Games)</span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      {liveGameOptions.map(category => (
                        <SheetClose key={category.title} asChild>
                          <Link href={category.href} className="flex items-center space-x-2 py-2 px-2 text-sm rounded-md hover:bg-accent/50" onClick={() => setIsMobileMenuOpen(false)}>
                            <category.icon className="h-4 w-4 text-muted-foreground" />
                            <span>{category.title}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Separator />
                <p className="pt-2 text-xs font-semibold uppercase text-muted-foreground px-2">Account</p>
                  <SheetClose asChild>
                    <Link href="/wallet" className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                      <Banknote className="h-5 w-5 text-primary" /><span>Deposit</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/wallet" className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                      <CreditCard className="h-5 w-5 text-primary" /><span>Withdraw</span>
                    </Link>
                  </SheetClose>
                  {userActionLinks.map((item) => (
                     <SheetClose key={item.label} asChild>
                        <Link href={item.href} className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                           <item.icon className="h-5 w-5 text-primary" /><span>{item.label}</span>
                        </Link>
                     </SheetClose>
                  ))}


              </nav>

              <div className="border-t border-border p-4 space-y-2.5">
                <Button variant="outline" className="w-full" asChild><Link href="/login" onClick={() => setIsMobileMenuOpen(false)}><LogIn className="mr-2 h-4 w-4" /> Login</Link></Button>
                <Button className="w-full" asChild><Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}><UserPlus className="mr-2 h-4 w-4" />Sign Up</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-2 md:mr-6" aria-label="Bajibuz Home">
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex flex-1">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="mr-1.5 h-4 w-4" /> Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger><Gamepad2 className="mr-1.5 h-4 w-4" /> Casino</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid p-4 md:w-[600px] lg:w-[700px] gap-3 grid-cols-3">
                  {casinoGameCategories.map((category) => (
                    <div key={category.title} className="col-span-1 flex flex-col">
                      <ListItem href={category.href} title={category.title} icon={category.icon}>
                        {category.description}
                      </ListItem>
                      <div className="grid grid-cols-2 gap-1 mt-2">
                        {category.games?.slice(0,2).map(game => ( // Show 2 game thumbnails per category
                           <GameThumbnailItem key={game.name} name={game.name} thumbnail={game.thumbnail} dataAiHint={game.dataAiHint} href={game.href} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                 <div className="p-3 text-center bg-muted/50">
                    <Link href="/games" className="text-sm font-medium text-primary hover:underline">
                      সকল ক্যাসিনো গেম দেখুন (View All Casino Games) <ChevronDown className="inline h-4 w-4 rotate-[-90deg]"/>
                    </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger><Tv className="mr-1.5 h-4 w-4" /> Live Games</NavigationMenuTrigger>
              <NavigationMenuContent>
                 <div className="grid p-4 md:w-[500px] lg:w-[600px] gap-3 grid-cols-2">
                  {liveGameOptions.map((category) => (
                     <div key={category.title} className="col-span-1 flex flex-col">
                      <ListItem href={category.href} title={category.title} icon={category.icon}>
                        {category.description}
                      </ListItem>
                      <div className="grid grid-cols-2 gap-1 mt-2">
                        {category.games?.slice(0,2).map(game => ( 
                           <GameThumbnailItem key={game.name} name={game.name} thumbnail={game.thumbnail} dataAiHint={game.dataAiHint} href={game.href} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center bg-muted/50">
                    <Link href="/games?category=live-casino" className="text-sm font-medium text-primary hover:underline">
                      সকল লাইভ গেম দেখুন (View All Live Games) <ChevronDown className="inline h-4 w-4 rotate-[-90deg]"/>
                    </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {mainNavLinks.slice(1).map((item) => ( // Slice to skip Home, already added
              <NavigationMenuItem key={item.label}>
                 <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                       {item.icon && <item.icon className="mr-1.5 h-4 w-4" />} {item.label}
                    </NavigationMenuLink>
                 </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right section (Wallet, Notifications, Auth, Toggles) */}
        <div className="flex items-center space-x-1 md:space-x-2 ml-auto">
          <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
            <Link href="/wallet"><Banknote className="mr-1.5 h-4 w-4" /> Deposit</Link>
          </Button>
          <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
            <Link href="/wallet"><CreditCard className="mr-1.5 h-4 w-4" /> Withdraw</Link>
          </Button>

          <Link href="/wallet" className="hidden md:flex items-center p-2 hover:bg-accent rounded-md" aria-label="Wallet">
            <WalletCards className="h-5 w-5 text-primary" />
            <span className="ml-1.5 text-xs font-medium text-muted-foreground">৳{walletBalance}</span>
          </Link>

          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            )}
          </Button>
          
          <Link href="/dashboard" className="hidden md:inline-flex p-2 hover:bg-accent rounded-md" aria-label="Profile and KYC">
             <UserCog className="h-5 w-5" />
          </Link>

          <ThemeToggle />
          <LanguageToggle />
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login"><LogIn className="mr-1.5 h-4 w-4" /> Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup"><UserPlus className="mr-1.5 h-4 w-4" />Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
