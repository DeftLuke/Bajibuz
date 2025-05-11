import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy, Mail, MessageSquare, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Support - DeshiSpin",
  description: "Get help and support for DeshiSpin.",
};

export default function SupportPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Support Center</h1>
        <p className="text-xl text-muted-foreground mt-2">We&apos;re here to help you with any questions or issues.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center mb-2">
              <HelpCircle className="h-7 w-7 text-primary mr-3" />
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </div>
            <CardDescription>Find answers to common questions about DeshiSpin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "How do I create an account?",
              "How can I deposit funds?",
              "What are the withdrawal limits?",
              "Is my personal information secure?",
              "How do I participate in tournaments?"
            ].map((faq, index) => (
              <div key={index}>
                <Link href={`/faq#q${index + 1}`} className="font-medium text-primary hover:underline">
                  {faq}
                </Link>
              </div>
            ))}
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center mb-2">
              <MessageSquare className="h-7 w-7 text-primary mr-3" />
              <CardTitle className="text-2xl">Contact Us</CardTitle>
            </div>
            <CardDescription>Send us a message and we&apos;ll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Enter your name" className="mt-1 bg-background"/>
              </div>
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="mt-1 bg-background"/>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Account issue" className="mt-1 bg-background"/>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Describe your issue or question..." rows={5} className="mt-1 bg-background"/>
              </div>
              <Button type="submit" className="w-full">
                <Mail className="mr-2 h-5 w-5" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg mt-12">
        <CardHeader>
            <CardTitle className="text-xl">Other ways to get help</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
            <p><strong>Live Chat:</strong> Available 24/7 (Click the chat icon at the bottom right - placeholder)</p>
            <p><strong>Email:</strong> support@deshispin.com (Replies within 24 hours)</p>
            <p><strong>Community Forum:</strong> <Link href="/community" className="text-primary hover:underline">Visit our forum</Link></p>
        </CardContent>
      </Card>
    </div>
  );
}
