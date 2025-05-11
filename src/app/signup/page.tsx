import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Mail, Phone, ShieldCheckIcon } from "lucide-react"; // Added Phone
import Link from "next/link";

export const metadata = {
  title: "Sign Up - Bajibuz",
  description: "Create your Bajibuz account to play exciting casino games.",
};

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
           <div className="inline-block mx-auto p-3 bg-primary/10 rounded-full mb-4">
            <UserPlus className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">একাউন্ট তৈরি করুন (Create an Account)</CardTitle>
          <CardDescription>আজই বাজিবাজে যোগ দিন এবং খেলা শুরু করুন! (Join Bajibuz today and start playing!)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="username">ইউজারনেম (Username)</Label>
            <Input id="username" placeholder="একটি ইউজারনেম পছন্দ করুন (Choose a username)" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">ইমেইল অ্যাড্রেস (Email Address)</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          {/* Placeholder for Phone Number Input - UI can be expanded later */}
          <div className="space-y-1">
            <Label htmlFor="phone">ফোন নম্বর (Phone Number - ঐচ্ছিক/Optional)</Label>
            <Input id="phone" type="tel" placeholder="আপনার ফোন নম্বর (Your phone number)" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">পাসওয়ার্ড (Password)</Label>
            <Input id="password" type="password" placeholder="শক্তিশালী পাসওয়ার্ড তৈরি করুন (Create a strong password)" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)</Label>
            <Input id="confirmPassword" type="password" placeholder="পুনরায় পাসওয়ার্ড লিখুন (Re-enter your password)" />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm text-muted-foreground">
              আমি{" "}
              <Link href="/terms" className="text-primary hover:underline">
                শর্তাবলী (Terms of Service)
              </Link>{" "}
              এবং{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                গোপনীয়তা নীতিতে (Privacy Policy)
              </Link>
              {" "} সম্মত।
            </Label>
          </div>
           <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="ageVerification" />
            <Label htmlFor="ageVerification" className="text-sm text-muted-foreground">
              আমার বয়স ১৮ বছরের বেশি। (I am over 18 years old.)
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" size="lg">
            <UserPlus className="mr-2 h-5 w-5" /> সাইন আপ (Sign Up)
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            ইতিমধ্যে একাউন্ট আছে? (Already have an account?){" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              লগইন করুন (Login)
            </Link>
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <Button variant="outline" size="sm" className="text-muted-foreground">
              <Mail className="mr-2 h-4 w-4"/> Google দিয়ে সাইন আপ
            </Button>
            {/* <Button variant="outline" size="sm">
              <Phone className="mr-2 h-4 w-4"/> Phone
            </Button> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
