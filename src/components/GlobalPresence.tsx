'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Office {
  name: string;
  address: string;
}

interface Location {
  id: number;
  country: string;
  coordinates: [number, number]; // [lat, lng]
  offices: Office[];
  color: string;
}

// Create custom icon with SVG
const createCustomIcon = (color: string, isActive: boolean = false) => {
  const size = isActive ? 35 : 30;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
      <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
      <circle fill="${isActive ? 'white' : color}" cx="12" cy="9" r="3"/>
      ${isActive ? `<circle fill="${color}" cx="12" cy="9" r="1.5"/>` : ''}
    </svg>
  `;

  return new L.DivIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size],
  });
};

export default function OurPresenceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Brand colors from guidelines
  const brandColors = {
    primaryOrange: '#F5872E',
    primaryBlue: '#3A55A5',
    primaryGreen: '#40A748',
    primaryLightBlue: '#3ABEEE',
    secondaryOrangeLight: '#FCCB97',
    secondaryOrangeDark: '#FAAD54',
    secondaryRedLight: '#EF4D2F',
    secondaryRedDark: '#BA2025',
    secondaryBlueLight: '#7C97CD',
    secondaryBlueDark: '#5674B8',
    secondaryNavyLight: '#08193C',
    secondaryNavyDark: '#292974',
    secondaryGreenLight: '#BDD799',
    secondaryGreenDark: '#7EC57F',
    secondaryOliveLight: '#405A2A',
    secondaryOliveDark: '#318741',
  };

  // Presence data with actual coordinates
  const locations: Location[] = [
    {
      id: 1,
      country: 'India',
      coordinates: [22.5726, 88.3639], // Kolkata
      offices: [
        { name: 'Corporate HQ', address: 'Gainwell Complex, Kolkata, West Bengal 700091' },
        { name: 'Regional Office — North', address: 'Noida, Uttar Pradesh 201301' },
        { name: 'Regional Office — West', address: 'Mumbai, Maharashtra 400051' },
        { name: 'Regional Office — South', address: 'Chennai, Tamil Nadu 600032' },
      ],
      color: brandColors.primaryOrange,
    },
    {
      id: 2,
      country: 'USA',
      coordinates: [29.7604, -95.3698], // Houston
      offices: [
        { name: 'Partner Liaison', address: 'Houston, TX 77002' },
        { name: 'Business Office', address: 'Irvine, CA 92618' },
      ],
      color: brandColors.primaryBlue,
    },
    {
      id: 3,
      country: 'Singapore',
      coordinates: [1.3521, 103.8198], // Singapore
      offices: [
        { name: 'SEA HQ', address: '1 Raffles Place, Singapore 048616' },
      ],
      color: brandColors.primaryGreen,
    },
    {
      id: 4,
      country: 'Australia',
      coordinates: [-33.8688, 151.2093], // Sydney
      offices: [
        { name: 'ANZ Office', address: 'Sydney NSW 2000' },
      ],
      color: brandColors.primaryLightBlue,
    },
    {
      id: 5,
      country: 'Nepal',
      coordinates: [27.7172, 85.3240], // Kathmandu
      offices: [
        { name: 'Tractors Nepal Pvt. Ltd.', address: 'Kathmandu 44600' },
      ],
      color: brandColors.secondaryOrangeDark,
    },
    {
      id: 6,
      country: 'Bhutan',
      coordinates: [27.4728, 89.6390], // Thimphu
      offices: [
        { name: 'Bhutan Liaison', address: 'Thimphu 11001' },
      ],
      color: brandColors.secondaryRedDark,
    },
    {
      id: 7,
      country: 'China',
      coordinates: [31.2304, 121.4737], // Shanghai
      offices: [
        { name: 'Supply Chain Office', address: 'Shanghai 200120' },
      ],
      color: brandColors.secondaryBlueDark,
    },
    {
      id: 8,
      country: 'Mozambique',
      coordinates: [-25.9667, 32.5833], // Maputo
      offices: [
        { name: 'East Africa Office', address: 'Maputo 1100' },
      ],
      color: brandColors.secondaryGreenDark,
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize map when component mounts
  useEffect(() => {
    setMapReady(true);
  }, []);

  const handleLocationClick = (id: number) => {
    setActiveLocation(id === activeLocation ? null : id);
  };

  const active = locations.find((l) => l.id === activeLocation) || null;

  return (
    <section
      id="our-presence"
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Background Accents */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.1)_100%)]" />
      </div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-[#3A55A5]/20 to-[#F5872E]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-[#40A748]/20 to-[#3ABEEE]/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 z-0" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.848 13.97 6.554 12.546 6.465 11H4.083a6.004 6.004 0 002.783 4.118z"
                clipRule="evenodd"
              />
            </svg>
            Global Reach
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A55A5] to-[#F5872E]">Global Presence</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our worldwide operations. Click on a location to view office addresses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <div className={`relative h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {mapReady && (
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                attributionControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Custom attribution that matches the requirement */}
                <div className="leaflet-control-attribution leaflet-control">
                  <a href="https://leafletjs.com" title="A JavaScript library for interactive maps">Leaflet</a> | © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors
                </div>
                
                {/* Location markers */}
                {locations.map(location => (
                  <Marker
                    key={location.id}
                    position={location.coordinates}
                    icon={createCustomIcon(location.color, activeLocation === location.id)}
                    eventHandlers={{
                      click: () => handleLocationClick(location.id),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-lg">{location.country}</h3>
                        <div className="mt-2">
                          <h4 className="font-semibold">Office Addresses:</h4>
                          <ul className="text-sm">
                            {location.offices.map((office, idx) => (
                              <li key={idx} className="mt-1">
                                <strong>{office.name}:</strong> {office.address}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>

          {/* Office Addresses */}
          <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#08193C]">Office Addresses</h3>
                {/* Country switcher */}
                <select
                  className="bg-gray-100 text-sm text-[#3A55A5] px-3 py-2 rounded-lg"
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

              {active ? (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
                      style={{ backgroundColor: active.color }}
                    >
                      {active.country.substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#08193C]">{active.country}</h4>
                    </div>
                  </div>

                  {/* Address list */}
                  <div>
                    <h5 className="text-sm font-semibold text-[#3A55A5] uppercase tracking-wider mb-3">Office Addresses</h5>
                    <ul className="space-y-3">
                      {active.offices.map((o, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                          <span 
                            className="mt-1 inline-block w-2 h-2 rounded-full" 
                            style={{ backgroundColor: active.color }}
                          />
                          <div>
                            <div className="font-medium text-[#08193C]">{o.name}</div>
                            <div className="text-sm text-[#3A55A5]">{o.address}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#3A55A5] to-[#F5872E] flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-[#3A55A5]">
                    Select a country on the map to see office addresses.
                  </p>
                </div>
              )}

              {/* Quick Country Pills */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-[#3A55A5] uppercase tracking-wider mb-3">Our Locations</h4>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out ${
                        activeLocation === location.id
                          ? 'text-white'
                          : 'bg-gray-100 text-[#3A55A5] hover:bg-gray-200'
                      }`}
                      style={{
                        backgroundColor: activeLocation === location.id ? location.color : '',
                      }}
                      onClick={() => handleLocationClick(location.id)}
                    >
                      {location.country}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
        .leaflet-control-attribution {
          font-size: 10px;
          background: rgba(255, 255, 255, 0.9) !important;
          color: #333 !important;
        }
        .leaflet-control-attribution a {
          color: #0078A8 !important;
        }
      `}</style>
    </section>
  );
}