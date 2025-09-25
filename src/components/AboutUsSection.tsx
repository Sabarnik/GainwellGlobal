'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="relative py-16 bg-white overflow-hidden"
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
        {/* Section Header - Updated to match other sections */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#08193C] relative inline-block">
            <span className="relative">
              Engineering World&apos;s Progress Since 1944
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#3A55A5] max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            Engineering World&apos;s Progress Since 1944
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Content */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-700 ease-out delay-150 ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-6 opacity-0'
            }`}
          >
            <div className="bg-white p-6 sm:p-8 rounded-xl">
              <p className="text-[#3A55A5] mb-6 leading-relaxed text-base sm:text-lg">
                Gainwell Group is a leading Capital goods and Engineering solution provider with a rich legacy spanning over eight decades. We deliver cutting-edge equipment and services across construction, infrastructure, mining, material handling, compression sectors, defence and technology — empowering India&apos;s growth through innovation and engineering excellence.
              </p>

              <p className="text-[#3A55A5] mb-8 leading-relaxed text-base sm:text-lg">
                Our diverse portfolio includes partnerships with global leaders like Caterpillar, Bharat Benz, Lintec & Linnhoff, and Etnyre, enabling us to offer world-class solutions tailored to the Indian market.
              </p>

              <Link
                href="/"
                className="inline-flex items-center text-lg font-semibold group"
              >
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-700 ease-out delay-300 ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-6 opacity-0'
            }`}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl h-64 sm:h-80 md:h-96 lg:h-[480px]">
              <Image
                src={`${basePath}/Story-Wall-1.jpg`}
                alt="Gainwell Heavy Equipment"
                fill
                className="object-cover"
                style={{ transform: isVisible ? 'scale(1)' : 'scale(1.05)' }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#08193C]/70 via-[#08193C]/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <div
                  className={`transition-all duration-700 ease-out delay-500 ${
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-6 opacity-0'
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl text-white font-bold mb-2 leading-tight">
                    Innovation in Infrastructure
                  </h3>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    Delivering cutting-edge solutions for India&apos;s growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add subtle background elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>
    </section>
  );
}