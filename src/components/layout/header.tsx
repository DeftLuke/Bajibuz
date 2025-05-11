// src/components/layout/header.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, Menu, LogIn, UserPlus, Search,
  Gift, Dices, UsersRound, Trophy, Ticket, AlignJustify, HelpCircle, Settings2, Replace,
  Banknote, CreditCard, Award, UserCog, Bell, WalletCards, Tv, ChevronDown, Star, ShieldQuestion, UserCircle as UserCircleIcon, LogOut as LogOutIcon,
  Gamepad2 as Gamepad2Icon, Camera, Edit3, KeyRound // Added Camera, Edit3, KeyRound for potential future use
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
} from "@/components/ui/dropdown-menu";
import { DailySpinPopup } from '@/components/shared/daily-spin-popup';

const LAST_VISIT_KEY = 'bajibuz_last_daily_spin_visit';
const SHOW_WELCOME_SPIN_KEY = 'showWelcomeSpin';


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
];

const topNavRightLinksData = [
    { href: '/wallet', labelEn: 'Deposit', labelBn: 'জমা', icon: Banknote, authRequired: true, mobileOnly: false },
    { href: '/wallet', labelEn: 'Withdraw', labelBn: 'উত্তোলন', icon: CreditCard, authRequired: true, mobileOnly: false },
    { href: '/dashboard?tab=profile', labelEn: 'KYC / Profile', labelBn: 'কেওয়াইসি / প্রোফাইল', icon: UserCog, authRequired: true, mobileOnly: false},
    { href: '/support', labelEn: 'Help Center', labelBn: 'সহায়তা কেন্দ্র', icon: ShieldQuestion, authRequired: false, mobileOnly: false },
];

// userActionLinksData defines the items in the profile dropdown.
const userActionLinksData = [
    { href: '/dashboard', labelEn: 'Dashboard', labelBn: 'ড্যাশবোর্ড', icon: UserCircleIcon },
    { href: '/wallet', labelEn: 'Wallet', labelBn: 'ওয়ালেট', icon: WalletCards},
    { 
      href: '/dashboard?tab=profile', 
      labelEn: 'Profile Settings', 
      labelBn: 'প্রোফাইল সেটিংস', 
      icon: Settings2,
      // This one link covers: Change Profile Picture, Edit Profile Information, Change Password
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
  
  const [walletBalance, setWalletBalance] = useState("0.00"); 
  const notificationCount = 3; // Placeholder
  const [showSpinPopup, setShowSpinPopup] = useState(false);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (currentUser) {
      setWalletBalance(currentUser.walletBalance.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      
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
      setWalletBalance("0.00");
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
    setIsProfileMenuOpen(false); // Close profile menu on logout
  };
  
  const handleCloseSpinPopup = () => {
    setShowSpinPopup(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LAST_VISIT_KEY, new Date().toDateString());
    }
  };

  const handleProfileMenuOpen = () => {
    if (profileMenuTimeoutRef.current) {
      clearTimeout(profileMenuTimeoutRef.current);
    }
    setIsProfileMenuOpen(true);
  };

  const handleProfileMenuClose = () => {
    profileMenuTimeoutRef.current = setTimeout(() => {
      setIsProfileMenuOpen(false);
    }, 150); // Delay closing to allow moving mouse to content
  };
  
  const handleProfileMenuContentEnter = () => {
    if (profileMenuTimeoutRef.current) {
      clearTimeout(profileMenuTimeoutRef.current);
    }
  };

  const handleProfileMenuContentLeave = () => {
    profileMenuTimeoutRef.current = setTimeout(() => {
      setIsProfileMenuOpen(false);
    }, 150);
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
                          <SheetClose key={category.title} asChild>
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

                  <Separator/>
                   {topNavRightLinks.map((item) => {
                      if (item.authRequired && !currentUser) return null;
                      return (
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
                      );
                  })}


                  {currentUser && (
                    <>
                      <Separator />
                      <p className="pt-2 text-xs font-semibold uppercase text-muted-foreground px-2">
                        {language === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}
                      </p>
                      {userActionLinks.map((item) => (
                         <SheetClose key={item.label} asChild>
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
                  {currentUser ? null : ( // Logout button is inside "My Account" section for mobile now
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
                   <NavigationMenuItem key={item.label}>
                      <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {item.icon && <item.icon className="mr-1.5 h-4 w-4" />} {item.label}
                          </NavigationMenuLink>
                      </Link>
                   </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger><Gamepad2Icon className="mr-1.5 h-4 w-4" /> {language === 'bn' ? 'ক্যাসিনো' : 'Casino'}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid p-4 md:w-[600px] lg:w-[750px] gap-3 grid-cols-3">
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
                   <div className="grid p-4 md:w-[500px] lg:w-[650px] gap-3 grid-cols-2">
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
              {currentUser && (
                 <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:inline-flex text-xs px-2.5 py-1.5"
                    onClick={() => setShowSpinPopup(true)}
                  >
                    <Star className="mr-1 h-3.5 w-3.5 text-yellow-400" /> {language === 'bn' ? 'লাকি স্পিন' : 'Lucky Spin'}
                  </Button>
              )}
              {topNavRightLinks.map((item) => {
                  if (item.authRequired && !currentUser) return null;
                  if (item.mobileOnly && typeof window !== 'undefined' && window.innerWidth >= 768) return null; 
                  return (
                      <Button variant="ghost" size="sm" className="hidden md:inline-flex text-xs px-2.5 py-1.5" asChild key={item.label}>
                          <Link href={item.href}><item.icon className="mr-1 h-3.5 w-3.5" /> {item.label}</Link>
                      </Button>
                  );
              })}

            {currentUser && (
              <>
                <Link href="/wallet" className="hidden md:flex items-center p-2 hover:bg-accent rounded-md" aria-label="Wallet">
                  <WalletCards className="h-5 w-5 text-primary" />
                  <span className="ml-1.5 text-xs font-medium text-muted-foreground">৳{walletBalance}</span>
                </Link>
              </>
            )}

            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
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
                    className="relative h-9 w-9 rounded-full"
                    onMouseEnter={handleProfileMenuOpen}
                    onMouseLeave={handleProfileMenuClose}
                    onClick={() => setIsProfileMenuOpen(prev => !prev)} // Toggle on click for accessibility
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar || `https://picsum.photos/seed/${currentUser.uid}/32/32`} alt={currentUser.name || 'User'} />
                      <AvatarFallback>{currentUser.name?.substring(0,1).toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56" 
                  align="end" 
                  forceMount
                  onMouseEnter={handleProfileMenuContentEnter}
                  onMouseLeave={handleProfileMenuContentLeave}
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   {userActionLinks.map(item => (
                      <DropdownMenuItem key={item.href} asChild onClick={() => setIsProfileMenuOpen(false)}>
                          <Link href={item.href}>
                              <item.icon className="mr-2 h-4 w-4" />
                              <span>{item.label}</span>
                          </Link>
                      </DropdownMenuItem>
                   ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { handleSignOut(); setIsProfileMenuOpen(false); }}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : !loading && !currentUser ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login"><LogIn className="mr-1.5 h-4 w-4" /> {language === 'bn' ? 'লগইন' : 'Login'}</Link>
                </Button>
                <Button size="sm" asChild>
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
