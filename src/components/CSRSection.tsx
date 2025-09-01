// components/CSRSection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function CSRSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // CSR initiatives data with actual web images
  const csrData = [
    {
      id: 1,
      title: 'Education & Skill Development',
      description: 'Empowering communities through educational initiatives and vocational training programs that create sustainable livelihoods and foster economic growth.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-graduation-cap',
      color: 'from-[#3A55A5] to-[#4A6BC5]',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Environmental Sustainability',
      description: 'Implementing eco-friendly practices, reducing carbon footprint, and promoting green initiatives to protect our planet for future generations.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-leaf',
      color: 'from-[#40A748] to-[#50C758]',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      title: 'Community Welfare',
      description: 'Supporting local communities through healthcare initiatives, infrastructure development, and social welfare programs that improve quality of life.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18861754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-hands-helping',
      color: 'from-[#F5872E] to-[#FFA057]',
      bgColor: 'bg-orange-100'
    },
    {
      id: 4,
      title: 'Employee Volunteering',
      description: 'Encouraging and facilitating employee participation in social initiatives, creating a culture of giving back and making a positive impact.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-users',
      color: 'from-[#3ABEEE] to-[#4AD0FF]',
      bgColor: 'bg-cyan-100'
    }
  ];

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
        setActiveIndex((prev) => (prev + 1) % csrData.length);
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [csrData.length, isVisible, isHovering]);

  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? csrData.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % csrData.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="csr"
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

        {/* Desktop Layout - Carousel */}
        <div className="hidden lg:block">
          <div
            className="relative h-[500px] overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Carousel track */}
            <div
              className="h-full transition-transform duration-700 ease-in-out flex"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {csrData.map((item) => (
                <div
                  key={item.id}
                  className="w-full h-full flex-shrink-0 flex items-center px-12"
                >
                  <div className="grid grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ease-out">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${item.bgColor} mr-6 shadow-md`}>
                          <i className={`${item.icon} text-2xl ${item.color.replace('from-', 'text-').split(' ')[0]}`}></i>
                        </div>
                        <h3 className="text-3xl font-bold text-[#08193C]">{item.title}</h3>
                      </div>
                      <p className="text-[#3A55A5] text-lg leading-relaxed">
                        {item.description}
                      </p>
                      <button className="bg-gradient-to-r from-[#F5872E] to-[#3A55A5] text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons - Moved further out */}
            <button
              onClick={handlePrev}
              className="absolute -left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
              aria-label="Previous CSR initiative"
            >
              <i className="fas fa-chevron-left group-hover:scale-110 transition-transform duration-200"></i>
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#3A55A5] hover:bg-[#3A55A5] hover:text-white transition-all duration-300 z-10 group"
              aria-label="Next CSR initiative"
            >
              <i className="fas fa-chevron-right group-hover:scale-110 transition-transform duration-200"></i>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
              {csrData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out ${index === activeIndex ? 'bg-gradient-to-r from-[#F5872E] to-[#3A55A5] scale-125' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Current slide indicator */}
          <div className="flex justify-end items-center mt-4 px-2">
            <div className="text-sm text-[#3A55A5]">
              {activeIndex + 1} / {csrData.length}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stacked Cards */}
        <div className="lg:hidden space-y-6">
          {csrData.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bgColor} mr-4 shadow-md`}>
                  <i className={`${item.icon} text-xl ${item.color.replace('from-', 'text-').split(' ')[0]}`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#08193C]">{item.title}</h3>
              </div>

              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              <p className="text-[#3A55A5] text-sm mb-4">
                {item.description}
              </p>

              <button className="w-full bg-gradient-to-r from-[#F5872E] to-[#3A55A5] text-white font-bold py-2 px-4 rounded-full text-sm">
                Learn More
              </button>
            </div>
          ))}
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