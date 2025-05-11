
"use client";

import { useState, useEffect } from 'react';
import { DailySpinPopup } from './daily-spin-popup';
import { useAuth } from '@/context/auth-context'; // Import useAuth

const LAST_VISIT_KEY = 'bajibuz_last_daily_spin_visit';
const SHOW_WELCOME_SPIN_KEY = 'showWelcomeSpin';

export default function DailySpinPopupWrapper() {
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { currentUser } = useAuth(); // Get current user from AuthContext

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && currentUser) { // Only proceed if client-side and user is logged in
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
      const shouldShowWelcomeSpin = localStorage.getItem(SHOW_WELCOME_SPIN_KEY) === 'true';

      if (shouldShowWelcomeSpin) {
        setShowPopup(true);
        localStorage.removeItem(SHOW_WELCOME_SPIN_KEY); // Show once
        localStorage.setItem(LAST_VISIT_KEY, today); // Also mark as visited today
      } else if (lastVisit !== today) {
        // Standard daily visit logic (user is logged in)
        setShowPopup(true);
      }
    } else if (isClient && !currentUser) {
        // If user logs out, ensure popup doesn't show based on old localStorage
        setShowPopup(false);
    }
  }, [isClient, currentUser]);

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
