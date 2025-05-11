
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail } from "lucide-react"; // Added Mail icon
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useRouter } from 'next/navigation';
import { signInWithGoogle, createUserDocumentFromAuth } from '@/lib/firebase/auth';
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function LoginPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const userAuth = await signInWithGoogle();
    if (userAuth) {
      // createUserDocumentFromAuth will ensure user doc exists or update last login info
      await createUserDocumentFromAuth(userAuth, { languagePreference: language });
      toast({
        title: language === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : "Successfully Logged In!",
        description: language === 'bn' ? `স্বাগতম, ${userAuth.displayName}!` : `Welcome back, ${userAuth.displayName}!`,
      });
      router.push('/dashboard');
    } else {
      toast({
        title: language === 'bn' ? 'লগইন ব্যর্থ হয়েছে' : "Login Failed",
        description: language === 'bn' ? 'গুগল লগইনে একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : "There was an issue with Google Login. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="inline-block mx-auto p-3 bg-primary/10 rounded-full mb-4">
            <LogIn className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">
            {language === 'bn' ? 'স্বাগতম!' : 'Welcome Back!'}
          </CardTitle>
          <CardDescription>
            {language === 'bn' 
              ? 'আপনার অ্যাকাউন্টে প্রবেশ করতে আপনার তথ্য দিন।' 
              : 'Enter your credentials to access your account.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">
              {language === 'bn' ? 'ইমেইল অথবা ইউজারনেম' : 'Email or Username'}
            </Label>
            <Input id="email" type="email" placeholder={language === 'bn' ? "you@example.com অথবা ইউজারনেম" : "you@example.com or username"} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">
                {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </Label>
              <Link href="/forgot-password" passHref>
                <Button variant="link" size="sm" className="px-0 text-xs text-primary">
                  {language === 'bn' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
                </Button>
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" size="lg" disabled={isLoading}>
            <LogIn className="mr-2 h-5 w-5" /> 
            {isLoading && (language === 'bn' ? 'প্রসেস হচ্ছে...' : 'Processing...')}
            {!isLoading && (language === 'bn' ? 'লগইন' : 'Login')}
          </Button>
          <Button variant="outline" size="lg" className="w-full text-muted-foreground" onClick={handleGoogleLogin} disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4"/> 
              {isLoading && (language === 'bn' ? 'প্রসেস হচ্ছে...' : 'Processing...')}
              {!isLoading && (language === 'bn' ? 'Google দিয়ে লগইন' : 'Login with Google')}
           </Button>
          <p className="text-sm text-muted-foreground text-center">
            {language === 'bn' ? 'অ্যাকাউন্ট নেই?' : "Don't have an account?"}{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              {language === 'bn' ? 'সাইন আপ করুন' : 'Sign Up'}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
