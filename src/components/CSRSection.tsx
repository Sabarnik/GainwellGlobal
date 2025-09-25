// components/CSRGridSection.tsx
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function CSRGridSection() {
  const [activeIndex, setActiveIndex] = useState(0); // Start at 0 for actual first slide
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // CSR initiatives data with brand colors from guidelines
  const csrData = [
    {
      id: 1,
      title: 'Roof for the little Angels: Antyodoy Anath Ashram',
      description: 'Antyodoy Anath Ashram, was built with the efforts of a single individual from the remote locales of Paushi, in Purba Medinipur, West Bengal. It was founded by Balaram Karan, with... ',
      image: `${basePath}/ashram_11.jpg`,
      icon: 'fas fa-graduation-cap',
      color: '#3A55A5', // Primary blue from brand guidelines
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Health in your hands – Empowering the Self',
      description: 'With more than 100 million people in India likely to develop diabetes by 2030, this silent killer of a disease has become an epidemic. Doctors are now urging people to make healthy choices so.. ',
      image: `${basePath}/health_1.jpg`,
      icon: 'fas fa-leaf',
      color: '#40A748', // Primary green from brand guidelines
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      title: 'Ray of hope at Premasree',
      description: 'Premasree began in Kolkata with an aim of providing shelter, nurturing the love of knowledge and inculcating skill among underprivileged and differently abled children. This project aims at providing ... ',
      image: `${basePath}/ray_1.jpg`,
      icon: 'fas fa-hands-helping',
      color: '#F5872E', // Primary orange from brand guidelines
      bgColor: 'bg-orange-100'
    },
    {
      id: 4,
      title: 'Creating a brighter future through Self-Empowerment',
      description: 'A sustainable world can only be achieved with the economic independence of every individual. While population grows, employment opportunities remain limited and of poor quality for ... ',
      image: `${basePath}/creating_1.jpg`,
      icon: 'fas fa-users',
      color: '#3ABEEE', // Primary cyan from brand guidelines
      bgColor: 'bg-cyan-100'
    },
    {
      id: 5,
      title: 'A Life of Dignity',
      description: 'India is said to have one of the youngest population across the globe. However, the flip side is that the elderly will constitute 20 per cent of the total population in the country by 2050, as... ',
      image: `${basePath}/dignity_1.jpg`,
      icon: 'fas fa-users',
      color: '#08193C', // Dark blue from secondary colors
      bgColor: 'bg-blue-100'
    },
  ];

  // Create sets of up to 3 items, but fill incomplete sets with existing items
  const createGroupedData = () => {
    const grouped = [];
    for (let i = 0; i < csrData.length; i += 3) {
      const set = csrData.slice(i, i + 3);
      // If this is the last set and it has less than 3 items, fill with items from the beginning
      if (set.length < 3) {
        const needed = 3 - set.length;
        set.push(...csrData.slice(0, needed));
      }
      grouped.push(set);
    }
    return grouped;
  };

  const groupedData = createGroupedData();

  // Create infinite carousel data by cloning first and last items
  const carouselData = [
    groupedData[groupedData.length - 1], // Clone last set to beginning
    ...groupedData,
    groupedData[0], // Clone first set to end
  ];

  const totalSlides = carouselData.length;


  // Intersection Observer for scroll animations
  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
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

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Handle transition end for infinite loop
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    
    // If we're at the last clone (index totalSlides - 1), jump to the real first slide (index 1)
    if (activeIndex === totalSlides - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(1);
      }, 50);
    }
    // If we're at the first clone (index 0), jump to the real last slide (index totalSlides - 2)
    else if (activeIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(totalSlides - 2);
      }, 50);
    }
  }, [activeIndex, totalSlides]);

  // Auto-play carousel with hover pause
  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    if (isVisible && !isHovering) {
      autoPlayRef.current = setInterval(() => {
        setIsTransitioning(true);
        setActiveIndex((prev) => (prev + 1) % totalSlides);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isVisible, isHovering, totalSlides]);

  // Navigation functions with infinite loop
  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  return (
    <section
      id="csr-grid"
      ref={sectionRef}
      className="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
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
              Corporate Social Responsibility
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#3A55A5] max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            Creating sustainable value for communities and the environment through responsible business practices.
          </p>
        </div>

        {/* 3-Grid Infinite Carousel Section */}
        <div 
          className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Grid track */}
          <div
            ref={trackRef}
            className="flex"
            style={{ 
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: isTransitioning ? 'transform 700ms ease-in-out' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {carouselData.map((set, setIndex) => (
              <div
                key={setIndex}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8 p-8"
              >
                {set.map((item, itemIndex) => (
                  <div 
                    key={`${setIndex}-${item.id}`} 
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl flex flex-col h-full"
                    style={{ borderTop: `5px solid ${item.color}` }}
                  >
                    {/* Image container with fixed aspect ratio */}
                    <div className="relative h-72 w-full flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={itemIndex === 0 && setIndex === 1}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <div className="absolute top-5 left-5 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg">
                        <i className={`${item.icon} text-xl`} style={{ color: item.color }}></i>
                      </div>
                    </div>
                    
                    {/* Content container with flex-grow for consistent height */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-[#08193C] mb-3 leading-tight">{item.title}</h3>
                      <p className="text-[#3A55A5] text-base mb-5 flex-grow line-clamp-3">
                        {item.description}
                      </p>
                      <button 
                        className="text-base font-semibold py-3 px-5 rounded-full transition-all duration-300 mt-auto"
                        style={{ 
                          backgroundColor: `${item.color}15`, 
                          color: item.color 
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = item.color;
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${item.color}15`;
                          e.currentTarget.style.color = item.color;
                        }}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
            aria-label="Previous CSR initiatives"
            type="button"
          >
            <i className="fas fa-chevron-left text-lg group-hover:scale-110 transition-transform duration-200"></i>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
            aria-label="Next CSR initiatives"
            type="button"
          >
            <i className="fas fa-chevron-right text-lg group-hover:scale-110 transition-transform duration-200"></i>
          </button>
        </div>
      </div>

      {/* Add subtle background elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>

      {/* Add Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Custom styles for line clamping */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}