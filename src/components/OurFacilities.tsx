'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Facility {
  id: number;
  name: string;
  location: string;
  image: string;
  relatedImage?: string;
}

interface ModalData {
  isOpen: boolean;
  facility: Facility | null;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function OurFacilitiesSection() {
  const [activeSet, setActiveSet] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [modal, setModal] = useState<ModalData>({ isOpen: false, facility: null });
  const sectionRef = useRef<HTMLDivElement>(null);

  const facilities: Facility[] = [
    {
      id: 1,
      name: '',
      location: '',
      image: `${basePath}/Greter-noida--Unnati-Facility.jpg`,
      relatedImage: `${basePath}/Greater Noida edit-unnati.jpg`,
    },
    {
      id: 2,
      name: '',
      location: '',
      image: `${basePath}/Asonsol--pragati-Facility.jpg`,
      relatedImage: `${basePath}/Asansol pragati 2.jpg`,
    },
    {
      id: 3,
      name: '',
      location: '',
      image: `${basePath}/udaipur-Facility.jpg`,
      relatedImage: `${basePath}/udaipur-Facility-pic.jpg`,
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
    if (isVisible && !isHovering && groupedData.length > 1) {
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

  const openModal = (facility: Facility) => {
    setModal({ isOpen: true, facility });
  };

  const closeModal = () => {
    setModal({ isOpen: false, facility: null });
  };

  const getRelatedImage = (facility: Facility) => {
    return facility.relatedImage || facility.image;
  };

  // Calculate aspect ratio (1365:2048 ≈ 2:3)
  const imageAspectRatio = 2048 / 1365; // ≈ 1.5 (3:2 portrait)

  return (
    <>
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
                      className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col min-h-[550px]"
                      style={{
                        transitionDelay: `${facilityIndex * 100}ms`,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        opacity: isVisible ? 1 : 0
                      }}
                    >
                      {/* Image Container - Increased height */}
                      <div 
                        className="relative w-full overflow-hidden flex-1"
                        style={{ 
                          paddingBottom: `${(1 / imageAspectRatio) * 100}%`
                        }}
                      >
                        <div className="absolute inset-0">
                          <Image
                            src={facility.image}
                            alt={facility.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={facilityIndex === 0 && setIndex === 0}
                          />
                        </div>
                        
                        {/* Overlay that appears on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 ease-out"></div>
                      </div>

                      {/* Show More Button - Appears on hover at bottom */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                        <button 
                          onClick={() => openModal(facility)}
                          className="bg-gradient-to-r from-[#F5872E] to-[#3A55A5] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#3A55A5] hover:to-[#F5872E] transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-white/20 backdrop-blur-sm"
                        >
                          Show More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Navigation buttons - only show if multiple sets */}
            {groupedData.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-2xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
                  aria-label="Previous facilities"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-2xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
                  aria-label="Next facilities"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </>
            )}

            {/* Indicators - only show if multiple sets */}
            {groupedData.length > 1 && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex space-x-3">
                {groupedData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ease-in-out ${index === activeSet ? 'bg-gradient-to-r from-[#F5872E] to-[#3A55A5] scale-125' : 'bg-gray-300'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Current slide indicator - only show if multiple sets */}
          {groupedData.length > 1 && (
            <div className="flex justify-end items-center mt-12 px-2">
              <div className="text-base text-[#3A55A5] font-medium">
                {activeSet + 1} / {groupedData.length}
              </div>
            </div>
          )}
        </div>

        {/* Add subtle background elements */}
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>
      </section>

      {/* Modal - Two Images Display */}
      {modal.isOpen && modal.facility && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white/30 transition-all duration-200 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Two images grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Main Facility Image */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center min-h-[600px]">
                <div className="relative w-full h-full">
                  <Image
                    src={modal.facility.image}
                    alt={`${modal.facility.name} - Main Image`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Additional/Related Image */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center min-h-[600px]">
                <div className="relative w-full h-full">
                  <Image
                    src={getRelatedImage(modal.facility)}
                    alt={`${modal.facility.name} - Additional View`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Facility Name */}
            <div className="mt-8 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                {modal.facility.name}
              </h3>
              <p className="text-white/80 mt-3 text-lg">{modal.facility.location}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}