// components/AboutSection.tsx
'use client';
import { useCallback } from 'react';
import { useEffect, useState, useRef } from 'react';

// Define decade type
interface Decade {
  name: string;
  years: string[];
  events: TimelineEvent[];
}

interface TimelineEvent {
  year: string;
  content: string;
  icon: string;
  color: string;
  bgColor: string;
}

export default function AboutUs() {
  const [activeDecadeIndex, setActiveDecadeIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Timeline data organized by decades
  const decadesData: Decade[] = [
    {
      name: "1940s",
      years: ["1944"],
      events: [
        {
          year: "1944",
          content: "We started our operations at 6 Church Lane, Calcutta as Dealer for Caterpillar, US",
          icon: "fas fa-flag",
          color: "from-[#F5872E] to-[#FFA057]",
          bgColor: "bg-orange-100"
        }
      ]
    },
    {
      name: "1960s",
      years: ["1960"],
      events: [
        {
          year: "1960",
          content: "Enters Joint Venture with Coles Cranes Company Ltd.",
          icon: "fas fa-handshake",
          color: "from-[#3A55A5] to-[#4A6BC5]",
          bgColor: "bg-blue-100"
        }
      ]
    },
    {
      name: "1970s",
      years: ["1976"],
      events: [
        {
          year: "1976",
          content: "We expanded our horizons beyond Indian borders, forging new agreements to extend our services to Nepal and Bhutan",
          icon: "fas fa-globe",
          color: "from-[#40A748] to-[#50C758]",
          bgColor: "bg-green-100"
        }
      ]
    },
    {
      name: "1980s",
      years: ["1985"],
      events: [
        {
          year: "1985",
          content: "Changes its name to become TIL Limited",
          icon: "fas fa-signature",
          color: "from-[#F5872E] to-[#FFA057]",
          bgColor: "bg-orange-100"
        }
      ]
    },
    {
      name: "1990s",
      years: ["1996", "1998"],
      events: [
        {
          year: "1996",
          content: "Ties up with National Cranes USA",
          icon: "fas fa-link",
          color: "from-[#3A55A5] to-[#4A6BC5]",
          bgColor: "bg-blue-100"
        },
        {
          year: "1998",
          content: "Ties up with Manitowoc, USA",
          icon: "fas fa-handshake",
          color: "from-[#40A748] to-[#50C758]",
          bgColor: "bg-green-100"
        }
      ]
    },
    {
      name: "2000s",
      years: ["2000"],
      events: [
        {
          year: "2000",
          content: "Established our First subsidiary in Nepal through wholly owned, Tractors Nepal Private Limited",
          icon: "fas fa-building",
          color: "from-[#F5872E] to-[#FFA057]",
          bgColor: "bg-orange-100"
        }
      ]
    },
    {
      name: "2010s",
      years: ["2010", "2013", "2017", "2019"],
      events: [
        {
          year: "2010",
          content: "We incorporated Tractors India Pvt. Ltd.",
          icon: "fas fa-indian-rupee-sign",
          color: "from-[#3A55A5] to-[#4A6BC5]",
          bgColor: "bg-blue-100"
        },
        {
          year: "2013",
          content: "TIL Receives L.N Birla Memorial Award for Corporate Excellence",
          icon: "fas fa-award",
          color: "from-[#40A748] to-[#50C758]",
          bgColor: "bg-green-100"
        },
        {
          year: "2017",
          content: "Tulip Compression becomes part of Gainwell Group",
          icon: "fas fa-compress",
          color: "from-[#F5872E] to-[#FFA057]",
          bgColor: "bg-orange-100"
        },
        {
          year: "2019",
          content: "Completes 75 years of existence on 22nd July 2019",
          icon: "fas fa-birthday-cake",
          color: "from-[#3A55A5] to-[#4A6BC5]",
          bgColor: "bg-blue-100"
        }
      ]
    },
    {
      name: "2020s",
      years: ["2021", "2022", "2023", "2024"],
      events: [
        {
          year: "2021",
          content: "Gainwell Engineering formed and Engineering signs licensing agreement with Caterpillar to manufacture underground mining equipment in India for global market",
          icon: "fas fa-industry",
          color: "from-[#40A748] to-[#50C758]",
          bgColor: "bg-green-100"
        },
        {
          year: "2022",
          content: "Gainwell and Lintec & Linnhoff signed new manufacturing partnership to Make in India",
          icon: "fas fa-handshake",
          color: "from-[#F5872E] to-[#FFA057]",
          bgColor: "bg-orange-100"
        },
        {
          year: "2023",
          content: "Gainwell and Etnyre Signed new Partnership. Acceleron Solutions formed as specialised Services in IT services and consulting Services",
          icon: "fas fa-laptop-code",
          color: "from-[#3A55A5] to-[#4A6BC5]",
          bgColor: "bg-blue-100"
        },
        {
          year: "2024",
          content: "Gainwell Group acquires Iconic Infra Equipment Manufacturer – TIL Limited",
          icon: "fas fa-arrow-trend-up",
          color: "from-[#40A748] to-[#50C758]",
          bgColor: "bg-green-100"
        }
      ]
    }
  ];

  // Calculate rotation angle based on active decade index
  const calculateRotation = useCallback((index: number) => {
    return -(index * (360 / decadesData.length));
  }, [decadesData.length]);

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
        setActiveDecadeIndex((prev) => (prev + 1) % decadesData.length);
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [decadesData.length, isVisible, isHovering]);

  // Update rotation when activeDecadeIndex changes
  useEffect(() => {
    setRotation(calculateRotation(activeDecadeIndex));
  }, [activeDecadeIndex, calculateRotation]);

  const handlePrev = () => {
    setActiveDecadeIndex(activeDecadeIndex === 0 ? decadesData.length - 1 : activeDecadeIndex - 1);
  };

  const handleNext = () => {
    setActiveDecadeIndex((activeDecadeIndex + 1) % decadesData.length);
  };

  const goToDecade = (index: number) => {
    setActiveDecadeIndex(index);
  };

  const currentDecade = decadesData[activeDecadeIndex];

  return (
    <section
      id="about"
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
          <h2 className="text-4xl md:text-5xl font-din font-bold text-[#08193C] relative inline-block">
            <span className="relative">
              The Wheel Of Time
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#3A55A5] font-roboto max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            Our journey through decades of innovation, partnerships, and growth.
          </p>
        </div>

        {/* Desktop Layout - Circular Timeline on Left, Description on Right */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-12">
          {/* Circular Timeline Carousel - Left Side */}
          <div className="w-1/2 flex justify-center">
            <div
              className="relative w-full max-w-md h-96"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Spinning Wheel Container */}
              <div
                ref={wheelRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 transition-transform duration-[1500ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
                style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
              >
                {/* Circular path */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-dashed border-gray-300"></div>

                {/* Timeline items in circular arrangement - fixed positions */}
                {decadesData.map((decade, index) => {
                  const angle = (index * (360 / decadesData.length));
                  const radian = (angle * Math.PI) / 180;
                  const radius = 160;
                  const x = Math.round(Math.cos(radian) * radius * 1000) / 1000;
                  const y = Math.round(Math.sin(radian) * radius * 1000) / 1000;

                  const isActive = index === activeDecadeIndex;

                  return (
                    <div
                      key={index}
                      className={`absolute w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'scale-125 z-10 shadow-lg' : 'scale-100'
                        }`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: `translate(-50%, -50%) rotate(${-rotation}deg)`
                      }}
                      onClick={() => goToDecade(index)}
                    >
                      <div className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#3A55A5] to-[#40A748] border-2 border-white shadow-md transition-all duration-300 ease-in-out ${isActive ? 'ring-2 ring-[#F5872E]' : ''}`}>
                        <span className={`text-sm font-bold text-white transition-all duration-300 ease-in-out`}>
                          {decade.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white border-4 border-[#3A55A5] shadow-lg flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#3A55A5]">Since 1944</div>
                </div>
              </div>

              {/* Navigation buttons - positioned further from the wheel */}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 -left-12 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
                aria-label="Previous decade"
              >
                <i className="fas fa-chevron-left group-hover:scale-110 transition-transform duration-200"></i>
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
                aria-label="Next decade"
              >
                <i className="fas fa-chevron-right group-hover:scale-110 transition-transform duration-200"></i>
              </button>
            </div>
          </div>

          {/* Description Panel - Right Side */}
          <div 
            className="w-1/2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-700 ease-in-out"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <h3 className="text-4xl font-din font-bold text-[#08193C]">{currentDecade.name}</h3>
                </div>
                <div className="text-sm text-[#3A55A5] font-roboto bg-gray-100 px-3 py-1 rounded-full">
                  {currentDecade.events.length} Event{currentDecade.events.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              {/* All events for the decade */}
              <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                {currentDecade.events.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${event.bgColor} mr-4 shadow-md flex-shrink-0`}>
                      <i className={`${event.icon} text-lg ${event.color.replace('from-', 'text-').split(' ')[0]}`}></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-din font-bold text-[#08193C]">{event.year}</h4>
                      <p className="text-[#3A55A5] font-roboto leading-relaxed mt-1">
                        {event.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress indicator */}
              <div className="mt-6 flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r from-[#3A55A5] to-[#40A748] transition-all duration-1000 ease-out`}
                    style={{ width: `${((activeDecadeIndex + 1) / decadesData.length) * 100}%` }}
                  ></div>
                </div>
                <div className="ml-4 text-sm text-[#3A55A5] font-roboto min-w-[60px]">
                  {activeDecadeIndex + 1} / {decadesData.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline Carousel - Visible on mobile */}
        <div 
          className={`lg:hidden relative transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Carousel container */}
          <div
            className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100"
          >
            {/* Vertical carousel track */}
            <div
              className="transition-transform duration-700 ease-in-out"
              style={{ transform: `translateY(-${activeDecadeIndex * 100}%)` }}
            >
              {decadesData.map((decade, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-6 py-8"
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#3A55A5] to-[#40A748] text-white mb-4 shadow-lg">
                      <span className="text-lg font-bold">{decade.name}</span>
                    </div>
                    <h3 className="text-xl font-din font-bold text-[#08193C]">
                      {decade.name}
                    </h3>
                  </div>
                  
                  {/* All events for the decade */}
                  <div className="space-y-6">
                    {decade.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-start">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${event.bgColor} mr-4 shadow-md flex-shrink-0`}>
                          <i className={`${event.icon} text-lg ${event.color.replace('from-', 'text-').split(' ')[0]}`}></i>
                        </div>
                        <div>
                          <h4 className="text-xl font-din font-bold text-[#08193C]">{event.year}</h4>
                          <p className="text-[#3A55A5] font-roboto leading-relaxed mt-1">
                            {event.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-colors duration-300 z-10"
              aria-label="Previous decade"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-colors duration-300 z-10"
              aria-label="Next decade"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-2">
              {decadesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToDecade(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out ${index === activeDecadeIndex ? 'bg-gradient-to-b from-[#F5872E] to-[#3A55A5] scale-125' : 'bg-gray-300'}`}
                  aria-label={`Go to ${decadesData[index].name}`}
                />
              ))}
            </div>
          </div>

          {/* Current decade indicator */}
          <div className="flex justify-end items-center mt-4 px-2">
            <div className="text-sm text-[#3A55A5] font-roboto">
              {activeDecadeIndex + 1} / {decadesData.length}
            </div>
          </div>
        </div>
      </div>

      {/* Add subtle background elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>

      {/* Add Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </section>
  );
}