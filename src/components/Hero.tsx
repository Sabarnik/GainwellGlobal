'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Video Background with direct click handler */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        src={`${basePath}/hero_bg_video.mp4`}
        autoPlay
        loop
        muted
        playsInline
        onClick={toggleVideoPlayback}
      />

      {/* Text Content - Make sure it doesn't block clicks */}
      <div className="relative z-30 container max-w-7xl mx-auto px-4 h-full pointer-events-none">
        <div className="h-full mb-20 flex items-center pt-36">
          <div className={`${isMobile ? 'w-full flex justify-center' : 'w-full lg:w-1/2'} pointer-events-auto`}>
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
                    SOLUTIONS
                  </motion.span>
                  <motion.span
                    className="block text-6xl text-gainwell-orange"
                    style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  >
                    FOR GROWTH
                  </motion.span>
                  <motion.span
                    className="block text-white text-2xl md:text-3xl lg:text-4xl font-light"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
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
                  onClick={() => {
                    const aboutSection = document.getElementById('industry');
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary group inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all"
                >
                  <span className="text-sm lg:text-base">Know Us More</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Our Solutions */}
                <motion.button
                  onClick={() => {
                    const valuesSection = document.getElementById('values');
                    if (valuesSection) {
                      valuesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary group inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all"
                >
                  <span className="text-sm lg:text-base">Our Core Values</span>
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