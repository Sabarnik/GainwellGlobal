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
  const [hoveredCompany, setHoveredCompany] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const companies: Company[] = [
    {
      id: 1,
      name: 'Gainwell CAT',
      logo: `${basePath}/team1.png`,
      description:
        'With over 80 years of experience, provides integrated solutions for Cat construction, mining, and power equipment.',
      website: 'https://www.gainwellindia.com/cat',
      color: 'from-[#3A55A5] to-[#4A6BC5]',
    },
    {
      id: 2,
      name: 'Gainwell Engineering',
      logo: `${basePath}/team3.png`,
      description:
        'Part of Gainwell Group, engaged in manufacturing of capital goods in mining, railways and other heavy industry sectors.',
      website: 'https://www.gainwellengineering.com/index-india.html',
      color: 'from-[#3ABEEE] to-[#4AD0FF]',
    },
    {
      id: 3,
      name: 'TIL Limited',
      logo: `${basePath}/tilIndia.png`,
      description:
        "Supports India's infrastructure with advanced material handling and lifting solutions.",
      website: 'https://tilindia.in/',
      color: 'from-[#40A748] to-[#50C758]',
    },
    {
      id: 4,
      name: 'Tulip Compression',
      logo: `${basePath}/team6.png`,
      description:
        'Specializes in industrial compression solutions and services for various sectors including energy and manufacturing.',
      website: 'https://www.tulipcompression.com/about-us.html',
      color: 'from-[#405A2A] to-[#318741]',
    },
    {
      id: 5,
      name: 'Resurgent',
      logo: `${basePath}/resurgent.png`,
      description:
        'Resurgent Mining is at the forefront of providing innovative services to the mining and infrastructure sectors',
      website: 'https://resurgentmining.com/',
      color: 'from-[#8B4513] to-[#A0522D]',
    },
    {
      id: 6,
      name: 'Acceleron Solutions',
      logo: `${basePath}/acceleron1.png`,
      description:
        "Gainwell Group's tech arm that offers software support, IT infrastructure, cloud services, and cybersecurity.",
      website: 'https://acceleronsolutions.io/',
      color: 'from-[#F5872E] to-[#FFA057]',
    },
    {
      id: 7,
      name: 'Gainwell Trucking',
      logo: `${basePath}/final-logo-gainwell.png`,
      description:
        'Part of the Gainwell Group, GTPL (Gainwell Trucking Private Limited), an authorized channel partner for BharatBenz mining trucks, bringing world-class trucking solutions to the mining and infrastructure sectors.',
      website: 'https://www.gainwelltrucking.com',
      color: 'from-[#8B4513] to-[#A0522D]',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;

    if (currentSection) observer.observe(currentSection);
    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  return (
    <section
      id="group-companies"
      ref={sectionRef}
      className="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-visible"
    >
      {/* Background decorations */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#08193C] mb-4 relative inline-block">
            <span className="relative z-10">Our Group Companies</span>
            <span
              className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${
                isVisible ? 'scale-x-100' : 'scale-x-0'
              }`}
            ></span>
          </h2>
          <p className="mt-4 text-lg text-[#3A55A5] max-w-2xl mx-auto">
            A diverse portfolio of companies working together to deliver comprehensive solutions
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-20">
          {companies.map((company, index) => (
            <div
              key={company.id}
              className={`relative group transition-all duration-700 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${company.id === 7 ? 'md:col-start-2' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCompany(company.id)}
              onMouseLeave={() => setHoveredCompany(null)}
            >
              <Link href={company.website} target="_blank" rel="noopener noreferrer">
                <div className="relative flex flex-col items-center transition-all duration-300 group-hover:scale-105">
                  {/* Logo Container - Square */}
                  <div className="relative w-36 h-36 md:w-44 md:h-44 transition-all duration-300 group-hover:scale-110">
                    <div
                      className={`absolute inset-0 rounded-lg bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}
                    ></div>
                    <div className="absolute inset-0 rounded-lg bg-gray-100/50 group-hover:bg-gray-100/80 transition-colors duration-300 -z-10"></div>
                    <div className="relative w-full h-full rounded-lg overflow-hidden p-4">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        className="object-contain transition-all duration-300 group-hover:drop-shadow-xl"
                        sizes="(max-width: 768px) 144px, 176px"
                      />
                    </div>
                  </div>

                  {/* Description Dropdown - No Company Name Heading */}
                  <div
                    className={`
                    w-full mt-2 overflow-hidden transition-all duration-500 ease-in-out
                    ${
                      hoveredCompany === company.id
                        ? 'max-h-32 opacity-100 translate-y-0'
                        : 'max-h-0 opacity-0 -translate-y-2'
                    }
                  `}
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-200/50">
                      <p className="text-sm text-gray-700 text-center leading-relaxed">
                        {company.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
        }
        .group:hover .z-50 {
          z-index: 60 !important;
        }
      `}</style>
    </section>
  );
}