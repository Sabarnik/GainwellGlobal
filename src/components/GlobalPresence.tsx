'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Types
type OfficeType = 'HQ' | 'Regional HQ' | 'Zonal HQ' | 'Plant' | 'Branch' | 'Manufacturing Plant' | 'Corporate Office' | 'Head Office' | 'Regional Office';

interface Office {
  id: number;
  company: string;
  companyKey: string;
  companyLogo: string;
  companyColor: string;
  companyWebsite: string;
  type: OfficeType;
  address: string;
  city: string;
  state?: string;
  country: string;
  lat?: number;
  lng?: number;
  phone?: string;
  email?: string;
  contact?: string;
}

interface CompanyInfo {
  key: string;
  name: string;
  logo: string;
  website: string;
  color: string;
  description: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Company information with logos from Group Companies
const COMPANIES: CompanyInfo[] = [
  {
    key: 'gainwell-commosales',
    name: 'Gainwell Commosales',
    logo: `${basePath}/team1.png`,
    website: 'https://www.gainwellindia.com/cat',
    color: '#F5872E',
    description: 'With over 80 years of experience, provides integrated solutions for Cat construction, mining, and power equipment.'
  },
  {
    key: 'gainwell-engineering',
    name: 'Gainwell Engineering',
    logo: `${basePath}/team3.png`,
    website: 'https://www.gainwellengineering.com/index-india.html',
    color: '#3ABEEE',
    description: 'Part of Gainwell Group, engaged in manufacturing of capital goods in mining, railways and other heavy industry sectors.'
  },
  {
    key: 'til',
    name: 'TIL Limited',
    logo: `${basePath}/tilIndia.png`,
    website: 'https://tilindia.in/',
    color: '#F1B434',
    description: "Supports India's infrastructure with advanced material handling and lifting solutions."
  },
  {
    key: 'tulip-compression',
    name: 'Tulip Compression',
    logo: `${basePath}/team6.png`,
    website: 'https://www.tulipcompression.com/about-us.html',
    color: '#405A2A',
    description: 'Specializes in industrial compression solutions and services for various sectors including energy and manufacturing.'
  },
  {
    key: 'acceleron',
    name: 'Acceleron Solutions',
    logo: `${basePath}/acceleron1.png`,
    website: 'https://acceleronsolutions.io/',
    color: '#F5872E',
    description: "Gainwell Group's tech arm that offers software support, IT infrastructure, cloud services, and cybersecurity."
  },
  {
    key: 'gainwell-trucking',
    name: 'Gainwell Trucking',
    logo: `${basePath}/final-logo-gainwell.png`,
    website: 'https://www.gainwelltrucking.com',
    color: '#8B4513',
    description: 'Part of the Gainwell Group, authorized channel partner for BharatBenz mining trucks.'
  }
];

// Data from Group Companies Addresses 2.docx - Only India locations
const OFFICES: Office[] = [
  // Gainwell Commosales Offices
  {
    id: 1,
    company: 'Gainwell Commosales Private Limited',
    companyKey: 'gainwell-commosales',
    companyLogo: `${basePath}/team1.png`,
    companyColor: '#F5872E',
    companyWebsite: 'https://www.gainwellindia.com/cat',
    type: 'HQ',
    address: '705, Godrej Waterside, 7th Floor, Tower II, Block DP, Sector V, Salt Lake City, Kolkata - 700091',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    lat: 22.5735,
    lng: 88.4347,
    phone: '+91 33 6644 2000',
    email: 'info@gainwellindia.com'
  },
  {
    id: 2,
    company: 'Gainwell Commosales Private Limited',
    companyKey: 'gainwell-commosales',
    companyLogo: `${basePath}/team1.png`,
    companyColor: '#F5872E',
    companyWebsite: 'https://www.gainwellindia.com/cat',
    type: 'Regional HQ',
    address: 'UNNATI, 1-C/1 Ecotech II, Udyog Vihar, Greater Noida - 201306, Uttar Pradesh',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 28.4744,
    lng: 77.5030,
    phone: '+91 120 665900'
  },
  {
    id: 3,
    company: 'Gainwell Commosales Private Limited',
    companyKey: 'gainwell-commosales',
    companyLogo: `${basePath}/team1.png`,
    companyColor: '#F5872E',
    companyWebsite: 'https://www.gainwellindia.com/cat',
    type: 'Zonal HQ',
    address: 'Plot No. 211, 1st Floor, Sector-A, Zone - B, Mancheswar Industrial Estate, Bhubaneswar - 751 010, Odisha',
    city: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    lat: 20.2961,
    lng: 85.8245,
    phone: '73270 90489, 91010 55384',
    email: 'parts.bbsr@gainwellindia.com'
  },
  {
    id: 4,
    company: 'Gainwell Commosales Private Limited',
    companyKey: 'gainwell-commosales',
    companyLogo: `${basePath}/team1.png`,
    companyColor: '#F5872E',
    companyWebsite: 'https://www.gainwellindia.com/cat',
    type: 'Zonal HQ',
    address: 'Plot No 412, Industrial Area, Phase 9 SAS Nagar Mohali - 160062, Punjab',
    city: 'Mohali',
    state: 'Punjab',
    country: 'India',
    lat: 30.7046,
    lng: 76.7179,
    phone: '0172-5096501, 5096494, 5096595',
    email: 'gcpl.chandigarh@gainwellindia.com'
  },
  {
    id: 5,
    company: 'Gainwell Commosales Private Limited',
    companyKey: 'gainwell-commosales',
    companyLogo: `${basePath}/team1.png`,
    companyColor: '#F5872E',
    companyWebsite: 'https://www.gainwellindia.com/cat',
    type: 'Zonal HQ',
    address: 'Hindustan Tower, 3rd & Ground Floor, NH 37, Beltola, Near Kumbher Tea Warehouse, Guwahati - 781 022, Assam',
    city: 'Guwahati',
    state: 'Assam',
    country: 'India',
    lat: 26.1445,
    lng: 91.7362,
    phone: '+91 9991118682 / 9748966663',
    email: 'gcpl.guwahati@gainwellindia.com'
  },
  {
    id: 6,
    company: 'Gainwell Commosales Private Limited',
    companyKey: 'gainwell-commosales',
    companyLogo: `${basePath}/team1.png`,
    companyColor: '#F5872E',
    companyWebsite: 'https://www.gainwellindia.com/cat',
    type: 'Zonal HQ',
    address: '792, Khasra #34, Pillar #9, Banthra Bazar, Besides Saroj Pipe Factory, Sikanderpur, Banthara, Lucknow-Kanpur NH Road, Lucknow - 226401, U.P.',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.8467,
    lng: 80.9462,
    phone: '+91 522 404 1146-48',
    email: 'pramod.tiwari@gainwellindia.com'
  },
  {
    id: 7,
    company: 'Gainwell Commosales Private Limited',
    companyKey: 'gainwell-commosales',
    companyLogo: `${basePath}/team1.png`,
    companyColor: '#F5872E',
    companyWebsite: 'https://www.gainwellindia.com/cat',
    type: 'Zonal HQ',
    address: 'Village: Kedal, Thana Number: 165, Charku Chowk P.S. Ranchi - Sadar, (Near BIT Mesra Chowk), Dist. Ranchi - 835 217, Jharkhand',
    city: 'Ranchi',
    state: 'Jharkhand',
    country: 'India',
    lat: 23.3441,
    lng: 85.3096,
    phone: '+91 92343 01561 / 62',
    email: 'gcpl.ranchi@gainwellindia.com'
  },
  {
    id: 8,
    company: 'Gainwell Commosales Private Limited',
    companyKey: 'gainwell-commosales',
    companyLogo: `${basePath}/team1.png`,
    companyColor: '#F5872E',
    companyWebsite: 'https://www.gainwellindia.com/cat',
    type: 'Zonal HQ',
    address: 'H 186 - H 136 RIICO Industrial Area, Sukher Udaipur - 313 001, Rajasthan',
    city: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    lat: 24.5854,
    lng: 73.7125,
    phone: '+91 294 2440698 / 2442085 / 9810918001',
    email: 'gcpl.udaipur@gainwellindia.com'
  },

  // TIL Limited Offices
  {
    id: 9,
    company: 'TIL Limited',
    companyKey: 'til',
    companyLogo: `${basePath}/tilIndia.png`,
    companyColor: '#F1B434',
    companyWebsite: 'https://tilindia.in/',
    type: 'Head Office',
    address: '1 Taratolla Road, Garden Reach, Kolkata 700024, West Bengal',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    lat: 22.5350,
    lng: 88.2990,
    phone: '+91 9831839025',
    email: 'amalangshu.pal@tilindia.com',
    contact: 'Amal Pal'
  },
  {
    id: 10,
    company: 'TIL Limited',
    companyKey: 'til',
    companyLogo: `${basePath}/tilIndia.png`,
    companyColor: '#F1B434',
    companyWebsite: 'https://tilindia.in/',
    type: 'Regional Office',
    address: 'Jhaver Plaza, 7th Floor 1-A, Nungambakkam High Road, Chennai 600 034, Tamil Nadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    lat: 13.0827,
    lng: 80.2707,
    phone: '+91 9618562333',
    email: 'Maruthi.Prasad@tilindia.com',
    contact: 'K. Maruthi Prasad'
  },
  {
    id: 11,
    company: 'TIL Limited',
    companyKey: 'til',
    companyLogo: `${basePath}/tilIndia.png`,
    companyColor: '#F1B434',
    companyWebsite: 'https://tilindia.in/',
    type: 'Regional Office',
    address: 'Behind Shiv Mandir, Near Reliance Infrastructure, LIG Colony, Singrauli 486 889, Dist Singrauli, M.P.',
    city: 'Singrauli',
    state: 'Madhya Pradesh',
    country: 'India',
    lat: 24.1994,
    lng: 82.6754,
    phone: '+91 78794 03811 / 72757 76494',
    email: 'Shailesh.PratapSingh@tilindia.com',
    contact: 'Shailesh Pratap Singh'
  },
  {
    id: 12,
    company: 'TIL Limited',
    companyKey: 'til',
    companyLogo: `${basePath}/tilIndia.png`,
    companyColor: '#F1B434',
    companyWebsite: 'https://tilindia.in/',
    type: 'Regional Office',
    address: '702, The Affaires, Sector - 17, Sanpada New Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    lat: 19.0760,
    lng: 72.8777,
    phone: '+91 91671 52532',
    email: 'sibasish.mohapatra@tilindia.com',
    contact: 'Sibasish Mohapatra'
  },
  {
    id: 13,
    company: 'TIL Limited',
    companyKey: 'til',
    companyLogo: `${basePath}/tilIndia.png`,
    companyColor: '#F1B434',
    companyWebsite: 'https://tilindia.in/',
    type: 'Regional Office',
    address: '801-802, 8th Floor, Kailash Building, 26, Kasturba Gandhi Marg, New Delhi - 110001',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    lat: 28.6139,
    lng: 77.2090,
    phone: '+91 99560 97048',
    email: 'laxmi.shukla@tilindia.com',
    contact: 'Laxmi Chandra Shukla'
  },
  {
    id: 14,
    company: 'TIL Limited',
    companyKey: 'til',
    companyLogo: `${basePath}/tilIndia.png`,
    companyColor: '#F1B434',
    companyWebsite: 'https://tilindia.in/',
    type: 'Manufacturing Plant',
    address: '517, Barrackpore Trunk Road, Kolkata 700058, West Bengal',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    lat: 22.5726,
    lng: 88.3639,
    phone: '1800 266 1535',
    email: 'mktg-til@tilindia.com'
  },
  {
    id: 15,
    company: 'TIL Limited',
    companyKey: 'til',
    companyLogo: `${basePath}/tilIndia.png`,
    companyColor: '#F1B434',
    companyWebsite: 'https://tilindia.in/',
    type: 'Manufacturing Plant',
    address: 'Vill. & P.O. Changual, Kharagpur, Dist: Paschim Medinipur 721 301, West Bengal',
    city: 'Kharagpur',
    state: 'West Bengal',
    country: 'India',
    lat: 22.3460,
    lng: 87.2320,
    phone: '1800 266 1535',
    email: 'mktg-til@tilindia.com'
  },

  // Gainwell Engineering Offices
  {
    id: 16,
    company: 'Gainwell Engineering Private Limited',
    companyKey: 'gainwell-engineering',
    companyLogo: `${basePath}/team3.png`,
    companyColor: '#3ABEEE',
    companyWebsite: 'https://www.gainwellengineering.com/index-india.html',
    type: 'HQ',
    address: 'Godrej Genesis Building, 4th Floor, Unit-401, Street No-18, Block -- EP & GP, Salt Lake Sector V, Kolkata - 700091',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    lat: 22.5735,
    lng: 88.4347,
    phone: '033 6612 2600'
  },
  {
    id: 17,
    company: 'Gainwell Engineering Private Limited',
    companyKey: 'gainwell-engineering',
    companyLogo: `${basePath}/team3.png`,
    companyColor: '#3ABEEE',
    companyWebsite: 'https://www.gainwellengineering.com/index-india.html',
    type: 'Manufacturing Plant',
    address: 'A-25 Panagarh Industrial Park, Panagarh, Debipur, District - Paschim Bardhaman, PIN - 713148, West Bengal',
    city: 'Panagarh',
    state: 'West Bengal',
    country: 'India',
    lat: 23.5735,
    lng: 87.4347
  },

  // Acceleron Solutions Offices
  {
    id: 18,
    company: 'Acceleron Solutions Private Limited',
    companyKey: 'acceleron',
    companyLogo: `${basePath}/acceleron1.png`,
    companyColor: '#F5872E',
    companyWebsite: 'https://acceleronsolutions.io/',
    type: 'Corporate Office',
    address: '4th Floor, Godrej Genesis Building, Plot-X1, Block EP & GP, Salt Lake, Sector V, Kolkata-700091',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    lat: 22.5735,
    lng: 88.4347
  },

  // Gainwell Trucking Offices
  {
    id: 19,
    company: 'Gainwell Trucking',
    companyKey: 'gainwell-trucking',
    companyLogo: `${basePath}/final-logo-gainwell.png`,
    companyColor: '#8B4513',
    companyWebsite: 'https://www.gainwelltrucking.com',
    type: 'Corporate Office',
    address: '1201, 12th floor, Supertech Astralis, Sector 94, Noida, Uttar Pradesh 201313',
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 28.5355,
    lng: 77.3910,
    phone: '1800 419 3356',
    email: 'marketing@gainwelltrucking.com'
  },

  // Tulip Compression Offices
  {
    id: 20,
    company: 'Tulip Compression Private Limited',
    companyKey: 'tulip-compression',
    companyLogo: `${basePath}/team6.png`,
    companyColor: '#405A2A',
    companyWebsite: 'https://www.tulipcompression.com/about-us.html',
    type: 'Plant',
    address: 'Plot No. 1-C-1, Ecotech II, Udyog Vihar, Greater Noida, Uttar Pradesh - 201306',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 28.4744,
    lng: 77.5030
  }
];

// Helper functions
const sortOfficesByPriority = (offices: Office[]): Office[] => {
  const typePriority: Record<OfficeType, number> = {
    'HQ': 1,
    'Head Office': 1,
    'Corporate Office': 1,
    'Regional HQ': 2,
    'Regional Office': 3,
    'Zonal HQ': 4,
    'Manufacturing Plant': 5,
    'Plant': 5,
    'Branch': 6
  };

  return offices.sort((a, b) => typePriority[a.type] - typePriority[b.type]);
};

// Create modern sleek custom icon with company logos
const createCustomIcon = (logoUrl: string, isActive: boolean = false, companyColor: string = '#3A55A5') => {
  const size = isActive ? 60 : 50;
  const borderSize = isActive ? 4 : 3;

  const svg = `
    <div class="marker-wrap" style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
      ${isActive ? `
        <div class="pulse-ring" style="border: 2px solid ${companyColor};"></div>
      ` : ''}
      <div class="marker-main" style="
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1);
        border: ${borderSize}px solid ${companyColor};
        position: relative;
        transition: all 0.3s ease;
        overflow: hidden;
      ">
        <img 
          src="${logoUrl}" 
          alt="" 
          style="
            width: ${size * 0.7}px;
            height: ${size * 0.7}px;
            object-fit: contain;
            border-radius: 2px;
          "
        />
      </div>
      ${isActive ? `
        <div class="glow-effect" style="
          position: absolute;
          top: 50%;
          left: 50%;
          width: ${size * 1.8}px;
          height: ${size * 1.8}px;
          background: radial-gradient(circle, ${companyColor}40 0%, transparent 70%);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: -1;
          animation: glow 2s ease-in-out infinite alternate;
        "></div>
      ` : ''}
    </div>
  `;

  return new L.DivIcon({
    html: svg,
    className: `custom-marker ${isActive ? 'marker-active' : ''}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

export default function OurPresenceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [activeOffice, setActiveOffice] = useState<number | null>(null);
  const [, setMap] = useState<L.Map | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const officeCardsRef = useRef<Map<number, HTMLDivElement>>(new Map());

  // Filter offices based on selected company
  const filteredOffices = useMemo(() => {
    if (!selectedCompany) {
      return [];
    }
    return OFFICES.filter(office => office.companyKey === selectedCompany);
  }, [selectedCompany]);

  // Get offices grouped by state for the selected company
  const officesByState = useMemo(() => {
    const grouped: Record<string, Office[]> = {};
    filteredOffices.forEach(office => {
      const state = office.state || 'Other Locations';
      if (!grouped[state]) {
        grouped[state] = [];
      }
      grouped[state].push(office);
    });
    
    // Sort offices within each state
    Object.keys(grouped).forEach(state => {
      grouped[state] = sortOfficesByPriority(grouped[state]);
    });
    
    return grouped;
  }, [filteredOffices]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.18 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-pan to active office
  useEffect(() => {
    if (!mapRef.current || activeOffice == null) return;
    
    const office = OFFICES.find(o => o.id === activeOffice);
    if (office && office.lat && office.lng) {
      mapRef.current.flyTo([office.lat, office.lng], 14, { animate: true, duration: 1.2 });
    }
  }, [activeOffice]);

  // Add click event listener to map for reset functionality
  useEffect(() => {
    if (!mapRef.current) return;

    const handleMapClick = () => {
      if (mapRef.current) {
        mapRef.current.flyTo([23.5, 80], 5, { animate: true, duration: 1.2 });
        setActiveOffice(null);
      }
    };

    mapRef.current.on('click', handleMapClick);

    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', handleMapClick);
      }
    };
  }, []);

  const handleOfficeClick = useCallback((office: Office) => {
    setActiveOffice(office.id);
    
    // Scroll to office card
    const cardElement = officeCardsRef.current.get(office.id);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

  const handleMarkerClick = useCallback((officeId: number) => {
    setActiveOffice(officeId);
    
    // Scroll to office card
    const cardElement = officeCardsRef.current.get(officeId);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

  // Function to open directions in Google Maps
  const getDirections = useCallback((office: Office) => {
    if (office.lat && office.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}&destination_place=${encodeURIComponent(office.address)}`;
      window.open(url, '_blank');
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCompany(null);
    setActiveOffice(null);
    // Reset map view when clearing selection
    if (mapRef.current) {
      mapRef.current.flyTo([23.5, 80], 5, { animate: true, duration: 1.2 });
    }
  }, []);

  const selectedCompanyInfo = selectedCompany 
    ? COMPANIES.find(company => company.key === selectedCompany)
    : null;

  return (
    <section
      id="our-presence"
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Background Accents */}
      <div className="absolute inset-0 opacity-6 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.06)_100%)]" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-blue-50 text-blue-800 text-sm font-medium shadow-sm">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.848 13.97 6.554 12.546 6.465 11H4.083a6.004 6.004 0 002.783 4.118z"
                clipRule="evenodd"
              />
            </svg>
            India Presence — Gainwell Group
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A55A5] to-[#F5872E]">Presence</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the Gainwell Group&apos;s operations across India in all our companies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100"
          >
            <MapContainer
              center={[23.5, 80]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
              ref={(instance) => {
                mapRef.current = instance;
                if (instance) setMap(instance);
              }}
              zoomControl={true}
              attributionControl={false}
              whenReady={() => {
                // Map click handler is now attached via useEffect
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />

              {/* Markers */}
              {filteredOffices.map((office) => (
                <Marker
                  key={office.id}
                  position={[office.lat || 0, office.lng || 0]}
                  icon={createCustomIcon(
                    office.companyLogo,
                    activeOffice === office.id,
                    office.companyColor
                  )}
                  eventHandlers={{
                    click: (e) => {
                      e.originalEvent?.stopPropagation();
                      handleMarkerClick(office.id);
                    },
                  }}
                >
                  <Tooltip 
                    direction="top" 
                    offset={[0, -12]}
                    permanent={activeOffice === office.id}
                  >
                    <div className="text-sm font-semibold text-gray-800">{office.company}</div>
                    <div className="text-xs text-gray-600">{office.city}, {office.state}</div>
                  </Tooltip>
                </Marker>
              ))}
            </MapContainer>

            {/* Map click instruction and attribution */}
            <div className="absolute bottom-3 left-3 text-xs bg-white/80 px-2 py-1 rounded-md shadow-sm text-gray-700">
              Map: CARTO + OpenStreetMap
            </div>
            <div className="absolute top-3 right-3 text-xs bg-white/80 px-2 py-1 rounded-md shadow-sm text-gray-700">
              Click map to reset view
            </div>
          </motion.div>

          {/* Right column: company selection and office list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="h-full"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-full flex flex-col">
              {/* Company Selection Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#08193C] mb-2">Select a Company</h3>
                <p className="text-sm text-gray-500">
                  Choose a company to view its offices and locations across India
                </p>
              </div>

              {/* Company Logos Grid */}
              {!selectedCompany && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {COMPANIES.map((company) => (
                    <button
                      key={company.key}
                      onClick={() => setSelectedCompany(company.key)}
                      className="flex flex-col items-center p-4 rounded-xl border-2 border-transparent hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white/50 hover:bg-white/80 group"
                    >
                      <div className="w-24 h-24 md:w-28 md:h-28 relative mb-2">
                        <Image
                          src={company.logo}
                          alt={company.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Selected Company Details */}
              {selectedCompany && selectedCompanyInfo && (
                <div className="flex-1 overflow-y-auto pr-2 max-h-[500px]">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 relative">
                          <Image
                            src={selectedCompanyInfo.logo}
                            alt={selectedCompanyInfo.name}
                            fill
                            className="object-contain"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Selected Company</p>
                          <h3 className="text-xl font-bold text-gray-900">{selectedCompanyInfo.name}</h3>
                        </div>
                      </div>
                      <button
                        onClick={clearSelection}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                        Change Company
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                      {selectedCompanyInfo.description}
                    </p>
                  </div>

                  {/* Offices List */}
                  <div className="space-y-6">
                    {Object.entries(officesByState).map(([state, stateOffices]) => (
                      <div key={state} className="border-l-2 border-blue-200 pl-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {state}
                        </h4>
                        <div className="space-y-3">
                          {stateOffices.map((office) => (
                            <div
                              key={office.id}
                              ref={(el) => {
                                if (el) {
                                  officeCardsRef.current.set(office.id, el);
                                } else {
                                  officeCardsRef.current.delete(office.id);
                                }
                              }}
                              className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                                activeOffice === office.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-100 hover:border-gray-300'
                              }`}
                              onClick={() => handleOfficeClick(office)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {office.type}
                                    </span>
                                  </div>
                                  <h5 className="font-semibold text-gray-900 text-sm">{office.city}</h5>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{office.address}</p>
                                </div>
                                {office.lat && office.lng && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      getDirections(office);
                                    }}
                                    className="ml-2 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                    title="Get Directions"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-1.5-1.5M9 4l-1.5 1.5M12 21h9M3 9h18M12 21V9" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                              {office.phone && (
                                <div className="flex items-center text-xs text-gray-500 mt-2">
                                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                  </svg>
                                  {office.phone}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom styles for map markers */}
      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .marker-active .marker-main {
          transform: scale(1.15);
          box-shadow: 0 12px 32px rgba(0,0,0,0.2), 0 6px 16px rgba(0,0,0,0.15);
        }
        
        .pulse-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        
        @keyframes glow {
          0% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
        
        .leaflet-tooltip {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          padding: 6px 10px;
          font-size: 12px;
        }
        
        .leaflet-tooltip-top:before {
          border-top-color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </section>
  );
}