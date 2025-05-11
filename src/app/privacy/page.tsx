import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Bajibuz",
  description: "Read the Privacy Policy for Bajibuz online casino.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center py-8">
        <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">গোপনীয়তা নীতি (Privacy Policy)</h1>
        <p className="text-xl text-muted-foreground mt-2">সর্বশেষ আপডেট (Last Updated): {new Date().toLocaleDateString('en-GB')}</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">১. ভূমিকা (1. Introduction)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>বাজিবাজ ("প্ল্যাটফর্ম", "আমরা", "আমাদের") আপনার গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আপনি যখন আমাদের অনলাইন গেমিং প্ল্যাটফর্ম এবং পরিষেবাগুলি ব্যবহার করেন তখন আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার, প্রকাশ এবং সুরক্ষিত করি।</p>
          <p>(Bajibuz ("Platform", "we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our online gaming platform and services.)</p>
          <p>বাজিবাজ ব্যবহার করে, আপনি এই নীতিতে বর্ণিত ডেটা অনুশীলনে সম্মতি দিচ্ছেন। (By using Bajibuz, you consent to the data practices described in this policy.)</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">২. আমরা যে তথ্য সংগ্রহ করি (2. Information We Collect)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>আমরা ব্যক্তিগত তথ্য সংগ্রহ করতে পারি যা আপনি সরাসরি আমাদের সরবরাহ করেন, যেমন আপনি যখন একটি অ্যাকাউন্ট তৈরি করেন, ডিপোজিট করেন বা গ্রাহক সহায়তার সাথে যোগাযোগ করেন। এই তথ্যের মধ্যে অন্তর্ভুক্ত থাকতে পারে:</p>
          <p>(We may collect personal information that you provide directly to us, such as when you create an account, make a deposit, or contact customer support. This information may include:)</p>
          <ul className="list-disc list-inside ml-4">
            <li>নাম, ইমেইল ঠিকানা, ফোন নম্বর (Name, email address, phone number)</li>
            <li>জন্ম তারিখ, সরকারি আইডি (যাচাইয়ের জন্য) (Date of birth, government-issued ID (for verification))</li>
            <li>পেমেন্টের তথ্য (যেমন, বিকাশ, নগদ, রকেট বিবরণ) (Payment information (e.g., bKash, Nagad, Rocket details))</li>
            <li>লেনদেনের ইতিহাস (Transaction history)</li>
          </ul>
          <p>আপনি যখন আমাদের প্ল্যাটফর্ম ব্যবহার করেন তখন আমরা স্বয়ংক্রিয়ভাবে তথ্য সংগ্রহ করি, যেমন আইপি ঠিকানা, ডিভাইসের তথ্য, ব্রাউজারের ধরণ এবং ব্যবহারের ডেটা। (We also collect information automatically when you use our Platform, such as IP address, device information, browser type, and usage data.)</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">৩. আমরা কীভাবে আপনার তথ্য ব্যবহার করি (3. How We Use Your Information)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>আমরা সংগৃহীত তথ্য ব্যবহার করি:</p>
          <p>(We use the information we collect to:)</p>
          <ul className="list-disc list-inside ml-4">
            <li>আমাদের প্ল্যাটফর্ম সরবরাহ, পরিচালনা এবং রক্ষণাবেক্ষণ করতে (Provide, operate, and maintain our Platform)</li>
            <li>লেনদেন প্রক্রিয়া করতে এবং আপনার অ্যাকাউন্ট পরিচালনা করতে (Process transactions and manage your account)</li>
            <li>আমাদের প্ল্যাটফর্ম উন্নত, ব্যক্তিগতকৃত এবং প্রসারিত করতে (Improve, personalize, and expand our Platform)</li>
            <li>গ্রাহক পরিষেবা এবং প্রচারমূলক উদ্দেশ্য সহ আপনার সাথে যোগাযোগ করতে (Communicate with you, including for customer service and promotional purposes)</li>
            <li>আইনি বাধ্যবাধকতা মেনে চলতে এবং জালিয়াতি প্রতিরোধ করতে (Comply with legal obligations and prevent fraud)</li>
          </ul>
        </CardContent>
      </Card>
      
      {/* Add more sections as needed: Information Sharing, Data Security, Cookies and Tracking, Your Rights, Children's Privacy, Changes to Policy, Contact Information etc. */}
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">যোগাযোগের তথ্য (Contact Information)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>এই গোপনীয়তা নীতি সম্পর্কে আপনার কোন প্রশ্ন থাকলে, অনুগ্রহ করে privacy@bajibuz.com এ আমাদের সাথে যোগাযোগ করুন। (If you have any questions about this Privacy Policy, please contact us at privacy@bajibuz.com.)</p>
          <p className="italic mt-6">এটি একটি ডেমো ডকুমেন্ট। বাস্তব অ্যাপ্লিকেশনের জন্য, অনুগ্রহ করে একজন আইনী পেশাদারের সাথে পরামর্শ করে সম্পূর্ণ গোপনীয়তা নীতি তৈরি করুন। (This is a placeholder document. For a real application, consult with a legal professional to draft a comprehensive Privacy Policy.)</p>
        </CardContent>
      </Card>
    </div>
  );
}
