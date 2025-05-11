
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Gamepad2, ShieldCheck, Award, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context"; // Import useLanguage

// export const metadata = { // Metadata should be static or generated on server
//   title: "About Bajibuz - Our Story",
//   description: "Learn more about Bajibuz, Bangladesh's most trusted online casino platform. Our mission, vision, and commitment to players.",
// };

export default function AboutBajibuzPage() {
  const { language } = useLanguage(); // Use the language context

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <header className="text-center py-8">
        <Info className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">
          {language === 'bn' ? 'বাজিবাজ সম্পর্কে' : 'About Bajibuz'}
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          {language === 'bn' ? 'বাংলার প্রথম বিশ্বস্ত অনলাইন ক্যাসিনো' : "Bangladesh's First Trusted Online Casino"}
        </p>
      </header>

      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-4">
              {language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}
            </h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              {language === 'bn' 
                ? 'Bajibuz প্রতিষ্ঠিত হয়েছে বাংলাদেশী খেলোয়াড়দের একটি বিশ্বমানের, নিরাপদ এবং নির্ভরযোগ্য অনলাইন গেমিং অভিজ্ঞতা দেওয়ার লক্ষ্যে। আমরা স্থানীয় সংস্কৃতি এবং পছন্দের প্রতি সম্মান রেখে আন্তর্জাতিক মানের গেম এবং পরিষেবা সরবরাহ করতে প্রতিশ্রুতিবদ্ধ।'
                : 'Bajibuz was founded with the goal of providing Bangladeshi players a world-class, safe, and reliable online gaming experience. We are committed to delivering international standard games and services while respecting local culture and preferences.'}
            </p>
          </div>
          <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
            <Image 
              src="https://picsum.photos/600/400?random=60" 
              alt={language === 'bn' ? 'বাজিবাজ টিম বা ক্যাসিনো' : 'Bajibuz Team or Abstract Casino'}
              layout="fill" 
              objectFit="cover"
              data-ai-hint="teamwork casino" 
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Award className="mr-3 h-7 w-7 text-primary"/>
              {language === 'bn' ? 'আমাদের লক্ষ্য' : 'Our Mission'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {language === 'bn'
              ? 'সর্বাধুনিক প্রযুক্তি ব্যবহার করে একটি স্বচ্ছ, বিনোদনমূলক এবং দায়িত্বশীল গেমিং পরিবেশ তৈরি করা। আমরা খেলোয়াড়দের সন্তুষ্টি এবং নিরাপত্তাকে সর্বোচ্চ প্রাধান্য দিই।'
              : 'To create a transparent, entertaining, and responsible gaming environment using cutting-edge technology. We prioritize player satisfaction and security above all.'}
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Users className="mr-3 h-7 w-7 text-primary"/>
              {language === 'bn' ? 'আমাদের দৃষ্টি' : 'Our Vision'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {language === 'bn'
              ? 'বাংলাদেশের সবচেয়ে বিশ্বস্ত এবং জনপ্রিয় অনলাইন ক্যাসিনো প্ল্যাটফর্ম হিসেবে নিজেদের প্রতিষ্ঠিত করা, যা খেলোয়াড়দের জন্য sürekli নতুন এবং উত্তেজনাপূর্ণ গেমিং সুযোগ নিয়ে আসবে।'
              : "To establish ourselves as Bangladesh's most trusted and popular online casino platform, continuously bringing new and exciting gaming opportunities for players."}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{language === 'bn' ? 'কেন বাজিবাজ?' : 'Why Bajibuz?'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Gamepad2 className="h-6 w-6 text-primary mt-1 shrink-0"/>
            <p className="text-muted-foreground">
              <strong>{language === 'bn' ? 'বিশাল গেম সংগ্রহ' : 'Vast Game Collection'}:</strong> 
              {language === 'bn' ? ' ৫০০+ স্লট, টেবিল গেম, লাইভ ক্যাসিনো এবং আরও অনেক কিছু।' : ' 500+ slots, table games, live casino, and more.'}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 text-primary mt-1 shrink-0"/>
            <p className="text-muted-foreground">
              <strong>{language === 'bn' ? 'নিরাপদ ও সুরক্ষিত' : 'Safe & Secure'}:</strong> 
              {language === 'bn' ? ' আপনার ডেটা এবং লেনদেন সুরক্ষিত রাখতে আমরা উন্নত নিরাপত্তা ব্যবস্থা ব্যবহার করি। স্থানীয় পেমেন্ট পদ্ধতি (বিকাশ, নগদ, রকেট) সমর্থিত।' : ' We use advanced security measures to protect your data and transactions. Local payment methods (bKash, Nagad, Rocket) supported.'}
            </p>
          </div>
           <div className="flex items-start gap-3">
            <Users className="h-6 w-6 text-primary mt-1 shrink-0"/>
            <p className="text-muted-foreground">
              <strong>{language === 'bn' ? 'গ্রাহক সহায়তা' : 'Customer Support'}:</strong> 
              {language === 'bn' ? ' আমাদের অভিজ্ঞ সাপোর্ট টিম আপনার সেবায় সর্বদা প্রস্তুত।' : ' Our experienced support team is always ready to assist you.'}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-12 space-y-4">
        <p className="text-lg text-muted-foreground">
          {language === 'bn' ? 'Bajibuz পরিবারের অংশ হতে চান?' : 'Want to be a part of the Bajibuz family?'}
        </p>
        <Button asChild size="lg">
          <Link href="/signup">{language === 'bn' ? 'এখনি যোগ দিন' : 'Join Now'}</Link>
        </Button>
      </div>
    </div>
  );
}
