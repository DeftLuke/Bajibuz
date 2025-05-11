
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy, Mail, MessageSquare, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";

// export const metadata = { // Static or server-generated
//   title: "Support - Bajibuz",
//   description: "Get help and support for Bajibuz online casino.",
// };

const commonFaqs = [
  { en: "How do I create an account?", bn: "আমি কিভাবে একটি একাউন্ট তৈরি করবো?", linkId: "q1" },
  { en: "How can I deposit funds?", bn: "আমি কিভাবে ফান্ড জমা করবো?", linkId: "q2" },
  { en: "What are the withdrawal limits?", bn: "টাকা তোলার সীমা কত?", linkId: "q3" },
  { en: "Is my personal information secure?", bn: "আমার ব্যক্তিগত তথ্য কি নিরাপদ?", linkId: "q4" },
  { en: "How do I participate in tournaments?", bn: "আমি কিভাবে টুর্নামেন্টে অংশগ্রহণ করবো?", linkId: "q5" }
];

export default function SupportPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-12">
      <header className="text-center">
        <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">
          {language === 'bn' ? 'সহায়তা কেন্দ্র' : 'Support Center'}
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          {language === 'bn' 
            ? 'যেকোনো প্রশ্ন বা সমস্যার জন্য আমরা আপনাকে সাহায্য করতে এখানে আছি।' 
            : "We're here to help you with any questions or issues."}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center mb-2">
              <HelpCircle className="h-7 w-7 text-primary mr-3" />
              <CardTitle className="text-2xl">
                {language === 'bn' ? 'সাধারণ জিজ্ঞাসাসমূহ' : 'FAQ'}
              </CardTitle>
            </div>
            <CardDescription>
              {language === 'bn' 
                ? 'বাজিবাজ সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন।' 
                : 'Find answers to common questions about Bajibuz.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {commonFaqs.map((faq) => (
              <div key={faq.linkId}>
                <Link href={`/faq#${faq.linkId}`} className="font-medium text-primary hover:underline">
                  {language === 'bn' ? faq.bn : faq.en}
                </Link>
              </div>
            ))}
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/faq">
                {language === 'bn' ? 'সকল FAQ দেখুন' : 'View All FAQs'}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center mb-2">
              <MessageSquare className="h-7 w-7 text-primary mr-3" />
              <CardTitle className="text-2xl">
                {language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Contact Us'}
              </CardTitle>
            </div>
            <CardDescription>
              {language === 'bn' 
                ? 'আমাদের একটি বার্তা পাঠান এবং আমরা যত তাড়াতাড়ি সম্ভব আপনার সাথে যোগাযোগ করবো।' 
                : "Send us a message and we'll get back to you."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">
                  {language === 'bn' ? 'আপনার নাম' : 'Your Name'}
                </Label>
                <Input id="name" placeholder={language === 'bn' ? 'আপনার নাম লিখুন' : 'Enter your name'} className="mt-1 bg-background"/>
              </div>
              <div>
                <Label htmlFor="email">
                  {language === 'bn' ? 'আপনার ইমেইল' : 'Your Email'}
                </Label>
                <Input id="email" type="email" placeholder="you@example.com" className="mt-1 bg-background"/>
              </div>
              <div>
                <Label htmlFor="subject">
                  {language === 'bn' ? 'বিষয়' : 'Subject'}
                </Label>
                <Input id="subject" placeholder={language === 'bn' ? 'যেমন: একাউন্ট সমস্যা' : 'e.g., Account issue'} className="mt-1 bg-background"/>
              </div>
              <div>
                <Label htmlFor="message">
                  {language === 'bn' ? 'বার্তা' : 'Message'}
                </Label>
                <Textarea id="message" placeholder={language === 'bn' ? 'আপনার সমস্যা বা প্রশ্ন বর্ণনা করুন...' : 'Describe your issue or question...'} rows={5} className="mt-1 bg-background"/>
              </div>
              <Button type="submit" className="w-full">
                <Mail className="mr-2 h-5 w-5" /> 
                {language === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg mt-12">
        <CardHeader>
            <CardTitle className="text-xl">
              {language === 'bn' ? 'সাহায্য পাওয়ার অন্যান্য উপায়' : 'Other ways to get help'}
            </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
            <p>
              <strong>{language === 'bn' ? 'লাইভ চ্যাট:' : 'Live Chat:'}</strong> 
              {language === 'bn' ? ' ২৪/৭ উপলব্ধ (নিচের ডানদিকে চ্যাট আইকনে ক্লিক করুন - ডেমো)' : ' Available 24/7 (Click chat icon bottom right - demo)'}
            </p>
            <p>
              <strong>{language === 'bn' ? 'ইমেইল:' : 'Email:'}</strong> support@bajibuz.com 
              {language === 'bn' ? ' (২৪ ঘন্টার মধ্যে উত্তর)' : ' (Replies within 24 hours)'}
            </p>
            <p>
              <strong>{language === 'bn' ? 'কমিউনিটি ফোরাম:' : 'Community Forum:'}</strong> 
              <Link href="/community" className="text-primary hover:underline">
                {language === 'bn' ? 'আমাদের ফোরামে যান' : 'Visit our forum'}
              </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
