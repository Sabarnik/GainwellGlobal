// components/VerticalTimelineCarousel.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Item = {
  year: string;
  content: string;
  iconClass?: string;     // e.g., "fas fa-award" (Font Awesome) or leave empty
  gradient?: string;      // e.g., "from-[#F5872E] to-[#3A55A5]"
};

type Props = {
  items: Item[];
  autoPlayMs?: number;    // default 4000
  className?: string;
};

export default function VerticalTimelineCarousel({
  items,
  autoPlayMs = 4000,
  className = '',
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);

  const total = items.length;
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  // --- Autoplay (pauses on hover/focus) ---
  useEffect(() => {
    if (!total || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [paused, total, autoPlayMs]);

  // --- Keyboard navigation (↑/↓) when focused ---
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!total) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => (i - 1 + total) % total);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => (i + 1) % total);
    }
  };

  // --- Touch swipe (up/down) ---
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current == null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const threshold = 40; // px
    if (Math.abs(dy) > threshold) {
      setIndex((i) =>
        dy > 0 ? (i - 1 + total) % total : (i + 1) % total
      );
    }
    touchStartY.current = null;
  };

  // --- Helpers ---
  const goTo = (i: number) => setIndex(i);
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section
      className={`relative ${className}`}
      aria-roledescription="carousel"
      aria-label="Vertical timeline"
    >
      {/* Frame */}
      <div
        ref={containerRef}
        className="relative h-[28rem] md:h-[32rem] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        tabIndex={0}
      >
        {/* Center vertical rail */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#F5872E] via-[#3A55A5] to-[#40A748] opacity-60" />

        {/* Track (slides stack vertically) */}
        <div
          className="h-full transition-transform duration-500 ease-in-out will-change-transform"
          style={{ transform: `translateY(-${index * 100}%)` }}
        >
          {safeItems.map((item, i) => (
            <article
              key={i}
              className="h-[28rem] md:h-[32rem] w-full px-6 py-8 flex"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
            >
              {/* Left text */}
              <div className="w-1/2 pr-6 hidden md:flex items-center justify-end text-right">
                <div className="max-w-md">
                  <h3
                    className={`text-3xl font-bold bg-gradient-to-r ${
                      item.gradient ?? 'from-[#F5872E] to-[#3A55A5]'
                    } bg-clip-text text-transparent`}
                  >
                    {item.year}
                  </h3>
                  <p className="mt-3 text-[#243b6b]">{item.content}</p>
                </div>
              </div>

              {/* Center dot */}
              <div className="relative w-0 md:w-0 flex items-center justify-center">
                <div
                  className={`relative left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg bg-gradient-to-br ${
                    item.gradient ?? 'from-[#F5872E] to-[#3A55A5]'
                  }`}
                >
                  {item.iconClass ? <i className={`${item.iconClass} text-lg`} /> : null}
                </div>
              </div>

              {/* Right text (mirrors left on mobile) */}
              <div className="w-full md:w-1/2 pl-6 flex items-center">
                <div className="max-w-md text-center md:text-left mx-auto md:mx-0">
                  <h3
                    className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${
                      item.gradient ?? 'from-[#F5872E] to-[#3A55A5]'
                    } bg-clip-text text-transparent`}
                  >
                    {item.year}
                  </h3>
                  <p className="mt-3 text-[#243b6b]">{item.content}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-2 top-2 z-10 rounded-full bg-white/90 px-3 py-2 text-sm shadow hover:bg-white focus:outline-none focus:ring"
          aria-label="Previous"
        >
          ↑
        </button>
        <button
          onClick={next}
          className="absolute left-2 top-12 z-10 rounded-full bg-white/90 px-3 py-2 text-sm shadow hover:bg-white focus:outline-none focus:ring"
          aria-label="Next"
        >
          ↓
        </button>

        {/* Pause/Play indicator (auto pauses on hover/focus) */}
        <div className="absolute right-2 top-2 z-10 rounded-full bg-white/90 px-3 py-2 text-xs shadow">
          {paused ? 'Paused' : 'Autoplay'}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 right-0 z-10 flex items-center justify-center gap-2">
          {safeItems.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === index
                  ? 'scale-125 bg-gradient-to-r from-[#F5872E] to-[#3A55A5]'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
