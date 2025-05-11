"use client";

import { useState, useEffect } from 'react';
import { DailySpinPopup } from './daily-spin-popup';

const LAST_VISIT_KEY = 'bajibuz_last_daily_spin_visit';

export default function DailySpinPopupWrapper() {
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

      if (lastVisit !== today) {
        // For demo purposes, always show if it's the first time or different day
        // In a real app, you might have more complex logic (e.g., user logged in, eligible for spin)
        setShowPopup(true);
      }
    }
  }, [isClient]);

  const handleClosePopup = () => {
    setShowPopup(false);
    if (isClient) {
      const today = new Date().toDateString();
      localStorage.setItem(LAST_VISIT_KEY, today);
    }
  };
  
  if (!isClient) return null; // Avoid rendering on server if it depends on localStorage

  return <DailySpinPopup isOpen={showPopup} onClose={handleClosePopup} />;
}
