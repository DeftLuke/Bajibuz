
// src/components/shared/promotional-slider.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

const slidesData = [
  {
    id: 1,
    titleEn: "Win Lakhs in Bonuses Today!",
    titleBn: "আজই জয় করুন লক্ষ টাকা বোনাস!",
    descriptionEn: "Get a full 100% bonus on your first deposit, up to lakhs! Join now and double your winnings.",
    descriptionBn: "আপনার প্রথম জমাতে সম্পূর্ণ ১০০% বোনাস পান, লক্ষ টাকা পর্যন্ত! এখনই যোগ দিন এবং আপনার জয় দ্বিগুণ করুন।",
    imageUrl: "https://picsum.photos/1200/400?random=51",
    dataAiHint: "casino jackpot coins",
    link: "/promotions#welcome-bonus",
    buttonTextEn: "Claim Bonus",
    buttonTextBn: "বোনাস নিন"
  },
  {
    id: 2,
    titleEn: "Win Cashback on Free Spins!",
    titleBn: "ফ্রি স্পিনে জিতে নিন ক্যাশব্যাক!",
    descriptionEn: "Try your luck on the Lucky Wheel daily! Win cash, free spins, cashback, and many more exciting prizes.",
    descriptionBn: "লাকি হুইলে আপনার ভাগ্য পরীক্ষা করুন প্রতিদিন! নগদ টাকা, ফ্রি স্পিন, ক্যাশব্যাক এবং আরও অনেক আকর্ষণীয় পুরস্কার জিতুন।",
    imageUrl: "https://picsum.photos/1200/400?random=52",
    dataAiHint: "fortune wheel jackpot",
    link: "/promotions#daily-spin",
    buttonTextEn: "Spin Now",
    buttonTextBn: "এখনই স্পিন করুন"
  },
  {
    id: 3,
    titleEn: "Today's Hot Game: Blackjack – Play Now!",
    titleBn: "আজকের হট গেম: ব্ল্যাকজ্যাক – এখনই খেলুন!",
    descriptionEn: "Join our popular Blackjack table and experience the thrill of beating the dealer. Big wins are in your hands!",
    descriptionBn: "আমাদের জনপ্রিয় ব্ল্যাকজ্যাক টেবিলে যোগ দিন আর ডিলারকে হারানোর রোমাঞ্চ অনুভব করুন। বড় জয়ের সুযোগ আপনার হাতে!",
    imageUrl: "https://picsum.photos/1200/400?random=53",
    dataAiHint: "blackjack cards table",
    link: "/games?category=table-games",
    buttonTextEn: "Play",
    buttonTextBn: "খেলুন"
  },
  {
    id: 4,
    titleEn: "Eid Offer: Special Cashback and Free Bets!",
    titleBn: "ঈদ অফার: স্পেশাল ক্যাশব্যাক এবং ফ্রি বেট!",
    descriptionEn: "This Eid, Bajibuz brings special offers! Get amazing cashback and free bets on selected games. Double your Eid joy!",
    descriptionBn: "এই ঈদে Bajibuz নিয়ে এলো বিশেষ অফার! নির্বাচিত গেমগুলোতে পান দারুণ ক্যাশব্যাক এবং ফ্রি বেট। ঈদের আনন্দ হোক দ্বিগুণ!",
    imageUrl: "https://picsum.photos/1200/400?random=54",
    dataAiHint: "casino promotion festive",
    link: "/promotions#eid-offer",
    buttonTextEn: "View Offer",
    buttonTextBn: "অফার দেখুন"
  },
  {
    id: 5,
    titleEn: "Invite Friends, Both Get Bonuses!",
    titleBn: "বন্ধুকে ইনভাইট করুন, দুজনেই বোনাস পান!",
    descriptionEn: "Invite your friends to Bajibuz and enjoy attractive bonuses for every referral. Play together, win together!",
    descriptionBn: "Bajibuz-এ আপনার বন্ধুদের আমন্ত্রণ জানান আর প্রতি রেফারেলে আকর্ষণীয় বোনাস উপভোগ করুন। একসাথে খেলুন, একসাথে জিতুন!",
    imageUrl: "https://picsum.photos/1200/400?random=55",
    dataAiHint: "referral bonus casino",
    link: "/promotions#referral",
    buttonTextEn: "Invite",
    buttonTextBn: "ইনভাইট করুন"
  },
];

export default function PromotionalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; 
    
    const timer = setTimeout(() => {
      handleNext();
    }, 7000); 
    return () => clearTimeout(timer);
  }, [currentIndex, isClient]); 

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slidesData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slidesData.length - 1 ? 0 : prevIndex + 1));
  };
  
  if (!isClient && typeof window === 'undefined') { // Ensure this runs only on server or before client hydration
    const slide = slidesData[0];
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-[400px] rounded-xl overflow-hidden shadow-2xl bg-card">
        <Image
          src={slide.imageUrl}
          alt={language === 'bn' ? slide.titleBn : slide.titleEn}
          layout="fill"
          objectFit="cover"
          priority
          data-ai-hint={slide.dataAiHint}
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-foreground mb-2 sm:mb-3 drop-shadow-lg">
            {language === 'bn' ? slide.titleBn : slide.titleEn}
          </h2>
          <p className="text-xs sm:text-sm md:text-lg text-primary-foreground/80 mb-4 sm:mb-6 max-w-md sm:max-w-xl drop-shadow-md">
            {language === 'bn' ? slide.descriptionBn : slide.descriptionEn}
          </p>
          <Button size="lg" asChild>
            <Link href={slide.link}>{language === 'bn' ? slide.buttonTextBn : slide.buttonTextEn}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-[400px] rounded-xl overflow-hidden shadow-2xl group">
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          aria-hidden={index !== currentIndex}
        >
          <Image
            src={slide.imageUrl}
            alt={language === 'bn' ? slide.titleBn : slide.titleEn}
            layout="fill"
            objectFit="cover"
            priority={index === 0} 
            data-ai-hint={slide.dataAiHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-foreground mb-2 sm:mb-3 drop-shadow-lg animate-fade-in-down">
              {language === 'bn' ? slide.titleBn : slide.titleEn}
            </h2>
            <p className="text-xs sm:text-sm md:text-lg text-primary-foreground/80 mb-4 sm:mb-6 max-w-md sm:max-w-xl drop-shadow-md animate-fade-in-up">
              {language === 'bn' ? slide.descriptionBn : slide.descriptionEn}
            </p>
            <Button size="lg" asChild className="animate-fade-in-up animation-delay-300">
              <Link href={slide.link}>{language === 'bn' ? slide.buttonTextBn : slide.buttonTextEn}</Link>
            </Button>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrev}
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary scale-125' : 'bg-primary-foreground/50 hover:bg-primary-foreground/80'}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
       <style jsx>{`
        .animate-fade-in-down {
          animation: fadeInDown 0.7s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
