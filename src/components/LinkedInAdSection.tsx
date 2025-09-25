// components/LinkedInAdSection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function LinkedInAdSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Achievement post data
  const achievementPost = {
    title: 'Gainwell Group is proud to be recognised by Outlook Business as one of the contributors to India’s $5 Trillion Economy',
    description:
      'In a special feature, our Chairman, Sunil Chaturvedi, shares how Gainwell’s journey is inspired by the Four Ps — Purpose, People, Planet, and Profit — driving us to create impact beyond machines and play our part in shaping a self-reliant, future-ready India.',
    image: `${basePath}/bannerLinkedIn.jpeg`, // ensure this is in your public/ folder
    link: 'https://www.linkedin.com/posts/gainwell-engineering_gainwellgroup-gainwellengineering-visionaryleadership-ugcPost-7363191011814100993-pLnK/?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAEqyxwBjGL7_X0qxS784eUGgZXr4ny71Bg&utm_campaign=whatsapp',
    cta: 'See Post on LinkedIn',
  };

  // Brand colors
  const brandColors = {
    primary: '#F5872E',
    secondary: '#3A55A5',
    accent: '#40A748',
  };

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (currentSection) observer.observe(currentSection);
    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative my-8 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-0 transition-all duration-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Left Panel - Square Image Box */}
          <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
            <Image
              src={achievementPost.image}
              alt="Gainwell Group Achievement - Visionaries of $5 Trillion Economy"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Achievement Badge */}
            <div
              className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md shadow-sm text-xs font-bold flex items-center"
              style={{ color: brandColors.primary }}
            >
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              MILESTONE
            </div>

            {/* LinkedIn Logo Overlay */}
            <div className="absolute bottom-3 right-3 bg-[#0077B5] p-1 rounded">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div className="p-6 flex flex-col justify-center rounded-b-lg md:rounded-r-lg md:rounded-bl-none">

            {/* Title */}
            <h3
              className="text-lg font-bold text-gray-900 mb-2 leading-tight"
              style={{ fontFamily: 'DIN Pro, Arial, sans-serif' }}
            >
              {achievementPost.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {achievementPost.description}
            </p>

            {/* CTA Button */}
            <a
              href={achievementPost.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md transition-all duration-200 hover:shadow-md w-fit"
              style={{ backgroundColor: brandColors.primary }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  'translateY(-1px)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  '#e07a2e';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  brandColors.primary;
              }}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {achievementPost.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
