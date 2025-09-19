'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface EventItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  location?: string;
  readMoreLink?: string;
}
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export default function EventsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Events data with web images
  const eventsData: EventItem[] = [
    {
      id: 1,
      title: '100 Years of Caterpillar & 8 Decades of Gainwell Celebrations',
      date: '',
      description: 'Marking 100 Years of Caterpillar — With Pride, Progress, and Partnership. As we celebrated a century of Caterpillar, the evening became a tribute to enduring partnerships, daring innovation, and a shared vision for the future. From legacy-defining machinery to ideas shaping tomorrow, the event highlighted Caterpillar\'s century of influence — and the global network it has powered across industries. At Gainwell, this was more than a celebration. It was a moment of reflection — and a strong reminder of our responsibility to help shape the next era of infrastructure and industrial progress with the same vision and purpose that have driven the past hundred years. Watch the full video and step into a night that brought a century of achievements to life. Here\'s to a hundred years of building — and to all the future we\'ll create, together!',
      image: `${basePath}/e1.jpg`,
      location: 'New Delhi, India',
      readMoreLink: '#'
    },
    {
      id: 2,
      title: 'Gainwell takes immense pride in its association with the prestigious 3.42 km long, three-lane twin tunnel project in Odisha.',
      date: '',
      description: 'We are proud to announce the opening of our state-of-the-art manufacturing facility in Pune.',
      image: `${basePath}/e2.jpg`,
      location: 'Pune, India',
      readMoreLink: '#'
    },
    {
      id: 3,
      title: 'Highlights from Mr. Jim Umpleby’s Visit',
      date: '',
      description: 'Strategic partnership with GreenTech Solutions to develop eco-friendly mining equipment.',
      image: `${basePath}/e3.jpeg`,
      readMoreLink: '#'
    },
    {
      id: 4,
      title: 'CAT DG CPCB IV Flag Off Ceremony at Unnati, Greater Noida',
      date: '',
      description: 'Celebrating our outstanding employees who demonstrated exceptional performance.',
      image: `${basePath}/e4.jpg`,
      location: 'Kolkata, India',
      readMoreLink: '#'
    },
    {
      id: 5,
      title: 'Mr. Sam Vedhakumar M, the new Sr. Vice President of Caterpillar visit at Unnati, Greater Noida',
      date: '',
      description: 'Get ready for our revolutionary new product line with cutting-edge technology.',
      image: `${basePath}/e5.jpg`,
      readMoreLink: '#'
    },
    {
      id: 6,
      title: 'Grand opening of Gainwell new office in Dhanbad',
      date: '',
      description: 'Participate in discussions about the future of heavy equipment technology.',
      image: `${basePath}/e6.jpeg`,
      location: 'Bangalore, India',
      readMoreLink: '#'
    },
    {
      id: 7,
      title: 'Event 7',
      date: '',
      description: 'Expansion into new international markets, bringing our quality equipment worldwide.',
      image: `${basePath}/e7.jpg`,
      location: 'Global',
      readMoreLink: '#'
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

  const handleLoadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 6, eventsData.length));
  };

  const handleRetract = () => {
    setVisibleCount(6);
    // Scroll to the section after retracting
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const showLoadMore = visibleCount < eventsData.length;
  const showRetract = visibleCount > 6;

  return (
    <section
      id="events"
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
        {/* Section Header - Updated to match other sections */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#08193C] relative inline-block">
            <span className="relative">
              Events & Updates
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#3A55A5] max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            Stay updated with our latest achievements, events, and milestones as we continue to grow and innovate.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.slice(0, visibleCount).map((event, index) => {
            return (
              <div
                key={event.id}
                className="group relative h-96 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0
                }}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Dark gradient overlay at the bottom of the card */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                  <span className="text-xs font-semibold text-gray-800">{event.date}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  {event.location && (
                    <div className="flex items-center text-white text-sm mb-2">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                {/* Hover Overlay with Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  {/* Description with white text */}
                  <p className="text-white text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Read More Button */}
                  <button className="w-full text-center py-2 rounded-lg text-sm font-semibold bg-[#3A55A5] text-white hover:opacity-90 transition-opacity">
                    Read More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More and Retract Buttons */}
        <div className={`text-center mt-12 transition-all duration-700 delay-300 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {showLoadMore && (
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center bg-gradient-to-r from-[#3A55A5] to-[#2C417E] text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 mr-4"
            >
              Load More Events
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          )}

          {showRetract && (
            <button
              onClick={handleRetract}
              className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Show Less
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Add subtle background elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F5872E]/10 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#3A55A5]/10 blur-3xl"></div>
    </section>
  );
}