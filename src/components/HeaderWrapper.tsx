// components/HeaderWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';

export default function HeaderWrapper() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      // Hide header when scrolling down, show when scrolling up
      if (currentScroll > lastScroll && currentScroll > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <div 
      id="header-wrapper" 
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${isHidden ? '-translate-y-full' : ''}`}
    >
      <Topbar />
      <Navbar />
    </div>
  );
}