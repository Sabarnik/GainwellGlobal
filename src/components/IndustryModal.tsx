'use client'
import React from 'react'
import Image from 'next/image'

interface IndustryModalProps {
  isOpen: boolean
  onClose: () => void
  industry: {
    id: number
    title: string
    description?: string
    image?: string
  }
}

const IndustryModal: React.FC<IndustryModalProps> = ({ isOpen, onClose, industry }) => {
  if (!isOpen) return null

  // Get company logos based on industry title
  const getCompanyLogos = (industryTitle: string) => {
    const logos: { src: string; alt: string }[] = []
    
    switch (industryTitle.toLowerCase()) {
      case 'defence':
        logos.push(
          { src: '/logos/cat-logo.png', alt: 'Caterpillar' },
          { src: '/logos/hindustan-logo.png', alt: 'Hindustan' }
        )
        break
      case 'mining':
        logos.push(
          { src: '/logos/cat-logo.png', alt: 'Caterpillar' },
          { src: '/logos/resurgent-logo.png', alt: 'Resurgent Mining Solutions' },
          { src: '/logos/parasea-logo.png', alt: 'Parasea Mining' }
        )
        break
      case 'technology':
        logos.push(
          { src: '/logos/acceleron-logo.png', alt: 'Acceleron Solutions' },
          { src: '/logos/stech-logo.png', alt: 'STECH India' }
        )
        break
      case 'infrastructure':
        logos.push(
          { src: '/logos/til-logo.png', alt: 'TIL Limited' },
          { src: '/logos/lintec-logo.png', alt: 'Lintec & Linnhoff' },
          { src: '/logos/paus-logo.png', alt: 'PAUS' }
        )
        break
      case 'energy':
        logos.push(
          { src: '/logos/fgwilson-logo.png', alt: 'FG Wilson' },
          { src: '/logos/mak-logo.png', alt: 'Mak' },
          { src: '/logos/tulip-logo.png', alt: 'Tulip Compression' }
        )
        break
      case 'material handling':
        logos.push(
          { src: '/logos/trackmobile-logo.png', alt: 'Trackmobile' },
          { src: '/logos/etnyre-logo.png', alt: 'Etnyre International' },
          { src: '/logos/grove-logo.png', alt: 'Grove' }
        )
        break
      default:
        logos.push({ src: '/logos/gainwell-group-logo.png', alt: 'Gainwell Group' })
    }
    
    return logos
  }

  // Get industry-specific description and learn more link
  const getIndustryDetails = (industryTitle: string) => {
    const details = {
      description: '',
      learnMoreLink: '#'
    }
    
    switch (industryTitle.toLowerCase()) {
      case 'defence':
        details.description = 'Gainwell Group provides advanced defense solutions and technologies for national security through our trusted partners including Caterpillar and Hindustan brands. Our comprehensive offerings support defense infrastructure and operational requirements.'
        details.learnMoreLink = '/defence-solutions'
        break
      case 'mining':
        details.description = 'With Resurgent Mining Solutions and Parasea Mining under our umbrella, we deliver innovative, efficient, and sustainable solutions for the mining industry. Our 25-year MDO contract expertise ensures reliable resource extraction.'
        details.learnMoreLink = '/mining-solutions'
        break
      case 'technology':
        details.description = 'Acceleron Solutions, our tech arm, offers cutting-edge software support, IT infrastructure, cloud services, and cybersecurity. Partnered with STECH India for construction technology systems.'
        details.learnMoreLink = '/technology-solutions'
        break
      case 'infrastructure':
        details.description = 'TIL Limited and our partners provide advanced material handling and lifting solutions for infrastructure development. German-engineered asphalt and concrete plants from Lintec & Linnhoff.'
        details.learnMoreLink = '/infrastructure-solutions'
        break
      case 'energy':
        details.description = 'FG Wilson generators, Mak marine engines, and Tulip Compression equipment deliver sustainable energy solutions. Reliable power solutions from 6.8 to 2,500 kVA for diverse industries.'
        details.learnMoreLink = '/energy-solutions'
        break
      case 'material handling':
        details.description = 'Trackmobile railcar movers, Etnyre road maintenance equipment, and Grove lifting solutions provide efficient material handling systems with up to 99.7% operational uptime.'
        details.learnMoreLink = '/material-handling-solutions'
        break
      default:
        details.description = industry.description || 'Innovative solutions delivered with excellence across diverse sectors.'
        details.learnMoreLink = '/solutions'
    }
    
    return details
  }

  const logos = getCompanyLogos(industry.title)
  const industryDetails = getIndustryDetails(industry.title)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#3A55A5]/20 text-[#3A55A5] hover:bg-[#3A55A5]/30 transition-all duration-300 flex items-center justify-center"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Section - Logos */}
          <div className="md:w-2/5 bg-gradient-to-br from-[#F5872E]/10 to-[#3A55A5]/10 p-8 flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-din font-bold text-[#08193C] mb-2">
                {industry.title}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] rounded-full mx-auto"></div>
            </div>
            
            <div className="space-y-6">
              {logos.map((logo, index) => (
                <div key={index} className="flex justify-center">
                  <div className="relative w-32 h-16 bg-white rounded-lg p-2 shadow-md">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="md:w-3/5 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-din font-bold text-[#08193C] mb-4">
                {industry.title} Solutions
              </h2>
              
              <p className="text-gray-700 font-roboto leading-relaxed mb-6">
                {industryDetails.description}
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {industry.title.toLowerCase() === 'defence' && (
                  <>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#F5872E] rounded-full mr-2"></div>
                      <span className="text-sm font-roboto text-gray-600">National Security Solutions</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#40A748] rounded-full mr-2"></div>
                      <span className="text-sm font-roboto text-gray-600">Advanced Defense Technologies</span>
                    </div>
                  </>
                )}
                {industry.title.toLowerCase() === 'mining' && (
                  <>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#F5872E] rounded-full mr-2"></div>
                      <span className="text-sm font-roboto text-gray-600">Sustainable Mining Practices</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#40A748] rounded-full mr-2"></div>
                      <span className="text-sm font-roboto text-gray-600">25+ Years MDO Expertise</span>
                    </div>
                  </>
                )}
                {industry.title.toLowerCase() === 'technology' && (
                  <>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#F5872E] rounded-full mr-2"></div>
                      <span className="text-sm font-roboto text-gray-600">IT Infrastructure & Cloud</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#40A748] rounded-full mr-2"></div>
                      <span className="text-sm font-roboto text-gray-600">Cybersecurity Solutions</span>
                    </div>
                  </>
                )}
                {/* Add similar features for other industries */}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={industryDetails.learnMoreLink}
                className="flex-1 bg-gradient-to-r from-[#F5872E] to-[#3A55A5] text-white font-din font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 text-center"
              >
                Learn More
              </a>
              <button
                onClick={onClose}
                className="flex-1 border-2 border-[#3A55A5] text-[#3A55A5] font-din font-bold py-3 px-6 rounded-full hover:bg-[#3A55A5] hover:text-white transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndustryModal;