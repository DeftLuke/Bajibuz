// src/components/shared/promotional-slider.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "আজই জয় করুন লক্ষ টাকা বোনাস!",
    description: "আপনার প্রথম জমাতে সম্পূর্ণ ১০০% বোনাস পান, লক্ষ টাকা পর্যন্ত! এখনই যোগ দিন এবং আপনার জয় দ্বিগুণ করুন।",
    imageUrl: "https://picsum.photos/1200/400?random=51",
    dataAiHint: "money gift treasure",
    link: "/promotions#welcome-bonus",
    buttonText: "বোনাস নিন"
  },
  {
    id: 2,
    title: "ফ্রি স্পিনে জিতে নিন ক্যাশব্যাক!",
    description: "লাকি হুইলে আপনার ভাগ্য পরীক্ষা করুন প্রতিদিন! নগদ টাকা, ফ্রি স্পিন, ক্যাশব্যাক এবং আরও অনেক আকর্ষণীয় পুরস্কার জিতুন।",
    imageUrl: "https://picsum.photos/1200/400?random=52",
    dataAiHint: "fortune wheel jackpot",
    link: "/promotions#daily-spin",
    buttonText: "এখনই স্পিন করুন"
  },
  {
    id: 3,
    title: "আজকের হট গেম: ব্ল্যাকজ্যাক – এখনই খেলুন!",
    description: "আমাদের জনপ্রিয় ব্ল্যাকজ্যাক টেবিলে যোগ দিন আর ডিলারকে হারানোর রোমাঞ্চ অনুভব করুন। বড় জয়ের সুযোগ আপনার হাতে!",
    imageUrl: "https://picsum.photos/1200/400?random=53",
    dataAiHint: "blackjack cards table",
    link: "/games?category=table-games",
    buttonText: "খেলুন"
  },
  {
    id: 4,
    title: "ঈদ অফার: স্পেশাল ক্যাশব্যাক এবং ফ্রি বেট!",
    description: "এই ঈদে Bajibuz নিয়ে এলো বিশেষ অফার! নির্বাচিত গেমগুলোতে পান দারুণ ক্যাশব্যাক এবং ফ্রি বেট। ঈদের আনন্দ হোক দ্বিগুণ!",
    imageUrl: "https://picsum.photos/1200/400?random=54",
    dataAiHint: "eid celebration festive",
    link: "/promotions#eid-offer",
    buttonText: "অফার দেখুন"
  },
  {
    id: 5,
    title: "বন্ধুকে ইনভাইট করুন, দুজনেই বোনাস পান!",
    description: "Bajibuz-এ আপনার বন্ধুদের আমন্ত্রণ জানান আর প্রতি রেফারেলে আকর্ষণীয় বোনাস উপভোগ করুন। একসাথে খেলুন, একসাথে জিতুন!",
    imageUrl: "https://picsum.photos/1200/400?random=55",
    dataAiHint: "friends sharing bonus",
    link: "/promotions#referral",
    buttonText: "ইনভাইট করুন"
  },
];

export default function PromotionalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Don't run effect on server
    
    const timer = setTimeout(() => {
      handleNext();
    }, 7000); // Auto-slide every 7 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, isClient]); // Add isClient to dependencies

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };
  
  if (!isClient) {
    // Render a static placeholder or the first slide on the server to avoid layout shift and hydration errors
    const slide = slides[0];
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-[400px] rounded-xl overflow-hidden shadow-2xl bg-card">
        <Image
          src={slide.imageUrl}
          alt={slide.title}
          layout="fill"
          objectFit="cover"
          priority // Prioritize the first image for LCP
          data-ai-hint={slide.dataAiHint}
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-foreground mb-2 sm:mb-3 drop-shadow-lg">{slide.title}</h2>
          <p className="text-xs sm:text-sm md:text-lg text-primary-foreground/80 mb-4 sm:mb-6 max-w-md sm:max-w-xl drop-shadow-md">{slide.description}</p>
          <Button size="lg" asChild>
            <Link href={slide.link}>{slide.buttonText}</Link>
          </Button>
        </div>
      </div>
    );
  }


  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-[400px] rounded-xl overflow-hidden shadow-2xl group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          aria-hidden={index !== currentIndex}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            layout="fill"
            objectFit="cover"
            priority={index === 0} 
            data-ai-hint={slide.dataAiHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-foreground mb-2 sm:mb-3 drop-shadow-lg animate-fade-in-down">{slide.title}</h2>
            <p className="text-xs sm:text-sm md:text-lg text-primary-foreground/80 mb-4 sm:mb-6 max-w-md sm:max-w-xl drop-shadow-md animate-fade-in-up">{slide.description}</p>
            <Button size="lg" asChild className="animate-fade-in-up animation-delay-300">
              <Link href={slide.link}>{slide.buttonText}</Link>
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
        {slides.map((_, index) => (
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
