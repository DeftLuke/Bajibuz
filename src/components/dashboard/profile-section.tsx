
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit3 } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function ProfileSection() {
  const { language } = useLanguage();
  // Placeholder data
  const user = {
    name: "Demo User",
    email: "user@example.com",
    username: "demouser123",
    avatarUrl: "https://picsum.photos/100/100?random=3",
  };

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
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person avatar" />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
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
            <Input id="fullName" defaultValue={user.name} className="mt-1 bg-background" />
          </div>
          <div>
            <Label htmlFor="username">
              {language === 'bn' ? 'ইউজারনেম' : 'Username'}
            </Label>
            <Input id="username" defaultValue={user.username} className="mt-1 bg-background" />
          </div>
          <div>
            <Label htmlFor="email">
              {language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
            </Label>
            <Input id="email" type="email" defaultValue={user.email} className="mt-1 bg-background" />
          </div>
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
          <Button type="submit">
            {language === 'bn' ? 'প্রোফাইল আপডেট করুন' : 'Update Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
