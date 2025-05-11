import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, PlayCircle, Search, TrendingUp, Gift, Users as UsersIcon } from "lucide-react"; // UsersIcon for Card Games
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Games - Bajibuz",
  description: "Explore a wide variety of exciting online games at Bajibuz. Play slots, roulette, poker, crash, and more!",
};

const placeholderGames = [
  { id: 1, name: "Baji Slots Deluxe", category: "Slots", imageUrl: "https://picsum.photos/300/200?random=71", dataAiHint: "slot machine gold" },
  { id: 2, name: "Dhaka Roulette", category: "Table Games", imageUrl: "https://picsum.photos/300/200?random=72", dataAiHint: "roulette wheel luxury" },
  { id: 3, name: "Bengal Tiger Poker", category: "Card Games", imageUrl: "https://picsum.photos/300/200?random=73", dataAiHint: "poker chips cards" },
  { id: 4, name: "Rocket Crash", category: "Crash", imageUrl: "https://picsum.photos/300/200?random=74", dataAiHint: "graph rocket" },
  { id: 5, "name": "Sundarban Blackjack VIP", category: "Live Casino", imageUrl: "https://picsum.photos/300/200?random=75", dataAiHint: "blackjack table dealer" },
  { id: 6, name: "Mega Moolah Jackpot", category: "Jackpot", imageUrl: "https://picsum.photos/300/200?random=76", dataAiHint: "treasure chest coins" },
  { id: 7, name: "Ludo King (Bangla Classic)", category: "Bangla Classics", imageUrl: "https://picsum.photos/300/200?random=77", dataAiHint: "ludo board game" },
  { id: 8, name: "Aviator Pro", category: "Crash", imageUrl: "https://picsum.photos/300/200?random=78", dataAiHint: "airplane sky" },
];

// Game Categories for display
const gameCategorySections = [
  { title: "আজকের হট গেম (Hot Today)", icon: TrendingUp, games: placeholderGames.slice(0, 4), dataAiHint: "fire flames" },
  { title: "নতুন রিলিজ (New Releases)", icon: Gift, games: placeholderGames.slice(4, 6), dataAiHint: "new tag shiny" },
  { title: "কার্ড গেম (Card Games)", icon: UsersIcon, games: placeholderGames.filter(g => g.category === "Card Games" || g.name.includes("Poker") || g.name.includes("Blackjack")), dataAiHint: "playing cards ace" },
  { title: "বাংলা ক্লাসিক (Bangla Classics)", icon: Gamepad2, games: placeholderGames.filter(g => g.category === "Bangla Classics"), dataAiHint: "traditional motif" },
];


export default function GamesPage() {
  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gold flex items-center">
            <Gamepad2 className="mr-3 h-8 w-8 text-primary" /> সকল গেম (All Games)
          </h1>
          <p className="text-muted-foreground">আপনার পছন্দের গেম খুঁজুন অথবা নতুন গেম আবিষ্কার করুন। (Find your favorite games or discover new ones.)</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="গেম খুঁজুন... (Search games...)" className="pl-10 w-full md:w-[300px] bg-card" />
        </div>
      </header>

      {/* Category Sections */}
      {gameCategorySections.map(section => (
        <section key={section.title}>
          <div className="flex items-center mb-6">
            <section.icon className="mr-3 h-7 w-7 text-primary" data-ai-hint={section.dataAiHint}/>
            <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
          </div>
          {section.games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.games.map((game) => (
                <Card 
                  key={game.id} 
                  className="overflow-hidden group transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-108 duration-300 ease-out border border-transparent hover:border-primary/50"
                >
                  <CardHeader className="p-0 relative">
                    <Image
                      src={game.imageUrl}
                      alt={game.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      data-ai-hint={game.dataAiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <CardTitle className="text-xl text-primary-foreground drop-shadow-md">{game.name}</CardTitle>
                      <CardDescription className="text-sm text-primary-foreground/80">{game.category}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                      <Link href={`/games/${game.id}`}>
                        <PlayCircle className="mr-2 h-5 w-5" /> এখনই খেলুন (Play Now)
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
             <div className="text-center py-10 text-muted-foreground">
                এই বিভাগে কোনো গেম এখনো যুক্ত করা হয়নি। (No games added to this section yet.)
            </div>
          )}
        </section>
      ))}
      
      {placeholderGames.length === 0 && (
          <div className="text-center py-12">
            <Gamepad2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">এই মুহূর্তে কোনো গেম উপলব্ধ নেই। (No games available at the moment.)</p>
            <p className="text-sm text-muted-foreground">অনুগ্রহ করে পরে আবার দেখুন। (Please check back later.)</p>
          </div>
        )}
    </div>
  );
}
