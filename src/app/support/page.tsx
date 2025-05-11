import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy, Mail, MessageSquare, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Support - Bajibuz",
  description: "Get help and support for Bajibuz online casino.",
};

export default function SupportPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">সহায়তা কেন্দ্র (Support Center)</h1>
        <p className="text-xl text-muted-foreground mt-2">যেকোনো প্রশ্ন বা সমস্যার জন্য আমরা আপনাকে সাহায্য করতে এখানে আছি। (We&apos;re here to help you with any questions or issues.)</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center mb-2">
              <HelpCircle className="h-7 w-7 text-primary mr-3" />
              <CardTitle className="text-2xl">সাধারণ জিজ্ঞাসাসমূহ (FAQ)</CardTitle>
            </div>
            <CardDescription>বাজিবাজ সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন। (Find answers to common questions about Bajibuz.)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "আমি কিভাবে একটি একাউন্ট তৈরি করবো? (How do I create an account?)",
              "আমি কিভাবে ফান্ড জমা করবো? (How can I deposit funds?)",
              "টাকা তোলার সীমা কত? (What are the withdrawal limits?)",
              "আমার ব্যক্তিগত তথ্য কি নিরাপদ? (Is my personal information secure?)",
              "আমি কিভাবে টুর্নামেন্টে অংশগ্রহণ করবো? (How do I participate in tournaments?)"
            ].map((faq, index) => (
              <div key={index}>
                <Link href={`/faq#q${index + 1}`} className="font-medium text-primary hover:underline">
                  {faq}
                </Link>
              </div>
            ))}
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/faq">সকল FAQ দেখুন (View All FAQs)</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center mb-2">
              <MessageSquare className="h-7 w-7 text-primary mr-3" />
              <CardTitle className="text-2xl">আমাদের সাথে যোগাযোগ করুন (Contact Us)</CardTitle>
            </div>
            <CardDescription>আমাদের একটি বার্তা পাঠান এবং আমরা যত তাড়াতাড়ি সম্ভব আপনার সাথে যোগাযোগ করবো। (Send us a message and we&apos;ll get back to you.)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">আপনার নাম (Your Name)</Label>
                <Input id="name" placeholder="আপনার নাম লিখুন (Enter your name)" className="mt-1 bg-background"/>
              </div>
              <div>
                <Label htmlFor="email">আপনার ইমেইল (Your Email)</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="mt-1 bg-background"/>
              </div>
              <div>
                <Label htmlFor="subject">বিষয় (Subject)</Label>
                <Input id="subject" placeholder="যেমন: একাউন্ট সমস্যা (e.g., Account issue)" className="mt-1 bg-background"/>
              </div>
              <div>
                <Label htmlFor="message">বার্তা (Message)</Label>
                <Textarea id="message" placeholder="আপনার সমস্যা বা প্রশ্ন বর্ণনা করুন... (Describe your issue or question...)" rows={5} className="mt-1 bg-background"/>
              </div>
              <Button type="submit" className="w-full">
                <Mail className="mr-2 h-5 w-5" /> বার্তা পাঠান (Send Message)
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg mt-12">
        <CardHeader>
            <CardTitle className="text-xl">সাহায্য পাওয়ার অন্যান্য উপায় (Other ways to get help)</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
            <p><strong>লাইভ চ্যাট (Live Chat):</strong> ২৪/৭ উপলব্ধ (নিচের ডানদিকে চ্যাট আইকনে ক্লিক করুন - ডেমো) (Available 24/7 - placeholder)</p>
            <p><strong>ইমেইল (Email):</strong> support@bajibuz.com (২৪ ঘন্টার মধ্যে উত্তর) (Replies within 24 hours)</p>
            <p><strong>কমিউনিটি ফোরাম (Community Forum):</strong> <Link href="/community" className="text-primary hover:underline">আমাদের ফোরামে যান (Visit our forum)</Link></p>
        </CardContent>
      </Card>
    </div>
  );
}
