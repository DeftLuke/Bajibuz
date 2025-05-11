import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, MailCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Forgot Password - Bajibuz",
  description: "Reset your Bajibuz account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="inline-block mx-auto p-3 bg-primary/10 rounded-full mb-4">
            <KeyRound className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">পাসওয়ার্ড ভুলে গেছেন? (Forgot Your Password?)</CardTitle>
          <CardDescription>চিন্তার কিছু নেই! নিচে আপনার ইমেইল ঠিকানা দিন এবং আমরা আপনাকে পাসওয়ার্ড রিসেট করার জন্য একটি লিঙ্ক পাঠাবো। (No worries! Enter your email address below and we&apos;ll send you a link to reset your password.)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">ইমেইল অ্যাড্রেস (Email Address)</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" size="lg">
            <MailCheck className="mr-2 h-5 w-5" /> রিসেট লিঙ্ক পাঠান (Send Reset Link)
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            পাসওয়ার্ড মনে আছে? (Remember your password?){" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              লগইন করুন (Login)
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
