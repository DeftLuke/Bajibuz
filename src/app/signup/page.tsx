
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useRouter } from 'next/navigation';
import { signInWithGoogle, createUserDocumentFromAuth, signUpWithEmailAndPassword } from '@/lib/firebase/auth';
import { useToast } from "@/hooks/use-toast";
import { useState, type FormEvent } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignupPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);


  const handleEmailSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!username.trim()) {
      setError(language === 'bn' ? 'অনুগ্রহ করে ইউজারনেম লিখুন।' : 'Please enter a username.');
      setIsLoading(false);
      return;
    }
    if (!email.trim()) {
      setError(language === 'bn' ? 'অনুগ্রহ করে ইমেইল লিখুন।' : 'Please enter an email address.');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError(language === 'bn' ? 'পাসওয়ার্ড দুটি মিলছে না।' : 'Passwords do not match.');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError(language === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }
    if (!termsAccepted) {
      setError(language === 'bn' ? 'আপনাকে অবশ্যই শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হতে হবে।' : 'You must agree to the Terms of Service and Privacy Policy.');
      setIsLoading(false);
      return;
    }
    if (!ageVerified) {
      setError(language === 'bn' ? 'আপনাকে অবশ্যই নিশ্চিত করতে হবে যে আপনার বয়স ১৮ বছরের বেশি।' : 'You must confirm you are over 18 years old.');
      setIsLoading(false);
      return;
    }

    try {
      const userAuth = await signUpWithEmailAndPassword(email, password, username);
      if (userAuth) {
        await createUserDocumentFromAuth(userAuth, { 
          name: username, 
          email, 
          phoneNumber: phone, 
          languagePreference: language, 
          signupMethod: 'email' 
        });
        
        toast({
          title: language === 'bn' ? 'সফলভাবে সাইন আপ হয়েছে!' : "Successfully Signed Up!",
          description: language === 'bn' ? `স্বাগতম, ${username}!` : `Welcome, ${username}!`,
        });
        router.push('/dashboard');
      } else {
        throw new Error("User creation failed");
      }
    } catch (err: any) {
      console.error("Signup Error:", err);
      let message = language === 'bn' ? 'সাইন আপ ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Sign up failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        message = language === 'bn' ? 'এই ইমেইল ঠিকানা ইতিমধ্যে ব্যবহৃত হয়েছে।' : 'This email address is already in use.';
      } else if (err.code === 'auth/weak-password') {
        message = language === 'bn' ? 'পাসওয়ার্ডটি খুব দুর্বল।' : 'The password is too weak.';
      }
      setError(message);
      toast({
        title: language === 'bn' ? 'সাইন আপ ব্যর্থ হয়েছে' : "Sign Up Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userAuth = await signInWithGoogle();
      if (userAuth) {
        await createUserDocumentFromAuth(userAuth, { 
          languagePreference: language,
          signupMethod: 'google'
        });
        toast({
          title: language === 'bn' ? 'সফলভাবে সাইন আপ হয়েছে!' : "Successfully Signed Up!",
          description: language === 'bn' ? `স্বাগতম, ${userAuth.displayName}!` : `Welcome, ${userAuth.displayName}!`,
        });
        router.push('/dashboard');
      } else {
        throw new Error("Google sign in did not return userAuth.");
      }
    } catch (err) {
      console.error("Google Signup Error:", err);
      const message = language === 'bn' ? 'গুগল সাইন আপে একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : "There was an issue with Google Sign Up. Please try again.";
      setError(message);
      toast({
        title: language === 'bn' ? 'সাইন আপ ব্যর্থ হয়েছে' : "Sign Up Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
        <form onSubmit={handleEmailSignUp}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{language === 'bn' ? 'ত্রুটি' : 'Error'}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-1">
              <Label htmlFor="username">
                {language === 'bn' ? 'ইউজারনেম' : 'Username'} *
              </Label>
              <Input id="username" placeholder={language === 'bn' ? 'একটি ইউজারনেম পছন্দ করুন' : 'Choose a username'} value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">
                {language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'} *
              </Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">
                {language === 'bn' ? 'ফোন নম্বর (ঐচ্ছিক)' : 'Phone Number (Optional)'}
              </Label>
              <Input id="phone" type="tel" placeholder={language === 'bn' ? 'আপনার ফোন নম্বর' : 'Your phone number'} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">
                {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'} *
              </Label>
              <Input id="password" type="password" placeholder={language === 'bn' ? 'শক্তিশালী পাসওয়ার্ড তৈরি করুন (কমপক্ষে ৬ অক্ষর)' : 'Create a strong password (min. 6 chars)'} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">
                {language === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'} *
              </Label>
              <Input id="confirmPassword" type="password" placeholder={language === 'bn' ? 'পুনরায় পাসওয়ার্ড লিখুন' : 'Re-enter your password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                {language === 'bn' ? 'আমি ' : 'I agree to the '}{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  {language === 'bn' ? 'শর্তাবলী' : 'Terms of Service'}
                </Link>{" "}
                {language === 'bn' ? 'এবং ' : 'and '}{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  {language === 'bn' ? 'গোপনীয়তা নীতিতে' : 'Privacy Policy'}
                </Link>
                {language === 'bn' ? ' সম্মত।' : '.'} *
              </Label>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="ageVerification" checked={ageVerified} onCheckedChange={(checked) => setAgeVerified(checked as boolean)} />
              <Label htmlFor="ageVerification" className="text-sm text-muted-foreground">
                {language === 'bn' ? 'আমার বয়স ১৮ বছরের বেশি।' : 'I am over 18 years old.'} *
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              <UserPlus className="mr-2 h-5 w-5" /> 
              {isLoading ? (language === 'bn' ? 'প্রসেস হচ্ছে...' : 'Processing...') : (language === 'bn' ? 'সাইন আপ' : 'Sign Up')}
            </Button>
          </CardFooter>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              {language === 'bn' ? 'অথবা' : 'Or'}
            </span>
          </div>
        </div>
        <CardFooter className="flex flex-col gap-4 pt-0">
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
