'use client';
import { cva } from 'class-variance-authority';
import { ReactNode, useEffect, useState } from 'react';

const ScrollContainer = ({ children }: { children: ReactNode }) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full flex items-center justify-between z-10 fixed transition-all duration-300 ${cva(
        scrolling && 'bg-[#141414]'
      )}`}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
