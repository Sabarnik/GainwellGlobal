'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Target, Shield, Building2, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Stats data with Gainwell brand colors
  const achievements = [
    { icon: Target, value: '80+', label: 'Years of Excellence' },
    { icon: Shield, value: '95%', label: 'Customer Satisfaction' },
    { icon: Building2, value: '500+', label: 'Projects Completed' },
    { icon: Globe, value: '25+', label: 'Countries Served' }
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


  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="relative py-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
        >
          <span className="inline-block text-lg font-bold tracking-tight text-[#3A55A5]">
            ABOUT GAINWELL
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08193C] mb-4 tracking-tight">
            Engineering World&apos;s Progress <span className="text-[#F5872E]">Since 1944</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#F5872E] mx-auto rounded-full mb-6"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Text Content */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-700 ease-out delay-150 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}`}
          >
            <div className="bg-white p-6 sm:p-8 rounded-xl h-full">
              <p className="text-[#3A55A5] mb-6 leading-relaxed text-base sm:text-lg">
                Gainwell Group is a leading infrastructure solutions provider with a rich legacy spanning over eight decades.
                We deliver cutting-edge equipment and services across construction, mining, material handling, and compression
                sectors, empowering India&apos;s growth through innovation and engineering excellence.
              </p>

              <p className="text-[#3A55A5] mb-6 leading-relaxed text-base sm:text-lg">
                Our diverse portfolio includes partnerships with global leaders like Caterpillar, Lintec & Linnhoff,
                and Etnyre, enabling us to offer world-class solutions tailored to the Indian market.
              </p>

              <Link
                href="/about-us"
                className="inline-flex items-center text-lg font-semibold mb-8 group"
              >
                <span className="flex items-center text-[#3A55A5] group-hover:text-[#F5872E] transition-colors">
                  Discover Our Story
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Link>

              {/* Achievement Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.label}
                    className={`p-4 rounded-xl bg-[#F5F7FF] text-[#3A55A5] transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#3A55A5] text-white flex-shrink-0">
                        <achievement.icon size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xl sm:text-2xl font-bold">{achievement.value}</div>
                        <div className="text-sm opacity-80 leading-tight">{achievement.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-700 ease-out delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl h-64 sm:h-80 md:h-96 lg:h-full">
              <Image
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Gainwell Heavy Equipment"
                fill
                className="object-cover transition-transform duration-1000 ease-out"
                style={{ transform: isVisible ? 'scale(1)' : 'scale(1.05)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08193C]/70 via-[#08193C]/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <div
                  className={`transition-all duration-700 ease-out delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">
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
    </section>
  );
}