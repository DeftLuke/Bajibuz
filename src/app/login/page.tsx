"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useRouter } from 'next/navigation';
import { signInWithGoogle, signInWithEmail } from '@/lib/firebase/auth';
import { useToast } from "@/hooks/use-toast";
import { useState, type FormEvent, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const { currentUser, loading: authLoading } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false); // Renamed from isLoading to avoid conflict with authLoading
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // This effect handles redirection IF the user is already authenticated when they visit this page,
    // OR if the currentUser state changes (e.g., after a successful login action on this page).
    if (!authLoading && currentUser) {
      console.log('LoginPage: User authenticated, redirecting to dashboard.');
      router.push('/dashboard');
    } else if (!authLoading && !currentUser) {
      console.log('LoginPage: User not authenticated, showing login form.');
    } else {
      console.log('LoginPage: Auth state still loading...');
    }
  }, [currentUser, authLoading, router]);

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const userAuth = await signInWithGoogle();
      if (userAuth) {
        // Set flag for login bonus popup. AuthContext will handle profile creation/fetching.
        // Redirection will be handled by the useEffect above when currentUser updates.
        if (typeof window !== 'undefined') {
            localStorage.setItem('showLoginBonusPopup', 'true');
        }
        toast({
          title: language === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : "Successfully Logged In!",
          description: language === 'bn' ? `স্বাগতম, ${userAuth.displayName || 'ব্যবহারকারী'}!` : `Welcome back, ${userAuth.displayName || 'User'}!`,
        });
        // The useEffect will redirect once AuthContext updates currentUser
      }
    } catch (err: any) {
        const message = err.message || (language === 'bn' ? 'গুগল লগইনে একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : "There was an issue with Google Login. Please try again.");
        setError(message);
        toast({
            title: language === 'bn' ? 'লগইন ব্যর্থ হয়েছে' : "Login Failed",
            description: message,
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleEmailLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!email.trim() || !password.trim()) {
        const message = language === 'bn' ? 'অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড লিখুন।' : 'Please enter both email and password.';
        setError(message);
        toast({ title: language === 'bn' ? 'ফর্ম ত্রুটি' : 'Form Error', description: message, variant: 'destructive'});
        setIsSubmitting(false);
        return;
    }

    try {
      const userAuth = await signInWithEmail(email, password);
      if (userAuth) {
        // Set flag for login bonus popup. AuthContext will handle profile creation/fetching.
        // Redirection will be handled by the useEffect above when currentUser updates.
        if (typeof window !== 'undefined') {
            localStorage.setItem('showLoginBonusPopup', 'true');
        }
        toast({
          title: language === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : "Successfully Logged In!",
          description: language === 'bn' ? 'স্বাগতম!' : 'Welcome back!',
        });
        // The useEffect will redirect once AuthContext updates currentUser
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      let message = language === 'bn' ? 'লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Login failed. Please try again.';
      if (err.code) {
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential': 
            message = language === 'bn' ? 'ইমেইল অথবা পাসওয়ার্ড ভুল।' : 'Incorrect email or password.';
            break;
          case 'auth/invalid-email':
            message = language === 'bn' ? 'ইমেইল ঠিকানাটি সঠিক নয়।' : 'The email address is not valid.';
            break;
          case 'auth/too-many-requests':
            message = language === 'bn' ? 'অনেকবার চেষ্টার কারণে অ্যাকাউন্ট সাময়িকভাবে লক করা হয়েছে।' : 'Access to this account has been temporarily disabled due to many failed login attempts.';
            break;
          default: 
            break;
        }
      }
      setError(message);
      toast({
        title: language === 'bn' ? 'লগইন ব্যর্থ হয়েছে' : "Login Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen"> {/* Ensure min-h-screen for full page loading */}
        <p className="text-xl text-muted-foreground">
          {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
        </p>
      </div>
    );
  }
  
  // If !authLoading && currentUser, useEffect will redirect.
  // This return is for the case where !authLoading && !currentUser (i.e., show login form)
  // OR for the brief moment before useEffect redirects if currentUser becomes true.
  return (
    <div className="flex items-center justify-center py-12 min-h-screen"> {/* Ensure min-h-screen */}
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
        <form onSubmit={handleEmailLogin}>
          <CardContent className="space-y-4">
             {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{language === 'bn' ? 'ত্রুটি' : 'Error'}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-1">
              <Label htmlFor="email">
                {language === 'bn' ? 'ইমেইল' : 'Email'}
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                disabled={isSubmitting}
              />
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
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                disabled={isSubmitting}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || authLoading}>
              <LogIn className="mr-2 h-5 w-5" /> 
              {isSubmitting ? (language === 'bn' ? 'প্রসেস হচ্ছে...' : 'Processing...') : (language === 'bn' ? 'লগইন' : 'Login')}
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
          <Button variant="outline" size="lg" className="w-full text-muted-foreground" onClick={handleGoogleLogin} disabled={isSubmitting || authLoading}>
              <Mail className="mr-2 h-4 w-4"/> 
              {isSubmitting ? (language === 'bn' ? 'প্রসেস হচ্ছে...' : 'Processing...') : (language === 'bn' ? 'Google দিয়ে লগইন' : 'Login with Google')}
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
