// components/OurValues.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

export default function OurValues() {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const sliderIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Updated values data with 4P's of Sustainability
  const values = [
    {
      title: "Purpose",
      description: "An affirmation of our organisation's reason for being in existence and driving our mission forward.",
      detailedDescription: "Our purpose defines why we exist beyond making profits. It's our north star that guides our decisions, inspires our team, and creates meaningful impact in the industries we serve.",
      icon: "fas fa-bullseye",
      color: "from-[#3A55A5] to-[#4A6BC5]",
      features: ["Mission-driven approach", "Long-term vision", "Meaningful impact"]
    },
    {
      title: "People",
      description: "The positive impact our employees, partners and communities have on our business success.",
      detailedDescription: "Our people are our greatest asset. We invest in their growth, value their contributions, and foster an inclusive environment where everyone can thrive and reach their full potential.",
      icon: "fas fa-users",
      color: "from-[#F5872E] to-[#FFA057]",
      features: ["Employee development", "Inclusive culture", "Community engagement"]
    },
    {
      title: "Planet",
      description: "Our commitment to minimizing environmental impact and promoting sustainable practices.",
      detailedDescription: "We recognize our responsibility to protect the environment for future generations. Through sustainable operations, eco-friendly solutions, and responsible resource management, we contribute to a healthier planet.",
      icon: "fas fa-globe-americas",
      color: "from-[#40A748] to-[#50C758]",
      features: ["Environmental stewardship", "Sustainable operations", "Eco-friendly solutions"]
    },
    {
      title: "Profit",
      description: "Generating sustainable value for our stakeholders while maintaining ethical business practices.",
      detailedDescription: "Profit enables us to reinvest in innovation, reward our stakeholders, and continue our mission. We pursue financial success responsibly, ensuring it aligns with our values and long-term sustainability.",
      icon: "fas fa-chart-line",
      color: "from-[#3ABEEE] to-[#5AD0FF]",
      features: ["Sustainable growth", "Stakeholder value", "Ethical profitability"]
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

  // Auto-play slider
  useEffect(() => {
    sliderIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % values.length);
    }, 6000);

    return () => {
      if (sliderIntervalRef.current) {
        clearInterval(sliderIntervalRef.current);
      }
    };
  }, [values.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Reset the auto-play timer
    if (sliderIntervalRef.current) {
      clearInterval(sliderIntervalRef.current);
    }
    sliderIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % values.length);
    }, 6000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % values.length);
    // Reset the auto-play timer
    if (sliderIntervalRef.current) {
      clearInterval(sliderIntervalRef.current);
    }
    sliderIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % values.length);
    }, 6000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + values.length) % values.length);
    // Reset the auto-play timer
    if (sliderIntervalRef.current) {
      clearInterval(sliderIntervalRef.current);
    }
    sliderIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % values.length);
    }, 6000);
  };

  return (
    <section
      id="values"
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
              Our Core Values
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#3A55A5] font-roboto max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out">
            The 4P&apos;s that guide our sustainable business practices and long-term vision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Video Section - Now on the LEFT */}
          <div
            className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} h-full flex flex-col`}
          >
            {/* YouTube Video Container */}
            <div className="relative h-[250px] bg-gray-900 flex-grow">
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#08193C] to-[#3A55A5]">
                  <div className="text-white text-center">
                    <i className="fas fa-play-circle text-5xl mb-3 opacity-80"></i>
                    <p className="font-roboto">Loading video...</p>
                  </div>
                </div>
              )}

              <iframe
                ref={videoRef}
                className="w-full h-full"
                src="https://www.youtube.com/embed/DyNfwjZJEm4?start=1&rel=0&modestbranding=1&showinfo=0"
                title="Our Values"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setVideoLoaded(true)}
              ></iframe>

              {/* Video Title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-din font-bold text-xl">Our Commitment to Sustainability</h3>
                <p className="text-gray-300 font-roboto text-sm mt-1">Learn about our 4P framework</p>
              </div>
            </div>

          </div>

          {/* Enhanced Values Section with Slider - Now on the RIGHT */}
          <div
            className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-100'} h-full`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-din font-bold text-[#08193C]">
                  The 4P&apos;s of Sustainability
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-gray-100 text-[#3A55A5] flex items-center justify-center hover:bg-[#3A55A5] hover:text-white transition-colors"
                  >
                    <i className="fas fa-chevron-left text-sm"></i>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-gray-100 text-[#3A55A5] flex items-center justify-center hover:bg-[#3A55A5] hover:text-white transition-colors"
                  >
                    <i className="fas fa-chevron-right text-sm"></i>
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden flex-grow min-h-[250px]">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="group h-full">
                      <div className="flex items-start gap-5 h-full">
                        <div className={`flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <i className={`${value.icon} text-xl`}></i>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-xl font-din font-bold text-[#08193C] mb-2">
                            {value.title}
                          </h4>
                          <p className="text-[#3A55A5] font-roboto mb-3">
                            {value.description}
                          </p>
                          <p className="text-gray-600 font-roboto text-sm mb-3">
                            {value.detailedDescription}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {value.features.map((feature, featureIndex) => (
                              <span
                                key={featureIndex}
                                className="inline-flex items-center text-xs font-roboto font-medium bg-gray-100 text-[#3A55A5] px-3 py-1 rounded-full"
                              >
                                <i className="fas fa-check-circle text-[#40A748] mr-1.5 text-xs"></i>
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {values.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[#3A55A5] scale-125' : 'bg-gray-300'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <h4 className="text-2xl font-din font-bold text-[#08193C] mb-4">
            Living Our Values
          </h4>
          <p className="text-[#3A55A5] font-roboto text-lg">
            These principles are not just concepts— they are the daily practices that shape our culture, guide our decisions, and define our relationships with clients, partners, and each other.
          </p>
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