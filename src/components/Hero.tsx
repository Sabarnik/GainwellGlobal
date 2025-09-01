'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={`${basePath}/hero-bg-video.mp4`}
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Dark Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#355d73]/50 to-black/50 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/0 to-black/0 z-10"></div>

      {/* Text Content - Aligned with navbar container */}
      <div className="relative z-30 max-w-7xl mx-auto my-10 px-6 md:px-12 xl:px-20 h-full">
        <div className="h-full mb-20 flex items-center">
          <div className={`${isMobile ? 'w-full flex justify-center' : 'w-full lg:w-1/2'}`}>
            <motion.div
              className={`space-y-6 ${isMobile ? 'max-w-none w-full text-center px-4' : 'max-w-2xl'}`}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="space-y-2"
              >
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                  <motion.span
                    className="block text-white"
                    style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    GAINWELL
                  </motion.span>
                  <motion.span
                    className="block text-gainwell-orange"
                    style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  >
                    GROUP
                  </motion.span>
                  <motion.span
                    className="block text-white text-2xl md:text-3xl lg:text-4xl font-light"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    Solutions for Growth
                  </motion.span>
                </h1>

                <motion.p
                  className="text-base md:text-lg lg:text-xl text-white font-light leading-relaxed"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  Empowering progress through innovative solutions.
                </motion.p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className={`flex gap-3 ${isMobile ? 'flex-col w-full' : 'flex-col sm:flex-row'}`}
              >
                {/* Know Us More */}
                <motion.button
                  onClick={() => router.push(`/`)}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary group inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all"
                >
                  <span className="text-sm lg:text-base">Know Us More</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Our Solutions */}
                <motion.button
                  onClick={() => router.push(`/solutions`)}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary group inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all"
                >
                  <span className="text-sm lg:text-base">Our Solutions</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;