import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Newspaper, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Community Hub - DeshiSpin",
  description: "Join the DeshiSpin community forum, discussions, and get the latest news.",
};

export default function CommunityPage() {
  return (
    <div className="space-y-10 max-w-3xl mx-auto py-10">
      <header className="text-center">
        <Users className="mx-auto h-20 w-20 text-primary mb-5" />
        <h1 className="text-4xl font-bold text-foreground">Welcome to the DeshiSpin Community!</h1>
        <p className="text-xl text-muted-foreground mt-3">
          Our community features are currently under development. Soon, this will be your hub for all things DeshiSpin!
        </p>
      </header>
      
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <MessageCircle className="mr-3 h-7 w-7 text-primary"/>
            What&apos;s Coming Soon?
          </CardTitle>
          <CardDescription>We&apos;re building an exciting space for our players:</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <div className="flex items-start gap-3">
            <Newspaper className="h-5 w-5 text-primary mt-1 shrink-0"/>
            <p><strong>Official Announcements & News:</strong> Stay updated with the latest platform news, game releases, and upcoming events.</p>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-1 shrink-0"/>
            <p><strong>Player Forums:</strong> Discuss strategies, share your big wins, ask questions, and connect with fellow gaming enthusiasts.</p>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-primary mt-1 shrink-0"/>
            <p><strong>Support & Feedback:</strong> Get help from the community, share your feedback, and help us shape the future of DeshiSpin.</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-12 space-y-4">
        <p className="text-lg text-muted-foreground">
          We&apos;re working hard to bring these features to you. Stay tuned!
        </p>
        <Button asChild size="lg">
          <Link href="/games">Explore Our Games</Link>
        </Button>
      </div>
    </div>
  );
}
