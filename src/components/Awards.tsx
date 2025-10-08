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

  // Create continuous loop by duplicating the awards with unique keys
  const createContinuousData = () => {
    const setsNeeded = 3; // Minimum sets needed for smooth continuous loop
    
    // If we have exactly 3 awards, just return one set
    if (awards.length === 3) {
      return [awards];
    }

    // Create enough sets for continuous loop
    const allSets = [];
    const totalSetsNeeded = Math.max(setsNeeded, Math.ceil(awards.length / 3));
    
    for (let setIndex = 0; setIndex < totalSetsNeeded; setIndex++) {
      const set = [];
      for (let i = 0; i < 3; i++) {
        const awardIndex = (setIndex * 3 + i) % awards.length;
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
  const actualSets = Math.ceil(awards.length / 3);

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

  const goToSlide = (index: number) => {
    setActiveSet(index % actualSets);
  };

  const handleCardClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Calculate display index for current slide indicator
  const getDisplayIndex = () => {
    return (activeSet % actualSets) + 1;
  };

  const getTotalDisplaySets = () => {
    return actualSets;
  };

  return (
    <section
      id="awards"
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
              Awards & Recognitions
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#3A55A5] max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            Celebrating excellence and recognition from industry leaders and organizations worldwide.
          </p>
        </div>

        {/* 3-Grid Auto Slide Section */}
        <div 
          className="relative overflow-hidden rounded-2xl"
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
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {set.map((award, awardIndex) => (
                  <div 
                    key={award.id || `award-${setIndex}-${awardIndex}`} 
                    className="group relative h-96 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                    onClick={() => handleCardClick(award.link)}
                  >
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      className="object-contain object-top transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={awardIndex === 0 && setIndex === 0}
                    />

                    {/* Dark gradient overlay at the bottom of the card */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>

                    {/* Year badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                      <span className="text-xs font-semibold text-gray-800">{award.year}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {award.title}
                      </h3>

                      <div className="flex items-center text-white text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        <span>{award.organization}</span>
                      </div>
                    </div>

                    {/* Click indicator */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
            aria-label="Previous awards"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
            aria-label="Next awards"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>

          {/* Indicators - only show for actual award sets */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {Array.from({ length: getTotalDisplaySets() }).map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out ${index === (activeSet % getTotalDisplaySets()) ? 'bg-gradient-to-r from-[#F5872E] to-[#3A55A5] scale-125' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Current slide indicator */}
        <div className="flex justify-end items-center mt-6 px-2">
          <div className="text-base text-[#3A55A5] font-medium">
            {getDisplayIndex()} / {getTotalDisplaySets()}
          </div>
        </div>
      </div>

      {/* Add subtle background elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>
    </section>
  );
}