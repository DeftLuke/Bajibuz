// src/components/layout/header.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, Menu, LogIn, UserPlus, Search,
  Gift, Dices, UsersRound, Trophy, Ticket, AlignJustify, HelpCircle, Settings2, Replace,
  Banknote, CreditCard, Award, UserCog, Bell, WalletCards, Tv, ChevronDown, Star, ShieldQuestion, UserCircle as UserCircleIcon, LogOut as LogOutIcon,
  Gamepad2 as Gamepad2Icon, History, Wallet as WalletIcon, Landmark, ArrowUpFromLine // Added WalletCards, ArrowUpFromLine
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
import { useAuth } from '@/context/auth-context'; 
import { signOutUser } from '@/lib/firebase/auth'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { DailySpinPopup } from '@/components/shared/daily-spin-popup';

const LAST_VISIT_KEY = 'bajibuz_last_daily_spin_visit';
const SHOW_WELCOME_SPIN_KEY = 'showWelcomeSpin';


const casinoGameCategoriesData = [
  { 
    key: "slots", titleEn: "Slots", titleBn: "স্লট", 
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
    key: "table-games", titleEn: "Table Games", titleBn: "টেবিল গেম", 
    href:"/games?category=table-games", 
    icon: AlignJustify, 
    descriptionEn: "Roulette, Blackjack, and more.", descriptionBn: "রুলেট, ব্ল্যাকজ্যাক এবং আরও অনেক কিছু।",
    games: [
      { nameEn: "Dhaka Roulette", nameBn: "ঢাকা রুলেট", thumbnail: "https://picsum.photos/100/120?random=104", dataAiHint: "roulette table", href: "/games/2" },
      { nameEn: "Bengal Poker", nameBn: "বেঙ্গল পোকার", thumbnail: "https://picsum.photos/100/120?random=105", dataAiHint: "poker cards", href: "/games/3" },
    ]
  },
  { 
    key: "crash-games", titleEn: "Crash Games", titleBn: "ক্র্যাশ গেম", 
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
    key: "live-roulette", titleEn: "Live Roulette", titleBn: "লাইভ রুলেট", 
    href:"/games?category=live-casino&type=roulette", 
    icon: UsersRound, 
    descriptionEn: "Play Roulette with live dealers.", descriptionBn: "সরাসরি ডিলারদের সাথে রুলেট খেলুন।",
    games: [
      { nameEn: "Live Speed Roulette", nameBn: "লাইভ স্পিড রুলেট", thumbnail: "https://picsum.photos/100/120?random=201", dataAiHint: "live dealer roulette", href: "/games/5" },
      { nameEn: "VIP Roulette", nameBn: "ভিআইপি রুলেট", thumbnail: "https://picsum.photos/100/120?random=202", dataAiHint: "luxury roulette", href: "/games/5" },
    ]
  },
  { 
    key: "live-blackjack", titleEn: "Live Blackjack", titleBn: "লাইভ ব্ল্যাকজ্যাক", 
    href:"/games?category=live-casino&type=blackjack", 
    icon: UsersRound, 
    descriptionEn: "Blackjack with live dealers.", descriptionBn: "সরাসরি ডিলারদের সাথে ব্ল্যাকজ্যাক।",
    games: [
      { nameEn: "Sundarban Blackjack", nameBn: "সুন্দরবন ব্ল্যাকজ্যাক", thumbnail: "https://picsum.photos/100/120?random=203", dataAiHint: "blackjack dealer", href: "/games/5" },
    ]
  },
  { 
    key: "live-poker", titleEn: "Live Poker", titleBn: "লাইভ পোকার", 
    href:"/games?category=live-casino&type=poker", 
    icon: UsersRound, 
    descriptionEn: "Play Poker with live dealers.", descriptionBn: "সরাসরি ডিলারদের সাথে পোকার খেলুন।",
    games: [
       { nameEn: "Live Casino Hold'em", nameBn: "লাইভ ক্যাসিনো হোল্ডেম", thumbnail: "https://picsum.photos/100/120?random=204", dataAiHint: "live poker table", href: "/games/3" },
    ]
  }
];

const mainNavLinksData = [
  { key: 'home', href: '/', labelEn: 'Home', labelBn: 'হোম', icon: Home },
  { key: 'promotions', href: '/promotions', labelEn: 'Promotions', labelBn: 'প্রমোশন', icon: Gift },
  { key: 'leaderboard', href: '/leaderboard', labelEn: 'Leaderboard', labelBn: 'লিডারবোর্ড', icon: Trophy },
  { key: 'vip-club', href: '/vip-club', labelEn: 'VIP Club', labelBn: 'ভিআইপি ক্লাব', icon: Award },
];

const topNavRightLinksData = [
    { key: 'kyc', href: '/dashboard?tab=profile', labelEn: 'KYC / Profile', labelBn: 'কেওয়াইসি / প্রোফাইল', icon: UserCog, authRequired: true, mobileOnly: false },
    { key: 'help', href: '/support', labelEn: 'Help Center', labelBn: 'সহায়তা কেন্দ্র', icon: ShieldQuestion, authRequired: false, mobileOnly: false },
];

const userActionLinksData = [
    { key: 'dashboard', href: '/dashboard', labelEn: 'Dashboard', labelBn: 'ড্যাশবোর্ড', icon: UserCircleIcon },
    { key: 'wallet', href: '/wallet', labelEn: 'Wallet Page', labelBn: 'ওয়ালেট পৃষ্ঠা', icon: WalletCards},
    { 
      key: 'profile-settings',
      href: '/dashboard?tab=profile', 
      labelEn: 'Profile Settings', 
      labelBn: 'প্রোফাইল সেটিংস', 
      icon: Settings2,
    },
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
        "group flex flex-col items-center space-y-1 rounded-md p-2 text-center transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transform hover:scale-105 hover:shadow-lg",
        className
      )}
      {...props}
    >
      <div className="relative h-24 w-20 overflow-hidden rounded-md shadow-md group-hover:shadow-primary/30">
        <Image 
          src={thumbnail} 
          alt={name} 
          layout="fill" 
          objectFit="cover" 
          className="transition-transform duration-300 group-hover:scale-110"
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
  const { currentUser, loading } = useAuth(); 
  
  const [walletBalanceString, setWalletBalanceString] = useState("0.00"); 
  const notificationCount = 3; // Placeholder
  const [showSpinPopup, setShowSpinPopup] = useState(false);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);
  const walletMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isDedicatedWalletMenuOpen, setIsDedicatedWalletMenuOpen] = useState(false);
  const dedicatedWalletMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (currentUser) {
      setWalletBalanceString(currentUser.walletBalance.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      
      if (typeof window !== 'undefined') {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
        const shouldShowWelcomeSpin = localStorage.getItem(SHOW_WELCOME_SPIN_KEY) === 'true';

        if (shouldShowWelcomeSpin) {
          setShowSpinPopup(true);
          localStorage.removeItem(SHOW_WELCOME_SPIN_KEY);
          localStorage.setItem(LAST_VISIT_KEY, today);
        } else if (lastVisit !== today) {
          setShowSpinPopup(true);
        }
      }
    } else {
      setWalletBalanceString("0.00");
      setShowSpinPopup(false); 
    }
  }, [currentUser, language]);


  const mainNavLinks = mainNavLinksData.map(link => ({...link, label: language === 'bn' ? link.labelBn : link.labelEn}));
  const topNavRightLinks = topNavRightLinksData.map(link => ({...link, label: language === 'bn' ? link.labelBn : link.labelEn}));
  const userActionLinks = userActionLinksData.map(link => ({...link, label: language === 'bn' ? link.labelBn : link.labelEn}));
  const casinoGameCategories = casinoGameCategoriesData.map(cat => ({...cat, title: language === 'bn' ? cat.titleBn : cat.titleEn, description: language === 'bn' ? cat.descriptionBn : cat.descriptionEn, games: cat.games?.map(g => ({...g, name: language === 'bn' ? g.nameBn : g.nameEn})) }));
  const liveGameOptions = liveGameOptionsData.map(cat => ({...cat, title: language === 'bn' ? cat.titleBn : cat.titleEn, description: language === 'bn' ? cat.descriptionBn : cat.descriptionEn, games: cat.games?.map(g => ({...g, name: language === 'bn' ? g.nameBn : g.nameEn})) }));


  const handleSignOut = async () => {
    await signOutUser();
    setIsMobileMenuOpen(false); 
    setIsProfileMenuOpen(false); 
    setIsWalletMenuOpen(false);
    setIsDedicatedWalletMenuOpen(false);
  };
  
  const handleCloseSpinPopup = () => {
    setShowSpinPopup(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LAST_VISIT_KEY, new Date().toDateString());
    }
  };

  const handleProfileMenuOpen = () => {
    if (profileMenuTimeoutRef.current) clearTimeout(profileMenuTimeoutRef.current);
    setIsProfileMenuOpen(true);
  };
  const handleProfileMenuClose = () => {
    profileMenuTimeoutRef.current = setTimeout(() => setIsProfileMenuOpen(false), 150);
  };
  const handleProfileMenuContentEnter = () => {
    if (profileMenuTimeoutRef.current) clearTimeout(profileMenuTimeoutRef.current);
  };
  const handleProfileMenuContentLeave = () => {
    profileMenuTimeoutRef.current = setTimeout(() => setIsProfileMenuOpen(false), 150);
  };

  const handleWalletMenuOpen = () => {
    if (walletMenuTimeoutRef.current) clearTimeout(walletMenuTimeoutRef.current);
    setIsWalletMenuOpen(true);
  };
  const handleWalletMenuClose = () => {
    walletMenuTimeoutRef.current = setTimeout(() => setIsWalletMenuOpen(false), 150);
  };
  const handleWalletMenuContentEnter = () => {
    if (walletMenuTimeoutRef.current) clearTimeout(walletMenuTimeoutRef.current);
  };
  const handleWalletMenuContentLeave = () => {
    walletMenuTimeoutRef.current = setTimeout(() => setIsWalletMenuOpen(false), 150);
  };

  const handleDedicatedWalletMenuOpen = () => {
    if (dedicatedWalletMenuTimeoutRef.current) clearTimeout(dedicatedWalletMenuTimeoutRef.current);
    setIsDedicatedWalletMenuOpen(true);
  };
  const handleDedicatedWalletMenuClose = () => {
    dedicatedWalletMenuTimeoutRef.current = setTimeout(() => setIsDedicatedWalletMenuOpen(false), 150);
  };
  const handleDedicatedWalletMenuContentEnter = () => {
    if (dedicatedWalletMenuTimeoutRef.current) clearTimeout(dedicatedWalletMenuTimeoutRef.current);
  };
  const handleDedicatedWalletMenuContentLeave = () => {
    dedicatedWalletMenuTimeoutRef.current = setTimeout(() => setIsDedicatedWalletMenuOpen(false), 150);
  };


  return (
    <>
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
                
                <nav className="flex-grow overflow-y-auto p-4 space-y-1">
                  <Input placeholder={language === 'bn' ? 'গেম খুঁজুন...' : 'Search games...'} className="mb-3 bg-background"/>
                  {mainNavLinks.map((item) => (
                    <SheetClose key={item.key} asChild>
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

                  {currentUser && (
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-start space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground"
                        onClick={() => { setIsMobileMenuOpen(false); setShowSpinPopup(true); }}
                      >
                        <Star className="h-5 w-5 text-primary" />
                        <span>{language === 'bn' ? 'লাকি স্পিন' : 'Lucky Spin'}</span>
                      </Button>
                    </SheetClose>
                  )}

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="casino-games" className="border-b-0">
                      <AccordionTrigger className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground hover:no-underline">
                        <Gamepad2Icon className="h-5 w-5 text-primary" />
                         <span>{language === 'bn' ? 'ক্যাসিনো' : 'Casino'}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pl-4">
                        {casinoGameCategories.map(category => (
                          <SheetClose key={category.key} asChild>
                            <Link href={category.href} className="flex items-center space-x-2 py-2 px-2 text-sm rounded-md hover:bg-accent/50" onClick={() => setIsMobileMenuOpen(false)}>
                              <category.icon className="h-4 w-4 text-muted-foreground" />
                              <span>{category.title}</span>
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="live-games" className="border-b-0">
                      <AccordionTrigger className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground hover:no-underline">
                        <Tv className="h-5 w-5 text-primary" />
                        <span>{language === 'bn' ? 'লাইভ গেম' : 'Live Games'}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pl-4">
                        {liveGameOptions.map(category => (
                          <SheetClose key={category.key} asChild>
                            <Link href={category.href} className="flex items-center space-x-2 py-2 px-2 text-sm rounded-md hover:bg-accent/50" onClick={() => setIsMobileMenuOpen(false)}>
                              <category.icon className="h-4 w-4 text-muted-foreground" />
                              <span>{category.title}</span>
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Separator/>
                   {topNavRightLinks.map((item) => {
                      if (item.authRequired && !currentUser) return null;
                      return (
                      <SheetClose key={item.key} asChild>
                          <Link
                          href={item.href}
                          className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                          >
                          <item.icon className="h-5 w-5 text-primary" />
                          <span>{item.label}</span>
                          </Link>
                      </SheetClose>
                      );
                  })}


                  {currentUser && (
                    <>
                      <Separator />
                      <p className="pt-2 text-xs font-semibold uppercase text-muted-foreground px-2">
                        {language === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}
                      </p>
                      {userActionLinks.map((item) => (
                         <SheetClose key={item.key} asChild>
                            <Link href={item.href} className="flex items-center space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                               <item.icon className="mr-2 h-4 w-4" /><span>{item.label}</span>
                            </Link>
                         </SheetClose>
                      ))}
                       <SheetClose asChild>
                         <Button variant="ghost" className="w-full flex items-center justify-start space-x-3 rounded-md py-2.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground" onClick={handleSignOut}>
                            <LogOutIcon className="mr-2 h-4 w-4" /><span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
                         </Button>
                       </SheetClose>
                    </>
                  )}
                </nav>

                <div className="border-t border-border p-4 space-y-2.5">
                  {currentUser ? null : ( 
                    <>
                      <Button variant="outline" className="w-full" asChild><Link href="/login" onClick={() => setIsMobileMenuOpen(false)}><LogIn className="mr-2 h-4 w-4" /> {language === 'bn' ? 'লগইন' : 'Login'}</Link></Button>
                      <Button className="w-full" asChild><Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}><UserPlus className="mr-2 h-4 w-4" />{language === 'bn' ? 'সাইন আপ' : 'Sign Up'}</Link></Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center space-x-2 mr-2 md:mr-4" aria-label="Bajibuz Home">
            <Logo className="h-8 w-auto" />
          </Link>

          <NavigationMenu className="hidden lg:flex flex-1">
            <NavigationMenuList>
              {mainNavLinks.slice(0,1).map((item) => ( 
                   <NavigationMenuItem key={item.key}>
                      <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:bg-accent hover:text-accent-foreground")}>
                          {item.icon && <item.icon className="mr-1.5 h-4 w-4" />} {item.label}
                          </NavigationMenuLink>
                      </Link>
                   </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:bg-accent hover:text-accent-foreground"><Gamepad2Icon className="mr-1.5 h-4 w-4" /> {language === 'bn' ? 'ক্যাসিনো' : 'Casino'}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid p-4 md:w-[600px] lg:w-[750px] gap-3 grid-cols-3 bg-card border-border shadow-lg">
                    {casinoGameCategories.map((category) => (
                      <div key={category.key} className="col-span-1 flex flex-col">
                        <ListItem href={category.href} title={category.title} icon={category.icon} className="hover:bg-accent hover:text-accent-foreground">
                          {category.description}
                        </ListItem>
                        <div className="grid grid-cols-2 gap-1 mt-2">
                          {category.games?.slice(0,2).map(game => (
                             <GameThumbnailItem key={game.nameEn} name={game.name} thumbnail={game.thumbnail} dataAiHint={game.dataAiHint} href={game.href} className="hover:bg-accent hover:text-accent-foreground"/>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                   <div className="p-3 text-center bg-muted/30">
                      <Link href="/games" className="text-sm font-medium text-primary hover:underline">
                        {language === 'bn' ? 'সকল ক্যাসিনো গেম দেখুন' : 'View All Casino Games'} <ChevronDown className="inline h-4 w-4 rotate-[-90deg]"/>
                      </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:bg-accent hover:text-accent-foreground"><Tv className="mr-1.5 h-4 w-4" /> {language === 'bn' ? 'লাইভ গেম' : 'Live Games'}</NavigationMenuTrigger>
                <NavigationMenuContent>
                   <div className="grid p-4 md:w-[500px] lg:w-[650px] gap-3 grid-cols-2 bg-card border-border shadow-lg">
                    {liveGameOptions.map((category) => (
                       <div key={category.key} className="col-span-1 flex flex-col">
                        <ListItem href={category.href} title={category.title} icon={category.icon} className="hover:bg-accent hover:text-accent-foreground">
                          {category.description}
                        </ListItem>
                        <div className="grid grid-cols-2 gap-1 mt-2">
                          {category.games?.slice(0,2).map(game => ( 
                             <GameThumbnailItem key={game.nameEn} name={game.name} thumbnail={game.thumbnail} dataAiHint={game.dataAiHint} href={game.href} className="hover:bg-accent hover:text-accent-foreground" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center bg-muted/30">
                      <Link href="/games?category=live-casino" className="text-sm font-medium text-primary hover:underline">
                        {language === 'bn' ? 'সকল লাইভ গেম দেখুন' : 'View All Live Games'} <ChevronDown className="inline h-4 w-4 rotate-[-90deg]"/>
                      </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {mainNavLinks.slice(1).map((item) => (
                <NavigationMenuItem key={item.key}>
                   <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:bg-accent hover:text-accent-foreground")}>
                         {item.icon && <item.icon className="mr-1.5 h-4 w-4" />} {item.label}
                      </NavigationMenuLink>
                   </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-1 md:space-x-2 ml-auto">
              {currentUser && (
                 <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:inline-flex text-xs px-2.5 py-1.5 hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setShowSpinPopup(true)}
                  >
                    <Star className="mr-1 h-3.5 w-3.5 text-yellow-400" /> {language === 'bn' ? 'লাকি স্পিন' : 'Lucky Spin'}
                  </Button>
              )}
              
              {!loading && currentUser && (
                <DropdownMenu open={isWalletMenuOpen} onOpenChange={setIsWalletMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="hidden md:flex items-center text-xs px-2.5 py-1.5 h-auto rounded-md hover:bg-accent hover:text-accent-foreground"
                      onMouseEnter={handleWalletMenuOpen}
                      onMouseLeave={handleWalletMenuClose}
                      onClick={() => setIsWalletMenuOpen(prev => !prev)}
                    >
                      <WalletIcon className="mr-1.5 h-4 w-4 text-primary" />
                      <span className="font-medium">৳{walletBalanceString}</span>
                      <ChevronDown className="ml-1 h-3 w-3 text-muted-foreground"/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-64 bg-card border-border shadow-lg" 
                    align="end" 
                    forceMount
                    onMouseEnter={handleWalletMenuContentEnter}
                    onMouseLeave={handleWalletMenuContentLeave}
                  >
                    <DropdownMenuLabel className="font-normal text-foreground">
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs text-muted-foreground">{language === 'bn' ? 'বর্তমান ব্যালেন্স' : 'Current Balance'}</p>
                        <p className="text-sm font-medium leading-none text-primary">৳{walletBalanceString}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                     <DropdownMenuItem asChild onClick={() => setIsWalletMenuOpen(false)} className="cursor-pointer hover:bg-accent focus:bg-accent">
                      <Link href="/wallet?action=deposit" className="w-full">
                        <Banknote className="mr-2 h-4 w-4" />
                        <span>{language === 'bn' ? 'টাকা জমা দিন' : 'Deposit Funds'}</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
                        {language === 'bn' ? 'ডিপোজিট মাধ্যম:' : 'Deposit Methods:'}
                      </DropdownMenuLabel>
                      <DropdownMenuItem asChild onClick={() => setIsWalletMenuOpen(false)} className="cursor-pointer hover:bg-accent focus:bg-accent">
                        <Link href="/wallet?method=bkash&action=deposit" className="w-full">
                          <span className="ml-2 font-medium text-pink-600">bKash</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild onClick={() => setIsWalletMenuOpen(false)} className="cursor-pointer hover:bg-accent focus:bg-accent">
                        <Link href="/wallet?method=nagad&action=deposit" className="w-full">
                          <span className="ml-2 font-medium text-orange-500">Nagad</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild onClick={() => setIsWalletMenuOpen(false)} className="cursor-pointer hover:bg-accent focus:bg-accent">
                        <Link href="/wallet?method=rocket&action=deposit" className="w-full">
                           <span className="ml-2 font-medium text-purple-600">Rocket</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild onClick={() => setIsWalletMenuOpen(false)} className="cursor-pointer hover:bg-accent focus:bg-accent">
                        <Link href="/wallet?method=bank&action=deposit" className="w-full">
                          <Landmark className="mr-2 h-4 w-4" />
                          <span>{language === 'bn' ? 'ব্যাংক ট্রান্সফার' : 'Bank Transfer'}</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild onClick={() => setIsWalletMenuOpen(false)} className="cursor-pointer hover:bg-accent focus:bg-accent">
                       <Link href="/wallet?action=withdraw" className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>{language === 'bn' ? 'টাকা উত্তোলন করুন' : 'Withdraw Funds'}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild onClick={() => setIsWalletMenuOpen(false)} className="cursor-pointer hover:bg-accent focus:bg-accent">
                      <Link href="/dashboard?tab=history" className="w-full">
                        <History className="mr-2 h-4 w-4" />
                        <span>{language === 'bn' ? 'লেনদেনের ইতিহাস' : 'Transaction History'}</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}


              {topNavRightLinks.map((item) => {
                  if (item.authRequired && !currentUser) return null;
                  if (item.mobileOnly) return null; 
                  return (
                      <Button variant="ghost" size="sm" className="hidden md:inline-flex text-xs px-2.5 py-1.5 hover:bg-accent hover:text-accent-foreground" asChild key={item.key}>
                          <Link href={item.href}><item.icon className="mr-1 h-3.5 w-3.5" /> {item.label}</Link>
                      </Button>
                  );
              })}
            
            {/* New Dedicated Wallet Dropdown */}
            {currentUser && (
              <DropdownMenu open={isDedicatedWalletMenuOpen} onOpenChange={setIsDedicatedWalletMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative hover:bg-accent hover:text-accent-foreground" 
                    aria-label={language === 'bn' ? 'ওয়ালেট' : 'Wallet'}
                    onMouseEnter={handleDedicatedWalletMenuOpen}
                    onMouseLeave={handleDedicatedWalletMenuClose}
                    onClick={() => setIsDedicatedWalletMenuOpen(prev => !prev)}
                  >
                    <WalletCards className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-60 bg-card border-border shadow-lg"
                  onMouseEnter={handleDedicatedWalletMenuContentEnter}
                  onMouseLeave={handleDedicatedWalletMenuContentLeave}
                >
                  <DropdownMenuLabel className="font-semibold text-foreground">{language === 'bn' ? 'ওয়ালেট অপশন' : 'Wallet Options'}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
                      {language === 'bn' ? 'ডিপোজিট করুন' : 'Deposit'}
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent focus:bg-accent" onClick={() => setIsDedicatedWalletMenuOpen(false)}>
                      <Link href="/wallet?action=deposit&method=bkash">
                        <span className="ml-2 font-medium text-pink-600">bKash</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent focus:bg-accent" onClick={() => setIsDedicatedWalletMenuOpen(false)}>
                      <Link href="/wallet?action=deposit&method=nagad">
                        <span className="ml-2 font-medium text-orange-500">Nagad</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent focus:bg-accent" onClick={() => setIsDedicatedWalletMenuOpen(false)}>
                      <Link href="/wallet?action=deposit&method=rocket">
                        <span className="ml-2 font-medium text-purple-600">Rocket</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent focus:bg-accent" onClick={() => setIsDedicatedWalletMenuOpen(false)}>
                      <Link href="/wallet?action=deposit&method=bank">
                        <Landmark className="mr-2 h-4 w-4" />
                        <span>{language === 'bn' ? 'ব্যাংক ট্রান্সফার' : 'Bank Transfer'}</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent focus:bg-accent" onClick={() => setIsDedicatedWalletMenuOpen(false)}>
                    <Link href="/wallet?action=withdraw">
                      <ArrowUpFromLine className="mr-2 h-4 w-4" />
                      <span>{language === 'bn' ? 'টাকা উত্তোলন' : 'Withdraw Funds'}</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}


            <Button variant="ghost" size="icon" className="relative hover:bg-accent hover:text-accent-foreground" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              )}
            </Button>
            
            <ThemeToggle />
            <LanguageToggle />
            
            {!loading && currentUser ? (
               <DropdownMenu open={isProfileMenuOpen} onOpenChange={setIsProfileMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-9 w-9 rounded-full hover:bg-accent"
                    onMouseEnter={handleProfileMenuOpen}
                    onMouseLeave={handleProfileMenuClose}
                    onClick={() => setIsProfileMenuOpen(prev => !prev)} 
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar || `https://picsum.photos/seed/${currentUser.uid}/32/32`} alt={currentUser.name || 'User'} />
                      <AvatarFallback>{currentUser.name?.substring(0,1).toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 bg-card border-border shadow-lg" 
                  align="end" 
                  forceMount
                  onMouseEnter={handleProfileMenuContentEnter}
                  onMouseLeave={handleProfileMenuContentLeave}
                >
                  <DropdownMenuLabel className="font-normal text-foreground">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   {userActionLinks.map(item => (
                      <DropdownMenuItem key={item.key} asChild onClick={() => setIsProfileMenuOpen(false)} className="cursor-pointer hover:bg-accent focus:bg-accent">
                          <Link href={item.href}>
                              <item.icon className="mr-2 h-4 w-4" />
                              <span>{item.label}</span>
                          </Link>
                      </DropdownMenuItem>
                   ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { handleSignOut(); setIsProfileMenuOpen(false); }} className="cursor-pointer hover:bg-accent focus:bg-accent">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : !loading && !currentUser ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="hover:bg-accent hover:text-accent-foreground">
                  <Link href="/login"><LogIn className="mr-1.5 h-4 w-4" /> {language === 'bn' ? 'লগইন' : 'Login'}</Link>
                </Button>
                <Button size="sm" asChild className="hover:bg-primary/90">
                  <Link href="/signup"><UserPlus className="mr-1.5 h-4 w-4" />{language === 'bn' ? 'সাইন আপ' : 'Sign Up'}</Link>
                </Button>
              </div>
            ): ( 
              <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
            )}
          </div>
        </div>
      </header>
      {currentUser && <DailySpinPopup isOpen={showSpinPopup} onClose={handleCloseSpinPopup} />}
    </>
  );
}

