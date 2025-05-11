
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit3, ShieldAlert, ShieldCheck, UploadCloud } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";

export default function ProfileSection() {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">
            {language === 'bn' ? 'প্রোফাইল লোড হচ্ছে...' : 'Loading Profile...'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{language === 'bn' ? 'অনুগ্রহ করে অপেক্ষা করুন।' : 'Please wait.'}</p>
        </CardContent>
      </Card>
    );
  }

  const getKycStatusText = (status: string | undefined) => {
    if (!status) return { text: language === 'bn' ? 'অজানা' : 'Unknown', variant: 'outline' as any, icon: ShieldAlert };
    switch (status) {
      case 'pending': return { text: language === 'bn' ? 'বিবেচনাধীন' : 'Pending', variant: 'secondary' as any, icon: ShieldAlert };
      case 'verified': return { text: language === 'bn' ? 'যাচাইকৃত' : 'Verified', variant: 'default' as any, icon: ShieldCheck };
      case 'rejected': return { text: language === 'bn' ? 'প্রত্যাখ্যাত' : 'Rejected', variant: 'destructive' as any, icon: ShieldAlert };
      case 'not_submitted': return { text: language === 'bn' ? 'জমা দেওয়া হয়নি' : 'Not Submitted', variant: 'outline' as any, icon: ShieldAlert };
      default: return { text: status, variant: 'outline' as any, icon: ShieldAlert };
    }
  };
  
  const kycInfo = getKycStatusText(currentUser.kycStatus);

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">
          {language === 'bn' ? 'প্রোফাইল সেটিংস' : 'Profile Settings'}
        </CardTitle>
        <CardDescription>
          {language === 'bn' ? 'আপনার ব্যক্তিগত তথ্য এবং অ্যাকাউন্ট সেটিংস পরিচালনা করুন।' : 'Manage your personal information and account settings.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={currentUser.avatar || `https://picsum.photos/seed/${currentUser.uid}/100/100`} alt={currentUser.name} data-ai-hint="person avatar" />
            <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">
              <Edit3 className="mr-2 h-4 w-4" /> 
              {language === 'bn' ? 'ছবি পরিবর্তন' : 'Change Avatar'}
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              {language === 'bn' ? 'JPG, GIF বা PNG. সর্বোচ্চ ১MB।' : 'JPG, GIF or PNG. 1MB max.'}
            </p>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <Label htmlFor="fullName">
              {language === 'bn' ? 'সম্পূর্ণ নাম' : 'Full Name'}
            </Label>
            <Input id="fullName" defaultValue={currentUser.name} className="mt-1 bg-background" />
          </div>
          <div>
            <Label htmlFor="username">
              {language === 'bn' ? 'ইউজারনেম (ইমেইল)' : 'Username (Email)'}
            </Label>
            <Input id="username" defaultValue={currentUser.email} className="mt-1 bg-background" readOnly disabled />
          </div>
          <div>
            <Label htmlFor="email">
              {language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
            </Label>
            <Input id="email" type="email" defaultValue={currentUser.email} className="mt-1 bg-background" readOnly disabled />
          </div>
          {currentUser.signupMethod === 'email' && ( // Only show password fields if signed up with email
            <>
              <div>
                <Label htmlFor="currentPassword">
                  {language === 'bn' ? 'বর্তমান পাসওয়ার্ড' : 'Current Password'}
                </Label>
                <Input id="currentPassword" type="password" placeholder="********" className="mt-1 bg-background" />
              </div>
              <div>
                <Label htmlFor="newPassword">
                  {language === 'bn' ? 'নতুন পাসওয়ার্ড' : 'New Password'}
                </Label>
                <Input id="newPassword" type="password" placeholder={language === 'bn' ? 'নতুন পাসওয়ার্ড দিন' : 'Enter new password'} className="mt-1 bg-background" />
              </div>
            </>
          )}
          <Button type="submit">
            {language === 'bn' ? 'প্রোফাইল আপডেট করুন' : 'Update Profile'}
          </Button>
        </form>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <kycInfo.icon className={`mr-2 h-5 w-5 text-${kycInfo.variant === 'default' ? 'primary' : kycInfo.variant === 'destructive' ? 'destructive' : 'muted-foreground'}`} />
              {language === 'bn' ? 'কেওয়াইসি ভেরিফিকেশন' : 'KYC Verification'}
            </CardTitle>
            <CardDescription>
               {language === 'bn' ? 'আপনার অ্যাকাউন্ট যাচাই করে অতিরিক্ত সুবিধা আনলক করুন।' : 'Verify your account to unlock additional benefits.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <p className="text-sm font-medium">{language === 'bn' ? 'বর্তমান স্ট্যাটাস:' : 'Current Status:'}</p>
              <Badge variant={kycInfo.variant}>{kycInfo.text}</Badge>
            </div>
            {currentUser.kycStatus !== 'verified' && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' ? 'আপনার জাতীয় পরিচয়পত্র (NID) বা পাসপোর্ট এবং একটি সেলফি আপলোড করুন।' : 'Please upload your National ID (NID) or Passport and a selfie.'}
                </p>
                <Button variant="outline">
                  <UploadCloud className="mr-2 h-4 w-4" />
                  {language === 'bn' ? 'ডকুমেন্ট আপলোড করুন' : 'Upload Documents'}
                </Button>
                 <p className="text-xs text-muted-foreground">
                  {language === 'bn' ? '(আপলোড কার্যকারিতা শীঘ্রই আসছে)' : '(Upload functionality coming soon)'}
                </p>
              </div>
            )}
             {currentUser.kycStatus === 'verified' && (
                <p className="text-sm text-green-600">
                    {language === 'bn' ? 'আপনার অ্যাকাউন্ট সম্পূর্ণভাবে যাচাই করা হয়েছে।' : 'Your account is fully verified.'}
                </p>
            )}
          </CardContent>
        </Card>

      </CardContent>
    </Card>
  );
}
