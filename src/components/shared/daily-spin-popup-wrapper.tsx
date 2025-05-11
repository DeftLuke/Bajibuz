"use client";

import { useState, useEffect } from 'react';
import { DailySpinPopup } from './daily-spin-popup';

const LAST_VISIT_KEY = 'deshispin_last_daily_spin_visit';

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
  
  if (!isClient) return null;

  return <DailySpinPopup isOpen={showPopup} onClose={handleClosePopup} />;
}
