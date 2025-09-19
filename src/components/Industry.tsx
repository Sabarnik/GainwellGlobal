'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
interface IndustrySection {
    id: number
    title: string
    description?: string
    image?: string
}

const IndustryCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLDivElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const industries: IndustrySection[] = [
        {
            id: 1,
            title: 'Defence',
            description: 'Advanced defense solutions and technologies for national security',
            image: `${basePath}/defence.jpg`,
        },
        {
            id: 2,
            title: 'Mining',
            description: 'Comprehensive mining equipment and services for resource extraction',
            image: `${basePath}/mining.jpg`,
        },
        {
            id: 3,
            title: 'Technology',
            description: 'Cutting-edge technological innovations for the digital age',
            image: `${basePath}/technology.jpeg`,
        },
        {
            id: 4,
            title: 'Infrastructure',
            description: 'Safety approach infrastructure development',
            image: `${basePath}/infrastructure.jpg`,
        },
        {
            id: 5,
            title: 'Energy',
            description: 'Sustainable energy solutions for a greener future',
            image: `${basePath}/energy.jpg`,
        },
        {
            id: 6,
            title: 'Material Handling',
            description: 'Efficient material handling systems for industrial operations',
            image: `${basePath}/material-handling.jpg`,
        },
    ];
    const totalItems = industries.length

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

    // Auto-play functionality
    useEffect(() => {
        if (!isHovering) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % totalItems)
            }, 2500)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isHovering, totalItems])

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalItems)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
    }

    const getItemStyle = (index: number) => {
        const angle = ((index - currentIndex) * 360) / totalItems
        const isActive = index === currentIndex
        const distance = Math.abs(index - currentIndex)
        const minDistance = Math.min(distance, totalItems - distance)

        const scale = isActive ? 1.15 : Math.max(0.7, 1 - minDistance * 0.15)

        const zIndex = isActive ? 10 : Math.max(1, 10 - minDistance)

        return {
            transform: `rotateY(${angle}deg) translateZ(470px) rotateY(${-angle}deg) scale(${scale})`,
            opacity: 1,
            zIndex,
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        }


    }

    const getCardColor = (index: number) => {
        const colors = [
            {
                bg: 'bg-gradient-to-br from-[#F5872E]/90 to-[#F5872E]/70',
                border: 'border-[#F5872E]/30',
                hover: 'hover:shadow-[#F5872E]/50',
                text: 'text-white'
            },
            {
                bg: 'bg-gradient-to-br from-[#40A748]/90 to-[#40A748]/70',
                border: 'border-[#40A748]/30',
                hover: 'hover:shadow-[#40A748]/50',
                text: 'text-white'
            },
            {
                bg: 'bg-gradient-to-br from-[#3A55A5]/90 to-[#3A55A5]/70',
                border: 'border-[#3A55A5]/30',
                hover: 'hover:shadow-[#3A55A5]/50',
                text: 'text-white'
            },
            {
                bg: 'bg-gradient-to-br from-[#3ABEEE]/90 to-[#3ABEEE]/70',
                border: 'border-[#3ABEEE]/30',
                hover: 'hover:shadow-[#3ABEEE]/50',
                text: 'text-white'
            },
            {
                bg: 'bg-gradient-to-br from-[#FAAD54]/90 to-[#FAAD54]/70',
                border: 'border-[#FAAD54]/30',
                hover: 'hover:shadow-[#FAAD54]/50',
                text: 'text-white'
            },
            {
                bg: 'bg-gradient-to-br from-[#EF4D2F]/90 to-[#EF4D2F]/70',
                border: 'border-[#EF4D2F]/30',
                hover: 'hover:shadow-[#EF4D2F]/50',
                text: 'text-white'
            }
        ]
        return colors[index % colors.length]
    }

    return (
        <div
            ref={sectionRef}
            id="industry"
            className="relative w-full min-h-screen bg-gray-100 overflow-hidden flex items-center justify-center py-12"
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

            {/* Main Content Container - Centered with proper spacing */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">

                {/* Title with enhanced scroll animation */}
                <div
                    ref={headingRef}
                    className={`relative text-center mb-8 w-full max-w-4xl transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    {/* Animated gradient lines moving from center to sides */}
                    <div className={`absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#F5872E]/50 to-transparent transform transition-all duration-1000 delay-200 ease-out ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}></div>

                    <div className="relative overflow-hidden py-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#08193C] relative inline-block">
                            <span className="relative">
                                Industry Presence
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-300 ease-out origin-left scale-x-0"></span>
                                <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
                            </span>
                        </h2>
                    </div>

                    <p className={`text-xl text-[#3A55A5] font-roboto max-w-2xl mx-auto mt-6 transition-all duration-1000 delay-800 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                        Delivering excellence across diverse sectors with innovative solutions
                    </p>
                </div>

                {/* 3D Carousel Container */}
                <div
                    className="relative w-full max-w-6xl h-[500px] perspective-[1200px] mb-2 translate-x-[-190px] translate-y-[-200px]"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className="relative w-full h-full preserve-3d">
                        {industries.map((industry, index) => {
                            const colorSet = getCardColor(index)
                            return (
                                <div
                                    key={industry.id}
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 preserve-3d cursor-pointer"
                                    style={getItemStyle(index)}
                                    onClick={() => goToSlide(index)}
                                >
                                    {/* Card */}
                                    <div className={`w-full h-full rounded-2xl shadow-lg border ${colorSet.bg} ${colorSet.border} ${colorSet.hover} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 preserve-3d overflow-hidden group relative`}>
                                        {/* Image Section - Full Card */}
                                        <div className="relative h-full w-full overflow-hidden rounded-2xl">
                                            {industry.image ? (
                                                <Image
                                                    src={industry.image}
                                                    alt={`${industry.title} industry`}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    priority={index === currentIndex}
                                                />
                                            ) : (
                                                // Fallback gradient background if no image
                                                <div className="w-full h-full bg-gradient-to-br from-[#F5872E] via-[#40A748] to-[#3A55A5]"></div>
                                            )}

                                            {/* Hover Overlay with Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* Content - Always Visible */}
                                            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center">
                                                {/* Title - Centered at bottom */}
                                                <h3 className={`text-3xl font-din font-bold mb-2 text-white drop-shadow-md text-center`}>
                                                    {industry.title}
                                                </h3>

                                                {/* Description - Hidden by default, shown on hover */}
                                                <div className="overflow-hidden transition-all duration-500 h-0 group-hover:h-16">
                                                    <p className="text-white font-roboto text-base leading-relaxed drop-shadow-sm text-center">
                                                        {industry.description}
                                                    </p>
                                                </div>

                                                {/* View More Button - Hidden by default, shown on hover */}
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 mt-4">
                                                    <button className="bg-white text-[#08193C] font-din font-bold py-3 px-6 rounded-full hover:bg-[#F5872E] hover:text-white transition-colors duration-300">
                                                        View More
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Active Indicator */}
                                        {index === currentIndex && (
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-gradient-to-r from-[#F5872E] to-[#40A748] rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Navigation Controls with scroll animation */}
                <div className={`flex items-center justify-center space-x-6 mt-4 transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {/* Previous Button */}
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full bg-[#3A55A5]/20 backdrop-blur-sm border border-[#3A55A5]/30 text-[#3A55A5] hover:bg-[#3A55A5]/30 transition-all duration-300 flex items-center justify-center group"
                        aria-label="Previous industry"
                    >
                        <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex space-x-2">
                        {industries.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${index === currentIndex
                                    ? 'bg-[#F5872E] scale-125 ring-2 ring-[#F5872E]/30'
                                    : 'bg-[#3A55A5]/40 hover:bg-[#3A55A5]/60'
                                    }`}
                                aria-label={`Go to ${industries[index].title}`}
                            >
                                {index === currentIndex && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full bg-[#3A55A5]/20 backdrop-blur-sm border border-[#3A55A5]/30 text-[#3A55A5] hover:bg-[#3A55A5]/30 transition-all duration-300 flex items-center justify-center group"
                        aria-label="Next industry"
                    >
                        <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IndustryCarousel