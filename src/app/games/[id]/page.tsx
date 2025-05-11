import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }) {
  // In a real app, fetch game name for the title
  return {
    title: `Play Game ${params.id} - DeshiSpin`,
    description: `Experience Game ${params.id} on DeshiSpin. Join now for exciting gameplay and big wins!`,
  };
}

// Simulate fetching game data
async function getGameDetails(id: string) {
  // In a real app, fetch this from your backend or CMS
  // Ensure IDs here match those used in your /games page if you want consistent data
  const placeholderGames = [
    { id: "1", name: "Crazy Time", category: "Live Casino", imageUrl: "https://picsum.photos/800/600?random=20", dataAiHint: "casino wheel", description: "An exciting live casino game show with multiple bonus rounds and high multipliers. Bet on numbers or bonus games to win big!" },
    { id: "2", name: "Deshi Roulette", category: "Table Games", imageUrl: "https://picsum.photos/800/600?random=21", dataAiHint: "roulette wheel", description: "Classic European roulette with a local Deshi touch. Place your bets and watch the wheel spin for fortune." },
    { id: "3", name: "Bengal Slots", category: "Slots", imageUrl: "https://picsum.photos/800/600?random=22", dataAiHint: "slot machine", description: "Spin the reels of Bengal Slots and discover hidden treasures. Features exciting bonus games and free spins." },
    { id: "4", name: "Padma Poker", category: "Card Games", imageUrl: "https://picsum.photos/800/600?random=23", dataAiHint: "poker cards", description: "Test your poker skills in Padma Poker. Play against others or the house in this thrilling card game." },
    { id: "5", name: "Sundarban Blackjack", category: "Live Casino", imageUrl: "https://picsum.photos/800/600?random=24", dataAiHint: "blackjack game", description: "Try to beat the dealer in Sundarban Blackjack. Aim for 21 in this classic live casino game." },
    { id: "6", name: "Jamuna Jackpot", category: "Jackpot", imageUrl: "https://picsum.photos/800/600?random=25", dataAiHint: "gold coins", description: "Dreaming of a big win? Jamuna Jackpot offers massive progressive jackpots. One spin could change your life!" },
  ];
  
  // Find game by ID, converting param to string if necessary (though it should already be string)
  const game = placeholderGames.find(g => g.id.toString() === id.toString());
  
  if (game) return game;

  // Fallback for any other ID not in the placeholder list
  return {
    id,
    name: `Awesome Game ${id}`,
    category: "Popular Choice",
    imageUrl: `https://picsum.photos/800/600?random=${id}`,
    dataAiHint: "game interface",
    description: "This is a placeholder description for an amazing game. Get ready for endless fun and big wins! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  };
}


export default async function GameDetailPage({ params }: { params: { id: string } }) {
  const game = await getGameDetails(params.id);

  return (
    <div className="space-y-8">
      <div className="mt-4">
        <Link href="/games" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Games
        </Link>
      </div>

      <Card className="shadow-xl overflow-hidden border-primary/20">
        <div className="grid md:grid-cols-5"> {/* Changed to 2/3 split for image/text */}
          <div className="md:col-span-3 relative h-72 md:h-auto min-h-[300px] md:min-h-[500px]"> {/* Increased min-h for larger image */}
            <Image
              src={game.imageUrl}
              alt={game.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={game.dataAiHint}
              priority
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/10 md:to-black/60"></div>
          </div>
          <div className="md:col-span-2 flex flex-col bg-card">
            <CardHeader className="pb-4 pt-6 px-6">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">{game.category}</p>
              <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground">{game.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-6 flex-grow">
              <CardDescription className="text-base leading-relaxed text-muted-foreground">{game.description}</CardDescription>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">Why Play {game.name}?</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm">
                    <li>Thrilling and immersive gameplay experience</li>
                    <li>High potential for big wins and jackpots</li>
                    <li>Beautiful graphics and engaging sound effects</li>
                    <li>Fair play guaranteed with certified RNG</li>
                    <li>Available on desktop and mobile devices</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t border-border mt-auto">
              <Button size="lg" className="w-full text-lg py-3">
                <PlayCircle className="mr-2 h-6 w-6" /> Play {game.name}
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>

      {/* Placeholder for 'Related Games' or 'More Info' sections */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">You Might Also Like</h2>
        {/* TODO: Add a component to display a few related game cards */}
        <p className="text-center text-muted-foreground">More game suggestions coming soon!</p>
      </section>
    </div>
  );
}
