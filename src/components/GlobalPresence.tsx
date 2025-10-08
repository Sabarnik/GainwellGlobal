'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
  
// Create modern sleek custom icon
const createCustomIcon = (color: string, isActive: boolean = false, label: string = '') => {
  const size = isActive ? 52 : 42;
  const initials = label.substring(0, 2).toUpperCase();
  const pulseRing = isActive
    ? `<div class="pulse-ring" style="border: 2px solid ${color};"></div>`
    : '';

  const svg = `
    <div class="marker-wrap" style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
      ${pulseRing}
      <div class="marker-main" style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1);
        border: 3px solid white;
        position: relative;
        transition: all 0.3s ease;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-weight: 700;
          font-size: ${size / 3}px;
          font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          letter-spacing: 0.5px;
        ">${initials}</div>
      </div>
      ${isActive ? `
        <div class="glow-effect" style="
          position: absolute;
          top: 50%;
          left: 50%;
          width: ${size * 1.8}px;
          height: ${size * 1.8}px;
          background: radial-gradient(circle, ${color}40 0%, transparent 70%);
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
    iconAnchor: [size / 2, size],
  });
};

export default function OurPresenceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [, setMap] = useState<L.Map | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Presence data with Gainwell-specific offices added/expanded
  const locations = useMemo(() => {
    // Brand colors from guidelines (moved inside useMemo)
    const brandColors = {
      primaryOrange: '#F5872E',
      primaryBlue: '#3A55A5',
      primaryGreen: '#40A748',
      primaryLightBlue: '#3ABEEE',
      secondaryOrangeDark: '#FAAD54',
      secondaryRedDark: '#BA2025',
      secondaryBlueDark: '#5674B8',
      secondaryGreenDark: '#7EC57F',
    } as const;

    return [
      {
        id: 1,
        country: 'India',
        coordinates: [22.5726, 88.3639] as [number, number], // Kolkata (HQ)
        offices: [
          { 
            name: 'Gainwell Commosales Pvt Ltd', 
            address: '705, Godrej Waterside, 7th Floor, Tower II Block DP, Sector V, Salt Lake City Kolkata – 700091, India' 
          },
          { 
            name: 'Gainwell Engineering Private Limited', 
            address: 'Godrej Genesis Technology Park Unit: 401,420, 403, Plot XI Block IP & CP, Salt Lake Sector V, Kolkata – 700091, India' 
          },
          { 
            name: 'Resurgent Mining Solutions Pvt Ltd', 
            address: '1 Taratolla Road, Garden Reach, Kolkata 700024, West Bengal' 
          },
          { 
            name: 'TIL Ltd', 
            address: 'Unit No. 802, 8th Floor, Kailash Building, 26 Kasturba Gandhi Marg, New Delhi – 110001' 
          },
        ],
        color: brandColors.primaryOrange,
      },
      {
        id: 2,
        country: 'USA',
        coordinates: [38.4209, -82.4612] as [number, number], // Corrected to Hico, West Virginia
        offices: [
          { 
            name: 'Gainwell Engineering Inc.', 
            address: '198 Baughan Road, Hico, West Virginia, 26654, United States of America' 
          },
        ],
        color: brandColors.primaryBlue,
      },
      {
        id: 3,
        country: 'Singapore',
        coordinates: [1.2806, 103.8509] as [number, number], // Corrected to Robinson Road area
        offices: [
          { 
            name: 'Gainwell Engineering Global PTE Ltd', 
            address: '39 Robinson Road #15-01, Robinson Point Singapore 068911' 
          },
        ],
        color: brandColors.primaryGreen,
      },
      {
        id: 4,
        country: 'Australia',
        coordinates: [-32.9833, 151.7167] as [number, number], // Corrected to Gateshead, NSW
        offices: [
          { 
            name: 'Gainwell Engineering Pacific Pty Limited', 
            address: 'TS: Bulle Garden Road Gateshead, NSW 2290, Australia' 
          },
        ],
        color: brandColors.primaryLightBlue,
      },
      {
        id: 5,
        country: 'Nepal',
        coordinates: [27.6333, 85.4167] as [number, number], // Corrected to Lalitpur area
        offices: [
          { 
            name: 'Tractors Nepal Pvt Ltd', 
            address: 'Ward No- Os Gha, Sainthu- Nakhlu Near Kieni Headquarters Laitpur, Nepal' 
          },
        ],
        color: brandColors.secondaryOrangeDark,
      },
      {
        id: 6,
        country: 'Bhutan',
        coordinates: [27.4833, 89.6167] as [number, number], // Corrected to Thimphu center
        offices: [
          { 
            name: 'Gainwell Commosales Pvt Ltd', 
            address: 'C/o M& Chhundu Infrastructure (Near Dunking Office) Post Box 198 Privateholding, Bhutan' 
          },
          { 
            name: 'Gainwell Commosales Pvt Ltd', 
            address: 'C/o M& Chhundu Infrastructure SD Plaza, 4th Floor, Opp. RICE Building, Norzin Lam, Thimpu, Bhutan' 
          },
        ],
        color: brandColors.secondaryRedDark,
      },
      {
        id: 7,
        country: 'China',
        coordinates: [39.9042, 116.4074] as [number, number], // Beijing
        offices: [
          { 
            name: 'Gainwell Engineering', 
            address: 'Beijing, China' 
          },
        ],
        color: brandColors.secondaryBlueDark,
      },
      {
        id: 8,
        country: 'Mozambique',
        coordinates: [-25.9667, 32.5833] as [number, number], // Maputo
        offices: [
          { 
            name: 'Resurgent Mining Mozambique, LDA', 
            address: '1 AV./RUA Guerra Popular, Bairro Central, No 1028, Andar R/C, Kampfumu, Maputo Cidade' 
          },
        ],
        color: brandColors.secondaryGreenDark,
      },
    ];
  }, []);

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

  // Auto-pan / flyTo on location select
  useEffect(() => {
    if (!mapRef.current) return;
    
    if (activeLocation == null) {
      mapRef.current.flyTo([20, 0], 2, { animate: true, duration: 0.9 });
      return;
    }
    
    const loc = locations.find(l => l.id === activeLocation);
    if (loc) {
      mapRef.current.flyTo(loc.coordinates, 4.5, { animate: true, duration: 0.9 });
    }
  }, [activeLocation, locations]);

  const handleLocationClick = useCallback((id: number) => {
    setActiveLocation((prev) => (prev === id ? null : id));
  }, []);

  // Function to open directions in Google Maps
  const getDirections = useCallback((coordinates: [number, number], address: string) => {
    const [lat, lng] = coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  }, []);

  const active = locations.find((l) => l.id === activeLocation) || null;

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
            Global Reach — Gainwell
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A55A5] to-[#F5872E]">Global Presence</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Gainwell&apos;s worldwide operations. Click on a marker or select a country to view office addresses and details.
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
              center={[20, 0]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
              ref={(instance) => {
                mapRef.current = instance;
                if (instance) setMap(instance);
              }}
              zoomControl={true}
              attributionControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />

              {/* Markers */}
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coordinates}
                  icon={createCustomIcon(location.color, activeLocation === location.id, location.country)}
                  eventHandlers={{
                    click: () => handleLocationClick(location.id),
                    mouseover: (e) => {
                      e.target.openTooltip();
                    },
                    mouseout: (e) => {
                      if (activeLocation !== location.id) {
                        e.target.closeTooltip();
                      }
                    },
                  }}
                >
                  <Tooltip 
                    direction="top" 
                    offset={[0, -12]}
                    permanent={activeLocation === location.id}
                  >
                    <div className="text-sm font-semibold text-gray-800">{location.country}</div>
                    <div className="text-xs text-gray-600">{location.offices.length} office{location.offices.length !== 1 ? 's' : ''}</div>
                  </Tooltip>
                </Marker>
              ))}
            </MapContainer>

            {/* subtle attribution */}
            <div className="absolute bottom-3 left-3 text-xs bg-white/80 px-2 py-1 rounded-md shadow-sm text-gray-700">
              Map: CARTO + OpenStreetMap
            </div>
          </motion.div>

          {/* Right column: addresses, selector, pills */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="h-full"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#08193C]">Office Addresses</h3>
                  <p className="text-sm text-gray-500 mt-1">Tap a marker or choose from the list below.</p>
                </div>

                {/* Country switcher */}
                <select
                  className="bg-gray-50 border border-gray-200 text-sm text-[#3A55A5] px-3 py-2 rounded-lg shadow-sm min-h-[40px] focus:ring-2 focus:ring-[#3A55A5] focus:border-transparent transition-all duration-200"
                  value={active?.id ?? ''}
                  onChange={(e) => setActiveLocation(e.target.value ? Number(e.target.value) : null)}
                  aria-label="Select a country to view office addresses"
                >
                  <option value="">Select a country…</option>
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active country detail or placeholder */}
              <div className="flex-1 overflow-auto min-h-[300px]">
                <AnimatePresence mode="wait">
                  {active ? (
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ring-4 ring-white shadow-lg"
                          style={{ 
                            backgroundColor: active.color,
                            background: `linear-gradient(135deg, ${active.color} 0%, ${active.color}DD 100%)`
                          }}
                        >
                          {active.country.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#08193C]">{active.country}</h4>
                          <p className="text-sm text-gray-500">{active.offices.length} office{active.offices.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-[#3A55A5] uppercase tracking-wider mb-3">Office Addresses</h5>
                        <ul className="space-y-3">
                          {active.offices.map((o, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex flex-col gap-2 p-4 rounded-xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5 shadow"
                                  style={{ backgroundColor: active.color }}
                                />
                                <div className="flex-1">
                                  <div className="font-semibold text-[#08193C] text-sm">{o.name}</div>
                                  <div className="text-xs text-gray-600 mt-1 leading-relaxed">{o.address}</div>
                                </div>
                              </div>
                              <button 
                                className="self-end px-4 py-2 bg-gradient-to-r from-[#3A55A5] to-[#F5872E] text-white rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 min-h-[40px] shadow-md"
                                onClick={() => getDirections(active.coordinates, o.address)}
                                aria-label={`Get directions to ${o.name} in ${active.country}`}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Directions
                              </button>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="h-full flex items-center justify-center"
                    >
                      <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#3A55A5] to-[#F5872E] flex items-center justify-center shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-[#3A55A5] font-medium">Select a country on the map to see office addresses.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Country Pills */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-[#3A55A5] uppercase tracking-wider mb-3">Our Locations</h4>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-out shadow-sm flex items-center gap-2 min-h-[40px] border border-transparent hover:shadow-md transform hover:scale-105 ${
                        activeLocation === location.id 
                          ? 'text-white shadow-lg scale-105' 
                          : 'bg-white/50 text-[#3A55A5] hover:bg-white/80 border-gray-200'
                      }`}
                      style={{ 
                        backgroundColor: activeLocation === location.id ? location.color : undefined,
                        background: activeLocation === location.id 
                          ? `linear-gradient(135deg, ${location.color} 0%, ${location.color}DD 100%)`
                          : undefined
                      }}
                      onClick={() => handleLocationClick(location.id)}
                      aria-label={`View offices in ${location.country}`}
                      aria-pressed={activeLocation === location.id}
                    >
                      <span 
                        className="w-2.5 h-2.5 rounded-full shadow" 
                        style={{ backgroundColor: location.color }} 
                      />
                      <span className="font-semibold">{location.country}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .custom-marker { 
          background: transparent !important; 
          border: none !important; 
        }
        
        .leaflet-popup-content-wrapper { 
          border-radius: 12px; 
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .leaflet-control-attribution { 
          font-size: 10px; 
          background: rgba(255,255,255,0.9) !important; 
          color: #333 !important; 
        }
        
        .leaflet-control-attribution a { color: #0078A8 !important; }

        /* Modern marker animations */
        .marker-wrap { 
          position: relative; 
          transition: all 0.3s ease;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
        }

        .marker-active .marker-wrap {
          filter: drop-shadow(0 8px 20px rgba(0,0,0,0.25));
          z-index: 1000;
        }

        .marker-main {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .marker-active .marker-main {
          transform: rotate(-45deg) scale(1.1);
        }

        /* Sleek pulse ring for active marker */
        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: sleek-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          opacity: 0.6;
        }

        @keyframes sleek-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.2;
          }
        }

        /* Glow effect */
        @keyframes glow {
          0% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        /* Improve tooltip styling */
        .leaflet-tooltip {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 8px;
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.1);
          padding: 8px 12px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .leaflet-tooltip-top:before {
          border-top-color: rgba(255, 255, 255, 0.95);
        }

        /* Smooth hover effects */
        .custom-marker:hover .marker-main {
          transform: rotate(-45deg) scale(1.05);
          filter: brightness(1.1);
        }

        /* smaller tweaks */
        .leaflet-container { 
          font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; 
        }
      `}</style>
    </section>
  );
}