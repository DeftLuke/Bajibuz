"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    imageUrl: `/${id}.jpg`,
  };
});

export default function PromotionalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient) return;
    const timer = setTimeout(() => handleNext(), 7000);
    return () => clearTimeout(timer);
  }, [currentIndex, isClient]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slide = slides[currentIndex];

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-[400px] rounded-xl overflow-hidden shadow-2xl group">
      <Image
        key={slide.id}
        src={slide.imageUrl}
        alt={`Slide ${slide.id}`}
        layout="fill"
        objectFit="cover"
        priority
        sizes="100vw"
        className="transition-opacity duration-1000 ease-in-out opacity-80"
      />
    </div>
  );
}
