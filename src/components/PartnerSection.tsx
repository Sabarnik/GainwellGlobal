// components/PartnersSection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Partner {
  id: number;
  name: string;
  logo: string;
  website: string;
}
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export default function PartnersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const partners: Partner[] = [
    { id: 1, name: 'Caterpillar', logo: `${basePath}/partner1.jpeg`, website: 'https://www.caterpillar.com' },
    { id: 2, name: 'FG Wilson', logo: `${basePath}/partner2.jpg`, website: 'https://www.fgwilson.com' },
    { id: 3, name: 'SEM', logo: `${basePath}/partner3.png`, website: 'https://www.semmachinery.com' },
    { id: 4, name: 'STECH', logo: `${basePath}/partner4.png`, website: 'https://www.stechindia.com' },
    { id: 5, name: 'Tulip', logo: `${basePath}/partner5.jpg`, website: 'https://www.tulipcompression.com' },
    { id: 6, name: 'Lintec & Linnhoff', logo: `${basePath}/partner6.png`, website: 'https://www.lintec-linnhoff.com' },
  ];
  // Intersection Observer for scroll animations
  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);


  // Duplicate partners for seamless animation
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.1)_100%)]"></div>
      </div>

      {/* Gradient Lines Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-[#F5872E]/30 to-transparent transform -skew-y-12 transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}></div>
        <div className={`absolute top-1/2 right-0 w-1/3 h-1 bg-gradient-to-l from-transparent via-[#3A55A5]/30 to-transparent transform skew-y-12 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#40A748]/20 to-transparent transform transition-all duration-1000 delay-500 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#08193C] relative inline-block">
            <span className="relative">
              Our Valued Partners
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#3A55A5] max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            Collaborating with global leaders to deliver exceptional solutions
          </p>
        </div>

        {/* Partners Logos Stream */}
        <div className="relative w-full overflow-hidden h-32">
          <div
            className={`flex absolute left-0 top-0 h-full items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              animation: 'scroll 30s linear infinite',
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 mx-8 h-20 w-40 relative transition-all duration-300 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 hover:scale-110"
              >
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 160px, 200px"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>

      {/* Add subtle background elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>
    </section>
  );
}