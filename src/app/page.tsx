
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Gamepad2, Gift, ShieldCheck, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import PromotionalSlider from "@/components/shared/promotional-slider";
import { useLanguage } from "@/context/language-context";

// Placeholder for real-time winners board data
const recentWinners = [
  { name: "Player_A", game: "Bengal Slots", gameBn: "বেঙ্গল স্লট", amount: "৳5,320" },
  { name: "UserX21", game: "Deshi Roulette", gameBn: "দেশী রুলেট", amount: "৳12,500" },
  { name: "GamingProBD", game: "Crazy Time", gameBn: "ক্রেজি টাইম", amount: "৳8,150" },
  { name: "Lucky77", game: "Padma Poker", gameBn: "পদ্মা পোকার", amount: "৳21,000" },
];

export default function Home() {
  const { language } = useLanguage();

  const gameCategories = [
    { nameEn: "Hot Today", nameBn: "আজকের হট", icon: TrendingUp, link: "/games?category=hot", dataAiHint: "flames icon" },
    { nameEn: "New Releases", nameBn: "নতুন রিলিজ", icon: Gift, link: "/games?category=new", dataAiHint: "gift box"},
    { nameEn: "Card Games", nameBn: "কার্ড গেম", icon: Users, link: "/games?category=card", dataAiHint: "playing cards"},
    { nameEn: "Bangla Classics", nameBn: "বাংলা ক্লাসিক", icon: Gamepad2, link: "/games?category=bangla-classics", dataAiHint: "traditional pattern"},
  ];

  const features = [
    { 
      icon: Gamepad2, 
      titleEn: "500+ Exciting Games", titleBn: "৫০০+ সেরা গেম",
      descriptionEn: "Discover a variety of popular and new games including slots, roulette, poker, blackjack.",
      descriptionBn: "স্লট, রুলেট, পোকার, ব্ল্যাকজ্যাক সহ বিভিন্ন ধরণের জনপ্রিয় ও নতুন গেম আবিষ্কার করুন।",
      link: "/games", linkTextEn: "View All Games", linkTextBn: "সব গেম দেখুন"
    },
    { 
      icon: Gift, 
      titleEn: "Daily Rewards", titleBn: "দৈনিক পুরস্কার ও বোনাস",
      descriptionEn: "Login daily for a chance to win attractive bonuses and free spins. 100% bonus on first deposit!",
      descriptionBn: "প্রতিদিন লগইন করে আকর্ষণীয় বোনাস এবং ফ্রি স্পিন জেতার সুযোগ নিন। প্রথম ডিপোজিটে ১০০% বোনাস!",
      subTextEn: "Spin the wheel daily!", subTextBn: "প্রতিদিন স্পিন হুইল ঘুরান!"
    },
    { 
      icon: ShieldCheck, 
      titleEn: "Secure & Local Payments", titleBn: "নিরাপদ ও সুরক্ষিত পেমেন্ট",
      descriptionEn: "Enjoy gaming safely with bKash, Nagad, Rocket, and bank transfers.",
      descriptionBn: "বিকাশ, নগদ, রকেট এবং ব্যাংক ট্রান্সফারের মাধ্যমে নিরাপদে গেমিং উপভোগ করুন।",
      link: "/wallet", linkTextEn: "Payment Methods", linkTextBn: "পেমেন্ট পদ্ধতি"
    },
  ];

  return (
    <div className="space-y-16">
      {/* Promotional Slider Section */}
      <PromotionalSlider />

      {/* Game Categories Quick Links */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gold">
          {language === 'bn' ? "জনপ্রিয় গেম বিভাগ" : "Popular Game Categories"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gameCategories.map(category => (
            <Link href={category.link} key={category.nameEn}>
              <Card className="text-center p-4 hover:shadow-primary/20 transition-shadow duration-300 cursor-pointer h-full flex flex-col justify-center items-center hover:border-primary/50 border border-transparent group hover:-translate-y-1 hover:rotate-1">
                <category.icon className="h-10 w-10 text-primary mb-2 transition-transform group-hover:scale-110" />
                <p className="font-semibold text-foreground">{language === 'bn' ? category.nameBn : category.nameEn}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        {features.map(feature => (
          <Card key={feature.titleEn} className="shadow-lg hover:shadow-primary/30 transition-shadow duration-300 group hover:-translate-y-1 hover:rotate-1">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-md inline-block mb-2 transition-transform group-hover:scale-110">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{language === 'bn' ? feature.titleBn : feature.titleEn}</CardTitle>
              <CardDescription>{language === 'bn' ? feature.descriptionBn : feature.descriptionEn}</CardDescription>
            </CardHeader>
            <CardContent>
              {feature.link ? (
                <Button variant="link" className="px-0 text-primary" asChild>
                  <Link href={feature.link}>
                    {language === 'bn' ? feature.linkTextBn : feature.linkTextEn} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              ) : feature.subTextEn && (
                <p className="text-sm text-muted-foreground">{language === 'bn' ? feature.subTextBn : feature.subTextEn}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Real-time Winners Board */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gold">
          {language === 'bn' ? "সাম্প্রতিক বিজয়ীগণ" : "Recent Winners"}
        </h2>
        <Card className="shadow-xl">
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {recentWinners.map((winner, index) => (
                <li key={index} className="p-4 flex justify-between items-center hover:bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">{winner.name}</p>
                    <p className="text-sm text-muted-foreground">{language === 'bn' ? winner.gameBn : winner.game}</p>
                  </div>
                  <p className="font-bold text-primary text-lg">{winner.amount}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
         <p className="text-center mt-4 text-sm text-muted-foreground">
           {language === 'bn' ? "(এটি একটি ডেমো তালিকা)" : "(This is a demo list)"}
         </p>
      </section>


      {/* Call to Action Section */}
      <section className="text-center py-12 bg-card rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold mb-4 text-gold">
          {language === 'bn' ? "বাজিবাজে যোগ দিতে প্রস্তুত?" : "Ready to Get Started?"}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          {language === 'bn' 
            ? "আজই বাজিবাজ কমিউনিটিতে যোগ দিন এবং অফুরন্ত বিনোদন এবং বড় জয়ের জগতে ডুব দিন।"
            : "Join the Bajibuz community today and dive into a world of endless entertainment and big wins."
          }
        </p>
        <Button size="lg" asChild className="bg-gradient-primary-accent text-primary-foreground hover:opacity-90 transition-opacity">
          <Link href="/signup">
            {language === 'bn' ? "একাউন্ট তৈরি করুন" : "Create Account"} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
