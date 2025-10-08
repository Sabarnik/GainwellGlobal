'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  X
} from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface FooterLinkItem {
  label: string;
  href: string;
}

interface FooterLinkCategory {
  [key: string]: string[] | FooterLinkItem[];
}

interface BusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: string;
}

// Business Modal Component (similar to IndustryModal)
const BusinessModal: React.FC<BusinessModalProps> = ({ isOpen, onClose, business }) => {
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

  if (!isOpen) return null;

  // Get company logos and descriptions based on business type
  const getBusinessDetails = (businessName: string) => {
    switch (businessName.toLowerCase()) {
      case 'infrastructure':
        return [
          {
            src: `${basePath}/tractors-india.png`,
            description: 'TIL Limited is engaged in the design, manufacturing, and marketing of a comprehensive selection of material handling and port equipment specifically tailored for the Indian market.',
            learnMoreLink: 'https://tilindia.in/'
          },
          {
            src: `${basePath}/gainwell-cat.gif`,
            description: 'GCPL is a major supplier of Caterpillar Construction and Quarry Solutions. Our comprehensive range of products encompasses Backhoe Loaders, Wheel Loaders, Excavators and Motor Graders.',
            learnMoreLink: 'https://www.gainwellindia.com/cat/products/new/construction'
          }
        ];
      case 'energy':
        return [
          {
            src: `${basePath}/gainwell-cat.gif`,
            description: 'GCPL is a major supplier of Caterpillar Power Solutions. Our comprehensive range of products encompasses Diesel and Gas Generator Sets, Industrial and Marine Engines and Solar Power solutions.',
            learnMoreLink: 'https://www.gainwellindia.com/cat/products/new/diesel-generator-set'
          },
          {
            src: `${basePath}/gainwell-engineering.png`,
            description: 'GEPL represents the best in designing, manufacturing, marketing and maintaining underground Room & Pillar equipment and Highwall Miner, for the global customer base.',
            learnMoreLink: 'https://www.gainwellengineering.com/index-india.html'
          },
          {
            src: `${basePath}/tulip.png`,
            description: 'TCPL is a single window solution provider to natural gas distribution sector. We package natural gas compression equipment and provide lifecycle comprehensive operation and maintenance services.',
            learnMoreLink: 'https://www.tulipcompression.com/about-us.html'
          }
        ];
      case 'mining':
        return [
          {
            src: `${basePath}/GainwellTrucking.png`,
            description: 'Gainwell Trucking Private Limited (GTPL), part of the Gainwell Group, is an authorised channel partner for BharatBenz mining trucks, delivering world-class trucking solutions.',
            learnMoreLink: 'https://gainwelltrucking.com/'
          },
          {
            src: `${basePath}/gainwell-cat.gif`,
            description: "GCPL is a major supplier of Caterpillar Mining Solutions. Our comprehensive range of products encompasses Surface and Underground Mining solutions.",
            learnMoreLink: 'https://www.gainwellindia.com/cat/products/new/surface-mining'
          },
          {
            src: `${basePath}/gainwell-engineering.png`,
            description: 'GEPL represents the best in designing, manufacturing, marketing and maintaining underground Room & Pillar equipment and Highwall Miner for the global customer base.',
            learnMoreLink: 'https://www.gainwellengineering.com/index-india.html'
          },
          {
            src: `${basePath}/resurgent.png`,
            description: 'Resurgent Mining is at the forefront of providing innovative services to the mining and infrastructure sectors.',
            learnMoreLink: 'https://resurgentmining.com/'
          }
        ];
      case 'defence':
        return [
          {
            src: `${basePath}/tractors-india.png`,
            description: 'World-leading heavy equipment manufacturer providing robust defense infrastructure solutions and military-grade machinery.',
            learnMoreLink: 'https://tilindia.in/'
          },
          {
            src: `${basePath}/indocrestdefence.png`,
            description: 'At Indocrest Defence Solutions Pvt. Ltd. (IDSPL) innovation meets precision in the realm of military technology.',
            learnMoreLink: 'https://www.idsplindia.com/'
          },
          {
            src: `${basePath}/sensebird1.png`,
            description: 'We provide End-to-End Drone data solutions to enterprises to optimise productivity, ensure site compliance, improve collaboration across all sites and also safety.',
            learnMoreLink: 'https://www.gainwellindia.com/sensebird'
          }
        ];
      case 'technology':
        return [
          {
            src: `${basePath}/acceleron.png`,
            description: 'Acceleron Solutions is committed to delivering tailored IT solutions that drive business transformation and growth.',
            learnMoreLink: 'https://www.sitechindia-ne.com/'
          },
          {
            src: `${basePath}/sitech.png`,
            description: 'SITECH India -NE is an authorized channel partner of Trimble for their Heavy Construction Technology products.',
            learnMoreLink: 'https://example.com/technology/stech-solutions'
          }
        ];
      case 'mobility':
        return [
          {
            src: `${basePath}/indocrest.png`,
            description: 'Connecting the future of Mobility - We at Indocrest Transportation boarded the railway ecosystem by assisting a renowned organisation, Progress Rail in 2018.',
            learnMoreLink: 'https://www.indocrest.in/'
          }
        ];
      case 'material handling':
        return [
          {
            src: `${basePath}/tractors-india.png`,
            description: 'TIL Limited is engaged in the design, manufacturing, and marketing of a comprehensive selection of material handling and port equipment specifically tailored for the Indian market.',
            learnMoreLink: 'https://tilindia.in/'
          }
        ];
      default:
        return [
          {
            src: `${basePath}/gainwell-cat.gif`,
            description: 'Comprehensive solutions across diverse sectors with 80+ years of industry experience.',
            learnMoreLink: 'https://www.gainwellindia.com/'
          }
        ];
    }
  };

  const businessDetails = getBusinessDetails(business);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-4 pb-4">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full mx-4 flex flex-col max-h-[calc(100vh-40px)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="bg-gradient-to-r from-[#F5872E] to-[#3A55A5] p-6 text-white relative flex-shrink-0">
          <h2 className="text-3xl font-bold">{business} Solutions</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {businessDetails.map((detail, index) => (
              <div key={index} className="flex items-center gap-6 py-4 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <div className="flex-shrink-0 flex items-center justify-center w-24 h-24">
                  <Image
                    src={detail.src}
                    alt={business}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {detail.description}
                  </p>
                  <div className="flex justify-end mt-2">
                    <a
                      href={detail.learnMoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold hover:text-[#F5872E] transition-colors duration-300 text-sm"
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
  );
};

const SleekFooter: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);

  const footerLinks = useMemo<FooterLinkCategory>(() => ({
    'Our Businesses': [
      'Infrastructure',
      'Energy',
      'Mining',
      'Defence',
      'Technology',
      'Mobility',
      'Material Handling'
    ],
    'Our Brands': [
      { label: 'CAT', href: 'https://www.gainwellindia.com/cat' },
      { label: 'FG Wilson', href: 'https://www.gainwellindia.com/fg_wilson' },
      { label: 'SEM', href: 'https://www.gainwellindia.com/sem' },
      { label: 'SITECH', href: 'https://www.sitechindia-ne.com/' },
      { label: 'Tulip', href: 'https://www.tulipcompression.com/about-us.html' },
      { label: 'Highwall Miner', href: 'https://www.gainwellindia.com/highwall' },
      { label: 'Lintec & Linnhoff', href: 'https://www.gainwellindia.com/lintec-linnhoff' },
      { label: 'Zephir & Trackmobile', href: 'https://www.gainwellindia.com/zephir-trackmobile' },
      { label: 'TIL', href: 'https://www.tilindia.in/category' },
      { label: 'Manitowoc', href: 'https://www.tilindia.in/category' },
      { label: 'Hyster', href: 'https://www.tilindia.in/category' },
      { label: 'Snorkel', href: 'https://www.tilindia.in/category' }
    ],
    'Companies': [
      { label: 'Gainwell CAT', href: 'https://www.gainwellindia.com/cat' },
      { label: 'Acceleron Solutions', href: 'https://acceleronsolutions.io/' },
      { label: 'TIL Limited', href: 'https://tilindia.in/' },
      { label: 'Gainwell Engineering', href: 'https://www.gainwellengineering.com/index-india.html' },
      { label: 'Tractors Nepal', href: 'http://www.tractorsnepal.com/' },
      { label: 'Tulip Compression', href: 'https://www.tulipcompression.com/about-us.html' }
    ],
    'Community': [
      { label: 'Corporate Social Responsibility', href: '#csr-grid' }
    ]
  }), []);

  const checkIfMobile = useCallback(() => {
    if (typeof window === 'undefined') return;

    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);

    if (mobile) {
      setExpandedSections({});
      setShowAllBrands(false);
      setShowAllCompanies(false);
    } else {
      const allExpanded: Record<string, boolean> = {};
      Object.keys(footerLinks).forEach(key => {
        allExpanded[key] = true;
      });
      setExpandedSections(allExpanded);
      setShowAllBrands(false);
      setShowAllCompanies(false);
    }
  }, [footerLinks]);

  const toggleVisibility = useCallback(() => {
    if (typeof window === 'undefined') return;

    setIsVisible(window.pageYOffset > 300);
  }, []);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== 'undefined') {
      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);
      window.addEventListener('scroll', toggleVisibility);

      return () => {
        window.removeEventListener('resize', checkIfMobile);
        window.removeEventListener('scroll', toggleVisibility);
      };
    }
  }, [checkIfMobile, toggleVisibility]);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const toggleShowAllBrands = useCallback(() => {
    setShowAllBrands(prev => !prev);
  }, []);

  const toggleShowAllCompanies = useCallback(() => {
    setShowAllCompanies(prev => !prev);
  }, []);

  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Business modal functions
  const openBusinessModal = useCallback((business: string) => {
    setSelectedBusiness(business);
    setIsBusinessModalOpen(true);
  }, []);

  const closeBusinessModal = useCallback(() => {
    setIsBusinessModalOpen(false);
    setSelectedBusiness(null);
  }, []);

  const socialLinks = useMemo(() => [
    { icon: Facebook, href: 'https://www.facebook.com/GainwellIndia', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/gcpl_india/', label: 'Instagram' },
    { icon: FaXTwitter, href: 'https://x.com/GainwellIndia', label: 'X' },
    { icon: Youtube, href: 'https://www.youtube.com/@gainwellindia', label: 'YouTube' }
  ], []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <footer className="bg-[#3A55A5] text-white relative overflow-hidden w-full">
        <div className=""></div>

        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full p-3 md:p-4 shadow-lg bg-gradient-to-r from-[#F5872E] to-[#EF4D2F] hover:to-[#EF4D2F]/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <ArrowUp size={isMobile ? 18 : 20} className="text-white" />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10 relative z-10 w-full">
          {/* Top section with logo and social links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="inline-block">
                <Image
                  src={`${basePath}/ftr-logo.png`}
                  alt="Gainwell Group"
                  width={180}
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
            </motion.div>

            <div className="flex space-x-2 w-full sm:w-auto justify-center sm:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-[#1a2233] hover:bg-[#3A55A5] rounded-lg flex items-center justify-center transition-all border border-[#3A55A5]/50 hover:border-[#3A55A5] shadow-sm"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} className="text-slate-300 hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 w-full">
            {/* Column 1 - Contact Info */}
            <div className="md:col-span-2 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: isMobile ? '0px' : '-50px' }}
                className="flex flex-col h-full"
              >
                <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                  With over 80 years of experience, Gainwell Group provides integrated solutions
                  for construction, mining, power equipment, and infrastructure development.
                </p>

                <div className="space-y-2.5 text-sm mb-6">
                  <div className="flex items-center space-x-3">
                    <Mail size={14} className="text-[#F5872E] flex-shrink-0" />
                    <Link href="mailto:info@gainwellgroup.com" className="text-slate-300 hover:text-white break-words">
                      info@gainwellgroup.com
                    </Link>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={14} className="text-[#F5872E] flex-shrink-0" />
                    <Link href="tel:+9103366332000" className="text-slate-300 hover:text-white">
                      +91 033 6633 2000
                    </Link>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin size={14} className="text-[#F5872E] mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 hover:text-white">
                      Gainwell Group Headquarters<br />
                      Kolkata, West Bengal, India
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-3 text-slate-400 uppercase tracking-wider">
                    Stay Updated
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-3 py-2 bg-[#1a2233] border border-[#3A55A5]/50 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#F5872E] focus:border-[#F5872E] placeholder:text-slate-500"
                    />
                    <motion.button
                      className="bg-gradient-to-r from-[#F5872E] to-[#EF4D2F] p-2 rounded flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight size={16} className="text-white" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Column 2-5 - Links */}
            <div className="md:col-span-2 lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 w-full">
                {Object.entries(footerLinks).map(([category, links], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: isMobile ? '0px' : '-50px' }}
                    className={`border-b border-[#3A55A5]/30 md:border-none pb-4 md:pb-0 ${category === 'Companies' || category === 'Our Brands' ? 'sm:col-span-1' : ''
                      }`}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer md:cursor-auto py-2"
                      onClick={() => isMobile && toggleSection(category)}
                      onKeyDown={(e) => {
                        if (isMobile && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault();
                          toggleSection(category);
                        }
                      }}
                      role="button"
                      tabIndex={isMobile ? 0 : -1}
                      aria-expanded={isMobile ? expandedSections[category] : undefined}
                    >
                      <h4 className="text-sm font-semibold text-[#F5872E] uppercase tracking-wider">
                        {category}
                      </h4>
                      {isMobile && (
                        <span className="md:hidden">
                          {expandedSections[category] ? (
                            <ChevronUp size={18} className="text-slate-300" />
                          ) : (
                            <ChevronDown size={18} className="text-slate-300" />
                          )}
                        </span>
                      )}
                    </div>

                    <AnimatePresence>
                      {(isMobile ? expandedSections[category] : true) && (
                        <motion.ul
                          className="mt-3 md:mt-4 space-y-2 md:space-y-2.5"
                          initial={isMobile ? { height: 0, opacity: 0 } : { height: "auto", opacity: 1 }}
                          animate={isMobile ? { height: expandedSections[category] ? "auto" : 0, opacity: expandedSections[category] ? 1 : 0 } : { height: "auto", opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {(category === 'Our Brands' || category === 'Companies' || category === 'Community')
                            ? ((category === 'Our Brands' ? showAllBrands : category === 'Companies' ? showAllCompanies : true)
                              ? links
                              : links.slice(0, 5)
                            ).map((link, i) => {
                              const linkItem = link as FooterLinkItem;
                                function handleNavClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
                                // For anchor links (e.g., #csr-grid), scroll smoothly to the section if on the same page
                                const href = (event.currentTarget as HTMLAnchorElement).getAttribute('href');
                                if (href && href.startsWith('#')) {
                                  event.preventDefault();
                                  const target = document.querySelector(href);
                                  if (target) {
                                  target.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }
                                }

                              return (
                                <motion.li
                                  key={linkItem.label}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                                  viewport={{ once: true, margin: isMobile ? '0px' : '-20px' }}
                                >
                                  <Link
                                    href={linkItem.href}
                                    className="text-slate-300 hover:text-white text-sm transition-all duration-300 hover:pl-2 block py-1 md:py-0.5 border-l-2 border-transparent hover:border-[#F5872E]"
                                    onClick={category === 'Community' ? handleNavClick : undefined}
                                  >
                                    {linkItem.label}
                                  </Link>
                                </motion.li>
                              );
                            })
                            : (links as string[]).map((link, i) => (
                              <motion.li
                                key={link}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                                viewport={{ once: true, margin: isMobile ? '0px' : '-20px' }}
                              >
                                {category === 'Our Businesses' ? (
                                  <button
                                    onClick={() => openBusinessModal(link)}
                                    className="text-slate-300 hover:text-white text-sm transition-all duration-300 hover:pl-2 block py-1 md:py-0.5 border-l-2 border-transparent hover:border-[#F5872E] text-left w-full"
                                  >
                                    {link}
                                  </button>
                                ) : (
                                  <Link
                                    href="#"
                                    className="text-slate-300 hover:text-white text-sm transition-all duration-300 hover:pl-2 block py-1 md:py-0.5 border-l-2 border-transparent hover:border-[#F5872E]"
                                  >
                                    {link}
                                  </Link>
                                )}
                              </motion.li>
                            ))
                          }

                          {(category === 'Our Brands' || category === 'Companies') && links.length > 5 && (
                            <motion.li
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              viewport={{ once: true }}
                            >
                              <button
                                onClick={category === 'Our Brands' ? toggleShowAllBrands : toggleShowAllCompanies}
                                className="text-[#F5872E] hover:text-[#EF4D2F] text-sm font-medium flex items-center transition-colors mt-2"
                              >
                                {(category === 'Our Brands' ? showAllBrands : showAllCompanies) ? (
                                  <>
                                    <span>Show Less</span>
                                    <ChevronUp size={16} className="ml-1" />
                                  </>
                                ) : (
                                  <>
                                    <span>Show More</span>
                                    <ChevronDown size={16} className="ml-1" />
                                  </>
                                )}
                              </button>
                            </motion.li>
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 relative z-10 bg-[#292974] w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <div className="text-xs text-slate-300 text-center md:text-left">
                © 2025 Gainwell Group. All Rights Reserved
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs text-slate-300">
                {[
                  { text: 'Disclaimer', path: 'https://www.gainwellindia.com/disclaimer' },
                  { text: 'Privacy Policy', path: 'https://www.gainwellindia.com/privacy_policy' },
                ].map((item) => (
                  <motion.div key={item.text} whileHover={{ y: -1 }}>
                    <Link
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white hover:underline underline-offset-4 decoration-[#F5872E] transition-colors"
                    >
                      {item.text}
                    </Link>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </footer>

      {/* Business Modal */}
      <BusinessModal
        isOpen={isBusinessModalOpen}
        onClose={closeBusinessModal}
        business={selectedBusiness || ''}
      />
    </>
  );
};

export default SleekFooter;