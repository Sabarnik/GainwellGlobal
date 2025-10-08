// app/team/page.tsx
'use client';

import OurTeamSection from '@/components/OurTeam';
import HeaderWrapper from '@/components/HeaderWrapper';
import SleekFooter from '@/components/Footer';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function TeamPage() {
  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      <HeaderWrapper />
      
      {/* Hero Section with Image */}
      <section className="relative h-96 w-full bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage: `url("${basePath}/hero-team.jpg")`
          }}
        />
        <div className="relative z-10 flex items-end justify-center h-full bg-black bg-opacity-40 pb-16">
          <div className="text-center text-white">
            <h1 className="text-5xl text-white font-bold mb-4">Meet Our Team</h1>
            <p className="text-xl max-w-2xl mx-auto">
              The passionate professionals driving innovation and excellence
            </p>
          </div>
        </div>
      </section>

      <OurTeamSection />
      <SleekFooter />
    </main>
  );
}