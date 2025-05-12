"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Gamepad2,
  PlayCircle,
  Search,
  TrendingUp,
  Gift,
  Users as UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";

// ✅ Type for each game
type Game = {
  id: number;
  nameEn: string;
  nameBn: string;
  categoryEn: string;
  categoryBn: string;
  imageUrl: string;
  dataAiHint: string;
};

const placeholderGamesData: Game[] = [
  {
    id: 1,
    nameEn: "Baji Slots Deluxe",
    nameBn: "বাজি স্লটস ডিলাক্স",
    categoryEn: "Slots",
    categoryBn: "স্লট",
    imageUrl: "https://picsum.photos/300/200?random=71",
    dataAiHint: "slot machine gold",
  },
  {
    id: 2,
    nameEn: "Dhaka Roulette",
    nameBn: "ঢাকা রুলেট",
    categoryEn: "Table Games",
    categoryBn: "টেবিল গেম",
    imageUrl: "https://picsum.photos/300/200?random=72",
    dataAiHint: "roulette wheel luxury",
  },
  {
    id: 3,
    nameEn: "Bengal Tiger Poker",
    nameBn: "বেঙ্গল টাইগার পোকার",
    categoryEn: "Card Games",
    categoryBn: "কার্ড গেম",
    imageUrl: "https://picsum.photos/300/200?random=73",
    dataAiHint: "poker chips cards",
  },
  {
    id: 4,
    nameEn: "Rocket Crash",
    nameBn: "রকেট ক্র্যাশ",
    categoryEn: "Crash",
    categoryBn: "ক্র্যাশ",
    imageUrl: "https://picsum.photos/300/200?random=74",
    dataAiHint: "graph rocket",
  },
  {
    id: 5,
    nameEn: "Sundarban Blackjack VIP",
    nameBn: "সুন্দরবন ব্ল্যাকজ্যাক ভিআইপি",
    categoryEn: "Live Casino",
    categoryBn: "লাইভ ক্যাসিনো",
    imageUrl: "https://picsum.photos/300/200?random=75",
    dataAiHint: "blackjack table dealer",
  },
  {
    id: 6,
    nameEn: "Mega Moolah Jackpot",
    nameBn: "মেগা মুলাহ জ্যাকপট",
    categoryEn: "Jackpot",
    categoryBn: "জ্যাকপট",
    imageUrl: "https://picsum.photos/300/200?random=76",
    dataAiHint: "treasure chest coins",
  },
  {
    id: 7,
    nameEn: "Ludo King (Bangla Classic)",
    nameBn: "লুডু কিং (বাংলা ক্লাসিক)",
    categoryEn: "Bangla Classics",
    categoryBn: "বাংলা ক্লাসিক",
    imageUrl: "https://picsum.photos/300/200?random=77",
    dataAiHint: "ludo board game",
  },
  {
    id: 8,
    nameEn: "Aviator Pro",
    nameBn: "এভিয়েটর প্রো",
    categoryEn: "Crash",
    categoryBn: "ক্র্যাশ",
    imageUrl: "https://picsum.photos/300/200?random=78",
    dataAiHint: "airplane sky",
  },
];

export default function GamesPage() {
  const { language } = useLanguage();

  const getGameText = (game: Game, field: "name" | "category") => {
    const key = language === "bn" ? `${field}Bn` : `${field}En`;
    return game[key as keyof Game] || game[`${field}En` as keyof Game];
  };

  const gameCategorySections = [
    {
      titleEn: "Hot Today",
      titleBn: "আজকের হট গেম",
      icon: TrendingUp,
      games: placeholderGamesData.slice(0, 4),
      dataAiHint: "fire flames",
    },
    {
      titleEn: "New Releases",
      titleBn: "নতুন রিলিজ",
      icon: Gift,
      games: placeholderGamesData.slice(4, 6),
      dataAiHint: "new tag shiny",
    },
    {
      titleEn: "Card Games",
      titleBn: "কার্ড গেম",
      icon: UsersIcon,
      games: placeholderGamesData.filter(
        (g) =>
          g.categoryEn === "Card Games" ||
          g.nameEn.includes("Poker") ||
          g.nameEn.includes("Blackjack")
      ),
      dataAiHint: "playing cards ace",
    },
    {
      titleEn: "Bangla Classics",
      titleBn: "বাংলা ক্লাসিক",
      icon: Gamepad2,
      games: placeholderGamesData.filter(
        (g) => g.categoryEn === "Bangla Classics"
      ),
      dataAiHint: "traditional motif",
    },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gold flex items-center">
            <Gamepad2 className="mr-3 h-8 w-8 text-primary" />
            {language === "bn" ? "সকল গেম" : "All Games"}
          </h1>
          <p className="text-muted-foreground">
            {language === "bn"
              ? "আপনার পছন্দের গেম খুঁজুন অথবা নতুন গেম আবিষ্কার করুন।"
              : "Find your favorite games or discover new ones."}
          </p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={language === "bn" ? "গেম খুঁজুন..." : "Search games..."}
            className="pl-10 w-full md:w-[300px] bg-card"
          />
        </div>
      </header>

      {gameCategorySections.map((section) => (
        <section key={section.titleEn}>
          <div className="flex items-center mb-6">
            <section.icon
              className="mr-3 h-7 w-7 text-primary"
              data-ai-hint={section.dataAiHint}
            />
            <h2 className="text-2xl font-semibold text-foreground">
              {language === "bn" ? section.titleBn : section.titleEn}
            </h2>
          </div>
          {section.games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.games.map((game) => (
                <Card
                  key={game.id}
                  className="overflow-hidden group transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105 duration-300 ease-out border border-transparent hover:border-primary/50 hover:-translate-y-1 hover:rotate-1"
                >
                  <CardHeader className="p-0 relative">
                    <Image
                      src={game.imageUrl}
                      alt={String(getGameText(game, "name"))}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      data-ai-hint={game.dataAiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <CardTitle className="text-xl text-primary-foreground drop-shadow-md">
                        {getGameText(game, "name")}
                      </CardTitle>
                      <CardDescription className="text-sm text-primary-foreground/80">
                        {getGameText(game, "category")}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                      <Link href={`/games/${game.id}`}>
                        <PlayCircle className="mr-2 h-5 w-5" />
                        {language === "bn" ? "এখনই খেলুন" : "Play Now"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              {language === "bn"
                ? "এই বিভাগে কোনো গেম এখনো যুক্ত করা হয়নি।"
                : "No games added to this section yet."}
            </div>
          )}
        </section>
      ))}

      {placeholderGamesData.length === 0 && (
        <div className="text-center py-12">
          <Gamepad2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">
            {language === "bn"
              ? "এই মুহূর্তে কোনো গেম উপলব্ধ নেই।"
              : "No games available at the moment."}
          </p>
          <p className="text-sm text-muted-foreground">
            {language === "bn" ? "অনুগ্রহ করে পরে আবার দেখুন।" : "Please check back later."}
          </p>
        </div>
      )}
    </div>
  );
}
