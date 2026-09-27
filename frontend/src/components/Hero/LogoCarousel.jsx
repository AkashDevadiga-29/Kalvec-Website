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
 * LogoSlot renders an individual logo card using a hardware-accelerated vertical reel.
 * All logos in the pool are pre-rendered into the DOM to eliminate image flashing, layout recalculation,
 * or unmounting glitches. A cloned copy of the first logo is appended to ensure seamless loop wrap-around.
 *
 * @param {Object} props
 * @param {Array} props.pool - Array of logo objects for this slot
 * @param {number} props.step - Monotonically increasing step counter from the master timer
 */
function LogoSlot({ pool, step }) {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Extended pool has the first logo cloned at the end for seamless wrap-around
  const extendedPool = [...pool, pool[0]];

  useEffect(() => {
    if (step === 0) return;
    setIsTransitioning(true);
    // target index in the extended pool (0 to pool.length)
    const targetIdx = step % pool.length === 0 ? pool.length : step % pool.length;
    setDisplayIndex(targetIdx);
  }, [step, pool.length]);

  /**
   * Called when the CSS transition finishes.
   * If we reached the cloned first logo at the end of extendedPool,
   * snap back to index 0 instantly without transition so subsequent flips continue upward seamlessly.
   */
  const handleTransitionEnd = () => {
    if (displayIndex >= pool.length) {
      setIsTransitioning(false);
      setDisplayIndex(0);
    }
  };

  return (
    <div
      className="flex-1 md:w-[150px] md:flex-initial h-[46px] min-[360px]:h-[50px] sm:h-[58px] md:h-[68px] lg:h-[72px] bg-black/20 backdrop-blur-[4px] flex items-center justify-center p-2 sm:p-3 md:px-5 relative overflow-hidden select-none"
    >
      <div className="relative w-full h-full overflow-hidden">
        <div
          className={`w-full h-full flex flex-col ${
            isTransitioning
              ? 'transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]'
              : ''
          }`}
          style={{
            transform: `translateY(-${displayIndex * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedPool.map((logo, i) => (
            <div
              key={i}
              className="w-full h-full flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-[24px] sm:max-h-[30px] md:max-h-[38px] max-w-[85%] w-auto object-contain filter brightness-100"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * LogoCarousel component renders 3 client logo cards in a synchronized row.
 * Controlled by a single master recursive timer:
 * - Hold still for 2.0s
 * - Slot 0 (left) slides up at 2.0s
 * - Slot 1 (middle) slides up at 2.4s (+400ms)
 * - Slot 2 (right) slides up at 2.8s (+800ms)
 * - Slot 2 finishes sliding up at 3.3s
 * - Exactly 2.0s hold before the next wave triggers
 * - Uses Page Visibility API to freeze and cleanly reset timers when browser tab is inactive.
 * - Hardware-accelerated vertical reels with zero DOM teardown to eliminate flickers and skips.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional container classes
 */
export default function LogoCarousel({ className = '' }) {
  const [slotSteps, setSlotSteps] = useState([0, 0, 0]);

  useEffect(() => {
    let timeoutIds = [];
    let isStopped = false;

    /**
     * Executes one synchronized wave across all slots:
     * Left at 2.0s, Middle at 2.4s, Right at 2.8s, then schedules next wave after 2.0s hold.
     */
    const triggerWave = () => {
      if (isStopped) return;

      // Slot 0 (left) after 2000ms
      const t0 = setTimeout(() => {
        if (isStopped) return;
        setSlotSteps((prev) => [prev[0] + 1, prev[1], prev[2]]);
      }, 2000);

      // Slot 1 (middle) after 2400ms (+400ms)
      const t1 = setTimeout(() => {
        if (isStopped) return;
        setSlotSteps((prev) => [prev[0], prev[1] + 1, prev[2]]);
      }, 2400);

      // Slot 2 (right) after 2800ms (+800ms)
      const t2 = setTimeout(() => {
        if (isStopped) return;
        setSlotSteps((prev) => [prev[0], prev[1], prev[2] + 1]);
      }, 2800);

      // Slot 2 finishes flip at 2800 + 500 = 3300ms.
      // Calling triggerWave at 3300ms immediately starts the 2000ms hold for the next wave,
      // so cards rest for exactly 2.0s before the left card flips again.
      const nextWaveTimer = setTimeout(() => {
        if (isStopped) return;
        triggerWave();
      }, 3300);

      timeoutIds.push(t0, t1, t2, nextWaveTimer);
    };

    /**
     * Starts the carousel cycle.
     */
    const start = () => {
      isStopped = false;
      triggerWave();
    };

    /**
     * Stops the carousel and clears all scheduled timers.
     */
    const stop = () => {
      isStopped = true;
      timeoutIds.forEach(clearTimeout);
      timeoutIds = [];
    };

    /**
     * Page Visibility API handler:
     * Freezes timers when tab is hidden, restarts cleanly from t=0 when tab is refocused.
     */
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        stop();
        start();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    start();

    return () => {
      stop();
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
          step={slotSteps[index]}
        />
      ))}
    </div>
  );
}
