// components/Topbar.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // change after slight scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="topbar"
      className={`w-full transition-all duration-300 ${
        scrolled ? "bg-white text-blue shadow" : "bg-transparent text-white"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 py-2 flex justify-end items-center text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4 items-center">
            <Link
              href="mailto:marketing@gainwellindia.com"
              // Added explicit text color classes
              className={`flex items-center space-x-2 hover:underline ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>marketing@gainwellindia.com</span>
            </Link>
            <span className={`hidden sm:inline ${scrolled ? "text-gray-800" : "text-white"}`}>|</span>
            <Link
              href="tel:+91 1800 419 3356"
              // Added explicit text color classes
              className={`flex items-center space-x-2 hover:underline ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>1800 419 3356</span>
            </Link>
          </div>

          <span className={`hidden sm:inline ${scrolled ? "text-gray-800" : "text-white"}`}>|</span>

        </div>
      </div>
    </div>
  );
}