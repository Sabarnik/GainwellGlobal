// src/components/HomeClient.tsx
'use client';

import HeaderWrapper from '@/components/HeaderWrapper';
import Hero from '@/components/Hero';
import AboutUsSection from '@/components/AboutUsSection';
import AboutUs from '@/components/AboutSection';
import IndustryCarousel from '@/components/Industry';
import OurValues from '@/components/OurValues';
import CSRSection from '@/components/CSRSection';
import EventSection from '@/components/EventSection';
import OurPresenceSection from '@/components/GlobalPresence';
import SleekFooter from '@/components/Footer';
import GroupCompaniesSection from '@/components/GroupCompanies';
import PartnersSection from '@/components/PartnerSection';

export default function HomeClient() {
  return (
    <main className="bg-gray-50 text-gray-800">
      <HeaderWrapper />
      <Hero />
      <AboutUsSection />
      <IndustryCarousel />
      <AboutUs />
      <OurValues />
      <CSRSection />
      <EventSection />
      <PartnersSection />
      <GroupCompaniesSection />
      <OurPresenceSection />
      <SleekFooter />
    </main>
  );
}
