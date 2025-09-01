'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface EventItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  category: string;
  location?: string;
  readMoreLink?: string;
}

export default function EventsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Events data with web images
  const eventsData: EventItem[] = [
    {
      id: 1,
      title: 'Annual Conference 2024',
      date: '15-17 March 2024',
      description: 'Join industry leaders and experts for our annual conference focusing on innovation and sustainable growth.',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Conference',
      location: 'New Delhi, India',
      readMoreLink: '#'
    },
    {
      id: 2,
      title: 'New Facility Inauguration',
      date: '28 April 2024',
      description: 'We are proud to announce the opening of our state-of-the-art manufacturing facility in Pune.',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Milestone',
      location: 'Pune, India',
      readMoreLink: '#'
    },
    {
      id: 3,
      title: 'GreenTech Partnership',
      date: '5 May 2024',
      description: 'Strategic partnership with GreenTech Solutions to develop eco-friendly mining equipment.',
      image: 'https://images.unsplash.com/photo-1580554530778-ca36943938b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Partnership',
      readMoreLink: '#'
    },
    {
      id: 4,
      title: 'Employee Excellence Awards',
      date: '12 June 2024',
      description: 'Celebrating our outstanding employees who demonstrated exceptional performance.',
      image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Recognition',
      location: 'Kolkata, India',
      readMoreLink: '#'
    },
    {
      id: 5,
      title: 'New Product Line Launch',
      date: 'Coming Soon',
      description: 'Get ready for our revolutionary new product line with cutting-edge technology.',
      image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Product Launch',
      readMoreLink: '#'
    },
    {
      id: 6,
      title: 'Industry Technology Summit',
      date: '20 July 2024',
      description: 'Participate in discussions about the future of heavy equipment technology.',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Summit',
      location: 'Bangalore, India',
      readMoreLink: '#'
    },
    {
      id: 7,
      title: 'Global Expansion',
      date: '10 August 2024',
      description: 'Expansion into new international markets, bringing our quality equipment worldwide.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Expansion',
      location: 'Global',
      readMoreLink: '#'
    },
    {
      id: 8,
      title: 'Sustainability Initiative',
      date: '5 September 2024',
      description: 'Launching our new sustainability initiative to reduce environmental impact.',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Sustainability',
      readMoreLink: '#'
    },
    {
      id: 9,
      title: 'Customer Appreciation Day',
      date: '15 October 2024',
      description: 'Special event to show appreciation for our loyal customers.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Customer Event',
      location: 'Mumbai, India',
      readMoreLink: '#'
    },
    {
      id: 10,
      title: 'Innovation Workshop',
      date: '5 November 2024',
      description: 'Hands-on workshop exploring the latest innovations in heavy equipment.',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Workshop',
      location: 'Hyderabad, India',
      readMoreLink: '#'
    },
    {
      id: 11,
      title: 'Annual Supplier Meet',
      date: '20 November 2024',
      description: 'Gathering with our suppliers to strengthen partnerships and collaboration.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Networking',
      location: 'Chennai, India',
      readMoreLink: '#'
    },
    {
      id: 12,
      title: 'Year-End Celebration',
      date: '15 December 2024',
      description: 'Celebrating a successful year and looking forward to new achievements.',
      image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Celebration',
      location: 'Goa, India',
      readMoreLink: '#'
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


  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Conference':
        return { bg: 'bg-[#3A55A5]', text: 'text-[#3A55A5]', border: 'border-[#3A55A5]' };
      case 'Milestone':
        return { bg: 'bg-[#F5872E]', text: 'text-[#F5872E]', border: 'border-[#F5872E]' };
      case 'Partnership':
        return { bg: 'bg-[#40A748]', text: 'text-[#40A748]', border: 'border-[#40A748]' };
      case 'Recognition':
        return { bg: 'bg-[#3ABEEE]', text: 'text-[#3ABEEE]', border: 'border-[#3ABEEE]' };
      case 'Product Launch':
        return { bg: 'bg-[#FAAD54]', text: 'text-[#FAAD54]', border: 'border-[#FAAD54]' };
      case 'Summit':
        return { bg: 'bg-[#9C56B8]', text: 'text-[#9C56B8]', border: 'border-[#9C56B8]' };
      case 'Expansion':
        return { bg: 'bg-[#E84C3D]', text: 'text-[#E84C3D]', border: 'border-[#E84C3D]' };
      case 'Sustainability':
        return { bg: 'bg-[#27AE61]', text: 'text-[#27AE61]', border: 'border-[#27AE61]' };
      case 'Customer Event':
        return { bg: 'bg-[#34495E]', text: 'text-[#34495E]', border: 'border-[#34495E]' };
      case 'Workshop':
        return { bg: 'bg-[#8E44AD]', text: 'text-[#8E44AD]', border: 'border-[#8E44AD]' };
      case 'Networking':
        return { bg: 'bg-[#D35400]', text: 'text-[#D35400]', border: 'border-[#D35400]' };
      case 'Celebration':
        return { bg: 'bg-[#C1392B]', text: 'text-[#C1392B]', border: 'border-[#C1392B]' };
      default:
        return { bg: 'bg-[#3A55A5]', text: 'text-[#3A55A5]', border: 'border-[#3A55A5]' };
    }
  };

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
      className="relative py-20 overflow-hidden"
    >
      {/* Dark gradient overlay from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-0"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjgiLz48L2c+PC9zdmc+')]"></div>
      </div>

      {/* Animated gradient elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-[#3A55A5]/20 to-[#F5872E]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-[#40A748]/20 to-[#3ABEEE]/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 z-0"></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
            </svg>
            Latest Updates
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Events & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A55A5] to-[#F5872E]">Updates</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest achievements, events, and milestones as we continue to grow and innovate.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.slice(0, visibleCount).map((event, index) => {
            const categoryColor = getCategoryColor(event.category);

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

                {/* Minimal info always visible */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColor.bg} text-white`}>
                    {event.category}
                  </span>
                </div>

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
                  <button className={`w-full text-center py-2 rounded-lg text-sm font-semibold ${categoryColor.bg} text-white hover:opacity-90 transition-opacity`}>
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
    </section>
  );
}