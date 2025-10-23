// components/OurValues.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

type Pillar = {
  key: string;
  title: string;
  description: string;
  color: string;
  textColor: string;
  iconSrc: string;
};

export default function OurValues() {
  const [isVisible, setIsVisible] = useState(false);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // ======= UPDATE IMAGE PATHS AS NEEDED =========
  const RING_SRC = `${basePath}/culture.jpg`;
  const PILLAR_ICONS = {
    excellence: `${basePath}/Excellence.png`,
    entrepreneurship: `${basePath}/Entrepreneurship.png`,
    collaboration: `${basePath}/Collaboration.png`,
    customerCentricity: `${basePath}/Customer Centricity.png`,
    caring: `${basePath}/Caring.png`,
  };

  // ======= Pillars data (5) =======
  const pillars: Pillar[] = [
    {
      key: 'customer-centricity',
      title: 'Customer Centricity',
      description: 'Creating superior customer relationship to drive business sustainability',
      color: 'bg-[#0DA8D6]',
      textColor: 'text-white',
      iconSrc: PILLAR_ICONS.customerCentricity,
    },
    {
      key: 'collaboration',
      title: 'Collaboration',
      description: 'Working in a team to achieve common goal',
      color: 'bg-[#F58A2E]',
      textColor: 'text-white',
      iconSrc: PILLAR_ICONS.collaboration,
    },
    {
      key: 'caring',
      title: 'Caring',
      description: 'A positive workplace with respect, empathy and well-being for others',
      color: 'bg-[#5BC65A]',
      textColor: 'text-white',
      iconSrc: PILLAR_ICONS.caring,
    },
    {
      key: 'entrepreneurship',
      title: 'Entrepreneurship',
      description: 'Providing an empowering environment to facilitate independence and decision making',
      color: 'bg-[#E84A45]',
      textColor: 'text-white',
      iconSrc: PILLAR_ICONS.entrepreneurship,
    },
    {
      key: 'excellence',
      title: 'Excellence',
      description: 'Adding value to every activity to achieve a higher standards across the organisation',
      color: 'bg-[#7B3FA2]',
      textColor: 'text-white',
      iconSrc: PILLAR_ICONS.excellence,
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const current = sectionRef.current;
    if (!current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="values"
      ref={sectionRef}
      className="relative py-12 md:py-20 bg-gradient-to-b from-white to-gray-50/30 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.1)_100%)]"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#08193C] relative inline-block">
            <span className="relative">
              Our Core Values
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 md:mt-8 text-lg sm:text-xl text-[#3A55A5] max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ease-out px-4">
            {/* These pillars reflect how we operate every day — guiding behaviour, decisions, and outcomes. */}
          </p>
        </div>

        <div
          className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-12 lg:gap-16 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* LEFT: Reduced size ring graphic */}
          <div className="w-full lg:w-2/5 flex flex-col items-center gap-6 md:gap-8">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full shadow-xl md:shadow-2xl overflow-hidden border-6 md:border-8 border-white/80">
              <Image
                src={RING_SRC}
                alt="Culture ring"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 240px, 288px"
                priority
              />
            </div>
            
            {/* Simple p tag below image */}
            <p className={`text-base md:text-lg lg:text-xl text-[#3A55A5] text-center max-w-md leading-relaxed transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] px-4 ${
              isVisible ? 'translate-x-0 opacity-100 delay-800' : '-translate-x-10 opacity-0'
            }`}>
              We shall always be preferred partner to all our customers for providing innovative, diverse and sustainable solutions aimed at creating value for our stakeholders and the society at large.
            </p>
          </div>

          {/* RIGHT: 5 pillars - Horizontal on desktop, vertical on mobile */}
          <div className="w-full lg:w-3/5">
            {/* Mobile: Vertical stack with tap to expand */}
            <div className="lg:hidden space-y-4">
              {pillars.map((p, idx) => (
                <div
                  key={p.key}
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden transition-all duration-500 ease-out ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                  onClick={() => setActivePillar(activePillar === p.key ? null : p.key)}
                >
                  <div className="flex items-center p-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${p.color}`}>
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <Image
                          src={p.iconSrc}
                          alt={`${p.title} icon`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-[#08193C] flex-1">
                      {p.title}
                    </h4>
                    <div className={`transform transition-transform duration-300 ${
                      activePillar === p.key ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-5 h-5 text-[#3A55A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Mobile expanded content */}
                  <div className={`transition-all duration-500 ease-out overflow-hidden ${
                    activePillar === p.key ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="p-4 border-t border-gray-200/60">
                      <p className="text-sm text-[#3A55A5] leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Horizontal expanding pillars */}
            <div className="hidden lg:flex items-center justify-center gap-2 lg:gap-3">
              {pillars.map((p, idx) => (
                <div
                  key={p.key}
                  className={`group relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  } ${
                    activePillar === p.key 
                      ? 'w-80 lg:w-96 flex-[2]' // Expanded width
                      : 'w-20 lg:w-24 flex-1' // Collapsed width - same size for all
                  } ${
                    activePillar && activePillar !== p.key ? 'opacity-70' : 'opacity-100'
                  }`}
                  style={{ 
                    transitionDelay: `${idx * 50}ms`,
                  }}
                  onMouseEnter={() => setActivePillar(p.key)}
                  onMouseLeave={() => setActivePillar(null)}
                >
                  {/* Pillar Container - Same color throughout */}
                  <div className={`${p.color} rounded-2xl shadow-lg border-4 border-white/90 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:shadow-2xl h-80 lg:h-96 flex flex-col relative`}>
                    
                    {/* Icon Section - Larger and at the very top */}
                    <div className={`flex-shrink-0 flex items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      activePillar === p.key ? 'h-20 lg:h-24' : 'h-20 lg:h-24'
                    }`}>
                      <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                        <Image
                          src={p.iconSrc}
                          alt={`${p.title} icon`}
                          width={80}
                          height={80}
                          className="object-contain drop-shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Vertical Title - Right-aligned when idle with larger font */}
                    <div className={`flex-1 flex items-center justify-end pr-2 lg:pr-3 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      activePillar === p.key ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    }`}>
                      <h4 className={`text-base lg:text-lg font-bold drop-shadow-lg ${p.textColor} writing-mode-vertical-lr whitespace-nowrap`}>
                        {p.title}
                      </h4>
                    </div>

                    {/* Details Section - Expands from bottom on hover */}
                    <div className={`absolute inset-0 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${
                      activePillar === p.key 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}>
                      <div className="p-6 lg:p-8 flex flex-col justify-center h-full min-w-0 pt-20 lg:pt-24">
                        {/* Reduced font size for all titles on hover */}
                        <h4 className={`font-bold mb-2 lg:mb-3 drop-shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${p.textColor} ${
                          activePillar === p.key ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        } text-center ${
                          p.key === 'entrepreneurship' 
                            ? 'text-sm lg:text-base whitespace-normal break-words' 
                            : 'text-sm lg:text-base whitespace-nowrap'
                        }`}>
                          {p.title}
                        </h4>
                        {/* Even smaller font size for descriptions on hover */}
                        <p className={`text-xs lg:text-sm leading-relaxed font-medium drop-shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${p.textColor} opacity-95 ${
                          activePillar === p.key ? 'translate-y-0 opacity-100 delay-75' : 'translate-y-4 opacity-0 delay-0'
                        } text-center`}>
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>
      <div className="absolute top-1/2 -left-10 w-40 h-40 rounded-full bg-[#5BC65A]/5 blur-3xl"></div>
      <div className="absolute bottom-10 -right-10 w-40 h-40 rounded-full bg-[#E84A45]/5 blur-3xl"></div>

      {/* Add custom CSS for vertical text */}
      <style jsx>{`
        .writing-mode-vertical-lr {
          writing-mode: vertical-lr;
        }
      `}</style>
    </section>
  );
}