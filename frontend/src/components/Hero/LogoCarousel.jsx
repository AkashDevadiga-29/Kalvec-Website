import React, { useEffect, useState, useRef } from 'react';

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

/** Transition duration in ms for the smooth float */
const TRANSITION_DURATION = 850;

/**
 * LogoSlot renders an individual logo card with smooth CSS transitions.
 * All logos in the pool are permanently mounted in the DOM to completely eliminate
 * image decode delays, blank frames, and unmount flickers.
 *
 * @param {Object} props
 * @param {Array} props.pool - Array of logo objects for this slot
 * @param {number} props.step - Monotonically increasing step counter from the master timer
 */
function LogoSlot({ pool, step }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(-1);
  const prevStepRef = useRef(step);

  useEffect(() => {
    if (step === 0 || step === prevStepRef.current) return;
    prevStepRef.current = step;

    setExitingIndex(activeIndex);
    setActiveIndex(step % pool.length);
  }, [step, activeIndex, pool.length]);

  /**
   * Cleans up the exiting logo once its CSS transition completes.
   *
   * @param {React.TransitionEvent} e - Transition event
   * @param {number} index - Index of the logo that finished transitioning
   */
  const handleTransitionEnd = (e, index) => {
    // Only respond to the transform transition property to avoid duplicate events
    if (e.propertyName === 'transform' && index === exitingIndex) {
      setExitingIndex(-1);
    }
  };

  return (
    <div
      className="flex-1 md:w-[150px] md:flex-initial h-[46px] min-[360px]:h-[50px] sm:h-[58px] md:h-[68px] lg:h-[72px] bg-black/20 backdrop-blur-[4px] flex items-center justify-center p-2 sm:p-3 md:px-5 relative overflow-hidden select-none"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {pool.map((logo, index) => {
          const isActive = index === activeIndex;
          const isExiting = index === exitingIndex;

          let style = {
            opacity: 0,
            transform: 'translateY(24px)',
            filter: 'blur(4px)',
            transition: 'none',
            zIndex: 0,
          };

          if (isActive) {
            style = {
              opacity: 1,
              transform: 'translateY(0px)',
              filter: 'blur(0px)',
              transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${TRANSITION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), filter ${TRANSITION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              zIndex: 2,
            };
          } else if (isExiting) {
            style = {
              opacity: 0,
              transform: 'translateY(-24px)',
              filter: 'blur(4px)',
              transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${TRANSITION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), filter ${TRANSITION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              zIndex: 1,
            };
          }

          return (
            <div
              key={index}
              style={style}
              onTransitionEnd={(e) => handleTransitionEnd(e, index)}
              className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-[transform,opacity,filter]"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-[24px] sm:max-h-[30px] md:max-h-[38px] max-w-[85%] w-auto object-contain filter brightness-100"
                loading="eager"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * LogoCarousel component renders 3 client logo cards in a synchronized row.
 * Controlled by a single master recursive timer:
 * - Hold still for 2.0s
 * - Slot 0 (left) starts floating up at 2.0s
 * - Slot 1 (middle) starts floating up at 2.45s (+450ms)
 * - Slot 2 (right) starts floating up at 2.9s (+900ms)
 * - Transitions complete gracefully over 850ms
 * - Exactly 2.0s hold after all cards settle before the next wave
 * - Uses Page Visibility API to freeze and cleanly reset timers when browser tab is inactive.
 * - Permanent DOM mounting for all logos guarantees 0% chance of flickers, blank frames, or snaps.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional container classes
 */
export default function LogoCarousel({ className = '' }) {
  const [slotSteps, setSlotSteps] = useState([0, 0, 0]);

  useEffect(() => {
    // Preload all logos into browser memory
    LOGO_POOLS.forEach((pool) => {
      pool.forEach((item) => {
        const img = new Image();
        img.src = item.src;
      });
    });

    let timeoutIds = [];
    let isStopped = false;

    /**
     * Executes one synchronized wave across all slots:
     * Left at 2.0s, Middle at 2.45s, Right at 2.9s, then schedules next wave after 2.0s hold.
     */
    const triggerWave = () => {
      if (isStopped) return;

      // Slot 0 (left) after 2000ms (2.0s)
      const t0 = setTimeout(() => {
        if (isStopped) return;
        setSlotSteps((prev) => [prev[0] + 1, prev[1], prev[2]]);
      }, 2000);

      // Slot 1 (middle) after 2450ms (+450ms)
      const t1 = setTimeout(() => {
        if (isStopped) return;
        setSlotSteps((prev) => [prev[0], prev[1] + 1, prev[2]]);
      }, 2450);

      // Slot 2 (right) after 2900ms (+900ms)
      const t2 = setTimeout(() => {
        if (isStopped) return;
        setSlotSteps((prev) => [prev[0], prev[1], prev[2] + 1]);
      }, 2900);

      // Slot 2 finishes its 850ms transition at 2900 + 850 = 3750ms.
      // Calling triggerWave at 3750ms starts the 2000ms hold for the next wave,
      // so cards rest for exactly 2.0s before the left card flips again.
      const nextWaveTimer = setTimeout(() => {
        if (isStopped) return;
        triggerWave();
      }, 3750);

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
