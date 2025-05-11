"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Diamond, ShieldCheck, Gift, UserCheck, Crown } from "lucide-react"; // Added Crown
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context"; 

const vipTiersData = [
  {
    nameEn: "Bronze", nameBn: "ব্রোঞ্জ",
    icon: Star,
    iconColor: "text-orange-400",
    benefitsEn: [ "Weekly Bonus", "Dedicated Support", "Birthday Gift" ],
    benefitsBn: [ "সাপ্তাহিক বোনাস", "বিশেষ গ্রাহক সহায়তা", "জন্মদিনের উপহার" ],
    image: "https://picsum.photos/400/300?random=301",
    dataAiHint: "bronze medal",
    requirementEn: "Entry level for all new verified players.",
    requirementBn: "সকল নতুন যাচাইকৃত খেলোয়াড়দের জন্য প্রবেশ স্তর।"
  },
  {
    nameEn: "Silver", nameBn: "সিলভার",
    icon: ShieldCheck,
    iconColor: "text-slate-400",
    benefitsEn: [ "Enhanced Weekly Bonus", "Faster Withdrawals", "Exclusive Tournaments" ],
    benefitsBn: [ "উন্নত সাপ্তাহিক বোনাস", "দ্রুত টাকা উত্তোলন", "বিশেষ টুর্নামেন্টে অ্যাক্সেস" ],
    image: "https://picsum.photos/400/300?random=302",
    dataAiHint: "silver shield",
    requirementEn: "Unlock by consistent play and reaching deposit milestones.",
    requirementBn: "ধারাবাহিক খেলা এবং ডিপোজিট মাইলফলক অর্জন করে আনলক করুন।"
  },
  {
    nameEn: "Gold", nameBn: "গোল্ড",
    icon: Award,
    iconColor: "text-amber-400",
    benefitsEn: [ "Higher Cashback Offers", "Personal Account Manager", "VIP Event Invitations" ],
    benefitsBn: [ "উচ্চ ক্যাশব্যাক অফার", "ব্যক্তিগত অ্যাকাউন্ট ম্যানেজার", "ভিআইপি ইভেন্টে আমন্ত্রণ" ],
    image: "https://picsum.photos/400/300?random=303",
    dataAiHint: "gold trophy",
    requirementEn: "Achieved by significant gameplay activity and loyalty.",
    requirementBn: "গুরুত্বপূর্ণ গেমিং কার্যকলাপ এবং বিশ্বস্ততার মাধ্যমে অর্জিত।"
  },
  {
    nameEn: "Diamond", nameBn: "ডায়মন্ড",
    icon: Diamond,
    iconColor: "text-sky-400",
    benefitsEn: [ "Top Tier Bonuses & Cashback", "Luxury Gifts & Rewards", "Customized Offers" ],
    benefitsBn: [ "সর্বোচ্চ স্তরের বোনাস এবং ক্যাশব্যাক", "বিশেষ উপহার এবং পুরস্কার", "কাস্টমাইজড অফার" ],
    image: "https://picsum.photos/400/300?random=304",
    dataAiHint: "diamond gem",
    requirementEn: "Reserved for top-tier players with high engagement.",
    requirementBn: "উচ্চ সম্পৃক্ততা সহ শীর্ষ-স্তরের খেলোয়াড়দের জন্য সংরক্ষিত।"
  },
  {
    nameEn: "Maharaja Suite", nameBn: "মহারাজা স্যুট",
    icon: Crown, 
    iconColor: "text-purple-500",
    benefitsEn: [
      "Ultimate Bonuses & Highest Cashback",
      "Dedicated VIP Concierge 24/7",
      "Ultra-Luxury Gifts & Experiences",
      "Invitations to Exclusive Events with Celebrity Guests", 
      "Fully Personalized Gaming Limits & Support"
    ],
    benefitsBn: [
      "চূড়ান্ত বোনাস এবং সর্বোচ্চ ক্যাশব্যাক",
      "২৪/৭ ব্যক্তিগত ভিআইপি কনসিয়ারজ",
      "আলট্রা-লাক্সারি উপহার এবং অভিজ্ঞতা",
      "সেলিব্রিটি অতিথি সহ এক্সক্লুসিভ ইভেন্টে আমন্ত্রণ",
      "সম্পূর্ণ ব্যক্তিগতকৃত গেমিং সীমা এবং সহায়তা"
    ],
    image: "https://picsum.photos/400/300?random=305",
    dataAiHint: "luxury event celebrity", 
    requirementEn: "By Invitation Only. Eligibility: Sustained high bet volume (e.g., over ৳100,000 monthly) and full KYC verification.",
    requirementBn: "শুধুমাত্র আমন্ত্রণের মাধ্যমে। যোগ্যতা: দীর্ঘ সময় ধরে উচ্চ বেট ভলিউম (যেমন, মাসিক ৳১০০,০০০ এর বেশি) এবং সম্পূর্ণ কেওয়াইসি যাচাইকৃত।"
  }
];

export default function VipClubPage() {
  const { language } = useLanguage();
  const { currentUser } = useAuth(); 

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
              <Badge variant="secondary">{currentUser.vipTier || (language === 'bn' ? 'ব্রোঞ্জ (উদাহরণ)' : 'Bronze (Example)')}</Badge>
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

      {/* Brand Ambassador Spotlight */}
      <Card className="shadow-xl bg-gradient-to-tr from-gold/5 via-gold/10 to-gold/5 border-gold/30">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 relative h-32 w-32 rounded-full overflow-hidden border-2 border-gold shadow-lg">
            <Image
              src="https://picsum.photos/200/200?random=310" 
              alt={language === 'bn' ? "ব্র্যান্ড অ্যাম্বাসেডর" : "Brand Ambassador"}
              layout="fill"
              objectFit="cover"
              data-ai-hint="female celebrity portrait" 
            />
          </div>
          <CardTitle className="text-3xl text-gold">
            {language === 'bn' ? "আমাদের ব্র্যান্ড অ্যাম্বাসেডর" : "Our Brand Ambassador"}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            {language === 'bn' ? "বিশেষ অতিথি (উদাহরণ)" : "Special Guest (Example)"} 
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            {language === 'bn' 
              ? "বাজিবাজের উত্তেজনাপূর্ণ জগতে আমাদের বিশেষ ব্র্যান্ড অ্যাম্বাসেডর আপনাকে স্বাগত জানাচ্ছেন! তিনি আমাদের প্ল্যাটফর্মের সেরা অভিজ্ঞতা এবং বিনোদনের প্রতীক।"
              : "Our esteemed Brand Ambassador welcomes you to the thrilling world of Bajibuz! She embodies the spirit of premium gaming and entertainment that our platform offers."}
          </p>
          <Button variant="shiny" size="lg" asChild>
            <Link href="/promotions">
              {language === 'bn' ? "অ্যাম্বাসেডরের বিশেষ অফার দেখুন" : "View Ambassador's Special Offers"}
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-xl bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 mt-12">
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

      <h2 className="text-3xl font-bold text-center mt-16 mb-8 text-gold">
        {language === 'bn' ? 'ভিআইপি স্তর এবং সুবিধা' : 'VIP Tiers & Benefits'}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vipTiersData.map((tier) => (
          <Card key={tier.nameEn} className="shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-out flex flex-col overflow-hidden border hover:border-primary/40 hover:-translate-y-1.5 hover:rotate-[-0.5deg]">
            <div className="relative h-48 w-full">
                <Image 
                    src={tier.image} 
                    alt={language === 'bn' ? tier.nameBn : tier.nameEn}
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint={tier.dataAiHint}
                    className="group-hover:scale-105 transition-transform"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                 <Badge variant="default" className={`absolute top-3 right-3 text-xs ${tier.iconColor} bg-opacity-80 backdrop-blur-sm`}>
                     {language === 'bn' ? tier.nameBn : tier.nameEn}
                </Badge>
            </div>
            <CardHeader className="flex-row items-center gap-3 pb-3 pt-4 bg-card-foreground/5">
              <tier.icon className={`h-10 w-10 ${tier.iconColor}`} />
              <CardTitle className={`text-2xl ${tier.iconColor}`}>
                {language === 'bn' ? tier.nameBn : tier.nameEn}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow pt-3">
              <p className="text-sm text-muted-foreground mb-3 font-semibold">
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
              <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
                <strong>{language === 'bn' ? 'যোগ্যতা:' : 'Requirement:'}</strong> {language === 'bn' ? tier.requirementBn : tier.requirementEn}
              </p>
            </CardContent>
            <CardFooter className="bg-card-foreground/5 pt-4 mt-auto">
                <Button variant="outline" className="w-full">
                  {language === 'bn' ? 'আরও জানুন' : 'Learn More'}
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16 space-y-3">
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
