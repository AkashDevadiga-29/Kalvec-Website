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

/** Stagger delay between each slot in ms */
const STAGGER_MS = 250;

/**
 * SingleLogoSlot renders an individual logo container matching Figma's 3-card design.
 * Each slot manages its own animation cycle independently so the stagger
 * applies to both entry and exit of the logo.
 *
 * @param {Object} props
 * @param {Array} props.pool - Array of logo objects for this slot
 * @param {number} props.slotIndex - Index of the slot (0, 1, or 2)
 * @param {boolean} props.isPaused - Whether animation is paused via hover
 * @param {number} props.cycleDuration - Full animation cycle duration in ms
 * @param {number} props.initialDelay - Initial delay before animation starts (includes stagger)
 */
function SingleLogoSlot({
  pool,
  slotIndex,
  isPaused,
  cycleDuration,
  initialDelay,
}) {
  const [localIndex, setLocalIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let intervalId;

    // Initial display period + stagger offset before this slot's animation begins
    const startTimer = setTimeout(() => {
      setIsAnimating(true);
      intervalId = setInterval(() => {
        if (!isPaused) {
          setLocalIndex((prev) => (prev + 1) % pool.length);
        }
      }, cycleDuration);
    }, initialDelay);

    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused, cycleDuration, initialDelay, pool.length]);

  const logo = pool[localIndex];

  return (
    <div
      className="flex-1 md:w-[150px] md:flex-initial h-[46px] min-[360px]:h-[50px] sm:h-[58px] md:h-[68px] lg:h-[72px] bg-black/20 hover:bg-black/30 backdrop-blur-[4px] flex items-center justify-center p-2 sm:p-3 md:px-5 relative overflow-hidden select-none cursor-pointer transition-colors duration-200"
    >
      <div
        key={`${slotIndex}-${localIndex}`}
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
          className="max-h-[24px] sm:max-h-[30px] md:max-h-[38px] max-w-[85%] w-auto object-contain filter brightness-100 transition-opacity duration-200"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/**
 * LogoCarousel component renders 3 separate client logo containers in a row matching Figma.
 * Each card has its own independent animation cycle offset by STAGGER_MS so logos
 * animate one by one (left → middle → right) for both entry and exit.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional container classes
 */
export default function LogoCarousel({ className = '' }) {
  const [isPaused, setIsPaused] = useState(false);
  // Full cycle duration increased to allow all cards to remain visible and readable longer
  const cycleDuration = 4400;
  // Initial delay before the first animation cycle triggers
  const baseDelay = 2600;

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
          pool={pool}
          slotIndex={index}
          isPaused={isPaused}
          cycleDuration={cycleDuration}
          initialDelay={baseDelay + index * STAGGER_MS}
        />
      ))}
    </div>
  );
}
