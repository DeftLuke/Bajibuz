
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useEffect, useState } from "react";

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   // In a real app, fetch game name for the title
//   return {
//     title: `Play Game ${params.id} - Bajibuz`,
//     description: `Experience Game ${params.id} on Bajibuz. Join now for exciting gameplay and big wins!`,
//   };
// }

// Simulate fetching game data
async function getGameDetails(id: string, lang: 'en' | 'bn') {
  const placeholderGames = [
    { 
      id: "1", nameEn: "Baji Slots Deluxe", nameBn: "বাজি স্লটস ডিলাক্স", 
      categoryEn: "Slots", categoryBn: "স্লট", 
      imageUrl: "https://picsum.photos/800/600?random=81", dataAiHint: "slot machine gold", 
      descriptionEn: "Experience the deluxe version of Baji Slots with enhanced graphics and bigger jackpots. Spin to win massive prizes!",
      descriptionBn: "বাজি স্লটস ডিলাক্সের উন্নত গ্রাফিক্স এবং বিশাল জ্যাকপটের অভিজ্ঞতা নিন। বিশাল পুরস্কার জিততে স্পিন করুন!"
    },
    { 
      id: "2", nameEn: "Dhaka Roulette", nameBn: "ঢাকা রুলেট", 
      categoryEn: "Table Games", categoryBn: "টেবিল গেম", 
      imageUrl: "https://picsum.photos/800/600?random=82", dataAiHint: "roulette wheel luxury", 
      descriptionEn: "Classic European roulette with a sophisticated Dhaka flair. Place your bets and feel the thrill of the spinning wheel.",
      descriptionBn: "ঢাকা শহরের আমেজে ক্লাসিক ইউরোপীয় রুলেট। আপনার বাজি ধরুন এবং ঘোরানো চাকার রোমাঞ্চ অনুভব করুন।"
    },
    { 
      id: "3", nameEn: "Bengal Tiger Poker", nameBn: "বেঙ্গল টাইগার পোকার", 
      categoryEn: "Card Games", categoryBn: "কার্ড গেম", 
      imageUrl: "https://picsum.photos/800/600?random=83", dataAiHint: "poker chips cards", 
      descriptionEn: "Roar with victory in Bengal Tiger Poker! Test your skills against other players or the house in this exciting card game.",
      descriptionBn: "বেঙ্গল টাইগার পোকারে বিজয়ের গর্জন করুন! এই উত্তেজনাপূর্ণ কার্ড গেমে অন্যান্য খেলোয়াড় বা হাউসের বিরুদ্ধে আপনার দক্ষতা পরীক্ষা করুন।"
    },
    { 
      id: "4", nameEn: "Rocket Crash", nameBn: "রকেট ক্র্যাশ", 
      categoryEn: "Crash", categoryBn: "ক্র্যাশ", 
      imageUrl: "https://picsum.photos/800/600?random=84", dataAiHint: "graph rocket", 
      descriptionEn: "Watch the multiplier soar in Rocket Crash! Cash out before the rocket crashes to secure your winnings. How high can you go?",
      descriptionBn: "রকেট ক্র্যাশে মাল্টিপ্লায়ার বাড়তে দেখুন! রকেট ক্র্যাশ হওয়ার আগে ক্যাশ আউট করে আপনার জয় নিশ্চিত করুন। আপনি কত উঁচুতে যেতে পারবেন?"
    },
    { 
      id: "5", nameEn: "Sundarban Blackjack VIP", nameBn: "সুন্দরবন ব্ল্যাকজ্যাক ভিআইপি", 
      categoryEn: "Live Casino", categoryBn: "লাইভ ক্যাসিনো", 
      imageUrl: "https://picsum.photos/800/600?random=85", dataAiHint: "blackjack table dealer", 
      descriptionEn: "Enter the VIP lounge for Sundarban Blackjack. Play against live dealers and aim for 21 in this premium experience.",
      descriptionBn: "সুন্দরবন ব্ল্যাকজ্যাকের ভিআইপি লাউঞ্জে প্রবেশ করুন। লাইভ ডিলারদের সাথে খেলুন এবং এই প্রিমিয়াম অভিজ্ঞতায় ২১ এর লক্ষ্য করুন।"
    },
    { 
      id: "6", nameEn: "Mega Moolah Jackpot", nameBn: "মেগা মুলাহ জ্যাকপট", 
      categoryEn: "Jackpot", categoryBn: "জ্যাকপট", 
      imageUrl: "https://picsum.photos/800/600?random=86", dataAiHint: "treasure chest coins", 
      descriptionEn: "Chase the legendary Mega Moolah Jackpot! This progressive slot offers life-changing sums of money. One spin is all it takes!",
      descriptionBn: "কিংবদন্তি মেগা মুলাহ জ্যাকপট তাড়া করুন! এই প্রগতিশীল স্লট জীবন পরিবর্তনকারী অর্থ অফার করে। একটি স্পিনই যথেষ্ট!"
    },
    { 
      id: "7", nameEn: "Ludo King (Bangla Classic)", nameBn: "লুডু কিং (বাংলা ক্লাসিক)", 
      categoryEn: "Bangla Classics", categoryBn: "বাংলা ক্লাসিক", 
      imageUrl: "https://picsum.photos/800/600?random=87", dataAiHint: "ludo board game", 
      descriptionEn: "Enjoy the beloved classic Ludo with a modern twist. Play with friends or other players online.",
      descriptionBn: "আধুনিক মোড়কে প্রিয় ক্লাসিক লুডু উপভোগ করুন। অনলাইনে বন্ধু বা অন্যান্য খেলোয়াড়দের সাথে খেলুন।"
    },
    { 
      id: "8", nameEn: "Aviator Pro", nameBn: "এভিয়েটর প্রো", 
      categoryEn: "Crash", categoryBn: "ক্র্যাশ", 
      imageUrl: "https://picsum.photos/800/600?random=88", dataAiHint: "airplane sky", 
      descriptionEn: "Take flight with Aviator Pro! A thrilling crash game where timing is everything. Bet, watch, and cash out for big rewards.",
      descriptionBn: "এভিয়েটর প্রো এর সাথে উড়ান! একটি রোমাঞ্চকর ক্র্যাশ গেম যেখানে সময়ই সবকিছু। বাজি ধরুন, দেখুন এবং বড় পুরস্কারের জন্য ক্যাশ আউট করুন।"
    },
  ];
  
  const game = placeholderGames.find(g => g.id.toString() === id.toString());
  
  if (game) {
    return {
      id: game.id,
      name: lang === 'bn' ? game.nameBn : game.nameEn,
      category: lang === 'bn' ? game.categoryBn : game.categoryEn,
      imageUrl: game.imageUrl,
      dataAiHint: game.dataAiHint,
      description: lang === 'bn' ? game.descriptionBn : game.descriptionEn,
    };
  }

  return {
    id,
    name: lang === 'bn' ? `অসাধারণ গেম ${id}` : `Awesome Game ${id}`,
    category: lang === 'bn' ? "জনপ্রিয় পছন্দ" : "Popular Choice",
    imageUrl: `https://picsum.photos/800/600?random=${id}`,
    dataAiHint: "game interface",
    description: lang === 'bn' 
      ? "এটি একটি আশ্চর্যজনক গেমের জন্য একটি স্থানধারক বিবরণ। অন্তহীন মজা এবং বড় জয়ের জন্য প্রস্তুত হন! লোরেম ইপ্সাম..."
      : "This is a placeholder description for an amazing game. Get ready for endless fun and big wins! Lorem ipsum dolor sit amet..."
  };
}

const whyPlayReasons = [
    { en: "Thrilling and immersive gameplay", bn: "রোমাঞ্চকর এবং ইমারসিভ গেমপ্লে অভিজ্ঞতা" },
    { en: "High potential for big wins", bn: "বড় জয় এবং জ্যাকপটের উচ্চ সম্ভাবনা" },
    { en: "Beautiful graphics & sound", bn: "সুন্দর গ্রাফিক্স এবং আকর্ষনীয় সাউন্ড ইফেক্ট" },
    { en: "Fair play guaranteed by certified RNG", bn: "সার্টিফাইড RNG দ্বারা ফেয়ার প্লে নিশ্চিত" },
    { en: "Available on desktop & mobile", bn: "ডেস্কটপ এবং মোবাইলে খেলার উপযোগী" },
];


export default function GameDetailPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage();
  const [game, setGame] = useState<Awaited<ReturnType<typeof getGameDetails>> | null>(null);

  useEffect(() => {
    async function loadGame() {
      const gameDetails = await getGameDetails(params.id, language);
      setGame(gameDetails);
    }
    loadGame();
  }, [params.id, language]);

  if (!game) {
    return <div className="text-center py-10">{language === 'bn' ? 'গেম লোড হচ্ছে...' : 'Loading game...'}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="mt-4">
        <Link href="/games" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'bn' ? 'সকল গেমে ফিরে যান' : 'Back to All Games'}
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
                <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {language === 'bn' ? `${game.name} কেন খেলবেন?` : `Why Play ${game.name}?`}
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm">
                    {whyPlayReasons.map(reason => (
                        <li key={reason.en}>{language === 'bn' ? reason.bn : reason.en}</li>
                    ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t border-border mt-auto">
              <Button size="lg" className="w-full text-lg py-3">
                <PlayCircle className="mr-2 h-6 w-6" /> 
                {language === 'bn' ? `${game.name} খেলুন` : `Play ${game.name}`}
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>

      <section className="py-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            {language === 'bn' ? 'আপনার জন্য আরও গেম' : 'You Might Also Like'}
        </h2>
        {/* TODO: Add a component to display a few related game cards */}
        <p className="text-center text-muted-foreground">
            {language === 'bn' ? 'আরও গেমের সাজেশন শীঘ্রই আসছে!' : 'More game suggestions coming soon!'}
        </p>
      </section>
    </div>
  );
}
