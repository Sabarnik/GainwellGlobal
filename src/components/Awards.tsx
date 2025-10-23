'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Award {
  id: number;
  title: string;
  organization: string;
  year: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function AwardsSection() {
  const [activeSet, setActiveSet] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const awards: Award[] = [
    {
      id: 1,
      title: 'Celebrating Our Recognition: Best Employer Brand Awards 2024',
      organization: 'EIILM - Kolkata!',
      year: '',
      description: 'Recognized for Corporate Excellence and outstanding contribution to the industry.',
      image: `${basePath}/Best_Estern_India_Best_Employer_Brand_Award_1_1.jpg`,
      category: 'Corporate Excellence',
      link: "https://www.gainwellindia.com/home/award/celebrating-our-recognition-best-employer-brand-awards-2024",
    },
    
    {
      id: 3,
      title: 'Gainwell recognized as the First Dealer in the APD region for the successful completion of GDS2',
      organization: "MSEP for Q3'2023",
      year: '',
      description: 'Acknowledged for exceptional employee practices and workplace environment.',
      image: `${basePath}/new_award.jpg`,
      category: 'Human Resources',
      link: "https://www.gainwellindia.com/home/award/gainwell-recognized-as-the-first-dealer-in-the-apd-region-for-the-successful-completion-of-gds2",
    },
    {
      id: 4,
      title: 'Rampurhat secures first runner-up position at the district-level GEM competition',
      organization: 'GEM (Going the Extra Mile) ',
      year: '',
      description: 'Recognized for innovative approaches in manufacturing processes and technology adoption.',
      image: `${basePath}/award1.jpg`,
      category: 'Innovation',
      link: "https://www.gainwellindia.com/home/award/rampurhat-secures-first-runner-up-position-at-the-district-level-gem-competition",
    },    
    {
      id: 5,
      title: 'Gainwell is thrilled to be recognised by Caterpillar for its outstanding performance across various Excellence Programs',
      organization: 'GEM',
      year: '',
      description: 'Recognized for innovative approaches in manufacturing processes and technology adoption.',
      image: `${basePath}/award4.jpg`,
      category: 'Innovation',
      link: "https://www.gainwellindia.com/home/award/gainwell-is-thrilled-to-be-recognised-by-caterpillar-for-its-outstanding-performance-across-various-excellence-programs",
    },
    {
      id: 6,
      title: 'GAINWELL has been recognized and awarded as one of the Top 100 Great Places to Work in India',
      organization: 'Great Place to Work Institute',
      year: '',
      description: 'Acknowledged for exceptional employee practices and workplace environment.',
      image: `${basePath}/1718849753961.jpeg`,
      category: 'Human Resources',
      link: "https://www.gainwellindia.com/home/award/gainwell-has-been-recognized-and-awarded-as-one-of-the-top-100-great-places-to-work-in-india",
    },
    {
      id: 7,
      title: 'Gainwell Enters Crushing & Screening Sector with PROMAN',
      organization: 'Great Place to Work Institute',
      year: '',
      description: 'Acknowledged for exceptional employee practices and workplace environment.',
      image: `${basePath}/award7.jpg`,
      category: 'Human Resources',
      link: "https://www.mojo4industry.com/gainwell-enters-crushing-screening-sector-with-proman/"
    },
    {
      id: 2,
      title: 'LEED Platinum',
      organization: 'Great Place to Work Institute',
      year: '',
      description: 'Acknowledged for exceptional employee practices and workplace environment.',
      image: `${basePath}/award2.jpg`,
      category: 'Human Resources',
      link: "https://www.gainwellindia.com/home/award/leed-platinum",
    },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Create continuous loop by duplicating the awards with unique keys
  const createContinuousData = () => {
    const itemsPerSlide = isMobile ? 1 : 3;
    const setsNeeded = 3; // Minimum sets needed for smooth continuous loop
    
    // If we have exactly the number of items per slide, just return one set
    if (awards.length === itemsPerSlide) {
      return [awards];
    }

    // Create enough sets for continuous loop
    const allSets = [];
    const totalSetsNeeded = Math.max(setsNeeded, Math.ceil(awards.length / itemsPerSlide));
    
    for (let setIndex = 0; setIndex < totalSetsNeeded; setIndex++) {
      const set = [];
      for (let i = 0; i < itemsPerSlide; i++) {
        const awardIndex = (setIndex * itemsPerSlide + i) % awards.length;
        const originalAward = awards[awardIndex];
        // Create unique award object with unique ID for each position
        set.push({
          ...originalAward,
          // Create unique ID by combining original ID with position
          uniqueId: `${originalAward.id}-${setIndex}-${i}`
        });
      }
      allSets.push(set);
    }

    return allSets;
  };

  const groupedData = createContinuousData();
  const totalSets = groupedData.length;
  const actualSets = Math.ceil(awards.length / (isMobile ? 1 : 3));

  // Recreate grouped data when mobile state changes
  useEffect(() => {
    // Reset to first slide when layout changes
    setActiveSet(0);
  }, [isMobile]);

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

  // Auto-play carousel with hover pause and continuous loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVisible && !isHovering) {
      interval = setInterval(() => {
        setActiveSet((prev) => {
          const next = prev + 1;
          // Reset to beginning when reaching the actual end
          if (next >= actualSets) {
            return 0;
          }
          return next % totalSets;
        });
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [totalSets, isVisible, isHovering, actualSets]);

  const handlePrev = () => {
    setActiveSet(prev => {
      if (prev === 0) {
        // Go to the last set of actual awards
        return actualSets - 1;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setActiveSet(prev => {
      const next = prev + 1;
      // Reset to beginning when reaching the actual end
      if (next >= actualSets) {
        return 0;
      }
      return next;
    });
  };

  const handleCardClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="relative py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
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

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-8 md:mb-16 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#08193C] relative inline-block">
            <span className="relative">
              Awards & Recognitions
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-4 md:mt-6 text-base sm:text-lg text-[#3A55A5] max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            Celebrating excellence and recognition from industry leaders and organizations worldwide.
          </p>
        </div>

        {/* 3-Grid Auto Slide Section */}
        <div 
          className="relative overflow-hidden rounded-xl md:rounded-2xl"
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
                key={`set-${setIndex}`}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 md:px-0"
              >
                {set.map((award, awardIndex) => (
                  <div 
                    key={award.id || `award-${setIndex}-${awardIndex}`} 
                    className="group relative h-72 sm:h-80 md:h-96 rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden transition-all duration-500 ease-out transform hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-lg md:hover:shadow-xl cursor-pointer"
                    onClick={() => handleCardClick(award.link)}
                  >
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      className="object-contain object-top transition-transform duration-700 group-hover:scale-105 md:group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      priority={awardIndex === 0 && setIndex === 0}
                    />

                    {/* Dark gradient overlay at the bottom of the card */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>

                    {/* Year badge */}
                    {award.year && (
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 shadow-sm">
                        <span className="text-xs font-semibold text-gray-800">{award.year}</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                        {award.title}
                      </h3>

                      <div className="flex items-center text-white text-xs sm:text-sm">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="line-clamp-1">{award.organization}</span>
                      </div>
                    </div>

                    {/* Click indicator */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/50 rounded-full p-1.5 sm:p-2 backdrop-blur-sm">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-lg md:shadow-xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
            aria-label="Previous awards"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-lg md:shadow-xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
            aria-label="Next awards"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>

          {/* Mobile indicators */}
          {isMobile && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {Array.from({ length: actualSets }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSet(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSet === index ? 'bg-[#3A55A5] scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Current slide indicator for desktop */}
        {!isMobile && actualSets > 1 && (
          <div className="flex justify-center items-center mt-6 px-2">
            <div className="text-sm sm:text-base text-[#3A55A5] font-medium">
              {activeSet + 1} / {actualSets}
            </div>
          </div>
        )}
      </div>

      {/* Add subtle background elements */}
      <div className="absolute -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 w-20 h-20 sm:w-40 sm:h-40 rounded-full bg-[#F5872E]/10 blur-2xl sm:blur-3xl"></div>
      <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-20 h-20 sm:w-40 sm:h-40 rounded-full bg-[#3A55A5]/10 blur-2xl sm:blur-3xl"></div>

      {/* Custom styles for line clamping */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}