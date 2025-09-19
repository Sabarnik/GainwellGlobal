'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Facility {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
  features: string[];
  size: string;
  established: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function OurFacilitiesSection() {
  const [activeSet, setActiveSet] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const facilities: Facility[] = [
    {
      id: 1,
      name: 'Kolkata Manufacturing Hub',
      location: 'Kolkata, West Bengal',
      image: `${basePath}/f7.jpg`,
      description: 'Our flagship manufacturing facility equipped with state-of-the-art machinery for heavy equipment production.',
      features: ['CNC Machining Centers', 'Robotic Welding Stations', 'Quality Testing Labs', 'R&D Department'],
      size: '50,000 sq. meters',
      established: '1985'
    },
    {
      id: 2,
      name: 'Pune Technology Center',
      location: 'Pune, Maharashtra',
      image: `${basePath}/f2.jpg`,
      description: 'Advanced technology center focused on innovation and development of next-generation equipment.',
      features: ['Prototyping Lab', 'Simulation Software', 'Engineering Workshops', 'Training Facilities'],
      size: '25,000 sq. meters',
      established: '2005'
    },
    {
      id: 3,
      name: 'Chennai Distribution Hub',
      location: 'Chennai, Tamil Nadu',
      image: `${basePath}/f3.jpg`,
      description: 'Strategic distribution center serving Southern India with comprehensive parts and service support.',
      features: ['Warehouse Storage', 'Parts Distribution', 'Service Training Center', 'Logistics Management'],
      size: '30,000 sq. meters',
      established: '2010'
    },
    {
      id: 4,
      name: 'Delhi Regional Office',
      location: 'New Delhi',
      image:`${basePath}/f4.jpg`,
      description: 'Corporate office and customer experience center for Northern India operations.',
      features: ['Customer Demo Area', 'Executive Offices', 'Conference Facilities', 'Showroom'],
      size: '15,000 sq. meters',
      established: '1998'
    },
    {
      id: 5,
      name: 'Bangalore Innovation Lab',
      location: 'Bangalore, Karnataka',
      image:`${basePath}/f5.jpg`,
      description: 'Cutting-edge research and development facility focused on AI and automation technologies.',
      features: ['AI Research Lab', 'Automation Testing', 'Software Development', 'Tech Incubation'],
      size: '20,000 sq. meters',
      established: '2018'
    },
    {
      id: 6,
      name: 'Mumbai Logistics Center',
      location: 'Mumbai, Maharashtra',
      image: `${basePath}/f6.jpg`,
      description: 'Major logistics and distribution hub handling national and international shipments.',
      features: ['Customs Clearance', 'Inventory Management', 'Export Processing', 'Fleet Operations'],
      size: '35,000 sq. meters',
      established: '2012'
    }
  ];

  // Group data into sets of 3 for the 3-grid layout
  const groupedData = [];
  for (let i = 0; i < facilities.length; i += 3) {
    groupedData.push(facilities.slice(i, i + 3));
  }

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

  // Auto-play carousel with hover pause
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVisible && !isHovering) {
      interval = setInterval(() => {
        setActiveSet((prev) => (prev + 1) % groupedData.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [groupedData.length, isVisible, isHovering]);

  const handlePrev = () => {
    setActiveSet(activeSet === 0 ? groupedData.length - 1 : activeSet - 1);
  };

  const handleNext = () => {
    setActiveSet((activeSet + 1) % groupedData.length);
  };

  const goToSlide = (index: number) => {
    setActiveSet(index);
  };

  return (
    <section
      id="our-facilities"
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
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
          className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#08193C] relative inline-block">
            <span className="relative">
              Our World-Class Facilities
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#3A55A5] max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            State-of-the-art infrastructure supporting innovation, manufacturing, and customer service excellence.
          </p>
        </div>

        {/* 3-Grid Auto Slide Section */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Grid track */}
          <div
            className="transition-transform duration-700 ease-in-out flex"
            style={{ transform: `translateX(-${activeSet * 100}%)` }}
          >
            {groupedData.map((set, setIndex) => (
              <div
                key={setIndex}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {set.map((facility, facilityIndex) => (
                  <div
                    key={facility.id}
                    className="group relative h-96 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl"
                    style={{
                      transitionDelay: `${facilityIndex * 100}ms`,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      opacity: isVisible ? 1 : 0
                    }}
                  >
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={facilityIndex === 0 && setIndex === 0}
                    />

                    {/* Dark gradient overlay at the bottom of the card */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                      <span className="text-xs font-semibold text-gray-800">{facility.established}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {facility.name}
                      </h3>

                      <div className="flex items-center text-white text-sm mb-2">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        <span>{facility.location}</span>
                      </div>
                    </div>

                    {/* Hover Overlay with Details - Matching Event Section */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      {/* Description with white text */}
                      <p className="text-white text-sm mb-4 line-clamp-3">
                        {facility.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-white/10 p-2 rounded">
                          <div className="text-xs text-white/70 mb-1">Size</div>
                          <div className="font-bold text-white text-sm">{facility.size}</div>
                        </div>
                        <div className="bg-white/10 p-2 rounded">
                          <div className="text-xs text-white/70 mb-1">Established</div>
                          <div className="font-bold text-white text-sm">{facility.established}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-white/70 mb-1">Key Features:</div>
                        <ul className="space-y-1">
                          {facility.features.slice(0, 2).map((feature, index) => (
                            <li key={index} className="text-white text-xs flex items-center">
                              <svg className="w-3 h-3 mr-1 text-[#F5872E]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Read More Button */}
                      <button className="w-full text-center py-2 rounded-lg text-sm font-semibold bg-[#3A55A5] text-white hover:opacity-90 transition-opacity">
                        Schedule a Visit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Navigation buttons - positioned further away */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
            aria-label="Previous facilities"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
            aria-label="Next facilities"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>

          {/* Indicators - positioned further down */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
            {groupedData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out ${index === activeSet ? 'bg-gradient-to-r from-[#F5872E] to-[#3A55A5] scale-125' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Current slide indicator */}
        <div className="flex justify-end items-center mt-10 px-2">
          <div className="text-base text-[#3A55A5] font-medium">
            {activeSet + 1} / {groupedData.length}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-[#3A55A5] mb-2">6</div>
            <div className="text-sm text-[#08193C]">Manufacturing Facilities</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-[#F5872E] mb-2">500K+</div>
            <div className="text-sm text-[#08193C]">Square Meters Total</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-[#40A748] mb-2">12</div>
            <div className="text-sm text-[#08193C]">Service Centers</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-[#3ABEEE] mb-2">5</div>
            <div className="text-sm text-[#08193C]">R&D Facilities</div>
          </div>
        </div>
      </div>

      {/* Add subtle background elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>
    </section>
  );
}