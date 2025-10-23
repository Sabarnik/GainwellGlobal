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
    },
    {
      id: 4,
      name: '',
      location: '',
      image: `${basePath}/TIL-Kam.jpg`,
      relatedImage: `${basePath}/kharagpur.jpg`,
    },
    {
      id: 5,
      name: '',
      location: '',
      image: `${basePath}/GEPL-puneFacility.jpg`,
      relatedImage: `${basePath}/pune.jpeg`,
    },
    {
      id: 6,
      name: '',
      location: '',
      image: `${basePath}/GEPL-Pana-Facility.jpg`,
      relatedImage: `${basePath}/GEPL-Pana-Facility.jpg`,
    },
  ];

  // Handle window resize for responsive grouping
  const [itemsPerSet, setItemsPerSet] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setItemsPerSet(mobile ? 1 : 3);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Group data into sets based on screen size
  const groupedData: Facility[][] = [];
  for (let i = 0; i < facilities.length; i += itemsPerSet) {
    groupedData.push(facilities.slice(i, i + itemsPerSet));
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentSection);

    return () => {
      observer.unobserve(currentSection);
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
  const imageAspectRatio = 2048 / 1365;

  return (
    <>
      <section
        id="our-facilities"
        ref={sectionRef}
        className="relative py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.1)_100%)]" />
        </div>

        {/* Gradient Lines Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute top-1/4 left-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-[#F5872E]/30 to-transparent transform -skew-y-12 transition-all duration-1000 ease-out ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          />
          <div
            className={`absolute top-1/2 right-0 w-1/3 h-1 bg-gradient-to-l from-transparent via-[#3A55A5]/30 to-transparent transform skew-y-12 transition-all duration-1000 delay-300 ease-out ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
          />
          <div
            className={`absolute bottom-1/4 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#40A748]/20 to-transparent transform transition-all duration-1000 delay-500 ease-out ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08193C] relative inline-block">
              <span className="relative">
                Our World-Class Facilities
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0" />
                <span
                  className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${
                    isVisible ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </span>
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-[#3A55A5] max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out px-4">
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
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                >
                  {set.map((facility, facilityIndex) => (
                    <div
                      key={facility.id}
                      className="group relative bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col min-h-[550px]"
                      style={{
                        transitionDelay: `${facilityIndex * 100}ms`,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        opacity: isVisible ? 1 : 0,
                      }}
                    >
                      {/* Image Container - Same aspect ratio for mobile and desktop */}
                      <div
                        className="relative w-full overflow-hidden flex-1"
                        style={{
                          paddingBottom: `${(1 / imageAspectRatio) * 100}%`
                        }}
                      >
                        <div className="absolute inset-0">
                          <Image
                            src={facility.image}
                            alt={facility.name || 'Facility image'}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={facilityIndex === 0 && setIndex === 0}
                          />
                        </div>

                        {/* Overlay that appears on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 ease-out" />
                      </div>

                      {/* Show More Button - Always visible on mobile, hover on desktop */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                        <button
                          onClick={() => openModal(facility)}
                          className="bg-white text-[#08193C] font-bold py-3 px-6 rounded-full hover:bg-[#F5872E] hover:text-white transition-colors duration-300 shadow-lg"
                          type="button"
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Navigation buttons - always visible if multiple sets */}
            {groupedData.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white shadow-xl md:shadow-2xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
                  aria-label="Previous facilities"
                  type="button"
                >
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white shadow-xl md:shadow-2xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
                  aria-label="Next facilities"
                  type="button"
                >
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Indicators - only show if multiple sets */}
            {groupedData.length > 1 && (
              <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3">
                {groupedData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 ease-in-out ${
                      index === activeSet
                        ? 'bg-gradient-to-r from-[#F5872E] to-[#3A55A5] scale-125'
                        : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    type="button"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add subtle background elements */}
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl" />
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl" />
      </section>

      {/* Modal - Two Images Display - Mobile Responsive */}
      {modal.isOpen && modal.facility && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Facility details"
        >
          <div
            className="relative max-w-6xl w-full max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white/30 transition-all duration-200 shadow-lg"
              aria-label="Close modal"
              type="button"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Two images grid - Stack on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Main Facility Image */}
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center min-h-[400px] md:min-h-[600px]">
                <div className="relative w-full h-full">
                  <Image
                    src={modal.facility.image}
                    alt={`${modal.facility.name || 'Facility'} - Main Image`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Additional/Related Image */}
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center min-h-[400px] md:min-h-[600px]">
                <div className="relative w-full h-full">
                  <Image
                    src={getRelatedImage(modal.facility)}
                    alt={`${modal.facility.name || 'Facility'} - Additional View`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Facility Name */}
            <div className="mt-6 md:mt-8 text-center px-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                {modal.facility.name}
              </h3>
              <p className="text-white/80 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">
                {modal.facility.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}