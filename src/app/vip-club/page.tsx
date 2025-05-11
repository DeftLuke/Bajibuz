
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Diamond, ShieldCheck, Gift, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context"; // Import useAuth

const vipTiersData = [
  {
    nameEn: "Bronze", nameBn: "ব্রোঞ্জ",
    icon: Star,
    iconColor: "text-orange-400",
    benefitsEn: [ "Weekly Bonus", "Dedicated Support", "Birthday Gift" ],
    benefitsBn: [ "সাপ্তাহিক বোনাস", "বিশেষ গ্রাহক সহায়তা", "জন্মদিনের উপহার" ],
    image: "https://picsum.photos/400/300?random=301",
    dataAiHint: "bronze medal",
  },
  {
    nameEn: "Silver", nameBn: "সিলভার",
    icon: ShieldCheck,
    iconColor: "text-slate-400",
    benefitsEn: [ "Enhanced Weekly Bonus", "Faster Withdrawals", "Exclusive Tournaments" ],
    benefitsBn: [ "উন্নত সাপ্তাহিক বোনাস", "দ্রুত টাকা উত্তোলন", "বিশেষ টুর্নামেন্টে অ্যাক্সেস" ],
    image: "https://picsum.photos/400/300?random=302",
    dataAiHint: "silver shield",
  },
  {
    nameEn: "Gold", nameBn: "গোল্ড",
    icon: Award,
    iconColor: "text-amber-400",
    benefitsEn: [ "Higher Cashback Offers", "Personal Account Manager", "VIP Event Invitations" ],
    benefitsBn: [ "উচ্চ ক্যাশব্যাক অফার", "ব্যক্তিগত অ্যাকাউন্ট ম্যানেজার", "ভিআইপি ইভেন্টে আমন্ত্রণ" ],
    image: "https://picsum.photos/400/300?random=303",
    dataAiHint: "gold trophy",
  },
  {
    nameEn: "Diamond", nameBn: "ডায়মন্ড",
    icon: Diamond,
    iconColor: "text-sky-400",
    benefitsEn: [ "Top Bonuses & Cashback", "Luxury Gifts & Rewards", "Customized Offers" ],
    benefitsBn: [ "সর্বোচ্চ বোনাস এবং ক্যাশব্যাক", "বিশেষ উপহার এবং পুরস্কার", "কাস্টমাইজড অফার" ],
    image: "https://picsum.photos/400/300?random=304",
    dataAiHint: "diamond gem",
  },
];

export default function VipClubPage() {
  const { language } = useLanguage();
  const { currentUser } = useAuth(); // Get current user

  const getKycStatusText = (status: string | undefined) => {
    if (!status) return language === 'bn' ? 'স্ট্যাটাস অজানা' : 'Status Unknown';
    switch (status) {
      case 'pending': return language === 'bn' ? 'বিবেচনাধীন' : 'Pending';
      case 'verified': return language === 'bn' ? 'যাচাইকৃত' : 'Verified';
      case 'rejected': return language === 'bn' ? 'প্রত্যাখ্যাত' : 'Rejected';
      case 'not_submitted': return language === 'bn' ? 'জমা দেওয়া হয়নি' : 'Not Submitted';
      default: return status;
    }
  };

  return (
    <div className="space-y-12">
      <header className="text-center py-8">
        <Award className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
        <h1 className="text-4xl font-bold text-gold">
          {language === 'bn' ? 'বাজিবাজ ভিআইপি ক্লাব' : 'Bajibuz VIP Club'}
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          {language === 'bn' 
            ? 'আমাদের বিশ্বস্ত খেলোয়াড়দের জন্য বিশেষ সুবিধা এবং পুরস্কার।' 
            : 'Exclusive benefits and rewards for our loyal players.'}
        </p>
      </header>

      {currentUser && (
        <Card className="shadow-md mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <UserCheck className="mr-2 h-6 w-6 text-primary" />
              {language === 'bn' ? 'আপনার স্ট্যাটাস' : 'Your Status'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {language === 'bn' ? 'বর্তমান ভিআইপি স্তর: ' : 'Current VIP Tier: '} 
              <Badge variant="secondary">{language === 'bn' ? 'ব্রোঞ্জ (উদাহরণ)' : 'Bronze (Example)'}</Badge>
            </p>
            <p className="text-muted-foreground mt-2">
              {language === 'bn' ? 'কেওয়াইসি স্ট্যাটাস: ' : 'KYC Status: '}
              <Badge variant={currentUser.kycStatus === 'verified' ? 'default' : 'destructive'}>
                {getKycStatusText(currentUser.kycStatus)}
              </Badge>
              {currentUser.kycStatus !== 'verified' && (
                 <Button variant="link" asChild className="ml-2 px-0">
                    <Link href="/dashboard?tab=profile">
                        {language === 'bn' ? 'কেওয়াইসি সম্পন্ন করুন' : 'Complete KYC'}
                    </Link>
                 </Button>
              )}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-xl bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            {language === 'bn' ? 'ভিআইপি ক্লাবে যোগ দিন' : 'Join the VIP Club'}
          </CardTitle>
          <CardDescription>
            {language === 'bn' 
              ? 'বাজিবাজে নিয়মিত খেলে ভিআইপি পয়েন্ট অর্জন করুন এবং বিভিন্ন স্তরে উন্নীত হয়ে আরও বেশি সুবিধা উপভোগ করুন।' 
              : 'Earn VIP points by playing regularly at Bajibuz and unlock more benefits as you climb the tiers.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {language === 'bn' 
              ? 'আপনার গেমিং অভিজ্ঞতাকে পরবর্তী স্তরে নিয়ে যান। প্রতিটি বাজি আপনাকে ভিআইপি হওয়ার আরও কাছে নিয়ে যায়!' 
              : 'Take your gaming experience to the next level. Every bet counts towards your VIP status!'}
          </p>
          <Button className="mt-4" asChild>
            <Link href="/games">
              {language === 'bn' ? 'এখনই খেলা শুরু করুন' : 'Start Playing Now'}
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {vipTiersData.map((tier) => (
          <Card key={tier.nameEn} className="shadow-lg hover:shadow-primary/30 transition-shadow duration-300 flex flex-col overflow-hidden">
            <div className="relative h-48 w-full">
                <Image 
                    src={tier.image} 
                    alt={language === 'bn' ? tier.nameBn : tier.nameEn}
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint={tier.dataAiHint}
                    className="group-hover:scale-105 transition-transform"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
            <CardHeader className="flex-row items-center gap-3 pb-3 pt-4 bg-card-foreground/5">
              <tier.icon className={`h-10 w-10 ${tier.iconColor}`} />
              <CardTitle className={`text-2xl ${tier.iconColor}`}>
                {language === 'bn' ? tier.nameBn : tier.nameEn}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow pt-3">
              <p className="text-sm text-muted-foreground mb-3">
                {language === 'bn' ? 'সুবিধাসমূহ' : 'Benefits include'}:
              </p>
              <ul className="space-y-1.5 text-muted-foreground text-sm list-disc list-inside">
                {(language === 'bn' ? tier.benefitsBn : tier.benefitsEn).map((benefit) => (
                  <li key={benefit} className="flex items-center">
                     <Gift className="h-4 w-4 text-primary mr-2 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="bg-card-foreground/5 pt-4">
                <Button variant="outline" className="w-full">
                  {language === 'bn' ? 'আরও জানুন' : 'Learn More'}
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12 space-y-3">
        <p className="text-lg text-muted-foreground">
          {language === 'bn' 
            ? 'আপনার ভিআইপি স্ট্যাটাস এবং পয়েন্ট দেখতে আপনার ড্যাশবোর্ডে যান।' 
            : 'Check your dashboard for your current VIP status and points.'}
        </p>
        <Button size="lg" asChild variant="shiny">
          <Link href="/dashboard">
            {language === 'bn' ? 'আমার ড্যাশবোর্ড' : 'My Dashboard'}
          </Link>
        </Button>
      </div>
    </div>
  );
}
