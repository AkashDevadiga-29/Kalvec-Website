import React, { useEffect, useState } from 'react';

/**
 * Client logo pools for the 3 carousel slots.
 * Matches the client roster extracted from Figma:
 * - Slot 1 starts with Trunativ
 * - Slot 2 starts with Crework
 * - Slot 3 starts with Haus & Kinder
 */
const LOGO_POOLS = [
  [
    { name: 'Trunativ', src: '/assets/plainlogo-Trunativ - animation.png' },
    { name: 'BOB', src: '/assets/plainlogo-bob - animation.png' },
    { name: 'Frontier', src: '/assets/plainlogo-frontier- animation.png' },
    { name: 'QF', src: '/assets/plainlogo-QF.png' },
  ],
  [
    { name: 'Crework', src: '/assets/plainlogo-Crework - animation.png' },
    { name: 'DD2C', src: '/assets/plainlogo-dd2c - animation.png' },
    { name: 'Oreliya', src: '/assets/plainlogo-oreliya - animation.png' },
    { name: 'TEDC', src: '/assets/plainlogo-TEDC.png' },
  ],
  [
    { name: 'Haus & Kinder', src: '/assets/plainlogo-h&k - animation.png' },
    { name: 'Plano', src: '/assets/plainlogo-plano - animation.png' },
    { name: 'Plug', src: '/assets/plainlogo-plug - animation.png' },
    { name: 'Vecto', src: '/assets/plainlogo-vecto - animation.png' },
  ],
];

/**
 * SingleLogoSlot renders an individual logo container matching Figma's 3-card design.
 * Features the Altalogy-style vertical moveUp animation with blur and opacity easing.
 * Synchronized with adjacent cards to slide up simultaneously in lockstep.
 *
 * @param {Object} props
 * @param {Object} props.logo - Currently active logo object {name, src}
 * @param {number} props.slotIndex - Index of the slot (0, 1, or 2)
 * @param {number} props.cycleIndex - Current cycle iteration count
 * @param {boolean} props.isAnimating - Whether the moveUp animation is currently active
 * @param {boolean} props.isPaused - Whether animation is paused via hover
 * @param {number} props.cycleDuration - Full animation cycle duration in ms
 */
function SingleLogoSlot({
  logo,
  slotIndex,
  cycleIndex,
  isAnimating,
  isPaused,
  cycleDuration,
}) {
  return (
    <div
      className="flex-1 md:w-[150px] md:flex-initial h-[58px] md:h-[72px] bg-black/20 hover:bg-black/30 backdrop-blur-[4px] flex items-center justify-center p-3 md:px-5 relative overflow-hidden select-none cursor-pointer transition-colors duration-200"
    >
      <div
        key={`${slotIndex}-${cycleIndex}`}
        className={`w-full h-full flex items-center justify-center ${
          isAnimating && !isPaused ? 'animate-altalogy-logo' : ''
        }`}
        style={{
          animationDuration: `${cycleDuration}ms`,
        }}
      >
        <img
          src={logo.src}
          alt={logo.name}
          className="max-h-[30px] md:max-h-[38px] max-w-[85%] w-auto object-contain filter brightness-100 transition-opacity duration-200"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/**
 * LogoCarousel component renders 3 separate client logo containers in a row matching Figma.
 * Preserves the Figma design (3 separate cards with 8px gap) while incorporating
 * the Altalogy-style vertical slide-up animation with blur easing.
 * All 3 cards slide up simultaneously at the exact same time.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional container classes
 */
export default function LogoCarousel({ className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const cycleDuration = 3400;
  const initialDelay = 2000;

  useEffect(() => {
    let intervalId;
    // Initial display period before synchronized animations start
    const initialTimer = setTimeout(() => {
      setIsAnimating(true);
      intervalId = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prev) => (prev + 1) % LOGO_POOLS[0].length);
        }
      }, cycleDuration);
    }, initialDelay);

    return () => {
      clearTimeout(initialTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused, cycleDuration, initialDelay]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`flex items-center gap-2 w-full md:w-auto ${className}`}
      aria-label="Client logos"
    >
      {LOGO_POOLS.map((pool, index) => (
        <SingleLogoSlot
          key={index}
          logo={pool[currentIndex]}
          slotIndex={index}
          cycleIndex={currentIndex}
          isAnimating={isAnimating}
          isPaused={isPaused}
          cycleDuration={cycleDuration}
        />
      ))}
    </div>
  );
}
