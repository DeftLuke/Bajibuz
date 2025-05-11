
// src/components/layout/header.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, Menu, LogIn, UserPlus, Search,
  Gift, Dices, UsersRound, Trophy, Ticket, AlignJustify, HelpCircle, Settings2, Replace,
  Banknote, CreditCard, Award, UserCog, Bell, WalletCards, Tv, ChevronDown, Star, ShieldQuestion, UserCircle,
  Gamepad2 // Ensure Gamepad2 is imported from lucide-react
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
import { useLanguage } from '@/context/language-context';


const casinoGameCategoriesData = [
  { 
    titleEn: "Slots", titleBn: "স্লট", 
    href:"/games?category=slots", 
    icon: Dices, 
    descriptionEn: "Play popular slot games and win.", descriptionBn: "জনপ্রিয় সব স্লট গেম খেলুন আর জিতুন।",
    games: [
      { nameEn: "Baji Slots Deluxe", nameBn: "বাজি স্লটস ডিলাক্স", thumbnail: "https://picsum.photos/100/120?random=101", dataAiHint: "slot machine", href: "/games/1" },
      { nameEn: "Golden Wheels", nameBn: "গোল্ডেন হুইলস", thumbnail: "https://picsum.photos/100/120?random=102", dataAiHint: "gold wheel", href: "/games/1" },
      { nameEn: "Treasure Hunt", nameBn: "ট্রেজার হান্ট", thumbnail: "https://picsum.photos/100/120?random=103", dataAiHint: "treasure chest", href: "/games/1" },
    ]
  },
  { 
    titleEn: "Table Games", titleBn: "টেবিল গেম", 
    href:"/games?category=table-games", 
    icon: AlignJustify, 
    descriptionEn: "Roulette, Blackjack, and more.", descriptionBn: "রুলেট, ব্ল্যাকজ্যাক এবং আরও অনেক কিছু।",
    games: [
      { nameEn: "Dhaka Roulette", nameBn: "ঢাকা রুলেট", thumbnail: "https://picsum.photos/100/120?random=104", dataAiHint: "roulette table", href: "/games/2" },
      { nameEn: "Bengal Poker", nameBn: "বেঙ্গল পোকার", thumbnail: "https://picsum.photos/100/120?random=105", dataAiHint: "poker cards", href: "/games/3" },
    ]
  },
  { 
    titleEn: "Crash Games", titleBn: "ক্র্যাশ গেম", 
    href:"/games?category=crash", 
    icon: Replace, 
    descriptionEn: "Play popular crash games.", descriptionBn: "জনপ্রিয় ক্র্যাশ গেম খেলুন।",
    games: [
      { nameEn: "Rocket Crash", nameBn: "রকেট ক্র্যাশ", thumbnail: "https://picsum.photos/100/120?random=106", dataAiHint: "rocket graph", href: "/games/4" },
      { nameEn: "Aviator Pro", nameBn: "এভিয়েটর প্রো", thumbnail: "https://picsum.photos/100/120?random=107", dataAiHint: "airplane sky", href: "/games/8" },
    ]
  },
];

const liveGameOptionsData = [
  { 
    titleEn: "Live Roulette", titleBn: "লাইভ রুলেট", 
    href:"/games?category=live-casino&type=roulette", 
    icon: UsersRound, 
    descriptionEn: "Play Roulette with live dealers.", descriptionBn: "সরাসরি ডিলারদের সাথে রুলেট খেলুন।",
    games: [
      { nameEn: "Live Speed Roulette", nameBn: "লাইভ স্পিড রুলেট", thumbnail: "https://picsum.photos/100/120?random=201", dataAiHint: "live dealer roulette", href: "/games/5" },
      { nameEn: "VIP Roulette", nameBn: "ভিআইপি রুলেট", thumbnail: "https://picsum.photos/100/120?random=202", dataAiHint: "luxury roulette", href: "/games/5" },
    ]
  },
  { 
    titleEn: "Live Blackjack", titleBn: "লাইভ ব্ল্যাকজ্যাক", 
    href:"/games?category=live-casino&type=blackjack", 
    icon: UsersRound, 
    descriptionEn: "Blackjack with live dealers.", descriptionBn: "সরাসরি ডিলারদের সাথে ব্ল্যাকজ্যাক।",
    games: [
      { nameEn: "Sundarban Blackjack", nameBn: "সুন্দরবন ব্ল্যাকজ্যাক", thumbnail: "https://picsum.photos/100/120?random=203", dataAiHint: "blackjack dealer", href: "/games/5" },
    ]
  },
  { 
    titleEn: "Live Poker", titleBn: "লাইভ পোকার", 
    href:"/games?category=live-casino&type=poker", 
    icon: UsersRound, 
    descriptionEn: "Play Poker with live dealers.", descriptionBn: "সরাসরি ডিলারদের সাথে পোকার খেলুন।",
    games: [
       { nameEn: "Live Casino Hold'em", nameBn: "লাইভ ক্যাসিনো হোল্ডেম", thumbnail: "https://picsum.photos/100/120?random=204", dataAiHint: "live poker table", href: "/games/3" },
    ]
  }
];

const mainNavLinksData = [
  { href: '/', labelEn: 'Home', labelBn: 'হোম', icon: Home },
  { href: '/promotions', labelEn: 'Promotions', labelBn: 'প্রমোশন', icon: Gift },
  { href: '/leaderboard', labelEn: 'Leaderboard', labelBn: 'লিডারবোর্ড', icon: Trophy },
  { href: '/vip-club', labelEn: 'VIP Club', labelBn: 'ভিআইপি ক্লাব', icon: Award },
  { href: '/support', labelEn: 'Help Center', labelBn: 'সহায়তা কেন্দ্র', icon: HelpCircle },
];

const userActionLinksData = [
    { href: '/dashboard', labelEn: 'Profile', labelBn: 'প্রোফাইল', icon: UserCircle },
    { href: '/wallet', labelEn: 'KYC', labelBn: 'কেওয়াইসি', icon: ShieldQuestion},
    { href: '/dashboard', labelEn: 'Settings', labelBn: 'সেটিংস', icon: Settings2 },
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
  const { language } = useLanguage();
  
  const walletBalance = "5,250.75"; // Placeholder
  const notificationCount = 3; // Placeholder

  const mainNavLinks = mainNavLinksData.map(link => ({...link, label: language === 'bn' ? link.labelBn : link.labelEn}));
  const userActionLinks = userActionLinksData.map(link => ({...link, label: language === 'bn' ? link.labelBn : link.labelEn}));
  const casinoGameCategories = casinoGameCategoriesData.map(cat => ({...cat, title: language === 'bn' ? cat.titleBn : cat.titleEn, description: language === 'bn' ? cat.descriptionBn : cat.descriptionEn, games: cat.games?.map(g => ({...g, name: language === 'bn' ? g.nameBn : g.nameEn})) }));
  const liveGameOptions = liveGameOptionsData.map(cat => ({...cat, title: language === 'bn' ? cat.titleBn : cat.titleEn, description: language === 'bn' ? cat.descriptionBn : cat.descriptionEn, games: cat.games?.map(g => ({...g, name: language === 'bn' ? g.nameBn : g.nameEn})) }));


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-2 md:px-4">
        <div className="md:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-1">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{language === 'bn' ? 'মেনু টগল করুন' : 'Toggle menu'}</span>
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
                <Input placeholder={language === 'bn' ? 'গেম খুঁজুন...' : 'Search games...'} className="mb-3"/>
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
                      <span>{language === 'bn' ? 'ক্যাসিনো' : 'Casino'}</span>
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
                      <span>{language === 'bn' ? 'লাইভ গেম' : 'Live Games'}</span>
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
                <p className="pt-2 text-xs font-semibold uppercase text-muted-foreground px-2">
                  {language === 'bn' ? 'অ্যাকাউন্ট' : 'Account'}
                </p>
                  <SheetClose asChild>
                    <Link href="/wallet" className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                      <Banknote className="h-5 w-5 text-primary" /><span>{language === 'bn' ? 'জমা' : 'Deposit'}</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/wallet" className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                      <CreditCard className="h-5 w-5 text-primary" /><span>{language === 'bn' ? 'উত্তোলন' : 'Withdraw'}</span>
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
                <Button variant="outline" className="w-full" asChild><Link href="/login" onClick={() => setIsMobileMenuOpen(false)}><LogIn className="mr-2 h-4 w-4" /> {language === 'bn' ? 'লগইন' : 'Login'}</Link></Button>
                <Button className="w-full" asChild><Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}><UserPlus className="mr-2 h-4 w-4" />{language === 'bn' ? 'সাইন আপ' : 'Sign Up'}</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex items-center space-x-2 mr-2 md:mr-6" aria-label="Bajibuz Home">
          <Logo className="h-8 w-auto" />
        </Link>

        <NavigationMenu className="hidden md:flex flex-1">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="mr-1.5 h-4 w-4" /> {mainNavLinks[0].label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger><Gamepad2 className="mr-1.5 h-4 w-4" /> {language === 'bn' ? 'ক্যাসিনো' : 'Casino'}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid p-4 md:w-[600px] lg:w-[700px] gap-3 grid-cols-3">
                  {casinoGameCategories.map((category) => (
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
                    <Link href="/games" className="text-sm font-medium text-primary hover:underline">
                      {language === 'bn' ? 'সকল ক্যাসিনো গেম দেখুন' : 'View All Casino Games'} <ChevronDown className="inline h-4 w-4 rotate-[-90deg]"/>
                    </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger><Tv className="mr-1.5 h-4 w-4" /> {language === 'bn' ? 'লাইভ গেম' : 'Live Games'}</NavigationMenuTrigger>
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
                      {language === 'bn' ? 'সকল লাইভ গেম দেখুন' : 'View All Live Games'} <ChevronDown className="inline h-4 w-4 rotate-[-90deg]"/>
                    </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {mainNavLinks.slice(1).map((item) => (
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

        <div className="flex items-center space-x-1 md:space-x-2 ml-auto">
          <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
            <Link href="/wallet"><Banknote className="mr-1.5 h-4 w-4" /> {language === 'bn' ? 'জমা' : 'Deposit'}</Link>
          </Button>
          <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
            <Link href="/wallet"><CreditCard className="mr-1.5 h-4 w-4" /> {language === 'bn' ? 'উত্তোলন' : 'Withdraw'}</Link>
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
              <Link href="/login"><LogIn className="mr-1.5 h-4 w-4" /> {language === 'bn' ? 'লগইন' : 'Login'}</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup"><UserPlus className="mr-1.5 h-4 w-4" />{language === 'bn' ? 'সাইন আপ' : 'Sign Up'}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
