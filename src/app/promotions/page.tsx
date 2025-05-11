import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Tag, Ticket, CalendarDays, Percent, Users, ShieldHalf, TrophyIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Promotions - Bajibuz",
  description: "Check out the latest promotions, bonuses, and offers at Bajibuz. Get your welcome bonus, daily spins, and more!",
};

const placeholderPromotions = [
  {
    id: 1,
    title: "স্বাগতম বোনাস: প্রথম ডিপোজিটে ১০০% পর্যন্ত ৳১০,০০০!",
    titleEn: "Welcome Bonus: 100% Up To ৳10,000!",
    description: "আপনার বাজিবাজ যাত্রা শুরু করুন! আমরা আপনার প্রথম ডিপোজিটে ১০০% বোনাস দেবো, সর্বোচ্চ ৳১০,০০০ পর্যন্ত। শর্ত প্রযোজ্য।",
    descriptionEn: "Kickstart your Bajibuz journey! We'll match your first deposit 100% up to ৳10,000. T&Cs apply.",
    imageUrl: "https://picsum.photos/400/250?random=90",
    dataAiHint: "gift box money",
    category: "স্বাগতম অফার (Welcome)",
    icon: Percent,
    expiry: "নতুন খেলোয়াড়দের জন্য (New players)",
    termsLink: "/terms#welcome-bonus"
  },
  {
    id: 2,
    title: "দৈনিক লাকি স্পিন",
    titleEn: "Daily Lucky Spin",
    description: "প্রতিদিন লগইন করে আমাদের লাকি হুইলে বিনামূল্যে স্পিন করুন! তাৎক্ষণিকভাবে নগদ টাকা, ফ্রি স্পিন বা বোনাস ক্রেডিট জিতুন।",
    descriptionEn: "Log in daily for your FREE spin on our Lucky Wheel! Win cash, free spins, or bonus credits instantly.",
    imageUrl: "https://picsum.photos/400/250?random=91",
    dataAiHint: "fortune wheel",
    category: "দৈনিক পুরস্কার (Daily)",
    icon: Gift,
    expiry: "প্রতিদিন ০০:০০ টায় রিসেট হয় (Resets daily)",
    termsLink: "/terms#daily-spin"
  },
  {
    id: 3,
    title: "সাপ্তাহিক লিডারবোর্ড বোনাস",
    titleEn: "Weekly Leaderboard Bonus",
    description: "আমাদের সাপ্তাহিক স্লট চ্যালেঞ্জে লিডারবোর্ডে শীর্ষে থাকুন। শীর্ষ ২০ জন খেলোয়াড় ৳১০০,০০০ মূল্যের পুরস্কার ভাগ করে নেবেন!",
    descriptionEn: "Climb the leaderboard in our weekly Slots Challenge. Top 20 players share a prize pool of ৳100,000!",
    imageUrl: "https://picsum.photos/400/250?random=92",
    dataAiHint: "trophy leaderboard",
    category: "টুর্নামেন্ট (Tournament)",
    icon: TrophyIcon,
    expiry: "প্রতি রবিবার শেষ হয় (Ends Sunday)",
    termsLink: "/terms#leaderboard-bonus"
  },
  {
    id: 4,
    title: "বন্ধু রেফারেল বোনাস",
    titleEn: "Referral Bonus",
    description: "বন্ধুদের আমন্ত্রণ জানান এবং আপনি ও আপনার বন্ধু উভয়েই আকর্ষণীয় বোনাস পান। একসাথে খেলুন, একসাথে জিতুন!",
    descriptionEn: "Invite friends and both you and your friend get exciting bonuses. Play together, win together!",
    imageUrl: "https://picsum.photos/400/250?random=93",
    dataAiHint: "friends group",
    category: "রেফারেল (Referral)",
    icon: Users,
    expiry: "চলমান অফার (Ongoing)",
    termsLink: "/terms#referral-bonus"
  },
  {
    id: 5,
    title: "লস ফেরৎ ক্যাশব্যাক অফার",
    titleEn: "Cashback for Losses",
    description: "দুর্ভাগ্য? চিন্তা নেই! আপনার সাপ্তাহিক লসের উপর একটি নির্দিষ্ট শতাংশ ক্যাশব্যাক পান।",
    descriptionEn: "Bad luck? No worries! Get a percentage of your weekly losses back as cashback.",
    imageUrl: "https://picsum.photos/400/250?random=94",
    dataAiHint: "money back guarantee",
    category: "ক্যাশব্যাক (Cashback)",
    icon: ShieldHalf,
    expiry: "সাপ্তাহিক (Weekly)",
    termsLink: "/terms#cashback-offer"
  },
  {
    id: 6,
    title: "উৎসবের বিশেষ প্রমোশন (যেমন ঈদ)",
    titleEn: "Festival Promotions (e.g., Eid)",
    description: "বিশেষ উৎসব উপলক্ষে (যেমন ঈদ, পহেলা বৈশাখ) আমাদের প্ল্যাটফর্মে যোগ করা হয় আকর্ষণীয় বোনাস, টুর্নামেন্ট এবং আরও অনেক কিছু!",
    descriptionEn: "Enjoy special bonuses, tournaments, and more during festive seasons like Eid, Pohela Boishakh, etc.!",
    imageUrl: "https://picsum.photos/400/250?random=95",
    dataAiHint: "festival celebration lights",
    category: "বিশেষ অফার (Special)",
    icon: CalendarDays, // Using calendar for festivals
    expiry: "উৎসবকালীন (Seasonal)",
    termsLink: "/terms#festival-promotions"
  }
];

export default function PromotionsPage() {
  return (
    <div className="space-y-10">
      <header className="text-center py-8">
        <Gift className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
        <h1 className="text-4xl font-bold text-foreground">বিশেষ প্রমোশন (Exclusive Promotions)</h1>
        <p className="text-xl text-muted-foreground mt-2">সেরা অফারগুলো লুফে নিন এবং বড় জয়ের সম্ভাবনা বাড়ান! (Grab the best offers and boost your chances to win big!)</p>
      </header>

      {placeholderPromotions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {placeholderPromotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden group transition-all hover:shadow-primary/30 hover:border-primary/50 duration-300 ease-out flex flex-col border bg-card">
              <div className="relative h-56 w-full">
                <Image
                  src={promo.imageUrl}
                  alt={promo.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={promo.dataAiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <Badge variant="default" className="absolute top-4 left-4 bg-primary text-primary-foreground shadow-lg flex items-center gap-1.5">
                  <promo.icon className="h-3.5 w-3.5" />
                  {promo.category}
                </Badge>
              </div>
              <CardHeader className="flex-grow pt-5 pb-3 px-5">
                <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">{promo.title}</CardTitle>
                <CardDescription className="text-muted-foreground pt-1 text-sm leading-relaxed">{promo.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <CalendarDays className="mr-1.5 h-4 w-4" />
                  <span>মেয়াদ: {promo.expiry} (Valid: {promo.expiry})</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 text-base py-2.5">
                        <Tag className="mr-2 h-5 w-5" /> অফার নিন (Claim Offer)
                    </Button>
                    <Button variant="outline" className="flex-1 text-base py-2.5" asChild>
                        <Link href={promo.termsLink}>
                            <Ticket className="mr-2 h-5 w-5" /> বিস্তারিত (Details)
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
          <p className="text-2xl font-semibold text-muted-foreground">কোনো সক্রিয় প্রমোশন নেই (No Active Promotions)</p>
          <p className="text-md text-muted-foreground mt-2">অনুগ্রহ করে নতুন অফার এবং বোনাসের জন্য শীঘ্রই আবার দেখুন! (Please check back soon for new offers!)</p>
        </div>
      )}

      <Card className="mt-16 shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl">আমাদের প্রমোশন সম্পর্কে জানুন (Understanding Our Promotions)</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2">
          <p>সকল প্রমোশন শর্তাবলী সাপেক্ষে। অংশগ্রহণের আগে দয়া করে শর্তাবলী সাবধানে পড়ুন। (All promotions are subject to T&Cs. Please read carefully.)</p>
          <p>বাজি ধরার প্রয়োজনীয়তা এবং গেমের সীমাবদ্ধতা প্রযোজ্য হতে পারে। সহায়তার জন্য, আমাদের <Link href="/support" className="text-primary hover:underline">সাপোর্ট টিমের</Link> সাথে যোগাযোগ করুন। (Wagering requirements and game restrictions may apply. Contact support for help.)</p>
          <p className="font-semibold">দায়িত্বের সাথে খেলুন এবং গেম উপভোগ করুন! (Play responsibly and enjoy the games!)</p>
        </CardContent>
      </Card>
    </div>
  );
}
