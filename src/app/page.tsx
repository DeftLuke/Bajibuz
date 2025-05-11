// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Gamepad2, Gift, ShieldCheck, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import PromotionalSlider from "@/components/shared/promotional-slider";
import Image from "next/image";

// Placeholder for real-time winners board data
const recentWinners = [
  { name: "Player_A", game: "Bengal Slots", amount: "৳5,320" },
  { name: "UserX21", game: "Deshi Roulette", amount: "৳12,500" },
  { name: "GamingProBD", game: "Crazy Time", amount: "৳8,150" },
  { name: "Lucky77", game: "Padma Poker", amount: "৳21,000" },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Promotional Slider Section */}
      <PromotionalSlider />

      {/* Game Categories Quick Links - Placeholder */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gold">জনপ্রিয় গেম বিভাগ (Popular Game Categories)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Hot Today", icon: TrendingUp, link: "/games?category=hot", dataAiHint: "flames icon" },
            { name: "New Releases", icon: Gift, link: "/games?category=new", dataAiHint: "gift box"},
            { name: "Card Games", icon: Users, link: "/games?category=card", dataAiHint: "playing cards"}, // Using Users as placeholder for cards
            { name: "Bangla Classics", icon: Gamepad2, link: "/games?category=bangla-classics", dataAiHint: "traditional pattern"},
          ].map(category => (
            <Link href={category.link} key={category.name}>
              <Card className="text-center p-4 hover:shadow-primary/20 transition-shadow duration-300 cursor-pointer h-full flex flex-col justify-center items-center hover:border-primary/50 border border-transparent">
                <category.icon className="h-10 w-10 text-primary mb-2" />
                <p className="font-semibold text-foreground">{category.name}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 bg-primary/10 rounded-md inline-block mb-2">
              <Gamepad2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>500+ সেরা গেম (500+ Exciting Games)</CardTitle>
            <CardDescription>স্লট, রুলেট, পোকার, ব্ল্যাকজ্যাক সহ বিভিন্ন ধরণের জনপ্রিয় ও নতুন গেম আবিষ্কার করুন।</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="px-0 text-primary" asChild>
              <Link href="/games">সব গেম দেখুন <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 bg-primary/10 rounded-md inline-block mb-2">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>দৈনিক পুরস্কার ও বোনাস (Daily Rewards)</CardTitle>
            <CardDescription>প্রতিদিন লগইন করে আকর্ষণীয় বোনাস এবং ফ্রি স্পিন জেতার সুযোগ নিন। প্রথম ডিপোজিটে ১০০% বোনাস!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">প্রতিদিন স্পিন হুইল ঘুরান!</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 bg-primary/10 rounded-md inline-block mb-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>নিরাপদ ও সুরক্ষিত পেমেন্ট (Secure & Local Payments)</CardTitle>
            <CardDescription>বিকাশ, নগদ, রকেট এবং ব্যাংক ট্রান্সফারের মাধ্যমে নিরাপদে গেমিং উপভোগ করুন।</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="px-0 text-primary" asChild>
              <Link href="/wallet">পেমেন্ট পদ্ধতি <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Real-time Winners Board - Placeholder */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gold">সাম্প্রতিক বিজয়ীগণ (Recent Winners)</h2>
        <Card className="shadow-xl">
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {recentWinners.map((winner, index) => (
                <li key={index} className="p-4 flex justify-between items-center hover:bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">{winner.name}</p>
                    <p className="text-sm text-muted-foreground">{winner.game}</p>
                  </div>
                  <p className="font-bold text-primary text-lg">{winner.amount}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
         <p className="text-center mt-4 text-sm text-muted-foreground">(এটি একটি ডেমো তালিকা)</p>
      </section>


      {/* Call to Action Section */}
      <section className="text-center py-12 bg-card rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold mb-4 text-gold">বাজিবাজে যোগ দিতে প্রস্তুত? (Ready to Get Started?)</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          আজই বাজিবাজ কমিউনিটিতে যোগ দিন এবং অফুরন্ত বিনোদন এবং বড় জয়ের জগতে ডুব দিন।
        </p>
        <Button size="lg" asChild className="bg-gradient-primary-accent text-primary-foreground hover:opacity-90 transition-opacity">
          <Link href="/signup">
            একাউন্ট তৈরি করুন <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
