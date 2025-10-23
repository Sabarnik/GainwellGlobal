// components/AboutSection.tsx
'use client';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import Image from "next/image";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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
  image: string;
}

export default function AboutUs() {
  const [activeDecadeIndex, setActiveDecadeIndex] = useState(0);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const eventIntervalRef = useRef<number | null>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Timeline data organized by decades - updated with content from the document
  const decadesData: Decade[] = useMemo(() => {
    return [
      {
        name: "1940s",
        years: ["1939-1940","1944"],
        events: [
          {
            year: "1939-1940",
            content: "Powering India's Progress: Dozers, graders, and loaders — paving the way by introducing heavy machinery to a young and ambitious independent India.",
            icon: "fas fa-flag",
            color: "from-[#F5872E] to-[#FFA057]",
            bgColor: "bg-orange-100",
            image: `${basePath}/Story-Wall-2.jpg`,
          },
          {
            year: "1944",
            content: "From 6 Church Lane, Calcutta — a bold beginning to transforming India's industrial future.",
            icon: "fas fa-flag",
            color: "from-[#F5872E] to-[#FFA057]",
            bgColor: "bg-orange-100",
            image: `${basePath}/Story-Wall-1.jpg`,
          },
        ]
      },
      {
        name: "1950s",
        years: ["1956"],
        events: [
          {
            year: "1956",
            content: "Serving the Nation's Need: From refugee resettlement to rebuilding infrastructure, our machines helped shape a resilient post-independence India.",
            icon: "fas fa-hands-helping",
            color: "from-[#40A748] to-[#50C758]",
            bgColor: "bg-green-100",
            image: `${basePath}/Story-Wall-3.jpg`
          }
        ]
      },
      {
        name: "1970s",
        years: ["1971", "1976"],
        events: [
          {
            year: "1971",
            content: "Made in India, Backed by Caterpillar: Local manufacturing begins — enabling faster delivery, greater self-reliance, and a deeper impact on India's industrial growth.",
            icon: "fas fa-industry",
            color: "from-[#F5872E] to-[#FFA057]",
            bgColor: "bg-orange-100",
            image: `${basePath}/Story-Wall-4.jpg`,
          },
          {
            year: "1976",
            content: "Across Borders, Beyond Limits: Expanding into Nepal and Bhutan, our machines knew no borders, carrying progress and reliability across geographies.",
            icon: "fas fa-globe",
            color: "from-[#3A55A5] to-[#4A6BC5]",
            bgColor: "bg-blue-100",
            image: `${basePath}/Story-Wall-5.jpg`
          }
        ]
      },
      {
        name: "1980s",
        years: ["1985"],
        events: [
          {
            year: "1985",
            content: "Diversified Strength: We stepped beyond construction — into power, oil, gas, and specialised off-highway sectors — expanding our capabilities.",
            icon: "fas fa-expand",
            color: "from-[#40A748] to-[#50C758]",
            bgColor: "bg-green-100",
            image: `${basePath}/Story-Wall-6.jpg`
          }
        ]
      },
      {
        name: "1990s",
        years: ["1994", "1998"],
        events: [
          {
            year: "1994",
            content: "50 Years of Trust: Half a century with Caterpillar — a partnership built on trust, powered by performance, and driven by a shared commitment to excellence.",
            icon: "fas fa-award",
            color: "from-[#F5872E] to-[#FFA057]",
            bgColor: "bg-orange-100",
            image: `${basePath}/Story-Wall-7.jpg`
          },
          {
            year: "1998",
            content: "Digital Awakening: Adopted digital diagnostics early, setting a new benchmark for service excellence with faster troubleshooting and proactive maintenance.",
            icon: "fas fa-microchip",
            color: "from-[#3A55A5] to-[#4A6BC5]",
            bgColor: "bg-blue-100",
            image: `${basePath}/Story-Wall-8.jpg`
          }
        ]
      },
      {
        name: "2000s",
        years: ["2000-2010", "2009"],
        events: [
          {
            year: "2000-2010",
            content: "Momentum Builds: As India progressed, so did we, with the launch of the country's first Caterpillar Rental Store and the incorporation of Tractors India Pvt. Ltd (TIPL).",
            icon: "fas fa-rocket",
            color: "from-[#40A748] to-[#50C758]",
            bgColor: "bg-green-100",
            image: `${basePath}/Story-Wall-9.jpg`
          },
          {
            year: "2009",
            content: "Our 3 CRCs — Vantages for Customer Support: From Asansol to Greater Noida and Udaipur, our state-of-the-art Component Rebuild Centers delivered standout service experience.",
            icon: "fas fa-tools",
            color: "from-[#F5872E] to-[#FFA057]",
            bgColor: "bg-orange-100",
            image: `${basePath}/Story-Wall-10.jpg`
          }
        ]
      },
      {
        name: "2010s",
        years: ["2016", "2017", "2018", "2019"],
        events: [
          {
            year: "2016",
            content: "Gainwell Is Born: TIPL emerged as an independent force — Gainwell. We redefined our vision with renewed purpose and guided by enduring core values.",
            icon: "fas fa-seedling",
            color: "from-[#3A55A5] to-[#4A6BC5]",
            bgColor: "bg-blue-100",
            image: `${basePath}/Story-Wall-11.jpg`
          },
          {
            year: "2016",
            content: "CSR — The Art of Giving Back: We began our CSR journey with a strong commitment to community care, partnering with NGOs for skill development, education, and healthcare.",
            icon: "fas fa-hand-holding-heart",
            color: "from-[#40A748] to-[#50C758]",
            bgColor: "bg-green-100",
            image: `${basePath}/Story-Wall-12.jpg`
          },
          {
            year: "2017",
            content: "Srijan — For a Unified, Cohesive Organisation: A landmark workshop that united the Gainwell family, fostering trust, respect, and a culture of togetherness.",
            icon: "fas fa-users",
            color: "from-[#F5872E] to-[#FFA057]",
            bgColor: "bg-orange-100",
            image: `${basePath}/Story-Wall-13.jpg`
          },
          {
            year: "2018",
            content: "First Low-Height Miner in India: Introduced India's first low-height Continuous Miner — transforming underground mining with safer, efficient, low-seam operations.",
            icon: "fas fa-hard-hat",
            color: "from-[#3A55A5] to-[#4A6BC5]",
            bgColor: "bg-blue-100",
            image: `${basePath}/Story-Wall-14.jpg`
          },
          {
            year: "2019",
            content: "Launch of UNNATI: Our Greater Noida facility redefined sustainable manufacturing with zero-emission, zero-waste practices — earning LEED Platinum V4 certification.",
            icon: "fas fa-leaf",
            color: "from-[#40A748] to-[#50C758]",
            bgColor: "bg-green-100",
            image: `${basePath}/Story-Wall-15.jpg`
          }
        ]
      },
      {
        name: "2020s",
        years: ["2023", "2024", "2025"],
        events: [
          {
            year: "2023",
            content: "Rebuild, Reman, Recreate: A Sustainable Dream: A testament to our unmatched capability and engineering excellence, giving world-class mining machines new life in India.",
            icon: "fas fa-recycle",
            color: "from-[#3A55A5] to-[#4A6BC5]",
            bgColor: "bg-blue-100",
            image: `${basePath}/Story-Wall-17.jpg`
          },
          {
            year: "2024",
            content: "TIL Acquisition: Acquired by Gainwell Group through its group entity Indocrest Defence Services Private Limited (IDSPL) and a new management team is apponted.",
            icon: "fas fa-recycle",
            color: "from-[#3A55A5] to-[#4A6BC5]",
            bgColor: "bg-blue-100",
            image: `${basePath}/TIL a.jfif`
          },
          {
            year: "2025",
            content: "A Digital Revolution — Redefining Customer Experience: We fast-tracked our digital journey with innovations like Samriddhi, FSM, and Customer Connect.",
            icon: "fas fa-digital-tachograph",
            color: "from-[#40A748] to-[#50C758]",
            bgColor: "bg-green-100",
            image: `${basePath}/Story-Wall-18.jpg`
          },
          {
            year: "2025",
            content: "Conquering Greater Heights: We proudly unveiled our highest office in Leh — 3,500 metres above sea level — expanding our reach to serve at altitudes up to 4,500 metres.",
            icon: "fas fa-mountain",
            color: "from-[#F5872E] to-[#FFA057]",
            bgColor: "bg-orange-100",
            image: `${basePath}/Story-Wall-19.jpg`
          },
          {
            year: "2025",
            content: "Ranked 49 among India's Best Places to Work: Certified seven years in a row, we take pride in our people-first culture and commitment to diversity.",
            icon: "fas fa-trophy",
            color: "from-[#3A55A5] to-[#4A6BC5]",
            bgColor: "bg-blue-100",
            image: `${basePath}/Story-Wall-20.jpg`
          }
        ]
      }
    ];
  }, []);

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
  // Auto-play carousel with hover pause (decades)
  useEffect(() => {
    let intervalId: number | null = null;

    console.debug('[Timeline] autoplay effect run:', { isVisible, isHovering, isMobile });

    if (isVisible && !isHovering && !isMobile) {
      intervalId = window.setInterval(() => {
        setActiveDecadeIndex((prev) => (prev + 1) % decadesData.length);
      }, 4000);
      console.debug('[Timeline] autoplay started (decades)', intervalId);
    }

    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        console.debug('[Timeline] autoplay cleared (decades)', intervalId);
      }
    };
  }, [decadesData.length, isVisible, isHovering, isMobile]);


  // Auto-rotate events within a decade
  // Auto-rotate events within a decade
  useEffect(() => {
    // clear any previous
    if (eventIntervalRef.current !== null) {
      window.clearInterval(eventIntervalRef.current);
      eventIntervalRef.current = null;
      console.debug('[Timeline] cleared previous event interval');
    }

    // Reset event index when decade changes
    setActiveEventIndex(0);
    console.debug('[Timeline] activeDecadeIndex', activeDecadeIndex, 'events', decadesData[activeDecadeIndex]?.events.length);

    const currentDecade = decadesData[activeDecadeIndex];
    if (currentDecade && currentDecade.events.length > 1 && isVisible && !isHovering && !isMobile) {
      const intervalTime = currentDecade.events.length > 2 ? 6000 : 5000;

      eventIntervalRef.current = window.setInterval(() => {
        setActiveEventIndex((prev) => {
          const next = (prev + 1) % currentDecade.events.length;
          console.debug('[Timeline] event auto-advance', { from: prev, to: next, decade: currentDecade.name });
          return next;
        });
      }, intervalTime);

      console.debug('[Timeline] event interval started', eventIntervalRef.current, 'intervalTime', intervalTime);
    } else {
      console.debug('[Timeline] event auto-rotate not started (conditions):', {
        isVisible,
        isHovering,
        isMobile,
        events: currentDecade?.events.length ?? 0
      });
    }

    return () => {
      if (eventIntervalRef.current !== null) {
        window.clearInterval(eventIntervalRef.current);
        console.debug('[Timeline] cleared event interval on cleanup', eventIntervalRef.current);
        eventIntervalRef.current = null;
      }
    };
  }, [activeDecadeIndex, isVisible, isHovering, isMobile, decadesData]);



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

  const handlePrevEvent = () => {
    const currentDecade = decadesData[activeDecadeIndex];
    setActiveEventIndex(activeEventIndex === 0 ? currentDecade.events.length - 1 : activeEventIndex - 1);
  };

  const handleNextEvent = () => {
    const currentDecade = decadesData[activeDecadeIndex];
    setActiveEventIndex((activeEventIndex + 1) % currentDecade.events.length);
  };

  const currentDecade = decadesData?.[activeDecadeIndex] ?? decadesData?.[0] ?? null;
  const currentEvent =
    currentDecade?.events?.[activeEventIndex] ??
    currentDecade?.events?.[0] ??
    null;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
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
          className={`text-center mb-10 md:mb-16 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-din font-bold text-[#08193C] relative inline-block">
            <span className="relative">
              The Wheel Of Time
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-[#3A55A5] font-roboto max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
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

              {/* Event display with auto-slide for multiple events */}
              <div className="relative">
                {/* Event Image */}
                <Image
                  key={currentEvent.image}
                  src={currentEvent.image}
                  alt={currentEvent.year}
                  width={800}
                  height={1000}
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
                  loading="lazy"
                />


                {/* Event content */}
                <div className="flex items-start mt-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentEvent.bgColor} mr-4 shadow-md flex-shrink-0`}>
                    <i className={`${currentEvent.icon} text-lg ${currentEvent.color.replace('from-', 'text-').split(' ')[0]}`}></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-din font-bold text-[#08193C]">{currentEvent.year}</h4>
                    <p className="text-[#3A55A5] font-roboto leading-relaxed mt-1">
                      {currentEvent.content}
                    </p>
                  </div>
                </div>

                {/* Event navigation for decades with multiple events */}
                {currentDecade.events.length > 1 && (
                  <div className="flex justify-center mt-6 space-x-4">
                    <button
                      onClick={handlePrevEvent}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-colors duration-300"
                      aria-label="Previous event"
                    >
                      <i className="fas fa-chevron-left text-sm"></i>
                    </button>

                    {/* Event indicator */}
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {currentDecade.events.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeEventIndex ? 'bg-[#3A55A5] scale-125' : 'bg-gray-300'
                              }`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleNextEvent}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-colors duration-300"
                      aria-label="Next event"
                    >
                      <i className="fas fa-chevron-right text-sm"></i>
                    </button>
                  </div>
                )}
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

        {/* Mobile Layout - Visible on mobile and tablet */}
        <div className="lg:hidden">
          {/* Mobile Decade Selector - Horizontal Scroll */}
          <div className="mb-6 overflow-x-auto pb-2">
            <div className="flex space-x-3 px-1">
              {decadesData.map((decade, index) => (
                <button
                  key={index}
                  onClick={() => goToDecade(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${index === activeDecadeIndex
                    ? 'bg-gradient-to-r from-[#3A55A5] to-[#40A748] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {decade.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Content */}
          <div
            className="bg-white rounded-xl p-5 shadow-lg border border-gray-100"
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => setIsHovering(false)}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-din font-bold text-[#08193C]">{currentDecade.name}</h3>
              <div className="text-xs text-[#3A55A5] font-roboto bg-gray-100 px-2 py-1 rounded-full">
                {currentDecade.events.length} Event{currentDecade.events.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Event display with auto-slide for multiple events */}
            <div className="relative">
              {/* Event Image */}
              <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                  <Image
                    key={currentEvent.image}
                    src={currentEvent.image}
                    alt={`${currentEvent.year} - ${currentDecade.name}`}
                    width={800}
                    height={480}
                    className="w-full h-48 md:h-64 object-cover rounded-lg"
                    priority={false}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Event content */}
              <div className="flex items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentEvent.bgColor} mr-3 shadow-md flex-shrink-0`}>
                  <i className={`${currentEvent.icon} text-base ${currentEvent.color.replace('from-', 'text-').split(' ')[0]}`}></i>
                </div>
                <div>
                  <h4 className="text-lg font-din font-bold text-[#08193C]">{currentEvent.year}</h4>
                  <p className="text-sm text-[#3A55A5] font-roboto leading-relaxed mt-1">
                    {currentEvent.content}
                  </p>
                </div>
              </div>

              {/* Event navigation for decades with multiple events */}
              {currentDecade.events.length > 1 && (
                <div className="flex justify-center mt-5 space-x-3">
                  <button
                    onClick={handlePrevEvent}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-colors duration-300"
                    aria-label="Previous event"
                  >
                    <i className="fas fa-chevron-left text-xs"></i>
                  </button>

                  {/* Event indicator */}
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      {currentDecade.events.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === activeEventIndex ? 'bg-[#3A55A5] scale-125' : 'bg-gray-300'
                            }`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleNextEvent}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-colors duration-300"
                    aria-label="Next event"
                  >
                    <i className="fas fa-chevron-right text-xs"></i>
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrev}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-colors duration-300"
                aria-label="Previous decade"
              >
                <i className="fas fa-chevron-left text-sm"></i>
              </button>

              {/* Progress indicator */}
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-[#3A55A5] to-[#40A748] transition-all duration-500 ease-out"
                    style={{ width: `${((activeDecadeIndex + 1) / decadesData.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-[#3A55A5] font-roboto">
                  {activeDecadeIndex + 1} / {decadesData.length}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-colors duration-300"
                aria-label="Next decade"
              >
                <i className="fas fa-chevron-right text-sm"></i>
              </button>
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