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
 * Trigger delays for the slide-up animation in each slot:
 * - Slot 0 (left): triggers after 2000ms (2.0s)
 * - Slot 1 (middle): triggers after 2400ms (2.4s)
 * - Slot 2 (right): triggers after 2800ms (2.8s)
 */
const TRIGGER_DELAYS = [2000, 2400, 2800];

/** Duration of the slide-up animation in ms */
const FLIP_DURATION = 500;

/** Total cycle duration in ms before repeating the wave */
const CYCLE_DURATION = 4400;

/**
 * LogoSlot renders an individual logo card with smooth slide-up transition.
 * When isFlipping is true, it renders the outgoing logo sliding up and fading out,
 * while the incoming logo slides in from below.
 *
 * @param {Object} props
 * @param {Array} props.pool - Array of logo objects for this slot
 * @param {number} props.currentIndex - Current logo index
 * @param {boolean} props.isFlipping - Whether this slot is actively executing a slide-up transition
 */
function LogoSlot({ pool, currentIndex, isFlipping }) {
  const currentLogo = pool[currentIndex];
  const nextIndex = (currentIndex + 1) % pool.length;
  const nextLogo = pool[nextIndex];

  return (
    <div
      className="flex-1 md:w-[150px] md:flex-initial h-[46px] min-[360px]:h-[50px] sm:h-[58px] md:h-[68px] lg:h-[72px] bg-black/20 backdrop-blur-[4px] flex items-center justify-center p-2 sm:p-3 md:px-5 relative overflow-hidden select-none"
    >
      {isFlipping ? (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Outgoing logo sliding up and fading out */}
          <div className="absolute inset-0 flex items-center justify-center animate-altalogy-slide-out pointer-events-none">
            <img
              src={currentLogo.src}
              alt={currentLogo.name}
              className="max-h-[24px] sm:max-h-[30px] md:max-h-[38px] max-w-[85%] w-auto object-contain filter brightness-100"
            />
          </div>
          {/* Incoming logo sliding in from below */}
          <div className="absolute inset-0 flex items-center justify-center animate-altalogy-slide-in pointer-events-none">
            <img
              src={nextLogo.src}
              alt={nextLogo.name}
              className="max-h-[24px] sm:max-h-[30px] md:max-h-[38px] max-w-[85%] w-auto object-contain filter brightness-100"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={currentLogo.src}
            alt={currentLogo.name}
            className="max-h-[24px] sm:max-h-[30px] md:max-h-[38px] max-w-[85%] w-auto object-contain filter brightness-100"
          />
        </div>
      )}
    </div>
  );
}

/**
 * LogoCarousel component renders 3 client logo cards in a synchronized row.
 * Controlled by a single master timer:
 * - Hold still for 2.0s
 * - Slot 0 (left) slides up at 2.0s
 * - Slot 1 (middle) slides up at 2.4s
 * - Slot 2 (right) slides up at 2.8s
 * - Full cycle repeats every 4.4s
 * - Uses Page Visibility API to freeze and cleanly reset timers when browser tab is inactive.
 * - Hover pause removed for seamless, uninterrupted animation.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional container classes
 */
export default function LogoCarousel({ className = '' }) {
  const [slots, setSlots] = useState([
    { index: 0, isFlipping: false },
    { index: 0, isFlipping: false },
    { index: 0, isFlipping: false },
  ]);

  useEffect(() => {
    // Preload all logos into browser memory to eliminate image loading lag
    LOGO_POOLS.forEach((pool) => {
      pool.forEach((item) => {
        const img = new Image();
        img.src = item.src;
      });
    });

    const activeTimeouts = [];
    let cycleTimer = null;

    /**
     * Executes one synchronized wave across all slots based on TRIGGER_DELAYS.
     */
    const runWave = () => {
      // Clear any pending timeouts from previous wave
      activeTimeouts.forEach(clearTimeout);
      activeTimeouts.length = 0;

      TRIGGER_DELAYS.forEach((delay, slotIdx) => {
        // Start slide-up animation
        const startTimer = setTimeout(() => {
          setSlots((prev) =>
            prev.map((s, i) => (i === slotIdx ? { ...s, isFlipping: true } : s))
          );

          // Complete slide-up animation and advance logo index
          const endTimer = setTimeout(() => {
            setSlots((prev) =>
              prev.map((s, i) =>
                i === slotIdx
                  ? {
                      index: (s.index + 1) % LOGO_POOLS[slotIdx].length,
                      isFlipping: false,
                    }
                  : s
              )
            );
          }, FLIP_DURATION);

          activeTimeouts.push(endTimer);
        }, delay);

        activeTimeouts.push(startTimer);
      });
    };

    /**
     * Starts the master loop.
     */
    const startMasterTimer = () => {
      runWave();
      cycleTimer = setInterval(runWave, CYCLE_DURATION);
    };

    /**
     * Stops the master loop and clears all pending timeouts.
     * Resets any in-progress flip to avoid stuck states.
     */
    const stopMasterTimer = () => {
      if (cycleTimer) {
        clearInterval(cycleTimer);
        cycleTimer = null;
      }
      activeTimeouts.forEach(clearTimeout);
      activeTimeouts.length = 0;
      setSlots((prev) => prev.map((s) => ({ ...s, isFlipping: false })));
    };

    /**
     * Page Visibility handler:
     * Pauses the timer when the tab is hidden (preventing browser callback pileups).
     * Restarts cleanly from t=0 when the tab is refocused.
     */
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopMasterTimer();
      } else {
        stopMasterTimer();
        startMasterTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startMasterTimer();

    return () => {
      stopMasterTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className={`flex items-center gap-2 w-full md:w-auto ${className}`}
      aria-label="Client logos"
    >
      {LOGO_POOLS.map((pool, index) => (
        <LogoSlot
          key={index}
          pool={pool}
          currentIndex={slots[index].index}
          isFlipping={slots[index].isFlipping}
        />
      ))}
    </div>
  );
}
