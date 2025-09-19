'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ArrowUp
} from 'lucide-react';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface FooterLinkCategory {
  [key: string]: string[];
}

const SleekFooter: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
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
      'CAT',
      'FG Wilson',
      'SEM',
      'SITECH',
      'Tulip',
      'Highwall Miner',
      'Lintec & Linnhoff',
      'Zephir & Trackmobile',
      'TIL',
      'Manitowoc',
      'Hyster',
      'Snorkel',
      'PAUS',
      'Etnyre International',
      'Mak'
    ],
    'Companies': [
      'Gainwell Commosales',
      'Acceleron Solutions',
      'TIL Limited',
      'Gainwell Engineering',
      'Indocrest Transportation',
      'Resurgent Mining Solutions',
      'Asian Infra-Ventures',
      'Parasea Mining',
      'Tractors Nepal'
    ],
    'Community': [
      'Corporate Social Responsibility',
      'Careers',
      'News & Events'
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

  const socialLinks = useMemo(() => [
    { icon: Facebook, href: 'https://www.facebook.com/tillimited/', label: 'Facebook' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/til-limited-ind/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/tillimitedindia', label: 'YouTube' }
  ], []);

  if (!isMounted) {
    return null;
  }

  return (
    <footer className="bg-[#3A55A5] text-white relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F45] to-[#08193C] opacity-95"></div>

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
          {/* Logo only - removed all filters to display as original PNG */}
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

          {/* Social links - positioned to the right on desktop, bottom on mobile */}
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

              {/* Contact Info */}
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

              {/* Newsletter */}
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
                        {(category === 'Our Brands' || category === 'Companies')
                          ? ((category === 'Our Brands' ? showAllBrands : showAllCompanies)
                            ? links
                            : links.slice(0, 5)
                          ).map((link, i) => (
                            <motion.li
                              key={link}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                              viewport={{ once: true, margin: isMobile ? '0px' : '-20px' }}
                            >
                              <Link
                                href="#"
                                className="text-slate-300 hover:text-white text-sm transition-all duration-300 hover:pl-2 block py-1 md:py-0.5 border-l-2 border-transparent hover:border-[#F5872E]"
                              >
                                {link}
                              </Link>
                            </motion.li>
                          ))
                          : links.map((link, i) => (
                            <motion.li
                              key={link}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                              viewport={{ once: true, margin: isMobile ? '0px' : '-20px' }}
                            >
                              <Link
                                href="#"
                                className="text-slate-300 hover:text-white text-sm transition-all duration-300 hover:pl-2 block py-1 md:py-0.5 border-l-2 border-transparent hover:border-[#F5872E]"
                              >
                                {link}
                              </Link>
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
                { text: 'Disclaimer', path: '#' },
                { text: 'Privacy Policy', path: '#' },
                { text: 'Terms of Service', path: '#' },
                { text: 'Sitemap', path: '#' }
              ].map((item) => (
                <motion.div
                  key={item.text}
                  whileHover={{ y: -1 }}
                >
                  <Link
                    href={item.path}
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
  );
};

export default SleekFooter;