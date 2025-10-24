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

  // GMC members (requested list)
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Mr. Sunil Kumar Chaturvedi',
      position: 'Vice-Chairperson- Gainwell Group',
      image: `${basePath}/skc.jpg`,
    },
    {   
      id: 2,
      name: 'Mrs. Meena Chaturvedi',
      position: 'Vice Chairperson- Gainwell Group',
      image: `${basePath}/meena.jpg`,
    },
    {
      id: 3,
      name: 'Mr. Manav Kohli',
      position: 'Executive Director & Chief Executive Officer-GCPL',
      image: `${basePath}/Manav-Kohli-crp-ref.jpg`,
    },
    {
      id: 4,
      name: 'Mr. Dipankar Banerjee',
      position: 'Whole Time Director - Gainwell Engineering Pvt Ltd',
      image: `${basePath}/7.jpg`,
    },
    {
      id: 5,
      name: 'Mr. Sujoy Banerjee',
      position: 'Group Chief People Officer, Head Marketing & Head Corporate Communications & Public Relations',
      image: `${basePath}/sujoy.jpg`,
    },
    {
      id: 6,
      name: 'Mr. Saikat Bardhan',
      position: 'Group Head-Legal, Compliance & Internal Audit',
      image: `${basePath}/saikat.jpg`,
    },
   {
      id: 7,
      name: 'Mr. Anurag Srivastava',
      position: 'Managing Director - Parasea Coal Mine Project Pvt. Ltd.',
      image: `${basePath}/anurag.jpeg`,
    },
   {
      id: 8,
      name: 'Mr. Alok Kumar Tripathi',
      position: 'President and Whole Time Director - TIL Ltd',
      image: `${basePath}/4.jpg`,
    },
    {
      id: 9,
      name: 'Mr. Ayan Banerjee',
      position: 'Whole Time Director - TIL Ltd',
      image: `${basePath}/1.jpg`,
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
      { threshold: 0.1 } // Lower threshold for mobile
    );

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  return (
    <section
      id="gmc-team"
      ref={sectionRef}
      className="relative py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.1)_100%)]"></div>
      </div>

      {/* Gradient Lines Animation - Hidden on mobile, visible on larger screens */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`hidden sm:block absolute top-1/4 left-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-[#F5872E]/30 to-transparent transform -skew-y-12 transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}></div>
        <div className={`hidden sm:block absolute top-1/2 right-0 w-1/3 h-1 bg-gradient-to-l from-transparent via-[#3A55A5]/30 to-transparent transform skew-y-12 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}></div>
        <div className={`hidden sm:block absolute bottom-1/4 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#40A748]/20 to-transparent transform transition-all duration-1000 delay-500 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#08193C] relative inline-block px-4">
            <span className="relative">
              Group Management Committee
              <span className={`absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#3A55A5] max-w-2xl mx-auto px-4 transition-all duration-1000 delay-700 ease-out">
            Meet the GMC members — core leadership driving Gainwell & group strategy.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm sm:shadow-md border border-gray-100 transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-lg ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
              style={{ transitionDelay: `${index * 75}ms` }} // Reduced delay for mobile
            >
              <div className="relative w-full aspect-square overflow-hidden p-4 sm:p-6">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-gray-100 shadow-sm sm:shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index < 3} // Prioritize loading first 3 images
                  />
                </div>
              </div>

              <div className="p-4 sm:p-6 text-center pt-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight sm:leading-normal">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base text-[#3A55A5] font-medium leading-relaxed">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add subtle background elements - Smaller on mobile */}
      <div className="absolute -bottom-10 -left-10 sm:-bottom-20 sm:-left-20 w-20 h-20 sm:w-40 sm:h-40 rounded-full bg-[#F5872E]/10 blur-xl sm:blur-3xl"></div>
      <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-20 h-20 sm:w-40 sm:h-40 rounded-full bg-[#3A55A5]/10 blur-xl sm:blur-3xl"></div>
    </section>
  );
}