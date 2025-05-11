import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Tag, Ticket, CalendarDays, Percent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Promotions - DeshiSpin",
  description: "Check out the latest promotions, bonuses, and offers at DeshiSpin.",
};

const placeholderPromotions = [
  {
    id: 1,
    title: "Welcome Bonus: 100% Up To ৳10,000!",
    description: "Kickstart your DeshiSpin journey! We'll match your first deposit 100% up to ৳10,000. T&Cs apply.",
    imageUrl: "https://picsum.photos/400/250?random=30",
    dataAiHint: "gift box money",
    category: "Welcome Offer",
    icon: Percent,
    expiry: "New players only",
    termsLink: "/terms#welcome-bonus"
  },
  {
    id: 2,
    title: "Daily Lucky Spin",
    description: "Log in daily for your FREE spin on our Lucky Wheel! Win cash, free spins, or bonus credits instantly.",
    imageUrl: "https://picsum.photos/400/250?random=31",
    dataAiHint: "fortune wheel",
    category: "Daily Reward",
    icon: Gift,
    expiry: "Resets daily at 00:00",
    termsLink: "/terms#daily-spin"
  },
  {
    id: 3,
    title: "Weekend Reload: 50% Boost",
    description: "Power up your weekends! Get a 50% reload bonus on your first deposit every Friday to Sunday, up to ৳5,000.",
    imageUrl: "https://picsum.photos/400/250?random=32",
    dataAiHint: "calendar money",
    category: "Reload Bonus",
    icon: CalendarDays,
    expiry: "Weekly (Fri-Sun)",
    termsLink: "/terms#weekend-reload"
  },
  {
    id: 4,
    title: "Slots Leaderboard Challenge",
    description: "Climb the leaderboard in our weekly Slots Challenge. Top 20 players share a prize pool of ৳100,000!",
    imageUrl: "https://picsum.photos/400/250?random=33",
    dataAiHint: "slot machine trophy",
    category: "Tournament",
    icon: Tag, // Using Tag as a general offer icon
    expiry: "Ends Sunday 23:59 BST",
    termsLink: "/terms#slot-tournament"
  }
];

export default function PromotionsPage() {
  return (
    <div className="space-y-10">
      <header className="text-center py-8">
        <Gift className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
        <h1 className="text-4xl font-bold text-foreground">Exclusive Promotions</h1>
        <p className="text-xl text-muted-foreground mt-2">Grab the best offers and boost your chances to win big!</p>
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
                  <span>Valid: {promo.expiry}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 text-base py-2.5">
                        <Tag className="mr-2 h-5 w-5" /> Claim Offer
                    </Button>
                    <Button variant="outline" className="flex-1 text-base py-2.5" asChild>
                        <Link href={promo.termsLink}>
                            <Ticket className="mr-2 h-5 w-5" /> Details
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
          <p className="text-2xl font-semibold text-muted-foreground">No Active Promotions</p>
          <p className="text-md text-muted-foreground mt-2">Please check back soon for exciting new offers and bonuses!</p>
        </div>
      )}

      <Card className="mt-16 shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl">Understanding Our Promotions</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2">
          <p>All promotions are subject to terms and conditions. Please read them carefully before participating.</p>
          <p>Wagering requirements and game restrictions may apply. For assistance, contact our <Link href="/support" className="text-primary hover:underline">support team</Link>.</p>
          <p className="font-semibold">Play responsibly and enjoy the games!</p>
        </CardContent>
      </Card>
    </div>
  );
}
