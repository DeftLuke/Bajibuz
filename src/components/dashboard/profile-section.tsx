"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit3, ShieldAlert, ShieldCheck, UploadCloud, Phone, KeyRound, User, Wallet } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateUserDocument, updateUserPassword } from "@/lib/firebase/auth";
import { updateProfile as firebaseUpdateProfile } from "firebase/auth";
import { auth } from "@/config/firebase";
import type { UserProfile } from '@/context/auth-context';


export default function ProfileSection() {
  const { language } = useLanguage();
  const { currentUser, updateCurrentUserProfile, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(''); 
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.name || '');
      setAvatarUrl(currentUser.avatar || `https://picsum.photos/seed/${currentUser.uid}/100/100`);
    }
  }, [currentUser]);


  if (authLoading || !currentUser) {
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
  
  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNewAvatarFile(file); // Store the file itself if you plan to upload
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setAvatarUrl(loadEvent.target?.result as string); // Preview new avatar
      };
      reader.readAsDataURL(file);
    }
  };


  const handleProfileUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser) return;
    setIsSubmittingProfile(true);

    const updates: Partial<UserProfile> = {};
    if (displayName !== currentUser.name) {
      updates.name = displayName;
    }
    // If avatarUrl was changed by selecting a new file (it will be a data URI)
    // and it's different from the original currentUser.avatar
    if (avatarUrl && avatarUrl !== currentUser.avatar && avatarUrl.startsWith('data:image')) {
       updates.avatar = avatarUrl;
    }


    try {
      if (Object.keys(updates).length > 0) {
        await updateCurrentUserProfile(updates); 
        
        if (updates.name && auth.currentUser) {
            await firebaseUpdateProfile(auth.currentUser, { displayName: updates.name });
        }
        if (updates.avatar && auth.currentUser) { 
            await firebaseUpdateProfile(auth.currentUser, { photoURL: updates.avatar });
        }
      }
      toast({
        title: language === 'bn' ? 'প্রোফাইল আপডেট হয়েছে' : 'Profile Updated',
        description: language === 'bn' ? 'আপনার তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।' : 'Your information has been saved successfully.',
      });
      setNewAvatarFile(null); // Reset new avatar file state
    } catch (error: any) {
      toast({
        title: language === 'bn' ? 'আপডেট ব্যর্থ হয়েছে' : 'Update Failed',
        description: error.message || (language === 'bn' ? 'আপনার প্রোফাইল আপডেট করার সময় একটি সমস্যা হয়েছে।' : 'There was an issue updating your profile.'),
        variant: "destructive",
      });
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handlePasswordChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser) return;

    if (newPassword !== confirmNewPassword) {
      toast({ title: language === 'bn' ? 'ত্রুটি' : 'Error', description: language === 'bn' ? 'নতুন পাসওয়ার্ড এবং নিশ্চিতকরণ পাসওয়ার্ড মেলে না।' : 'New password and confirm password do not match.', variant: 'destructive' });
      return;
    }
    if (newPassword.length < 6) {
        toast({ title: language === 'bn' ? 'ত্রুটি' : 'Error', description: language === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters long.', variant: 'destructive' });
        return;
    }

    setIsSubmittingPassword(true);
    try {
      await updateUserPassword(newPassword, currentUser.signupMethod === 'email' ? currentPassword : undefined);
      toast({
        title: language === 'bn' ? 'পাসওয়ার্ড পরিবর্তিত হয়েছে' : 'Password Changed',
        description: language === 'bn' ? 'আপনার পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে।' : 'Your password has been updated successfully.',
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      toast({
        title: language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে' : 'Password Change Failed',
        description: error.message || (language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন করার সময় একটি সমস্যা হয়েছে।' : 'There was an issue changing your password.'),
        variant: "destructive",
      });
    } finally {
      setIsSubmittingPassword(false);
    }
  };


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
      <CardContent className="space-y-8">
        {/* Profile Info and Avatar */}
        <form onSubmit={handleProfileUpdate} className="space-y-6">
            <Card className="p-6">
                <CardTitle className="text-xl mb-4 flex items-center"><User className="mr-2 h-5 w-5 text-primary"/>{language === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}</CardTitle>
                <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarUrl} alt={currentUser.name || "User Avatar"} data-ai-hint="person avatar" />
                        <AvatarFallback>{currentUser.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <Label htmlFor="avatarUpload" className="cursor-pointer">
                            <Button variant="outline" size="sm" as="span">
                                <UploadCloud className="mr-2 h-4 w-4" /> 
                                {language === 'bn' ? 'ছবি পরিবর্তন' : 'Change Avatar'}
                            </Button>
                        </Label>
                        <Input id="avatarUpload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange}/>
                        <p className="text-xs text-muted-foreground mt-1">
                        {language === 'bn' ? 'JPG, GIF বা PNG. সর্বোচ্চ ১MB।' : 'JPG, GIF or PNG. 1MB max.'}
                        </p>
                    </div>
                </div>

                <div>
                    <Label htmlFor="displayName">{language === 'bn' ? 'প্রদর্শনের নাম' : 'Display Name'}</Label>
                    <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-1 bg-background" />
                </div>
                <div className="mt-4">
                    <Label htmlFor="emailDisplay">{language === 'bn' ? 'ইমেইল (অপরিবর্তনযোগ্য)' : 'Email (Cannot change)'}</Label>
                    <Input id="emailDisplay" type="email" defaultValue={currentUser.email} className="mt-1 bg-background" readOnly disabled />
                </div>
                {currentUser.phoneNumber && (
                    <div className="mt-4">
                        <Label htmlFor="phoneDisplay">{language === 'bn' ? 'ফোন (অপরিবর্তনযোগ্য)' : 'Phone (Cannot change)'}</Label>
                        <div className="flex items-center mt-1">
                            <Phone className="mr-2 h-4 w-4 text-muted-foreground"/>
                            <Input id="phoneDisplay" type="tel" defaultValue={currentUser.phoneNumber} className="bg-background" readOnly disabled />
                        </div>
                    </div>
                )}
                 <Button type="submit" className="mt-6" disabled={isSubmittingProfile}>
                    {isSubmittingProfile ? (language === 'bn' ? 'সংরক্ষণ করা হচ্ছে...' : 'Saving...') : (language === 'bn' ? 'প্রোফাইল সংরক্ষণ' : 'Save Profile')}
                </Button>
            </Card>
        </form>

        {/* Wallet Balance Display */}
        <Card className="p-6">
            <CardTitle className="text-xl mb-2 flex items-center"><Wallet className="mr-2 h-5 w-5 text-primary"/>{language === 'bn' ? 'ওয়ালেট ব্যালেন্স' : 'Wallet Balance'}</CardTitle>
            <p className="text-3xl font-bold text-gold">
                {currentUser.walletBalance.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US', { style: 'currency', currency: 'BDT', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
        </Card>


        {/* Password Change */}
        {currentUser.signupMethod === 'email' && (
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <Card className="p-6">
                <CardTitle className="text-xl mb-4 flex items-center"><KeyRound className="mr-2 h-5 w-5 text-primary"/>{language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password'}</CardTitle>
                <div>
                    <Label htmlFor="currentPassword">{language === 'bn' ? 'বর্তমান পাসওয়ার্ড' : 'Current Password'}</Label>
                    <Input id="currentPassword" type="password" placeholder="********" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="mt-1 bg-background" required/>
                </div>
                <div>
                    <Label htmlFor="newPassword">{language === 'bn' ? 'নতুন পাসওয়ার্ড' : 'New Password'}</Label>
                    <Input id="newPassword" type="password" placeholder={language === 'bn' ? 'নতুন পাসওয়ার্ড দিন' : 'Enter new password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="mt-1 bg-background" required/>
                </div>
                 <div>
                    <Label htmlFor="confirmNewPassword">{language === 'bn' ? 'নতুন পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm New Password'}</Label>
                    <Input id="confirmNewPassword" type="password" placeholder={language === 'bn' ? 'আবার নতুন পাসওয়ার্ড দিন' : 'Re-enter new password'} value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} className="mt-1 bg-background" required/>
                </div>
                <Button type="submit" className="mt-6" disabled={isSubmittingPassword}>
                    {isSubmittingPassword ? (language === 'bn' ? 'পরিবর্তন করা হচ্ছে...' : 'Changing...') : (language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন করুন' : 'Change Password')}
                </Button>
            </Card>
          </form>
        )}

        {/* KYC Section */}
        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl flex items-center">
              <kycInfo.icon className={`mr-2 h-5 w-5 text-${kycInfo.variant === 'default' ? 'primary' : kycInfo.variant === 'destructive' ? 'destructive' : 'muted-foreground'}`} />
              {language === 'bn' ? 'কেওয়াইসি ভেরিফিকেশন' : 'KYC Verification'}
            </CardTitle>
            <CardDescription className="mt-1">
               {language === 'bn' ? 'আপনার অ্যাকাউন্ট যাচাই করে অতিরিক্ত সুবিধা আনলক করুন।' : 'Verify your account to unlock additional benefits.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
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
                <p className="text-sm text-primary">
                    {language === 'bn' ? 'আপনার অ্যাকাউন্ট সম্পূর্ণভাবে যাচাই করা হয়েছে।' : 'Your account is fully verified.'}
                </p>
            )}
          </CardContent>
        </Card>

      </CardContent>
    </Card>
  );
}

