
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Mail } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useRouter } from 'next/navigation';
import { signInWithGoogle, createUserDocumentFromAuth } from '@/lib/firebase/auth';
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function SignupPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    const userAuth = await signInWithGoogle();
    if (userAuth) {
      await createUserDocumentFromAuth(userAuth, { languagePreference: language });
      // The AuthContext will handle setting localStorage for 'showWelcomeSpin'
      toast({
        title: language === 'bn' ? 'সফলভাবে সাইন আপ হয়েছে!' : "Successfully Signed Up!",
        description: language === 'bn' ? `স্বাগতম, ${userAuth.displayName}!` : `Welcome, ${userAuth.displayName}!`,
      });
      router.push('/dashboard');
    } else {
      toast({
        title: language === 'bn' ? 'সাইন আপ ব্যর্থ হয়েছে' : "Sign Up Failed",
        description: language === 'bn' ? 'গুগল সাইন আপে একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : "There was an issue with Google Sign Up. Please try again.",
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
            <UserPlus className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">
            {language === 'bn' ? 'একাউন্ট তৈরি করুন' : 'Create an Account'}
          </CardTitle>
          <CardDescription>
            {language === 'bn' ? 'আজই বাজিবাজে যোগ দিন এবং খেলা শুরু করুন!' : 'Join Bajibuz today and start playing!'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="username">
              {language === 'bn' ? 'ইউজারনেম' : 'Username'}
            </Label>
            <Input id="username" placeholder={language === 'bn' ? 'একটি ইউজারনেম পছন্দ করুন' : 'Choose a username'} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">
              {language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
            </Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">
              {language === 'bn' ? 'ফোন নম্বর (ঐচ্ছিক)' : 'Phone Number (Optional)'}
            </Label>
            <Input id="phone" type="tel" placeholder={language === 'bn' ? 'আপনার ফোন নম্বর' : 'Your phone number'} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">
              {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
            </Label>
            <Input id="password" type="password" placeholder={language === 'bn' ? 'শক্তিশালী পাসওয়ার্ড তৈরি করুন' : 'Create a strong password'} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">
              {language === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'}
            </Label>
            <Input id="confirmPassword" type="password" placeholder={language === 'bn' ? 'পুনরায় পাসওয়ার্ড লিখুন' : 'Re-enter your password'} />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm text-muted-foreground">
              {language === 'bn' ? 'আমি ' : 'I agree to the '}{" "}
              <Link href="/terms" className="text-primary hover:underline">
                {language === 'bn' ? 'শর্তাবলী' : 'Terms of Service'}
              </Link>{" "}
              {language === 'bn' ? 'এবং ' : 'and '}{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                {language === 'bn' ? 'গোপনীয়তা নীতিতে' : 'Privacy Policy'}
              </Link>
              {language === 'bn' ? ' সম্মত।' : '.'}
            </Label>
          </div>
           <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="ageVerification" />
            <Label htmlFor="ageVerification" className="text-sm text-muted-foreground">
              {language === 'bn' ? 'আমার বয়স ১৮ বছরের বেশি।' : 'I am over 18 years old.'}
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" size="lg" disabled={isLoading}>
            <UserPlus className="mr-2 h-5 w-5" /> 
            {isLoading && (language === 'bn' ? 'প্রসেস হচ্ছে...' : 'Processing...')}
            {!isLoading && (language === 'bn' ? 'সাইন আপ' : 'Sign Up')}
          </Button>
           <Button variant="outline" size="lg" className="w-full text-muted-foreground" onClick={handleGoogleSignUp} disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4"/> 
              {isLoading && (language === 'bn' ? 'প্রসেস হচ্ছে...' : 'Processing...')}
              {!isLoading && (language === 'bn' ? 'Google দিয়ে সাইন আপ' : 'Sign up with Google')}
           </Button>
          <p className="text-sm text-muted-foreground text-center">
            {language === 'bn' ? 'ইতিমধ্যে একাউন্ট আছে?' : 'Already have an account?'}{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              {language === 'bn' ? 'লগইন করুন' : 'Login'}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
