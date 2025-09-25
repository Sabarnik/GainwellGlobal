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

interface CompanyLogo {
    src: string
    description: string
    learnMoreLink: string
}

interface IndustryModalProps {
    isOpen: boolean
    onClose: () => void
    industry: IndustrySection
}

const IndustryModal: React.FC<IndustryModalProps> = ({ isOpen, onClose, industry }) => {
    // Handle ESC key press
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null

    // Get company logos with individual descriptions and links based on industry title
    const getCompanyLogos = (industryTitle: string): CompanyLogo[] => {
        const logos: CompanyLogo[] = []

        switch (industryTitle.toLowerCase()) {
            case 'defence':
                logos.push(
                    {
                        src: `${basePath}/tractors-india.png`,
                        description: 'World-leading heavy equipment manufacturer providing robust defense infrastructure solutions and military-grade machinery.',
                        learnMoreLink: 'https://tilindia.in/'
                    },
                    {
                        src: `${basePath}/indocrestdefence.png`,
                        description: 'At Indocrest Defence Solutions Pvt. Ltd. (IDSPL) innovation meets precision in the realm of military technology. We stand as a beacon of excellence in the field of defence solutions with an unwavering commitment to serving the Indian Defence sector.',
                        learnMoreLink: 'https://www.idsplindia.com/'
                    },
                    {
                        src: `${basePath}/sensebird1.png`,
                        description: 'We provide End-to-End Drone data solutions to enterprises to optimise productivity, ensure site compliance, improve collaboration across all sites and also safety.',
                        learnMoreLink: 'https://www.gainwellindia.com/sensebird'
                    }
                )
                break
            case 'mining':
                logos.push(
                    {
                        src: `${basePath}/GainwellTrucking.png`,
                        description: 'Gainwell Trucking Private Limited (GTPL), part of the Gainwell Group, is an authorised channel partner for BharatBenz mining trucks, delivering world-class trucking solutions to India\'s mining and infrastructure sectors. Backed by 80 years of legacy and trust, GTPL offers high-performance, durable trucks built for the toughest terrains and toughest jobs.',
                        learnMoreLink: 'https://gainwelltrucking.com/'
                    },
                    {
                        src: `${basePath}/gainwell-cat.gif`,
                        description: "GCPL is a major supplier of Caterpillar Mining Solutions. Our comprehensive range of products encompasses Surface and Underground Mining solutions. Our firm allegiance to be a pivotal entity in country's development has established us as highly technically innovative and reliable enterprise.",
                        learnMoreLink: 'https://www.gainwellindia.com/cat/products/new/surface-mining'
                    },
                    {
                        src: `${basePath}/gainwell-engineering.png`,
                        description: 'GEPL represents the best in designing, manufacturing, marketing and maintaining underground Room & Pillar equipment and Highwall Miner, for the global customer base. The company will also offer products and services related to railways and defence sector.',
                        learnMoreLink: 'https://www.gainwellengineering.com/index-india.html'
                    },
                    {
                        src: `${basePath}/resurgent.png`,
                        description: 'Resurgent Mining is at the forefront of providing innovative services to the mining and infrastructure sectors. We specialise in mining operation contracts, roof bolting, HEMM maintenance, trading, product rebuilds, and custom manufacturing.',
                        learnMoreLink: 'https://resurgentmining.com/'
                    }
                )
                break
            case 'technology':
                logos.push(
                    {
                        src: `${basePath}/acceleron.png`,
                        description: 'Acceleron Solutions is committed to delivering tailored IT solutions that drive business transformation and growth. With a focus on IT infrastructure, cloud services, and cybersecurity, we help our clients navigate the complexities of the digital world.',
                        learnMoreLink: 'https://www.sitechindia-ne.com/'
                    },
                    {
                        src: `${basePath}/sitech.png`,
                        description: 'SITECH India -NE is an authorized channel partner of Trimble for their Heavy Construction Technology products. SITECH India-NE brings an exciting range of new technology to the Indian construction market.',
                        learnMoreLink: 'https://example.com/technology/stech-solutions'
                    }
                )
                break
            case 'infrastructure':
                logos.push(
                    {
                        src: `${basePath}/tractors-india.png`,
                        description: 'TIL Limited is engaged in the design, manufacturing, and marketing of a comprehensive selection of material handling and port equipment specifically tailored for the Indian market.',
                        learnMoreLink: 'https://tilindia.in/'
                    },
                    {
                        src: `${basePath}/gainwell-cat.gif`,
                        description: 'GCPL is a major supplier of Caterpillar Construction and Quarry Solutions. Our comprehensive range of products encompasses Backhoe Loaders, Wheel Loaders, Excavators and Motor Graders. Our ﬁrm allegiance to be a pivotal entity in country\'s infrastructure development has established us as highly technically innovative and reliable enterprise.',
                        learnMoreLink: 'https://www.gainwellindia.com/cat/products/new/construction'
                    }
                )
                break
            case 'energy':
                logos.push(
                    {
                        src: `${basePath}/gainwell-cat.gif`,
                        description: 'GCPL is a major supplier of Caterpillar Power Solutions. Our comprehensive range of products encompasses Diesel and Gas Generator Sets, Industrial and Marine Engines and Solar Power solutions. Our ﬁrm allegiance to be a pivotal entity in country\'s energy development has established us as highly technically innovative and reliable enterprise.',
                        learnMoreLink: 'https://www.gainwellindia.com/cat/products/new/diesel-generator-set'
                    },
                    {
                        src: `${basePath}/gainwell-engineering.png`,
                        description: 'GEPL represents the best in designing, manufacturing, marketing and maintaining underground Room & Pillar equipment and Highwall Miner, for the global customer base. The company will also offer products and services related to railways and defence sector.',
                        learnMoreLink: 'https://www.gainwellengineering.com/index-india.html'
                    },
                    {
                        src: `${basePath}/tulip.png`,
                        description: 'TCPL is a single window solution provider to natural gas distribution sector. We package natural gas compression equipment and provide lifecycle comprehensive operation and maintenance services.',
                        learnMoreLink: 'https://www.tulipcompression.com/about-us.html'
                    }
                )
                break
            case 'material handling':
                logos.push(
                    {
                        src: `${basePath}/tractors-india.png`,
                        description: 'TIL Limited is engaged in the design, manufacturing, and marketing of a comprehensive selection of material handling and port equipment specifically tailored for the Indian market.',
                        learnMoreLink: 'https://tilindia.in/'
                    },
                )
                break
            case 'mobility':
                logos.push(
                    {
                        src: `${basePath}/indocrest.png`,
                        description: 'Connecting the future of Mobility - We at Indocrest Transportation boarded the railway ecosystem by assisting a renowned organisation, Progress Rail in 2018 and went on to partner with other brands who had placed trust in us to make value propositions and to build lasting relationships.',
                        learnMoreLink: 'https://www.indocrest.in/'
                    },
                )
                break
            default:
                logos.push({
                    src: `${basePath}/logos/gainwell-group-logo.png`,
                    description: 'Comprehensive solutions across diverse sectors with 80+ years of industry experience.',
                    learnMoreLink: 'https://example.com/solutions'
                })
        }

        return logos
    }

    const logos = getCompanyLogos(industry.title)
   

    // Calculate dynamic height based on number of items
  
    // const modalHeight = getModalHeight()

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-4 pb-4">
            <div
                className="relative bg-white rounded-2xl max-w-7xl w-full mx-4 flex flex-col max-h-[calc(100vh-40px)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Close Button */}
                <div className="bg-gradient-to-r from-[#F5872E] to-[#3A55A5] p-6 text-white relative flex-shrink-0">
                    <h2 className="text-3xl font-bold">{industry.title} Solutions</h2>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content - All items visible without scrolling */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="space-y-6 h-full">
                        {logos.map((logo, index) => (
                            <div key={index} className="flex items-center gap-8 py-6 px-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">


                                {/* Logo Image — no white box */}
                                <div className="flex-shrink-0 flex items-center justify-center w-32 h-32">
                                    <Image
                                        src={logo.src}
                                        alt={logo.description?.slice(0, 60) ?? 'company logo'}
                                        width={128}
                                        height={128}
                                        className="object-contain"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-between h-full">
                                    <p className="text-gray-700 leading-relaxed text-base line-clamp-4">
                                        {logo.description}
                                    </p>

                                    {/* Learn More Button aligned to right */}
                                    <div className="flex justify-end mt-2">
                                        <a
                                            href={logo.learnMoreLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 font-semibold hover:text-[#F5872E] transition-colors duration-300"
                                        >
                                            Learn More
                                        </a>


                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const IndustryCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [selectedIndustry, setSelectedIndustry] = useState<IndustrySection | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
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
        {
            id: 7,
            title: 'Mobility',
            description: 'Innovative mobility solutions for a connected world',
            image: `${basePath}/mobility.jpg`,
        }
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

    const openModal = (industry: IndustrySection) => {
        setSelectedIndustry(industry)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedIndustry(null)
    }

    const getItemStyle = (index: number) => {
        const angle = ((index - currentIndex) * 360) / totalItems
        const distance = Math.abs(index - currentIndex)
        const minDistance = Math.min(distance, totalItems - distance)

        const isVisible = minDistance <= 1
        const scale = index === currentIndex ? 1.15 : 0.9
        const zIndex = index === currentIndex ? 10 : 5

        return {
            transform: `rotateY(${angle}deg) translateZ(550px) rotateY(${-angle}deg) scale(${scale})`,
            opacity: isVisible ? 1 : 0,
            zIndex,
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
            pointerEvents: isVisible ? 'auto' : 'none',
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
        <>
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

                {/* Main Content Container */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">

                    {/* Title with enhanced scroll animation */}
                    <div
                        ref={headingRef}
                        className={`relative text-center mb-8 w-full max-w-4xl transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    >
                        <div className="relative overflow-hidden py-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#08193C] relative inline-block">
                                <span className="relative">
                                    Industry Presence
                                    <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full transition-all duration-1000 delay-500 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
                                </span>
                            </h2>
                        </div>

                        <p className={`text-xl text-[#3A55A5] max-w-2xl mx-auto mt-6 transition-all duration-1000 delay-800 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
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
                                        style={getItemStyle(index) as React.CSSProperties}
                                        onClick={() => goToSlide(index)}
                                    >
                                        {/* Card */}
                                        <div
                                            className={`w-full h-full rounded-2xl shadow-lg border ${colorSet.bg} ${colorSet.border} ${colorSet.hover} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 preserve-3d overflow-hidden group relative`}
                                        >
                                            {/* Image Section */}
                                            <div className="relative h-full w-full overflow-hidden rounded-2xl">
                                                {industry.image ? (
                                                    <Image
                                                        src={industry.image}
                                                        alt=""
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        priority={index === currentIndex}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-[#F5872E] via-[#40A748] to-[#3A55A5]"></div>
                                                )}

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:opacity-100 transition-opacity duration-500"></div>

                                                {/* Content */}
                                                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center">
                                                    <h3 className="text-3xl font-bold mb-2 text-white drop-shadow-md text-center">
                                                        {industry.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <div className="overflow-hidden transition-all duration-500 h-0 group-hover:h-16">
                                                        <p className="text-white text-base leading-relaxed drop-shadow-sm text-center">
                                                            {industry.description}
                                                        </p>
                                                    </div>

                                                    {/* View More Button */}
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 mt-4">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openModal(industry);
                                                            }}
                                                            className="bg-white text-[#08193C] font-bold py-3 px-6 rounded-full hover:bg-[#F5872E] hover:text-white transition-colors duration-300"
                                                        >
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

                    {/* Navigation Controls */}
                    <div className={`flex items-center justify-center space-x-6 mt-4 transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {/* Previous Button */}
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full bg-[#3A55A5]/20 backdrop-blur-sm border border-[#3A55A5]/30 text-[#3A55A5] hover:bg-[#3A55A5]/30 transition-all duration-300 flex items-center justify-center group"
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
                        >
                            <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <IndustryModal
                isOpen={isModalOpen}
                onClose={closeModal}
                industry={selectedIndustry || industries[0]}
            />
        </>
    )
}

export default IndustryCarousel