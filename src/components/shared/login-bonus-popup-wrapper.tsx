
"use client";

import { useState, useEffect } from 'react';
import { LoginBonusPopup } from './login-bonus-popup';
import { useAuth } from '@/context/auth-context';

const LOGIN_BONUS_FLAG_KEY = 'showLoginBonusPopup';

export default function LoginBonusPopupWrapper() {
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && currentUser) {
      const shouldShowBonus = localStorage.getItem(LOGIN_BONUS_FLAG_KEY) === 'true';
      
      if (shouldShowBonus) {
        setShowPopup(true);
        localStorage.removeItem(LOGIN_BONUS_FLAG_KEY); // Ensure it's shown only once per flag set
      }
    }
  }, [isClient, currentUser]);

  const handleClosePopup = () => {
    setShowPopup(false);
    // No need to set flag again here, it's a one-time popup per login based on flag
  };
  
  if (!isClient || !currentUser) return null;

  return <LoginBonusPopup isOpen={showPopup} onClose={handleClosePopup} />;
}
