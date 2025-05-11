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
import { Gift, X } from "lucide-react";
import Image from 'next/image';

interface DailySpinPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DailySpinPopup({ isOpen, onClose }: DailySpinPopupProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  const handleSpin = () => {
    // Placeholder for spin logic
    alert("Spinning the wheel! You won a bonus!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-primary shadow-xl rounded-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full inline-block">
            <Gift className="h-12 w-12 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary">Your Daily Spin!</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Spin the wheel for a chance to win exciting bonuses and free spins. Good luck!
          </DialogDescription>
        </DialogHeader>
        <div className="py-8 flex justify-center items-center">
          {/* Placeholder for a spin wheel graphic */}
          <div className="relative w-64 h-64">
            <Image 
              src="https://picsum.photos/300/300?random=2" 
              alt="Spin Wheel" 
              layout="fill" 
              objectFit="contain" 
              className="rounded-full"
              data-ai-hint="colorful wheel"
            />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-foreground rounded-full border-4 border-card transform -translate-y-1/2 top-0 left-1/2 -translate-x-1/2 rotate-45 origin-center" style={{clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", top: "calc(50% - 1.5rem)"}}></div>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button type="button" onClick={handleSpin} size="lg" className="w-full sm:w-auto">
            Spin Now!
          </Button>
        </DialogFooter>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
