import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Login - Bajibuz",
  description: "Log in to your Bajibuz account.",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="inline-block mx-auto p-3 bg-primary/10 rounded-full mb-4">
            <LogIn className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">স্বাগতম! (Welcome Back!)</CardTitle>
          <CardDescription>আপনার অ্যাকাউন্টে প্রবেশ করতে আপনার তথ্য দিন। (Enter your credentials to access your account.)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">ইমেইল অথবা ইউজারনেম (Email or Username)</Label>
            <Input id="email" type="email" placeholder="you@example.com or username" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">পাসওয়ার্ড (Password)</Label>
              <Link href="/forgot-password" passHref>
                <Button variant="link" size="sm" className="px-0 text-xs text-primary">পাসওয়ার্ড ভুলে গেছেন? (Forgot password?)</Button>
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" size="lg">
            <LogIn className="mr-2 h-5 w-5" /> লগইন (Login)
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            অ্যাকাউন্ট নেই? (Don&apos;t have an account?){" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              সাইন আপ করুন (Sign Up)
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
