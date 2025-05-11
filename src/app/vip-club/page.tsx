// src/app/vip-club/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Star, Diamond, ShieldCheck, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "VIP Club - Bajibuz",
  description: "Join the exclusive Bajibuz VIP Club for special rewards, higher limits, and personalized service.",
};

const vipTiers = [
  {
    name: "ব্রোঞ্জ (Bronze)",
    icon: Star,
    iconColor: "text-orange-400",
    benefits: [
      "সাপ্তাহিক বোনাস (Weekly Bonus)",
      "বিশেষ গ্রাহক সহায়তা (Dedicated Support)",
      "জন্মদিনের উপহার (Birthday Gift)",
    ],
    image: "https://picsum.photos/400/300?random=301",
    dataAiHint: "bronze medal",
  },
  {
    name: "সিলভার (Silver)",
    icon: ShieldCheck,
    iconColor: "text-slate-400",
    benefits: [
      "উন্নত সাপ্তাহিক বোনাস (Enhanced Weekly Bonus)",
      "দ্রুত টাকা উত্তোলন (Faster Withdrawals)",
      "বিশেষ টুর্নামেন্টে অ্যাক্সেস (Exclusive Tournaments)",
    ],
    image: "https://picsum.photos/400/300?random=302",
    dataAiHint: "silver shield",
  },
  {
    name: "গোল্ড (Gold)",
    icon: Award,
    iconColor: "text-amber-400", // text-gold can be used if defined in globals.css
    benefits: [
      "উচ্চ ক্যাশব্যাক অফার (Higher Cashback Offers)",
      "ব্যক্তিগত অ্যাকাউন্ট ম্যানেজার (Personal Account Manager)",
      "ভিআইপি ইভেন্টে আমন্ত্রণ (VIP Event Invitations)",
    ],
    image: "https://picsum.photos/400/300?random=303",
    dataAiHint: "gold trophy",
  },
  {
    name: "ডায়মন্ড (Diamond)",
    icon: Diamond,
    iconColor: "text-sky-400",
    benefits: [
      "সর্বোচ্চ বোনাস এবং ক্যাশব্যাক (Top Bonuses & Cashback)",
      "বিশেষ উপহার এবং পুরস্কার (Luxury Gifts & Rewards)",
      "কাস্টমাইজড অফার (Customized Offers)",
    ],
    image: "https://picsum.photos/400/300?random=304",
    dataAiHint: "diamond gem",
  },
];

export default function VipClubPage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-8">
        <Award className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
        <h1 className="text-4xl font-bold text-gold">বাজিবাজ ভিআইপি ক্লাব (Bajibuz VIP Club)</h1>
        <p className="text-xl text-muted-foreground mt-2">
          আমাদের বিশ্বস্ত খেলোয়াড়দের জন্য বিশেষ সুবিধা এবং পুরস্কার। (Exclusive benefits and rewards for our loyal players.)
        </p>
      </header>

      <Card className="shadow-xl bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">ভিআইপি ক্লাবে যোগ দিন (Join the VIP Club)</CardTitle>
          <CardDescription>
            বাজিবাজে নিয়মিত খেলে ভিআইপি পয়েন্ট অর্জন করুন এবং বিভিন্ন স্তরে উন্নীত হয়ে আরও বেশি সুবিধা উপভোগ করুন। (Earn VIP points by playing regularly at Bajibuz and unlock more benefits as you climb the tiers.)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            আপনার গেমিং অভিজ্ঞতাকে পরবর্তী স্তরে নিয়ে যান। প্রতিটি বাজি আপনাকে ভিআইপি হওয়ার আরও কাছে নিয়ে যায়! (Take your gaming experience to the next level. Every bet counts towards your VIP status!)
          </p>
          <Button className="mt-4" asChild>
            <Link href="/games">এখনই খেলা শুরু করুন (Start Playing Now)</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {vipTiers.map((tier) => (
          <Card key={tier.name} className="shadow-lg hover:shadow-primary/30 transition-shadow duration-300 flex flex-col overflow-hidden">
            <div className="relative h-48 w-full">
                <Image 
                    src={tier.image} 
                    alt={tier.name} 
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint={tier.dataAiHint}
                    className="group-hover:scale-105 transition-transform"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
            <CardHeader className="flex-row items-center gap-3 pb-3 pt-4 bg-card-foreground/5">
              <tier.icon className={`h-10 w-10 ${tier.iconColor}`} />
              <CardTitle className={`text-2xl ${tier.iconColor}`}>{tier.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow pt-3">
              <p className="text-sm text-muted-foreground mb-3">সুবিধাসমূহ (Benefits include):</p>
              <ul className="space-y-1.5 text-muted-foreground text-sm list-disc list-inside">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center">
                     <Gift className="h-4 w-4 text-primary mr-2 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="bg-card-foreground/5 pt-4">
                <Button variant="outline" className="w-full">আরও জানুন (Learn More)</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12 space-y-3">
        <p className="text-lg text-muted-foreground">
          আপনার ভিআইপি স্ট্যাটাস এবং পয়েন্ট দেখতে আপনার ড্যাশবোর্ডে যান। (Check your dashboard for your current VIP status and points.)
        </p>
        <Button size="lg" asChild variant="shiny">
          <Link href="/dashboard">আমার ড্যাশবোর্ড (My Dashboard)</Link>
        </Button>
      </div>
    </div>
  );
}
