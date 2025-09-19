// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Navbar() {
  return (
    <header 
      id="site-header" 
      className="w-full bg-white shadow-md transition-all duration-300"
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
              className="nav-link text-[15px] font-semibold tracking-wider text-gray-800 hover:text-primary"
            >
              HOME
            </Link>
            <Link 
              href="#about-us"  // Changed to match AboutUsSection ID
              className="nav-link text-[15px] font-semibold tracking-wider text-gray-800 hover:text-primary"
            >
              ABOUT US
            </Link>
            <Link 
              href="#industry"  // Changed to match IndustryCarousel section
              className="nav-link text-[15px] font-semibold tracking-wider text-gray-800 hover:text-primary"
            >
              BUSINESS
            </Link>
            <Link 
              href="#csr-grid"  // Changed to match CSRSection ID
              className="nav-link text-[15px] font-semibold tracking-wider text-gray-800 hover:text-primary"
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