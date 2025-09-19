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
      category: 'Corporate Excellence'
    },
    {
      id: 2,
      title: 'GAINWELL has been recognized and awarded as one of the Top 100 Great Places to Work in India',
      organization: 'Great Place to Work Institute',
      year: '',
      description: 'Acknowledged for exceptional employee practices and workplace environment.',
      image: `${basePath}/1718849753961.jpeg`,
      category: 'Human Resources'
    },
    {
      id: 3,
      title: 'Rampurhat secures first runner-up position at the district-level GEM competition',
      organization: 'GEM',
      year: '',
      description: 'Recognized for innovative approaches in manufacturing processes and technology adoption.',
      image: `${basePath}/award1.jpg`,
      category: 'Innovation'
    },
  ];

  // Group data into sets of 3 for the 3-grid layout
  const groupedData = [];
  for (let i = 0; i < awards.length; i += 3) {
    groupedData.push(awards.slice(i, i + 3));
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
                key={setIndex}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {set.map((award, awardIndex) => (
                  <div 
                    key={award.id} 
                    className="group relative h-96 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl"
                  >
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
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

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
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
        <div className="flex justify-end items-center mt-6 px-2">
          <div className="text-base text-[#3A55A5] font-medium">
            {activeSet + 1} / {groupedData.length}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-[#3A55A5] mb-2">{awards.length}+</div>
            <div className="text-sm text-[#08193C]">Awards Received</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-[#F5872E] mb-2">15+</div>
            <div className="text-sm text-[#08193C]">Years of Recognition</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-[#40A748] mb-2">8+</div>
            <div className="text-sm text-[#08193C]">Categories</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-[#3ABEEE] mb-2">12+</div>
            <div className="text-sm text-[#08193C]">Recognizing Organizations</div>
          </div>
        </div>
      </div>

      {/* Add subtle background elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>
    </section>
  );
}