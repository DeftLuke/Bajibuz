import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "FAQ - DeshiSpin",
  description: "Find answers to frequently asked questions about DeshiSpin.",
};

const faqs = [
  {
    id: "q1",
    question: "How do I create an account?",
    answer: "To create an account, click on the 'Sign Up' button on the homepage or in the header. Fill in the required details like username, email, and password. Make sure to agree to our Terms of Service and Privacy Policy. Once submitted, you may need to verify your email address."
  },
  {
    id: "q2",
    question: "How can I deposit funds?",
    answer: "You can deposit funds by navigating to your Dashboard, then to the Wallet section. Choose 'Deposit Funds', select your preferred payment method (like bKash, Nagad, Rocket, or Bank Transfer), enter the amount, and follow the on-screen instructions to complete the transaction."
  },
  {
    id: "q3",
    question: "What are the withdrawal limits?",
    answer: "Withdrawal limits vary depending on your account status and the chosen withdrawal method. Minimum withdrawal is typically 500 BDT. Maximum limits can be found in the 'Wallet' section or by contacting support. VIP players may have higher limits."
  },
  {
    id: "q4",
    question: "Is my personal information secure?",
    answer: "Yes, we take your privacy and security very seriously. We use industry-standard encryption (SSL) to protect your data during transmission. Your personal information is stored securely and handled according to our Privacy Policy. We do not share your data with third parties without your consent, except as required by law."
  },
  {
    id: "q5",
    question: "How do I participate in tournaments?",
    answer: "Details about ongoing and upcoming tournaments can be found on the 'Games' page or a dedicated 'Tournaments' section (if available). Typically, you'll need to opt-in or register for a tournament. Some may have entry fees or specific game requirements. Check the tournament rules for full details."
  },
  {
    id: "q6",
    question: "What happens if a game freezes or disconnects?",
    answer: "In most cases, if a game round is interrupted due to a technical issue or disconnection, it will resume from where it left off when you reconnect. If the round cannot be resumed, any wagers may be voided and returned to your balance, depending on the specific game rules and our platform policy. Contact support if you face persistent issues."
  }
];

export default function FAQPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center py-8">
        <HelpCircle className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground mt-2">Find quick answers to your questions.</p>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input type="search" placeholder="Search FAQs..." className="pl-10 w-full bg-card text-base h-12 rounded-lg shadow-md" />
      </div>
      
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger className="text-left text-lg hover:no-underline focus:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="shadow-lg mt-12">
        <CardHeader>
          <CardTitle className="text-2xl">Can&apos;t find your answer?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            If you didn&apos;t find the answer you were looking for, please feel free to 
            contact our support team through the <a href="/support" className="text-primary hover:underline">Support Page</a>. We&apos;re always happy to help!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
