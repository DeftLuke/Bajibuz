
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Newspaper, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";

// export const metadata = { // Metadata should be static or server-generated
//   title: "Community Hub - Bajibuz",
//   description: "Join the Bajibuz community forum, discussions, and get the latest news.",
// };

export default function CommunityPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-10 max-w-3xl mx-auto py-10">
      <header className="text-center">
        <Users className="mx-auto h-20 w-20 text-primary mb-5" />
        <h1 className="text-4xl font-bold text-foreground">
          {language === 'bn' ? 'বাজিবাজ কমিউনিটিতে স্বাগতম!' : 'Welcome to the Bajibuz Community!'}
        </h1>
        <p className="text-xl text-muted-foreground mt-3">
          {language === 'bn' 
            ? 'আমাদের কমিউনিটি ফিচারগুলো বর্তমানে উন্নয়নাধীন। শীঘ্রই এটি বাজিবাজ সম্পর্কিত সবকিছুর জন্য আপনার কেন্দ্র হবে!' 
            : 'Our community features are currently under development. Soon, this will be your hub for all things Bajibuz!'}
        </p>
      </header>
      
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <MessageCircle className="mr-3 h-7 w-7 text-primary"/>
            {language === 'bn' ? 'শীঘ্রই কি আসছে?' : "What's Coming Soon?"}
          </CardTitle>
          <CardDescription>
            {language === 'bn' ? 'আমরা আমাদের খেলোয়াড়দের জন্য একটি উত্তেজনাপূর্ণ জায়গা তৈরি করছি:' : "We're building an exciting space for our players:"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <div className="flex items-start gap-3">
            <Newspaper className="h-5 w-5 text-primary mt-1 shrink-0"/>
            <p>
              <strong>{language === 'bn' ? 'অফিসিয়াল ঘোষণা ও খবর' : 'Official Announcements & News'}:</strong> 
              {language === 'bn' 
                ? ' প্ল্যাটফর্মের সর্বশেষ খবর, গেম রিলিজ এবং আসন্ন ইভেন্টগুলির সাথে আপডেটেড থাকুন।' 
                : ' Stay updated with the latest platform news, game releases, and upcoming events.'}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-1 shrink-0"/>
            <p>
              <strong>{language === 'bn' ? 'খেলোয়াড় ফোরাম' : 'Player Forums'}:</strong> 
              {language === 'bn' 
                ? ' কৌশল আলোচনা করুন, আপনার বড় জয়গুলি শেয়ার করুন, প্রশ্ন জিজ্ঞাসা করুন এবং সহ গেমিং উত্সাহীদের সাথে সংযোগ স্থাপন করুন।' 
                : ' Discuss strategies, share your big wins, ask questions, and connect with fellow gaming enthusiasts.'}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-primary mt-1 shrink-0"/>
            <p>
              <strong>{language === 'bn' ? 'সহায়তা ও প্রতিক্রিয়া' : 'Support & Feedback'}:</strong> 
              {language === 'bn' 
                ? ' কমিউনিটির কাছ থেকে সাহায্য পান, আপনার প্রতিক্রিয়া শেয়ার করুন এবং বাজিবাজের ভবিষ্যৎ গঠনে আমাদের সাহায্য করুন।' 
                : ' Get help from the community, share your feedback, and help us shape the future of Bajibuz.'}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-12 space-y-4">
        <p className="text-lg text-muted-foreground">
          {language === 'bn' 
            ? 'আমরা এই ফিচারগুলো আপনাদের কাছে নিয়ে আসার জন্য কঠোর পরিশ্রম করছি। সাথে থাকুন!' 
            : "We're working hard to bring these features to you. Stay tuned!"}
        </p>
        <Button asChild size="lg">
          <Link href="/games">
            {language === 'bn' ? 'আমাদের গেমগুলো দেখুন' : 'Explore Our Games'}
          </Link>
        </Button>
      </div>
    </div>
  );
}
