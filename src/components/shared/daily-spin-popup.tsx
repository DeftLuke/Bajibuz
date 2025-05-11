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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  const handleSpin = () => {
    // Placeholder for spin logic
    alert("চাকা ঘুরছে! আপনি একটি বোনাস জিতেছেন! (Spinning the wheel! You won a bonus!)");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-card border-primary shadow-xl rounded-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full inline-block">
            <Gift className="h-12 w-12 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary">আপনার দৈনিক স্পিন! (Your Daily Spin!)</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            চাকা ঘুরিয়ে আকর্ষণীয় বোনাস এবং ফ্রি স্পিন জেতার সুযোগ নিন। শুভকামনা! (Spin the wheel for a chance to win exciting bonuses and free spins. Good luck!)
          </DialogDescription>
        </DialogHeader>
        <div className="py-8 flex justify-center items-center">
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
                {/* Simplified Pointer */}
                <div 
                    className="w-0 h-0 
                    border-l-[10px] border-l-transparent
                    border-r-[10px] border-r-transparent
                    border-t-[20px] border-t-primary transform -translate-y-full top-[calc(50%-10px)]"
                    style={{ left: 'calc(50% - 10px)'}}
                ></div>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button type="button" onClick={handleSpin} size="lg" className="w-full sm:w-auto">
            এখনই স্পিন করুন! (Spin Now!)
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
