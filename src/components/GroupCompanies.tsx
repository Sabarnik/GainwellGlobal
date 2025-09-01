// components/GroupCompaniesSection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  color: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function GroupCompaniesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const companies: Company[] = [
    {
      id: 1,
      name: 'Gainwell CAT',
      logo: `${basePath}/team1.png`,
      description: 'With over 80 years of experience, provides integrated solutions for Cat construction, mining, and power equipment.',
      website: 'https://www.gainwellindia.com/cat',
      color: 'from-[#3A55A5] to-[#4A6BC5]',
    },
    {
      id: 2,
      name: 'Acceleron Solutions',
      logo: `${basePath}/team4.png`,
      description: 'Gainwell Group\'s tech arm that offers software support, IT infrastructure, cloud services, and cybersecurity.',
      website: 'https://www.acceleronsolutions.com',
      color: 'from-[#F5872E] to-[#FFA057]',
    },
    {
      id: 3,
      name: 'TIL Limited',
      logo: `${basePath}/team2.png`,
      description: 'Supports India\'s infrastructure with advanced material handling and lifting solutions.',
      website: 'https://www.tillimited.com',
      color: 'from-[#40A748] to-[#50C758]',
    },
    {
      id: 4,
      name: 'Gainwell Engineering',
      logo: `${basePath}/team3.png`,
      description: 'Part of Gainwell Group, engaged in manufacturing of capital goods in mining, railways and other heavy industry sectors.',
      website: 'https://www.gainwellengineering.com',
      color: 'from-[#3ABEEE] to-[#4AD0FF]',
    },
    {
      id: 5,
      name: 'Tractors Nepal',
      logo: `${basePath}/team5.png`,
      description: 'A subsidiary of Gainwell Commosales Pvt. Ltd., with over 20 years of experience in servicing Cat equipment in Nepal.',
      website: 'https://www.tractorsnepal.com',
      color: 'from-[#405A2A] to-[#318741]',
    },
    {
      id: 6,
      name: 'Tulip Compression',
      logo: `${basePath}/team6.png`,
      description: 'A subsidiary of Gainwell Commosales Pvt. Ltd., with over 20 years of experience in servicing Cat equipment in Nepal.',
      website: 'https://www.tulipcompression.com',
      color: 'from-[#405A2A] to-[#318741]',
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="group-companies"
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#3A55A5]/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#F5872E]/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#3A55A5]/20 to-[#F5872E]/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#08193C] mb-4 relative inline-block">
            <span className="relative z-10">Our Group Companies</span>
            <span className={`absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transform origin-left transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
          </h2>
          <p className="mt-4 text-lg text-[#3A55A5] max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            A diverse portfolio of companies working together to deliver comprehensive solutions
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {companies.map((company, index) => (
            <div
              key={company.id}
              className={`relative group transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="relative bg-white rounded-2xl p-8 h-full flex flex-col items-center text-center transition-all duration-500 group-hover:transform group-hover:scale-105 group-hover:shadow-2xl border border-gray-100 group-hover:border-transparent">
                  
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${company.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>
                  
                  {/* Company Logo - Circular container */}
                  <div className="relative w-48 h-48 mb-6 transition-all duration-500 group-hover:scale-110">
                    <div className="absolute inset-0 rounded-full bg-gray-100/50 group-hover:bg-gray-100/80 transition-colors duration-500 -z-10"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        className="object-contain p-4 transition-all duration-500 group-hover:drop-shadow-xl"
                        sizes="(max-width: 768px) 192px, 240px"
                      />
                    </div>
                  </div>

                  {/* Company Name with animated underline */}
                  <h3 className="text-xl font-bold text-[#08193C] mb-4 relative">
                    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#08193C] to-[#3A55A5] group-hover:from-[#F5872E] group-hover:to-[#3A55A5] transition-all duration-500">
                      {company.name}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] transition-all duration-500 group-hover:w-full"></span>
                  </h3>

                  {/* Description that appears on hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-96 transition-all duration-500">
                    <p className="text-gray-600 text-sm leading-relaxed mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {company.description}
                    </p>
                  </div>

                  {/* Visit website hint */}
                  <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <span className="text-xs text-[#3A55A5] font-medium mr-1">Visit website</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#3A55A5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}