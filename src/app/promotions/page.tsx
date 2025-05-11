
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Tag, Ticket, CalendarDays, Percent, Users, ShieldHalf, TrophyIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";

// export const metadata = { // Static or server-generated
//   title: "Promotions - Bajibuz",
//   description: "Check out the latest promotions, bonuses, and offers at Bajibuz. Get your welcome bonus, daily spins, and more!",
// };

const promotionsData = [
  {
    id: 1,
    titleEn: "Welcome Bonus: 100% Up To ৳10,000!",
    titleBn: "স্বাগতম বোনাস: প্রথম ডিপোজিটে ১০০% পর্যন্ত ৳১০,০০০!",
    descriptionEn: "Kickstart your Bajibuz journey! We'll match your first deposit 100% up to ৳10,000. T&Cs apply.",
    descriptionBn: "আপনার বাজিবাজ যাত্রা শুরু করুন! আমরা আপনার প্রথম ডিপোজিটে ১০০% বোনাস দেবো, সর্বোচ্চ ৳১০,০০০ পর্যন্ত। শর্ত প্রযোজ্য।",
    imageUrl: "https://picsum.photos/400/250?random=90",
    dataAiHint: "gift box money",
    categoryEn: "Welcome Offer", categoryBn: "স্বাগতম অফার",
    icon: Percent,
    expiryEn: "For new players", expiryBn: "নতুন খেলোয়াড়দের জন্য",
    termsLink: "/terms#welcome-bonus"
  },
  {
    id: 2,
    titleEn: "Daily Lucky Spin",
    titleBn: "দৈনিক লাকি স্পিন",
    descriptionEn: "Log in daily for your FREE spin on our Lucky Wheel! Win cash, free spins, or bonus credits instantly.",
    descriptionBn: "প্রতিদিন লগইন করে আমাদের লাকি হুইলে বিনামূল্যে স্পিন করুন! তাৎক্ষণিকভাবে নগদ টাকা, ফ্রি স্পিন বা বোনাস ক্রেডিট জিতুন।",
    imageUrl: "https://picsum.photos/400/250?random=91",
    dataAiHint: "fortune wheel",
    categoryEn: "Daily Reward", categoryBn: "দৈনিক পুরস্কার",
    icon: Gift,
    expiryEn: "Resets daily at 00:00", expiryBn: "প্রতিদিন ০০:০০ টায় রিসেট হয়",
    termsLink: "/terms#daily-spin"
  },
  {
    id: 3,
    titleEn: "Weekly Leaderboard Bonus",
    titleBn: "সাপ্তাহিক লিডারবোর্ড বোনাস",
    descriptionEn: "Climb the leaderboard in our weekly Slots Challenge. Top 20 players share a prize pool of ৳100,000!",
    descriptionBn: "আমাদের সাপ্তাহিক স্লট চ্যালেঞ্জে লিডারবোর্ডে শীর্ষে থাকুন। শীর্ষ ২০ জন খেলোয়াড় ৳১০০,০০০ মূল্যের পুরস্কার ভাগ করে নেবেন!",
    imageUrl: "https://picsum.photos/400/250?random=92",
    dataAiHint: "trophy leaderboard",
    categoryEn: "Tournament", categoryBn: "টুর্নামেন্ট",
    icon: TrophyIcon,
    expiryEn: "Ends every Sunday", expiryBn: "প্রতি রবিবার শেষ হয়",
    termsLink: "/terms#leaderboard-bonus"
  },
  {
    id: 4,
    titleEn: "Referral Bonus",
    titleBn: "বন্ধু রেফারেল বোনাস",
    descriptionEn: "Invite friends and both you and your friend get exciting bonuses. Play together, win together!",
    descriptionBn: "বন্ধুদের আমন্ত্রণ জানান এবং আপনি ও আপনার বন্ধু উভয়েই আকর্ষণীয় বোনাস পান। একসাথে খেলুন, একসাথে জিতুন!",
    imageUrl: "https://picsum.photos/400/250?random=93",
    dataAiHint: "friends group",
    categoryEn: "Referral", categoryBn: "রেফারেল",
    icon: Users,
    expiryEn: "Ongoing offer", expiryBn: "চলমান অফার",
    termsLink: "/terms#referral-bonus"
  },
  {
    id: 5,
    titleEn: "Cashback Offer",
    titleBn: "লস ফেরৎ ক্যাশব্যাক অফার",
    descriptionEn: "Bad luck? No worries! Get a percentage of your weekly losses back as cashback.",
    descriptionBn: "দুর্ভাগ্য? চিন্তা নেই! আপনার সাপ্তাহিক লসের উপর একটি নির্দিষ্ট শতাংশ ক্যাশব্যাক পান।",
    imageUrl: "https://picsum.photos/400/250?random=94",
    dataAiHint: "money back guarantee",
    categoryEn: "Cashback", categoryBn: "ক্যাশব্যাক",
    icon: ShieldHalf,
    expiryEn: "Weekly", expiryBn: "সাপ্তাহিক",
    termsLink: "/terms#cashback-offer"
  },
  {
    id: 6,
    titleEn: "Festival Promotions (e.g., Eid)",
    titleBn: "উৎসবের বিশেষ প্রমোশন (যেমন ঈদ)",
    descriptionEn: "Enjoy special bonuses, tournaments, and more during festive seasons like Eid, Pohela Boishakh, etc.!",
    descriptionBn: "বিশেষ উৎসব উপলক্ষে (যেমন ঈদ, পহেলা বৈশাখ) আমাদের প্ল্যাটফর্মে যোগ করা হয় আকর্ষণীয় বোনাস, টুর্নামেন্ট এবং আরও অনেক কিছু!",
    imageUrl: "https://picsum.photos/400/250?random=95",
    dataAiHint: "festival celebration lights",
    categoryEn: "Special Offer", categoryBn: "বিশেষ অফার",
    icon: CalendarDays,
    expiryEn: "Seasonal", expiryBn: "উৎসবকালীন",
    termsLink: "/terms#festival-promotions"
  }
];

export default function PromotionsPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-10">
      <header className="text-center py-8">
        <Gift className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
        <h1 className="text-4xl font-bold text-gold">
          {language === 'bn' ? 'বিশেষ প্রমোশন' : 'Exclusive Promotions'}
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          {language === 'bn' 
            ? 'সেরা অফারগুলো লুফে নিন এবং বড় জয়ের সম্ভাবনা বাড়ান!' 
            : 'Grab the best offers and boost your chances to win big!'}
        </p>
      </header>

      {promotionsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promotionsData.map((promo) => (
            <Card key={promo.id} className="overflow-hidden group transition-all hover:shadow-primary/30 hover:border-primary/50 duration-300 ease-out flex flex-col border bg-card">
              <div className="relative h-56 w-full">
                <Image
                  src={promo.imageUrl}
                  alt={language === 'bn' ? promo.titleBn : promo.titleEn}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={promo.dataAiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <Badge variant="default" className="absolute top-4 left-4 bg-primary text-primary-foreground shadow-lg flex items-center gap-1.5">
                  <promo.icon className="h-3.5 w-3.5" />
                  {language === 'bn' ? promo.categoryBn : promo.categoryEn}
                </Badge>
              </div>
              <CardHeader className="flex-grow pt-5 pb-3 px-5">
                <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">
                  {language === 'bn' ? promo.titleBn : promo.titleEn}
                </CardTitle>
                <CardDescription className="text-muted-foreground pt-1 text-sm leading-relaxed">
                  {language === 'bn' ? promo.descriptionBn : promo.descriptionEn}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <CalendarDays className="mr-1.5 h-4 w-4" />
                  <span>
                    {language === 'bn' ? `মেয়াদ: ${promo.expiryBn}` : `Valid: ${promo.expiryEn}`}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="shiny" className="flex-1 text-base py-2.5">
                        <Tag className="mr-2 h-5 w-5" /> 
                        {language === 'bn' ? 'অফার নিন' : 'Claim Offer'}
                    </Button>
                    <Button variant="outline" className="flex-1 text-base py-2.5" asChild>
                        <Link href={promo.termsLink}>
                            <Ticket className="mr-2 h-5 w-5" /> 
                            {language === 'bn' ? 'বিস্তারিত' : 'Details'}
                        </Link>
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Gift className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
          <p className="text-2xl font-semibold text-muted-foreground">
            {language === 'bn' ? 'কোনো সক্রিয় প্রমোশন নেই' : 'No Active Promotions'}
          </p>
          <p className="text-md text-muted-foreground mt-2">
            {language === 'bn' 
              ? 'অনুগ্রহ করে নতুন অফার এবং বোনাসের জন্য শীঘ্রই আবার দেখুন!' 
              : 'Please check back soon for new offers!'}
          </p>
        </div>
      )}

      <Card className="mt-16 shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl text-gold">
            {language === 'bn' ? 'আমাদের প্রমোশন সম্পর্কে জানুন' : 'Understanding Our Promotions'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2">
          <p>
            {language === 'bn' 
              ? 'সকল প্রমোশন শর্তাবলী সাপেক্ষে। অংশগ্রহণের আগে দয়া করে শর্তাবলী সাবধানে পড়ুন।' 
              : 'All promotions are subject to T&Cs. Please read carefully before participating.'}
          </p>
          <p>
            {language === 'bn' 
              ? <>বাজি ধরার প্রয়োজনীয়তা এবং গেমের সীমাবদ্ধতা প্রযোজ্য হতে পারে। সহায়তার জন্য, আমাদের <Link href="/support" className="text-primary hover:underline">সাপোর্ট টিমের</Link> সাথে যোগাযোগ করুন।</>
              : <>Wagering requirements and game restrictions may apply. For assistance, contact our <Link href="/support" className="text-primary hover:underline">support team</Link>.</>}
          </p>
          <p className="font-semibold">
            {language === 'bn' ? 'দায়িত্বের সাথে খেলুন এবং গেম উপভোগ করুন!' : 'Play responsibly and enjoy the games!'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
