'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
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
  
// Create custom icon with SVG and optional pulsing ring for active
const createCustomIcon = (color: string, isActive: boolean = false) => {
  const size = isActive ? 42 : 32;
  const pulse = isActive
    ? `<span class="pulse-ring" style="box-shadow: 0 0 0 0 ${color};"></span>`
    : '';

  const svg = `
    <div class="marker-wrap" style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
      ${pulse}
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
        <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle fill="white" cx="12" cy="9" r="3"/>
        <circle fill="${color}" cx="12" cy="9" r="1.5"/>
      </svg>
    </div>
  `;

  return new L.DivIcon({
    html: svg,
    className: 'custom-marker',
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
            address: '1 Tranxilla Road, Garden Resch, Kolkata 700024, West Bengal' 
          },
          { 
            name: 'TIL Ltd', 
            address: 'Unit No. 802, BHPoor, Kalash Building, 26 Kasrurba Gandhi Marg, New Delhi – 110001' 
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
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Markers */}
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coordinates}
                  icon={createCustomIcon(location.color, activeLocation === location.id)}
                  eventHandlers={{
                    click: () => handleLocationClick(location.id),
                  }}
                />
              ))}
            </MapContainer>

            {/* subtle attribution */}
            <div className="absolute bottom-3 left-3 text-xs bg-white/80 px-2 py-1 rounded-md shadow-sm text-gray-700">
              Map: Leaflet + OpenStreetMap
            </div>
          </motion.div>

          {/* Right column: addresses, selector, pills */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="h-full"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#08193C]">Office Addresses</h3>
                  <p className="text-sm text-gray-500 mt-1">Tap a marker or choose from the list below.</p>
                </div>

                {/* Country switcher */}
                <select
                  className="bg-gray-50 border border-gray-200 text-sm text-[#3A55A5] px-3 py-2 rounded-lg shadow-sm"
                  value={active?.id ?? ''}
                  onChange={(e) => setActiveLocation(e.target.value ? Number(e.target.value) : null)}
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
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ring-4 ring-white shadow"
                          style={{ backgroundColor: active.color }}
                        >
                          {active.country.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#08193C]">{active.country}</h4>
                          <p className="text-sm text-gray-500">{active.offices.length} office(s)</p>
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
                              className="flex flex-col gap-2 p-3 rounded-lg bg-gray-50"
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className="mt-1 inline-block w-3 h-3 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: active.color }}
                                />
                                <div>
                                  <div className="font-medium text-[#08193C]">{o.name}</div>
                                  <div className="text-sm text-[#3A55A5]">{o.address}</div>
                                </div>
                              </div>
                              <button 
                                className="self-end px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
                                onClick={() => getDirections(active.coordinates, o.address)}
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
                        <p className="text-[#3A55A5]">Select a country on the map to see office addresses.</p>
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
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out shadow-sm flex items-center gap-2 ${
                        activeLocation === location.id ? 'text-white' : 'bg-gray-50 text-[#3A55A5] hover:bg-gray-100'
                      }`}
                      style={{ backgroundColor: activeLocation === location.id ? location.color : undefined }}
                      onClick={() => handleLocationClick(location.id)}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: location.color }} />
                      <span>{location.country}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .custom-marker { background: transparent !important; border: none !important; }
        .leaflet-popup-content-wrapper { border-radius: 8px; }
        .leaflet-control-attribution { font-size: 10px; background: rgba(255,255,255,0.9) !important; color: #333 !important; }
        .leaflet-control-attribution a { color: #0078A8 !important; }

        /* Pulse ring for active marker */
        .marker-wrap { position: relative; }
        .marker-wrap .pulse-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          border-radius: 9999px;
          transform: translate(-0%, -0%);
          animation: pulse 1.8s infinite;
          opacity: 0.7;
          filter: blur(6px);
        }

        @keyframes pulse {
          0% { transform: scale(0.7); opacity: 0.75; }
          70% { transform: scale(1.6); opacity: 0.12; }
          100% { transform: scale(2); opacity: 0; }
        }

        /* smaller tweaks */
        .leaflet-container { font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
      `}</style>
    </section>
  );
}