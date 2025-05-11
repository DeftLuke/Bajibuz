
"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";

// export const metadata = { // Static or server-generated
//   title: "FAQ - Bajibuz",
//   description: "Find answers to frequently asked questions about Bajibuz.",
// };

const faqsData = [
  {
    id: "q1",
    questionEn: "How do I create an account?",
    questionBn: "আমি কিভাবে একটি একাউন্ট তৈরি করবো?",
    answerEn: "To create an account, click the 'Sign Up' button on the homepage or header. Fill in the required details such as username, email, and password. Don't forget to agree to our Terms of Service and Privacy Policy. You may need to verify your email address after submission.",
    answerBn: "একাউন্ট তৈরি করতে, হোমপেজে বা হেডারে 'সাইন আপ' বাটনে ক্লিক করুন। প্রয়োজনীয় বিবরণ যেমন ব্যবহারকারীর নাম, ইমেইল এবং পাসওয়ার্ড পূরণ করুন। আমাদের ব্যবহারের শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হতে ভুলবেন না। জমা দেওয়ার পরে, আপনাকে আপনার ইমেইল ঠিকানা যাচাই করতে হতে পারে।"
  },
  {
    id: "q2",
    questionEn: "How can I deposit funds?",
    questionBn: "আমি কিভাবে ফান্ড জমা করবো?",
    answerEn: "You can deposit funds by going to your Dashboard, then the Wallet section. Select 'Deposit Funds', choose your preferred payment method (e.g., bKash, Nagad, Rocket, or Bank Transfer), enter the amount, and follow the on-screen instructions to complete the transaction.",
    answerBn: "আপনি আপনার ড্যাশবোর্ডে গিয়ে, তারপর ওয়ালেট বিভাগে গিয়ে ফান্ড জমা করতে পারেন। 'ফান্ড জমা দিন' নির্বাচন করুন, আপনার পছন্দের পেমেন্ট পদ্ধতি (যেমন বিকাশ, নগদ, রকেট বা ব্যাংক ট্রান্সফার) নির্বাচন করুন, পরিমাণ লিখুন এবং লেনদেন সম্পূর্ণ করতে স্ক্রিনের নির্দেশাবলী অনুসরণ করুন।"
  },
  {
    id: "q3",
    questionEn: "What are the withdrawal limits?",
    questionBn: "টাকা তোলার সীমা কত?",
    answerEn: "Withdrawal limits vary depending on your account status and the chosen withdrawal method. Minimum withdrawal is typically BDT 500. Maximum limits can be found in the 'Wallet' section or by contacting support. VIP players may have higher limits.",
    answerBn: "টাকা তোলার সীমা আপনার একাউন্টের স্ট্যাটাস এবং নির্বাচিত উত্তোলন পদ্ধতির উপর নির্ভর করে পরিবর্তিত হয়। সর্বনিম্ন উত্তোলন সাধারণত ৫০০ টাকা। সর্বোচ্চ সীমা 'ওয়ালেট' বিভাগে বা সহায়তার সাথে যোগাযোগ করে জানতে পারবেন। ভিআইপি খেলোয়াড়দের জন্য উচ্চতর সীমা থাকতে পারে।"
  },
  {
    id: "q4",
    questionEn: "Is my personal information secure?",
    questionBn: "আমার ব্যক্তিগত তথ্য কি নিরাপদ?",
    answerEn: "Yes, we take your privacy and security very seriously. We use industry-standard encryption (SSL) to protect your data during transit. Your personal information is stored securely and handled according to our Privacy Policy. We do not share your data with third parties without your consent, unless required by law.",
    answerBn: "হ্যাঁ, আমরা আপনার গোপনীয়তা এবং নিরাপত্তাকে অত্যন্ত গুরুত্ব সহকারে নিই। আমরা আপনার ডেটা স্থানান্তরের সময় সুরক্ষিত রাখতে ইন্ডাস্ট্রি-স্ট্যান্ডার্ড এনক্রিপশন (SSL) ব্যবহার করি। আপনার ব্যক্তিগত তথ্য নিরাপদে সংরক্ষণ করা হয় এবং আমাদের গোপনীয়তা নীতি অনুযায়ী পরিচালনা করা হয়। আমরা আইন দ্বারা প্রয়োজনীয় না হলে আপনার সম্মতি ছাড়া তৃতীয় পক্ষের সাথে আপনার ডেটা শেয়ার করি না।"
  },
  {
    id: "q5",
    questionEn: "How do I participate in tournaments?",
    questionBn: "আমি কিভাবে টুর্নামেন্টে অংশগ্রহণ করবো?",
    answerEn: "Details about ongoing and upcoming tournaments can be found on the 'Games' page or a dedicated 'Tournaments' section (if available). Usually, you'll need to opt-in or register for the tournament. Some may have entry fees or specific game requirements. Check the tournament rules for full details.",
    answerBn: "চলমান এবং আসন্ন টুর্নামেন্ট সম্পর্কে বিস্তারিত তথ্য 'গেমস' পৃষ্ঠা বা একটি উৎসর্গীকৃত 'টুর্নামেন্টস' বিভাগে (যদি উপলব্ধ থাকে) পাওয়া যাবে। সাধারণত, আপনাকে টুর্নামেন্টের জন্য অপ্ট-ইন বা নিবন্ধন করতে হবে। কিছুর জন্য প্রবেশ ফি বা নির্দিষ্ট গেমের প্রয়োজনীয়তা থাকতে পারে। সম্পূর্ণ বিবরণের জন্য টুর্নামেন্টের নিয়মগুলি দেখুন।"
  },
  {
    id: "q6",
    questionEn: "What happens if a game freezes or disconnects?",
    questionBn: "যদি কোনো গেম ফ্রিজ হয়ে যায় বা সংযোগ বিচ্ছিন্ন হয়ে যায় তাহলে কি হবে?",
    answerEn: "In most cases, if a game round is interrupted due to a technical issue or disconnection, it will resume from where it left off when you reconnect. If the round cannot be resumed, any wagers may be voided and returned to your balance, depending on the specific game rules and our platform policy. Contact support if you experience persistent issues.",
    answerBn: "বেশিরভাগ ক্ষেত্রে, যদি কোনো প্রযুক্তিগত সমস্যা বা সংযোগ বিচ্ছিন্ন হওয়ার কারণে একটি গেম রাউন্ড বাধাগ্রস্ত হয়, তাহলে পুনরায় সংযোগ করার সময় এটি যেখান থেকে বন্ধ হয়েছিল সেখান থেকে শুরু হবে। যদি রাউন্ডটি পুনরায় শুরু করা না যায়, তবে নির্দিষ্ট গেমের নিয়ম এবং আমাদের প্ল্যাটফর্ম নীতির উপর নির্ভর করে যেকোনো বাজি বাতিল করা হতে পারে এবং আপনার ব্যালেন্সে ফেরত দেওয়া হতে পারে। যদি আপনি ক্রমাগত সমস্যার সম্মুখীন হন তবে সহায়তার সাথে যোগাযোগ করুন।"
  }
];

export default function FAQPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center py-8">
        <HelpCircle className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">
          {language === 'bn' ? 'সাধারণ জিজ্ঞাসাসমূহ' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          {language === 'bn' ? 'আপনার প্রশ্নের দ্রুত উত্তর খুঁজুন।' : 'Find quick answers to your questions.'}
        </p>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder={language === 'bn' ? 'প্রশ্ন খুঁজুন...' : 'Search FAQs...'} 
          className="pl-10 w-full bg-card text-base h-12 rounded-lg shadow-md" 
        />
      </div>
      
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqsData.map((faq) => (
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger className="text-left text-lg hover:no-underline focus:text-primary">
                  {language === 'bn' ? faq.questionBn : faq.questionEn}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                  {language === 'bn' ? faq.answerBn : faq.answerEn}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="shadow-lg mt-12">
        <CardHeader>
          <CardTitle className="text-2xl">
            {language === 'bn' ? 'আপনার উত্তর খুঁজে পাননি?' : "Can't find your answer?"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {language === 'bn' 
              ? <>আপনি যদি আপনার কাঙ্ক্ষিত উত্তর খুঁজে না পান, অনুগ্রহ করে আমাদের <a href="/support" className="text-primary hover:underline">সহায়তা পৃষ্ঠার</a> মাধ্যমে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন। আমরা সবসময় সাহায্য করতে পেরে খুশি!</>
              : <>If you didn&apos;t find the answer you were looking for, please feel free to contact our support team through the <a href="/support" className="text-primary hover:underline">Support Page</a>. We&apos;re always happy to help!</>}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
