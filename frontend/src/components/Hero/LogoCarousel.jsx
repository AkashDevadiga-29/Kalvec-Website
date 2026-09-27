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
 * LogoSlot renders an individual logo card with the ethereal Altalogy float transition
 * (20px vertical displacement with simultaneous blur and opacity easing).
 * Uses two overlapping layers with native onAnimationEnd cleanup to ensure 100% glitch-free,
 * silky smooth animation without DOM destruction hitches.
 *
 * @param {Object} props
 * @param {Array} props.pool - Array of logo objects for this slot
 * @param {number} props.step - Monotonically increasing step counter from master timer
 */
function LogoSlot({ pool, step }) {
  const [current, setCurrent] = useState({
    src: pool[0].src,
    name: pool[0].name,
    key: `slot-${pool[0].name}-0`,
  });
  const [outgoing, setOutgoing] = useState(null);

  useEffect(() => {
    if (step === 0) return;
    const nextIdx = step % pool.length;
    const nextLogo = pool[nextIdx];

    // Move current to outgoing, set new incoming logo
    setOutgoing(current);
    setCurrent({
      src: nextLogo.src,
      name: nextLogo.name,
      key: `slot-${nextLogo.name}-${step}`,
    });
  }, [step, pool]);

  /**
   * Cleans up the outgoing logo once its fade-out and blur animation finishes.
   */
  const handleOutgoingAnimationEnd = () => {
    setOutgoing(null);
  };

  return (
    <div
      className="flex-1 md:w-[150px] md:flex-initial h-[46px] min-[360px]:h-[50px] sm:h-[58px] md:h-[68px] lg:h-[72px] bg-black/20 backdrop-blur-[4px] flex items-center justify-center p-2 sm:p-3 md:px-5 relative overflow-hidden select-none"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Outgoing logo: floats up by 20px, blurs and fades out */}
        {outgoing && (
          <div
            key={outgoing.key}
            onAnimationEnd={handleOutgoingAnimationEnd}
            className="absolute inset-0 flex items-center justify-center pointer-events-none animate-altalogy-exit"
          >
            <img
              src={outgoing.src}
              alt={outgoing.name}
              className="max-h-[24px] sm:max-h-[30px] md:max-h-[38px] max-w-[85%] w-auto object-contain filter brightness-100"
            />
          </div>
        )}

        {/* Current logo: enters from 20px below with unblur and fade-in, remains stationary once settled */}
        <div
          key={current.key}
          className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
            outgoing ? 'animate-altalogy-enter' : ''
          }`}
        >
          <img
            src={current.src}
            alt={current.name}
            className="max-h-[24px] sm:max-h-[30px] md:max-h-[38px] max-w-[85%] w-auto object-contain filter brightness-100"
            loading="eager"
          />
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
 * - Smooth 600ms ease-out float with blur and opacity
 * - Hold still for 2.0s after wave completes, then repeats
 * - Uses Page Visibility API to freeze and cleanly reset timers when browser tab is inactive.
 * - Hover pause removed for seamless, uninterrupted rhythm.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional container classes
 */
export default function LogoCarousel({ className = '' }) {
  const [slotSteps, setSlotSteps] = useState([0, 0, 0]);

  useEffect(() => {
    // Preload all logos into browser memory to eliminate any image decode lag
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

      // Slot 2 finishes flip at 2800 + 1000 = 3800ms.
      // Calling triggerWave at 3800ms starts the 2000ms hold for the next wave,
      // so cards rest for exactly 2.0s before the left card flips again.
      const nextWaveTimer = setTimeout(() => {
        if (isStopped) return;
        triggerWave();
      }, 3800);

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
