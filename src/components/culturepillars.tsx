// components/CulturePillars.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

export default function CulturePillars() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Updated values data with 4P's of Sustainability
  const values = [
    {
      title: "Purpose",
      description: "An affirmation of our organisation's reason for being in existence and driving our mission forward.",
      icon: "fas fa-bullseye",
      color: "from-[#3A55A5] to-[#4A6BC5]",
    },
    {
      title: "People",
      description: "The positive impact our employees, partners and communities have on our business success.",
      icon: "fas fa-users",
      color: "from-[#F5872E] to-[#FFA057]",
    },
    {
      title: "Planet",
      description: "Our commitment to minimizing environmental impact and promoting sustainable practices.",
      icon: "fas fa-globe-americas",
      color: "from-[#40A748] to-[#50C758]",
    },
    {
      title: "Profit",
      description: "Generating sustainable value for our stakeholders while maintaining ethical business practices.",
      icon: "fas fa-chart-line",
      color: "from-[#3ABEEE] to-[#5AD0FF]",
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.2 });

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  return (
    <section
      id="culture-pillars"
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-gray-200 to-white overflow-hidden"
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
              Culture Pillars
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#3A55A5] font-roboto max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            The 4P&apos;s that guide our sustainable business practices and long-term vision
          </p>
        </div>

        {/* Simple 2x2 Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} text-white shadow-lg`}>
                  <i className={`${value.icon} text-lg`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-din font-bold text-[#08193C] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[#3A55A5] font-roboto">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>

      {/* Add Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </section>
  );
}