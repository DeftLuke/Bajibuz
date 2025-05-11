import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, PlayCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Games - DeshiSpin",
  description: "Explore a wide variety of exciting online games.",
};

const placeholderGames = [
  { id: 1, name: "Crazy Time", category: "Live Casino", imageUrl: "https://picsum.photos/300/200?random=10", dataAiHint: "casino wheel" },
  { id: 2, name: "Deshi Roulette", category: "Table Games", imageUrl: "https://picsum.photos/300/200?random=11", dataAiHint: "roulette table" },
  { id: 3, name: "Bengal Slots", category: "Slots", imageUrl: "https://picsum.photos/300/200?random=12", dataAiHint: "slot machine" },
  { id: 4, name: "Padma Poker", category: "Card Games", imageUrl: "https://picsum.photos/300/200?random=13", dataAiHint: "poker cards" },
  { id: 5, name: "Sundarban Blackjack", category: "Live Casino", imageUrl: "https://picsum.photos/300/200?random=14", dataAiHint: "blackjack game" },
  { id: 6, name: "Jamuna Jackpot", category: "Jackpot", imageUrl: "https://picsum.photos/300/200?random=15", dataAiHint: "gold coins" },
];

export default function GamesPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Gamepad2 className="mr-3 h-8 w-8 text-primary" /> All Games
          </h1>
          <p className="text-muted-foreground">Find your favorite games or discover new ones.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search games..." className="pl-10 w-full md:w-[300px] bg-card" />
        </div>
      </header>

      {/* TODO: Add category filters here */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {placeholderGames.map((game) => (
          <Card key={game.id} className="overflow-hidden group transition-all hover:shadow-primary/20 hover:scale-105 duration-300 ease-out">
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
              <Button className="w-full" asChild>
                <Link href={`/games/${game.id}`}> {/* Placeholder link */}
                  <PlayCircle className="mr-2 h-5 w-5" /> Play Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       {placeholderGames.length === 0 && (
          <div className="text-center py-12">
            <Gamepad2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No games available at the moment.</p>
            <p className="text-sm text-muted-foreground">Please check back later.</p>
          </div>
        )}
    </div>
  );
}
