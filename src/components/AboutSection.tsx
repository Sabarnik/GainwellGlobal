// components/AboutSection.tsx
'use client';
import { useCallback } from 'react';
import { useEffect, useState, useRef } from 'react';

export default function AboutUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Timeline data
  const timelineData = [
    {
      year: "1944",
      content: "We started our operations at 6 Church Lane, Calcutta as Dealer for Caterpillar, US",
      icon: "fas fa-flag",
      color: "from-[#F5872E] to-[#FFA057]",
      bgColor: "bg-orange-100"
    },
    {
      year: "1960",
      content: "Enters Joint Venture with Coles Cranes Company Ltd.",
      icon: "fas fa-handshake",
      color: "from-[#3A55A5] to-[#4A6BC5]",
      bgColor: "bg-blue-100"
    },
    {
      year: "1976",
      content: "We expanded our horizons beyond Indian borders, forging new agreements to extend our services to Nepal and Bhutan",
      icon: "fas fa-globe",
      color: "from-[#40A748] to-[#50C758]",
      bgColor: "bg-green-100"
    },
    {
      year: "1985",
      content: "Changes its name to become TIL Limited",
      icon: "fas fa-signature",
      color: "from-[#F5872E] to-[#FFA057]",
      bgColor: "bg-orange-100"
    },
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
    },
    {
      year: "2000",
      content: "Established our First subsidiary in Nepal through wholly owned, Tractors Nepal Private Limited",
      icon: "fas fa-building",
      color: "from-[#F5872E] to-[#FFA057]",
      bgColor: "bg-orange-100"
    },
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
    },
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
  ];

  // Calculate rotation angle based on active index
  const calculateRotation = useCallback((index: number) => {
    return -(index * (360 / timelineData.length));
  }, [timelineData.length]);

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
        setActiveIndex((prev) => (prev + 1) % timelineData.length);
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timelineData.length, isVisible, isHovering]);

  // Update rotation when activeIndex changes
 useEffect(() => {
  setRotation(calculateRotation(activeIndex));
}, [activeIndex, calculateRotation]);

  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? timelineData.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % timelineData.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

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
                {timelineData.map((item, index) => {
                  const angle = (index * (360 / timelineData.length));
                  const radian = (angle * Math.PI) / 180;
                  const radius = 160;
                  const x = Math.round(Math.cos(radian) * radius * 1000) / 1000;
                  const y = Math.round(Math.sin(radian) * radius * 1000) / 1000;


                  const isActive = index === activeIndex;

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

                      onClick={() => goToSlide(index)}
                    >
                      <div className={`w-full h-full rounded-full flex items-center justify-center ${item.bgColor} border-2 border-white shadow-md transition-all duration-300 ease-in-out ${isActive ? 'ring-2 ring-[#3A55A5]' : ''}`}>
                        <span className={`text-sm font-bold ${isActive ? 'text-gray-800' : 'text-gray-600'} transition-all duration-300 ease-in-out`}>
                          {item.year}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white border-4 border-[#3A55A5] shadow-lg flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#3A55A5]">Legacy</div>
                  <div className="text-xs text-gray-500">Since 1944</div>
                </div>
              </div>

              {/* Navigation buttons - positioned further from the wheel */}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 -left-12 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
                aria-label="Previous timeline event"
              >
                <i className="fas fa-chevron-left group-hover:scale-110 transition-transform duration-200"></i>
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
                aria-label="Next timeline event"
              >
                <i className="fas fa-chevron-right group-hover:scale-110 transition-transform duration-200"></i>
              </button>
            </div>
          </div>

          {/* Description Panel - Right Side */}
          <div className="w-1/2">
            <div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-700 ease-in-out"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0
              }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${timelineData[activeIndex].bgColor} mr-4 shadow-md`}>
                  <i className={`${timelineData[activeIndex].icon} text-xl ${timelineData[activeIndex].color.replace('from-', 'text-').split(' ')[0]}`}></i>
                </div>
                <h3 className="text-4xl font-din font-bold text-[#08193C]">{timelineData[activeIndex].year}</h3>
              </div>
              <p className="text-[#3A55A5] font-roboto text-lg leading-relaxed">
                {timelineData[activeIndex].content}
              </p>

              {/* Progress indicator */}
              <div className="mt-8 flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${timelineData[activeIndex].color} transition-all duration-1000 ease-out`}
                    style={{ width: `${((activeIndex + 1) / timelineData.length) * 100}%` }}
                  ></div>
                </div>
                <div className="ml-4 text-sm text-[#3A55A5] font-roboto min-w-[60px]">
                  {activeIndex + 1} / {timelineData.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline Carousel - Visible on mobile */}
        <div className={`lg:hidden relative transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Carousel container */}
          <div
            className="relative h-80 overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Vertical carousel track */}
            <div
              className="h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateY(-${activeIndex * 100}%)` }}
            >
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className="h-full w-full flex-shrink-0 flex items-center justify-center px-6 py-4"
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${item.color} text-white mb-4 shadow-lg transition-all duration-500 ease-in-out`}>
                      <span className="text-sm font-bold">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-din font-bold text-[#08193C] mb-2 transition-all duration-500 ease-in-out">
                      <i className={`${item.icon} mr-2 ${item.color.replace('from-', 'text-').split(' ')[0]}`}></i>
                      {item.year}
                    </h3>
                    <p className="text-[#3A55A5] font-roboto text-sm transition-all duration-500 ease-in-out">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-1/2 -translate-x-1/2 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-colors duration-300 z-10"
              aria-label="Previous slide"
            >
              <i className="fas fa-chevron-up"></i>
            </button>
            <button
              onClick={handleNext}
              className="absolute left-1/2 -translate-x-1/2 bottom-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-colors duration-300 z-10"
              aria-label="Next slide"
            >
              <i className="fas fa-chevron-down"></i>
            </button>

            {/* Indicators - Vertical on the right side */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col justify-center space-y-2">
              {timelineData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out ${index === activeIndex ? 'bg-gradient-to-b from-[#F5872E] to-[#3A55A5] scale-125' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Current slide indicator */}
          <div className="flex justify-end items-center mt-4 px-2">
            <div className="text-sm text-[#3A55A5] font-roboto">
              {activeIndex + 1} / {timelineData.length}
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