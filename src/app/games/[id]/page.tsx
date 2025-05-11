import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }) {
  // In a real app, fetch game name for the title
  return {
    title: `Play Game ${params.id} - Bajibuz`,
    description: `Experience Game ${params.id} on Bajibuz. Join now for exciting gameplay and big wins!`,
  };
}

// Simulate fetching game data
async function getGameDetails(id: string) {
  const placeholderGames = [
    { id: "1", name: "Baji Slots Deluxe", category: "Slots", imageUrl: "https://picsum.photos/800/600?random=81", dataAiHint: "slot machine gold", description: "Experience the deluxe version of Baji Slots with enhanced graphics and bigger jackpots. Spin to win massive prizes!" },
    { id: "2", name: "Dhaka Roulette", category: "Table Games", imageUrl: "https://picsum.photos/800/600?random=82", dataAiHint: "roulette wheel luxury", description: "Classic European roulette with a sophisticated Dhaka flair. Place your bets and feel the thrill of the spinning wheel." },
    { id: "3", name: "Bengal Tiger Poker", category: "Card Games", imageUrl: "https://picsum.photos/800/600?random=83", dataAiHint: "poker chips cards", description: "Roar with victory in Bengal Tiger Poker! Test your skills against other players or the house in this exciting card game." },
    { id: "4", name: "Rocket Crash", category: "Crash", imageUrl: "https://picsum.photos/800/600?random=84", dataAiHint: "graph rocket", description: "Watch the multiplier soar in Rocket Crash! Cash out before the rocket crashes to secure your winnings. How high can you go?" },
    { id: "5", name: "Sundarban Blackjack VIP", category: "Live Casino", imageUrl: "https://picsum.photos/800/600?random=85", dataAiHint: "blackjack table dealer", description: "Enter the VIP lounge for Sundarban Blackjack. Play against live dealers and aim for 21 in this premium experience." },
    { id: "6", name: "Mega Moolah Jackpot", category: "Jackpot", imageUrl: "https://picsum.photos/800/600?random=86", dataAiHint: "treasure chest coins", description: "Chase the legendary Mega Moolah Jackpot! This progressive slot offers life-changing sums of money. One spin is all it takes!" },
    { id: "7", name: "Ludo King (Bangla Classic)", category: "Bangla Classics", imageUrl: "https://picsum.photos/800/600?random=87", dataAiHint: "ludo board game", description: "Enjoy the beloved classic Ludo with a modern twist. Play with friends or other players online." },
    { id: "8", name: "Aviator Pro", category: "Crash", imageUrl: "https://picsum.photos/800/600?random=88", dataAiHint: "airplane sky", description: "Take flight with Aviator Pro! A thrilling crash game where timing is everything. Bet, watch, and cash out for big rewards." },
  ];
  
  const game = placeholderGames.find(g => g.id.toString() === id.toString());
  
  if (game) return game;

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
          সকল গেমে ফিরে যান (Back to All Games)
        </Link>
      </div>

      <Card className="shadow-xl overflow-hidden border-primary/20">
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 relative h-72 md:h-auto min-h-[300px] md:min-h-[500px]">
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
                <h3 className="font-semibold text-foreground mb-2 text-lg">{game.name} কেন খেলবেন? (Why Play {game.name}?)</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm">
                    <li>রোমাঞ্চকর এবং ইমারসিভ গেমপ্লে অভিজ্ঞতা (Thrilling and immersive gameplay)</li>
                    <li>বড় জয় এবং জ্যাকপটের উচ্চ সম্ভাবনা (High potential for big wins)</li>
                    <li>সুন্দর গ্রাফিক্স এবং আকর্ষনীয় সাউন্ড ইফেক্ট (Beautiful graphics & sound)</li>
                    <li>সার্টিফাইড RNG দ্বারা ফেয়ার প্লে নিশ্চিত (Fair play guaranteed)</li>
                    <li>ডেস্কটপ এবং মোবাইলে খেলার উপযোগী (Available on desktop & mobile)</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t border-border mt-auto">
              <Button size="lg" className="w-full text-lg py-3">
                <PlayCircle className="mr-2 h-6 w-6" /> {game.name} খেলুন (Play)
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>

      <section className="py-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">আপনার জন্য আরও গেম (You Might Also Like)</h2>
        {/* TODO: Add a component to display a few related game cards */}
        <p className="text-center text-muted-foreground">আরও গেমের সাজেশন শীঘ্রই আসছে! (More game suggestions coming soon!)</p>
      </section>
    </div>
  );
}
