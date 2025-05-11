
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Coins, Gift, PartyPopper, X } from "lucide-react";
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import { updateUserDocument } from '@/lib/firebase/auth';
import MoneyFallAnimation from './money-fall-animation'; // Create this component

interface LoginBonusPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to get a random bonus amount
const getRandomBonus = (): number => {
  const randomNumber = Math.random() * 100; // 0 to 99.99...
  if (randomNumber < 1) { // 1% chance for 10,000 BDT
    return 10000;
  }
  // Remaining 99% for smaller amounts
  const smallBonusOptions = [10, 50, 100, 200, 500, 1000];
  return smallBonusOptions[Math.floor(Math.random() * smallBonusOptions.length)];
};

export function LoginBonusPopup({ isOpen, onClose }: LoginBonusPopupProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { language } = useLanguage();
  const { currentUser, updateCurrentUserProfile } = useAuth();
  const [bonusAmount, setBonusAmount] = useState(0);
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [showMoneyFall, setShowMoneyFall] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen && !bonusClaimed) {
      setBonusAmount(getRandomBonus());
    }
  }, [isOpen, bonusClaimed]);

  if (!isMounted) {
    return null; 
  }

  const handleClaimBonus = async () => {
    if (!currentUser || bonusClaimed) return;

    const newBalance = currentUser.walletBalance + bonusAmount;
    try {
      // Update Firestore and then context
      await updateUserDocument(currentUser.uid, { walletBalance: newBalance });
      // Update context immediately for UI responsiveness
      updateCurrentUserProfile({ walletBalance: newBalance }); 
      
      setBonusClaimed(true);
      setShowMoneyFall(true); // Trigger animation

      // Vibrate phone
      if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate([200, 100, 200]); // Vibrate pattern
      }
      
      // Automatically close popup and animation after a delay
      setTimeout(() => {
        setShowMoneyFall(false);
        onClose();
      }, 4000); // Animation duration + a bit more

    } catch (error) {
      console.error("Error claiming bonus:", error);
      // Handle error (e.g., show toast)
    }
  };

  return (
    <>
      {showMoneyFall && <MoneyFallAnimation duration={3000} />}
      <Dialog open={isOpen && !bonusClaimed} onOpenChange={(open) => { if (!open && !bonusClaimed) onClose(); }}>
        <DialogContent className="sm:max-w-md bg-card border-primary shadow-xl rounded-lg">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full inline-block">
              <PartyPopper className="h-12 w-12 text-primary animate-bounce" />
            </div>
            <DialogTitle className="text-2xl font-bold text-primary">
              {language === 'bn' ? 'অভিনন্দন!' : 'Congratulations!'}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {language === 'bn' 
                ? `আপনি একটি লগইন বোনাস জিতেছেন! আপনার অ্যাকাউন্টে ${bonusAmount.toLocaleString('bn-BD')} টাকা যোগ করা হবে।` 
                : `You've won a login bonus! BDT ${bonusAmount.toLocaleString('en-US')} will be added to your account.`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 text-center">
            <p className="text-5xl font-bold text-gold flex items-center justify-center">
              <Coins className="mr-3 h-12 w-12" />
              {bonusAmount.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
            </p>
            <p className="text-lg text-muted-foreground">BDT</p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button 
              type="button" 
              onClick={handleClaimBonus} 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-primary-accent text-primary-foreground hover:opacity-90"
              disabled={bonusClaimed}
            >
              <Gift className="mr-2 h-5 w-5" />
              {language === 'bn' ? 'বোনাস সংগ্রহ করুন!' : 'Claim Your Bonus!'}
            </Button>
          </DialogFooter>
          {!bonusClaimed && (
             <button
                onClick={onClose}
                aria-label={language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
                <X className="h-5 w-5" />
            </button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
