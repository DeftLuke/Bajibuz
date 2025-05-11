
"use client";
import { useEffect, useState } from 'react';
import { Coins, Landmark } from 'lucide-react'; // Using Landmark for notes aspect

interface MoneyFallAnimationProps {
  duration?: number; // Duration in milliseconds
  itemCount?: number;
}

const MoneyFallAnimation: React.FC<MoneyFallAnimationProps> = ({ duration = 3000, itemCount = 20 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) {
    return null;
  }

  const items = Array.from({ length: itemCount }).map((_, index) => {
    const type = Math.random() > 0.5 ? 'coin' : 'note';
    const style = {
      left: `${Math.random() * 95}%`, // Spread across the width
      animationDelay: `${Math.random() * (duration / 2000)}s`, // Stagger start times
      animationDuration: `${2 + Math.random() * 2}s`, // Vary fall speed
      transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.8})`, // Random rotation and size
    };
    return type === 'coin' ? (
      <Coins
        key={`coin-${index}`}
        className="money-item text-gold"
        style={style}
        size={Math.random() > 0.5 ? 24 : 32}
      />
    ) : (
      <Landmark // Using Landmark as a placeholder for a note icon
        key={`note-${index}`}
        className="money-item text-primary"
        style={{...style, opacity: 0.7}}
        size={Math.random() > 0.5 ? 30 : 40}
      />
    );
  });

  return (
    <div className="money-fall-container fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {items}
      <style jsx>{`
        .money-fall-container {
          // Container styling if needed
        }
        .money-item {
          position: absolute;
          top: -50px; /* Start above the screen */
          animation-name: fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        @keyframes fall {
          0% {
            top: -50px;
            opacity: 1;
          }
          100% {
            top: 100vh; /* Fall to the bottom */
            opacity: 0.8;
          }
        }
        /* For text-gold if not globally defined */
        .text-gold { color: #FFD700; } 
      `}</style>
    </div>
  );
};

export default MoneyFallAnimation;
