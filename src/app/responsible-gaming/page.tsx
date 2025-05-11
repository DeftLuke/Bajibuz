import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Responsible Gaming - Bajibuz",
  description: "Learn about responsible gaming practices at Bajibuz. Play smart and safe.",
};

export default function ResponsibleGamingPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center py-8">
        <HeartHandshake className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">দায়িত্বশীল গেমিং (Responsible Gaming)</h1>
        <p className="text-xl text-muted-foreground mt-2">বুদ্ধিমানের সাথে খেলুন। নিরাপদে খেলুন। খেলা উপভোগ করুন। (Play Smart. Play Safe. Enjoy the Game.)</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">আমাদের প্রতিশ্রুতি (Our Commitment)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>বাজিবাজ আমাদের গ্রাহক সেবা নীতির অংশ হিসেবে দায়িত্বশীল গেমিংকে উৎসাহিত করতে প্রতিশ্রুতিবদ্ধ। আমরা বিশ্বাস করি যে গেমিং একটি আনন্দদায়ক বিনোদন মাধ্যম হওয়া উচিত। তবে, অল্প সংখ্যক মানুষের জন্য জুয়া খেলা আর মজার থাকে না এবং এটি একটি সমস্যা হয়ে দাঁড়াতে পারে।</p>
          <p>(Bajibuz is committed to promoting responsible gaming as a part of our customer care policy. We believe that gaming should be an enjoyable form of entertainment. For a small minority, however, gambling can stop being fun and can become a problem.)</p>
          <p>আমরা একটি নিরাপদ এবং সহায়ক পরিবেশ প্রদানের লক্ষ্য রাখি যেখানে খেলোয়াড়রা তাদের গেমিং অভ্যাস দায়িত্বের সাথে পরিচালনা করতে পারে। (We aim to provide a safe and supportive environment where players can manage their gaming habits responsibly.)</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">সমস্যাযুক্ত জুয়া বোঝা (Understanding Problem Gambling)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>সমস্যাযুক্ত জুয়া যে কাউকে প্রভাবিত করতে পারে। এর লক্ষণগুলি চেনা গুরুত্বপূর্ণ। নিজেকে জিজ্ঞাসা করুন:</p>
          <p>(Problem gambling can affect anyone. It's important to recognize the signs. Ask yourself:)</p>
          <ul className="list-disc list-inside ml-4">
            <li>আপনি কি আপনার ইচ্ছার চেয়ে বেশি টাকা বা সময় জুয়া খেলায় ব্যয় করেন? (Do you spend more money or time gambling than you intend to?)</li>
            <li>আপনি কি লোকসান পূরণ করার চেষ্টা করেন? (Do you chase losses?)</li>
            <li>জুয়া কি আপনার ব্যক্তিগত বা পেশাগত জীবনে সমস্যা সৃষ্টি করেছে? (Has gambling caused problems in your personal or professional life?)</li>
            <li>জুয়া কমানোর চেষ্টা করার সময় আপনি কি অস্থির বা খিটখিটে বোধ করেন? (Do you feel restless or irritable when trying to cut down on gambling?)</li>
          </ul>
          <p>যদি এই প্রশ্নগুলির কোনোটির উত্তর হ্যাঁ হয়, তাহলে সাহায্য চাওয়া আপনার জন্য উপকারী হতে পারে। (If you answered yes to any of these, you might benefit from seeking help.)</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">দায়িত্বের সাথে খেলতে সহায়ক সরঞ্জাম (Tools to Help You Play Responsibly)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>বাজিবাজ আপনাকে নিয়ন্ত্রণে থাকতে সাহায্য করার জন্য বেশ কিছু সরঞ্জাম সরবরাহ করে:</p>
          <p>(Bajibuz offers several tools to help you stay in control:)</p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>ডিপোজিট সীমা (Deposit Limits):</strong> আপনি দৈনিক, সাপ্তাহিক বা মাসিক কতটা জমা করতে পারবেন তার সীমা নির্ধারণ করুন। (Set daily, weekly, or monthly limits on how much you can deposit.)</li>
            <li><strong>সেশন রিমাইন্ডার (Session Reminders):</strong> আপনি কতক্ষণ ধরে খেলছেন সে সম্পর্কে বিজ্ঞপ্তি পান। (Get notified about how long you've been playing.)</li>
            <li><strong>স্ব-বর্জন (Self-Exclusion):</strong> একটি নির্দিষ্ট সময়ের জন্য বা স্থায়ীভাবে গেমিং থেকে বিরতি নিন। (Take a break from gaming for a set period or permanently.)</li>
            <li><strong>অ্যাকাউন্ট ইতিহাস (Account History):</strong> আপনার গেমিং কার্যকলাপ, জমা এবং উত্তোলন ট্র্যাক করুন। (Track your gaming activity, deposits, and withdrawals.)</li>
          </ul>
          <p>আপনি এই সরঞ্জামগুলি আপনার <Link href="/dashboard" className="text-primary hover:underline">ড্যাশবোর্ড সেটিংসে</Link> বা আমাদের সহায়তা দলের সাথে যোগাযোগ করে অ্যাক্সেস করতে পারেন। (You can access these tools in your dashboard settings or by contacting our support team.)</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-destructive/10 border-destructive/30">
        <CardHeader className="flex flex-row items-center">
            <AlertTriangle className="h-8 w-8 text-destructive mr-4" />
            <CardTitle className="text-2xl text-destructive-foreground">সাহায্য প্রয়োজন? (Need Help?)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-destructive-foreground/80">
          <p>যদি আপনি মনে করেন যে জুয়া আপনার জীবনকে নেতিবাচকভাবে প্রভাবিত করছে, তবে গোপনীয় সাহায্য এবং সহায়তা উপলব্ধ। অনুগ্রহ করে যোগাযোগ করার কথা বিবেচনা করুন:</p>
          <p>(If you feel that gambling is negatively impacting your life, confidential help and support are available. Please consider reaching out to:)</p>
          <ul className="list-disc list-inside ml-4">
            <li>বাংলাদেশে স্থানীয় সহায়তা গোষ্ঠী (এখানে বাস্তব সংস্থার তালিকা থাকবে)। (Local support groups in Bangladesh (placeholder - real resources would be listed here).)</li>
            <li>আন্তর্জাতিক হেল্পলাইন যেমন Gamblers Anonymous. (International helplines like Gamblers Anonymous.)</li>
          </ul>
          <p className="font-semibold">মনে রাখবেন, আপনি একা নন, এবং সাহায্য উপলব্ধ। (Remember, you are not alone, and help is available.)</p>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground mt-12">
        আরও তথ্য বা সহায়তার জন্য, অনুগ্রহ করে আমাদের <Link href="/support" className="text-primary hover:underline">সাপোর্ট পৃষ্ঠার</Link> মাধ্যমে আমাদের সহায়তা দলের সাথে যোগাযোগ করুন। (For more information or assistance, please contact our support team via the Support Page.)
      </p>
    </div>
  );
}
