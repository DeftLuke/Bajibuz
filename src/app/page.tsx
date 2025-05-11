'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Gamepad2, Gift, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 rounded-xl overflow-hidden shadow-2xl">
        <Image 
          src="https://picsum.photos/1200/800?random=1" 
          alt="Gaming background" 
          layout="fill" 
          objectFit="cover" 
          quality={80}
          className="absolute inset-0 z-0 opacity-30"
          data-ai-hint="abstract gaming"
        />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary animate-fade-in-down">
            Welcome to DeshiSpin!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Experience the thrill of online gaming with a local touch. Join thousands of players and win big!
          </p>
          <div className="space-x-4 animate-fade-in-up animation-delay-300">
            <Button size="lg" asChild>
              <Link href="/signup">
                Join Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/games">
                Explore Games
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 bg-primary/10 rounded-md inline-block mb-2">
              <Gamepad2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Exciting Games</CardTitle>
            <CardDescription>Discover a wide variety of popular and new games tailored for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="px-0 text-primary" asChild>
              <Link href="/games">See all games <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 bg-primary/10 rounded-md inline-block mb-2">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Daily Rewards</CardTitle>
            <CardDescription>Log in daily for a chance to win amazing bonuses and free spins.</CardDescription>
          </CardHeader>
          <CardContent>
             {/* The DailySpinPopup will handle this interaction */}
            <p className="text-sm text-muted-foreground">Spin the wheel every day!</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 bg-primary/10 rounded-md inline-block mb-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Secure &amp; Local</CardTitle>
            <CardDescription>Enjoy safe gaming with local payment options like bKash, Nagad, and Rocket.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="px-0 text-primary" asChild>
              <Link href="/wallet">Payment Methods <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-12 bg-card rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold mb-4 text-foreground">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Join the DeshiSpin community today and dive into a world of endless entertainment and big wins.
        </p>
        <Button size="lg" asChild>
          <Link href="/signup">
            Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
      <style jsx>{`
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
