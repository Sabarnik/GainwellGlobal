// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      id="site-header" 
      className={`w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
    >
      <div className="container max-w-7xl mx-auto px-4">
        {/* Reduced padding from py-4 to py-3 to make navbar thinner */}
        <nav className="flex justify-between items-center py-3">
          <Link 
            href="#" 
            className="text-2xl font-bold flex items-center space-x-2"
            style={{ 
              background: '',
              borderRadius: '12px' 
            }}
          >
            <Image 
              src={`${basePath}/logo-hdr.png`} 
              alt="Logo" 
              width={120} 
              height={40} 
              className="h-16 w-auto"
            />
          </Link>

          <div className="hidden lg:flex space-x-8">
            <Link 
              href="#home"
              className={`nav-link text-[15px] font-semibold tracking-wider hover:text-primary ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              HOME
            </Link>
            <Link 
              href="#about"
              className={`nav-link text-[15px] font-semibold tracking-wider hover:text-primary ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              ABOUT US
            </Link>
            <Link 
              href="#business"
              className={`nav-link text-[15px] font-semibold tracking-wider hover:text-primary ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              BUSINESS
            </Link>
            <Link 
              href="#csr"
              className={`nav-link text-[15px] font-semibold tracking-wider hover:text-primary ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              COMMUNITY WORK
            </Link>
          </div>

          <button id="mobile-menu-button" className="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}