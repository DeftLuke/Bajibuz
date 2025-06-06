
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, CalendarDays, Users, Star, Dices } from "lucide-react"; // Added Dices
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";

// export const metadata = { // Static or server-generated
//   title: "Leaderboards - Bajibuz",
//   description: "Compete in Bajibuz leaderboards for weekly and monthly prizes. Show your skills and win big!",
// };

// Placeholder data for leaderboards
const weeklyLeaderboardData = [
  { rank: 1, avatar: "https://picsum.photos/40/40?random=21", name: "Player_Alpha", points: 15200, prize: "৳25,000" },
  { rank: 2, avatar: "https://picsum.photos/40/40?random=22", name: "BajiMasterBD", points: 14850, prize: "৳15,000" },
  { rank: 3, avatar: "https://picsum.photos/40/40?random=23", name: "SlotKing77", points: 14500, prize: "৳10,000" },
  { rank: 4, avatar: "https://picsum.photos/40/40?random=24", name: "LuckyCham", points: 13900, prize: "৳5,000" },
  { rank: 5, avatar: "https://picsum.photos/40/40?random=25", name: "WinnerGal", points: 13500, prize: "৳2,500" },
];

const monthlyLeaderboardData = [
  { rank: 1, avatar: "https://picsum.photos/40/40?random=31", name: "TheLegend27", points: 65200, prize: "৳100,000 + VIP Upgrade" },
  { rank: 2, avatar: "https://picsum.photos/40/40?random=32", name: "CasinoQueenBD", points: 63850, prize: "৳50,000" },
  { rank: 3, avatar: "https://picsum.photos/40/40?random=33", name: "HighRollerX", points: 62500, prize: "৳25,000" },
];

const gameSpecificLeaderboardsData = [
    { 
        gameNameEn: "Baji Slots Deluxe Challenge", gameNameBn: "বাজি স্লটস ডিলাক্স চ্যালেঞ্জ",
        endsInEn: "3 days", endsInBn: "৩ দিন", 
        topPlayer: "SlotProBD", 
        prizePool: "৳50,000",
        icon: Dices,
        link: "/games/1",
        dataAiHint: "slot machine jackpot",
    },
    { 
        gameNameEn: "Live Roulette Masters", gameNameBn: "লাইভ রুলেট মাস্টার্স",
        endsInEn: "5 days", endsInBn: "৫ দিন", 
        topPlayer: "RouletteGuru", 
        prizePool: "৳75,000",
        icon: Users, 
        link: "/games?category=live-casino",
        dataAiHint: "roulette wheel casino",
    },
];

export default function LeaderboardPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-12">
      <header className="text-center py-8">
        <Trophy className="mx-auto h-16 w-16 text-primary mb-4 animate-bounce" />
        <h1 className="text-4xl font-bold text-gold">
          {language === 'bn' ? 'লিডারবোর্ড' : 'Leaderboards'}
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          {language === 'bn' 
            ? 'অন্যান্য খেলোয়াড়দের সাথে প্রতিযোগিতা করুন এবং বড় পুরস্কার জিতুন!' 
            : 'Compete with other players and win big prizes!'}
        </p>
      </header>

      {/* Featured Game Leaderboards */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
            <Star className="mr-3 h-7 w-7 text-primary"/>
            {language === 'bn' ? 'গেম ভিত্তিক লিডারবোর্ড' : 'Featured Game Leaderboards'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            {gameSpecificLeaderboardsData.map(lb => (
                 <Card key={lb.gameNameEn} className="shadow-lg hover:shadow-primary/20 transition-shadow">
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-1">
                            <lb.icon className="h-8 w-8 text-primary"/>
                            <CardTitle className="text-xl text-primary">
                              {language === 'bn' ? lb.gameNameBn : lb.gameNameEn}
                            </CardTitle>
                        </div>
                        <CardDescription>
                          {language === 'bn' ? 'পুরস্কার পুল' : 'Prize Pool'}: <span className="font-semibold text-foreground">{lb.prizePool}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          {language === 'bn' ? 'শীর্ষ খেলোয়াড়' : 'Current Leader'}: <span className="font-medium text-foreground">{lb.topPlayer}</span>
                        </p>
                        <p>
                          {language === 'bn' ? 'শেষ হবে' : 'Ends in'}: <span className="font-medium text-foreground">{language === 'bn' ? lb.endsInBn : lb.endsInEn}</span>
                        </p>
                        <Button size="sm" className="mt-3 w-full" asChild>
                            <Link href={lb.link}>
                              {language === 'bn' ? 'চ্যালেঞ্জে যোগ দিন' : 'Join Challenge'}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>


      {/* Weekly Leaderboard */}
      <Card className="shadow-xl border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <TrendingUp className="mr-3 h-7 w-7 text-primary" /> 
                {language === 'bn' ? 'সাপ্তাহিক লিডারবোর্ড' : 'Weekly Leaderboard'}
              </CardTitle>
              <CardDescription>
                {language === 'bn' ? 'এই সপ্তাহের শীর্ষ পারফর্মার।' : "This week's top performers."}
              </CardDescription>
            </div>
            <Badge variant="default" className="text-sm py-1 px-3">
                <CalendarDays className="mr-1.5 h-4 w-4"/> 
                {language === 'bn' ? 'শেষ হবে: রবিবার' : 'Ends: Sunday'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">{language === 'bn' ? 'ক্রম' : 'Rank'}</TableHead>
                <TableHead>{language === 'bn' ? 'খেলোয়াড়' : 'Player'}</TableHead>
                <TableHead className="text-right">{language === 'bn' ? 'পয়েন্ট' : 'Points'}</TableHead>
                <TableHead className="text-right">{language === 'bn' ? 'পুরস্কার' : 'Prize'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeklyLeaderboardData.map((player) => (
                <TableRow key={player.rank} className="hover:bg-muted/30">
                  <TableCell className="font-bold text-lg">
                    {player.rank <= 3 ? 
                        <span className={
                            player.rank === 1 ? "text-gold" : 
                            player.rank === 2 ? "text-slate-400" : "text-orange-400"
                        }>{player.rank}</span> 
                        : player.rank
                    }
                  </TableCell>
                  <TableCell className="flex items-center space-x-3 py-3">
                    <Image src={player.avatar} alt={player.name} width={32} height={32} className="rounded-full" data-ai-hint="person avatar" />
                    <span className="font-medium">{player.name}</span>
                  </TableCell>
                  <TableCell className="text-right font-mono">{player.points.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">{player.prize}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Monthly Leaderboard */}
      <Card className="shadow-xl border-accent/30">
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-2xl flex items-center">
                        <Users className="mr-3 h-7 w-7 text-accent" /> 
                        {language === 'bn' ? 'মাসিক লিডারবোর্ড' : 'Monthly Leaderboard'}
                    </CardTitle>
                    <CardDescription>
                        {language === 'bn' ? 'এই মাসের চ্যাম্পিয়নরা।' : "This month's champions."}
                    </CardDescription>
                </div>
                 <Badge variant="secondary" className="text-sm py-1 px-3 bg-accent text-accent-foreground">
                    <CalendarDays className="mr-1.5 h-4 w-4"/> 
                    {language === 'bn' ? 'মাসের শেষ দিন' : 'End of Month'}
                </Badge>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">{language === 'bn' ? 'ক্রম' : 'Rank'}</TableHead>
                <TableHead>{language === 'bn' ? 'খেলোয়াড়' : 'Player'}</TableHead>
                <TableHead className="text-right">{language === 'bn' ? 'পয়েন্ট' : 'Points'}</TableHead>
                <TableHead className="text-right">{language === 'bn' ? 'পুরস্কার' : 'Prize'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyLeaderboardData.map((player) => (
                <TableRow key={player.rank} className="hover:bg-muted/30">
                  <TableCell className="font-bold text-lg">
                     {player.rank <= 3 ? 
                        <span className={
                            player.rank === 1 ? "text-gold" : 
                            player.rank === 2 ? "text-slate-400" : "text-orange-400"
                        }>{player.rank}</span> 
                        : player.rank
                    }
                  </TableCell>
                  <TableCell className="flex items-center space-x-3 py-3">
                    <Image src={player.avatar} alt={player.name} width={32} height={32} className="rounded-full" data-ai-hint="person avatar" />
                    <span className="font-medium">{player.name}</span>
                  </TableCell>
                  <TableCell className="text-right font-mono">{player.points.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold text-accent">{player.prize}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="text-center mt-12 space-y-3">
        <p className="text-lg text-muted-foreground">
          {language === 'bn' 
            ? 'খেলতে থাকুন এবং লিডারবোর্ডে আপনার স্থান অর্জন করুন!' 
            : 'Keep playing and climb the leaderboards!'}
        </p>
        <Button size="lg" asChild variant="shiny">
          <Link href="/games">
            {language === 'bn' ? 'এখনই খেলুন' : 'Play Now'}
          </Link>
        </Button>
      </div>
    </div>
  );
}
