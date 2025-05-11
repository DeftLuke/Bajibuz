
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useEffect, useState } from "react";

// export const metadata = { // Static or server-generated
//   title: "Terms of Service - Bajibuz",
//   description: "Read the Terms of Service for Bajibuz online casino.",
// };

export default function TermsPage() {
  const { language } = useLanguage();
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const date = new Date();
    if (language === 'bn') {
      setLastUpdated(date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }));
    } else {
      setLastUpdated(date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  }, [language]);

  const introContent = {
    bn: {
      p1: 'বাজিবাজে আপনাকে স্বাগতম! ("Bajibuz", "প্ল্যাটফর্ম", "আমরা", "আমাদের")। এই ব্যবহারের শর্তাবলী ("শর্তাবলী") আমাদের অনলাইন গেমিং প্ল্যাটফর্ম এবং পরিষেবাগুলির আপনার ব্যবহার পরিচালনা করে। বাজিবাজ অ্যাক্সেস বা ব্যবহার করে, আপনি এই শর্তাবলীতে আবদ্ধ হতে সম্মত হচ্ছেন।',
      p2: "আপনি যদি এই শর্তাবলীতে সম্মত না হন, অনুগ্রহ করে আমাদের প্ল্যাটফর্ম ব্যবহার করবেন না।"
    },
    en: {
      p1: 'Welcome to Bajibuz ("Platform", "we", "us", "our"). These Terms of Service ("Terms") govern your use of our online gaming platform and services. By accessing or using Bajibuz, you agree to be bound by these Terms.',
      p2: "If you do not agree to these Terms, please do not use our Platform."
    }
  };

  const eligibilityContent = {
    bn: "বাজিবাজ ব্যবহার করার জন্য আপনার বয়স কমপক্ষে ১৮ বছর এবং বাংলাদেশের বাসিন্দা হতে হবে। আমাদের প্ল্যাটফর্ম ব্যবহার করে, আপনি এই যোগ্যতার প্রয়োজনীয়তাগুলি পূরণ করছেন বলে উপস্থাপনা এবং ওয়ারেন্টি দিচ্ছেন।",
    en: "You must be at least 18 years old and a resident of Bangladesh to use Bajibuz. By using our Platform, you represent and warrant that you meet these eligibility requirements."
  };

  const registrationContent = {
    bn: {
      p1: "বাজিবাজের কিছু নির্দিষ্ট বৈশিষ্ট্য অ্যাক্সেস করার জন্য, আপনাকে একটি অ্যাকাউন্টের জন্য নিবন্ধন করতে হতে পারে। আপনি নিবন্ধন প্রক্রিয়ার সময় সঠিক, বর্তমান এবং সম্পূর্ণ তথ্য সরবরাহ করতে এবং এই ধরনের তথ্য সঠিক, বর্তমান এবং সম্পূর্ণ রাখতে আপডেট করতে সম্মত হচ্ছেন।",
      p2: 'আপনি আপনার অ্যাকাউন্টের পাসওয়ার্ড সুরক্ষিত রাখার জন্য এবং আপনার অ্যাকাউন্টের অধীনে যেকোনো কার্যকলাপ বা পদক্ষেপের জন্য দায়ী। আমরা আপনাকে আপনার অ্যাকাউন্টের সাথে একটি "শক্তিশালী" পাসওয়ার্ড (বড় এবং ছোট হাতের অক্ষর, সংখ্যা এবং প্রতীকের সমন্বয়ে গঠিত পাসওয়ার্ড) ব্যবহার করতে উৎসাহিত করি।',
      p3: "দ্বি-ফ্যাক্টর প্রমাণীকরণ (2FA) আপনার অ্যাকাউন্টের নিরাপত্তার জন্য উপলব্ধ এবং সুপারিশকৃত।"
    },
    en: {
      p1: "To access certain features of Bajibuz, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
      p2: 'You are responsible for safeguarding your account password and for any activities or actions under your account. We encourage you to use a "strong" password (passwords that use a combination of upper and lower case letters, numbers and symbols) with your account.',
      p3: "Two-factor authentication (2FA) is available and recommended for your account security."
    }
  };
  
  const contactContent = {
    bn: {
        p1: "এই শর্তাবলী সম্পর্কে আপনার কোন প্রশ্ন থাকলে, অনুগ্রহ করে support@bajibuz.com এ আমাদের সাথে যোগাযোগ করুন।",
        p2: "এটি একটি ডেমো ডকুমেন্ট। বাস্তব অ্যাপ্লিকেশনের জন্য, অনুগ্রহ করে একজন আইনী পেশাদারের সাথে পরামর্শ করে সম্পূর্ণ ব্যবহারের শর্তাবলী তৈরি করুন।"
    },
    en: {
        p1: "If you have any questions about these Terms, please contact us at support@bajibuz.com.",
        p2: "This is a placeholder document. For a real application, consult with a legal professional to draft comprehensive Terms of Service."
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center py-8">
        <FileText className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">
          {language === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          {language === 'bn' ? `সর্বশেষ আপডেট: ${lastUpdated}` : `Last Updated: ${lastUpdated}`}
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            {language === 'bn' ? '১. ভূমিকা' : '1. Introduction'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>{language === 'bn' ? introContent.bn.p1 : introContent.en.p1}</p>
          <p>{language === 'bn' ? introContent.bn.p2 : introContent.en.p2}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            {language === 'bn' ? '২. যোগ্যতা' : '2. Eligibility'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>{language === 'bn' ? eligibilityContent.bn : eligibilityContent.en}</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            {language === 'bn' ? '৩. অ্যাকাউন্ট নিবন্ধন' : '3. Account Registration'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>{language === 'bn' ? registrationContent.bn.p1 : registrationContent.en.p1}</p>
          <p>{language === 'bn' ? registrationContent.bn.p2 : registrationContent.en.p2}</p>
          <p>{language === 'bn' ? registrationContent.bn.p3 : registrationContent.en.p3}</p>
        </CardContent>
      </Card>
      
      {/* Add more sections as needed: Prohibited Conduct, Deposits and Withdrawals, Intellectual Property, Disclaimers, Limitation of Liability, Governing Law, Changes to Terms, Contact Information etc. */}

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            {language === 'bn' ? 'যোগাযোগের তথ্য' : 'Contact Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>{language === 'bn' ? contactContent.bn.p1 : contactContent.en.p1}</p>
          <p className="italic mt-6">{language === 'bn' ? contactContent.bn.p2 : contactContent.en.p2}</p>
        </CardContent>
      </Card>
    </div>
  );
}
