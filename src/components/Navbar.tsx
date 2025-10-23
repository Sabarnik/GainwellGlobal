// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking on a nav link
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      
      if (isMenuOpen && mobileMenu && mobileMenuButton && 
          !mobileMenu.contains(event.target as Node) && 
          !mobileMenuButton.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <header 
      id="site-header" 
      className="w-full bg-white shadow-md transition-all duration-300"
    >
      <div className="container max-w-7xl mx-auto px-4">
        {/* Reduced padding from py-4 to py-3 to make navbar thinner */}
        <nav className="flex justify-between items-center py-3">
          <Link 
            href="/" 
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
              href="/"  // Home page
              className="nav-link text-[15px] font-semibold tracking-wider text-gray-800 hover:text-primary"
            >
              HOME
            </Link>
            <Link 
              href="/our-team"  // Our Team page
              className="nav-link text-[15px] font-semibold tracking-wider text-gray-800 hover:text-primary"
            >
              OUR TEAM
            </Link>
            <Link 
              href="/#industry"  // Home page with industry section hash
              className="nav-link text-[15px] font-semibold tracking-wider text-gray-800 hover:text-primary"
            >
              BUSINESS
            </Link>
            <Link 
              href="/#csr-grid"  // Home page with CSR section hash
              className="nav-link text-[15px] font-semibold tracking-wider text-gray-800 hover:text-primary"
            >
              COMMUNITY WORK
            </Link>
          </div>

          <button 
            id="mobile-menu-button" 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`lg:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ top: '73px' }} // Adjust based on your navbar height
        >
          <div className="flex flex-col items-center justify-start space-y-8 pt-10">
            <Link 
              href="/"
              className="text-lg font-semibold tracking-wider text-gray-800 hover:text-primary"
              onClick={handleNavClick}
            >
              HOME
            </Link>
            <Link 
              href="/our-team"
              className="text-lg font-semibold tracking-wider text-gray-800 hover:text-primary"
              onClick={handleNavClick}
            >
              OUR TEAM
            </Link>
            <Link 
              href="/#industry"
              className="text-lg font-semibold tracking-wider text-gray-800 hover:text-primary"
              onClick={handleNavClick}
            >
              BUSINESS
            </Link>
            <Link 
              href="/#csr-grid"
              className="text-lg font-semibold tracking-wider text-gray-800 hover:text-primary"
              onClick={handleNavClick}
            >
              COMMUNITY WORK
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}