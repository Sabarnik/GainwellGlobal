// components/OurTeamSection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

export default function OurTeamSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Mr. Sunil Kumar Chaturvedi',
      position: 'Chairman & Managing Director',
      image: `${basePath}/sunil-kumar.png`,
    },
    {
      id: 2,
      name: 'Mrs. Meena Chaturvedi',
      position: 'Joint Managing Director',
      image: `${basePath}/meena.jpg`,
    },
    {
      id: 3,
      name: 'Mr. Manav Kohli',
      position: 'Executive Director & Chief Executive Officer',
      image: `${basePath}/Manav-Kohli-crp-ref.jpg`,
    },
    {
      id: 4,
      name: 'Mr. Khalifa Al-Ghanim',
      position: 'Director',
      image: `${basePath}/khalifa.jpg`,
    },
    {
      id: 5,
      name: 'Mr. Anis Mokadem',
      position: 'Director',
      image: `${basePath}/anis_mkdm_rsz.jpg`,
    },
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
      id="our-team"
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
          className={`text-center mb-12 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#08193C] relative inline-block">
            <span className="relative">
              Our Leadership Team
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#3A55A5] max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            Meet the experienced professionals driving our vision forward with expertise and dedication.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {teamMembers.slice(0, 3).map((member, index) => (
            <div
              key={member.id}
              className={`bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-700 ease-out hover:scale-[1.02] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative w-full aspect-square overflow-hidden p-6">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              </div>

              <div className="p-6 text-center pt-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#3A55A5] font-medium">{member.position}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row: center the remaining members as a group (like Services) */}
        {teamMembers.length > 3 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
            {teamMembers.slice(3).map((member, idx) => (
              <div
                key={member.id}
                className={`bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-700 ease-out hover:scale-[1.02] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  } w-full sm:w-1/3`}
                style={{ transitionDelay: `${(idx + 3) * 100}ms` }}
              >
                <div className="relative w-full aspect-square overflow-hidden p-6">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>

                <div className="p-6 text-center pt-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#3A55A5] font-medium">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add subtle background elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>
    </section>
  );
}