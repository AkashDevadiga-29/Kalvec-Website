import React, { useEffect, useRef, useState } from 'react';

/**
 * AsciiFlowerAnimation Component
 *
 * Renders the looping ASCII flower pollen animation GIF (/assets/ascii_flower_pollen.gif).
 * Matches the exact Figma layout coordinates, dimensions (480x854), and rotation.
 * Features a smooth entrance transition on page load/refresh:
 * - Starts invisible (opacity: 0) and blurred (filter: blur(10px))
 * - After a brief delay, smoothly fades into full layer opacity (opacity: 0.3)
 *   and clarifies into focus (filter: blur(0px)) so it never pops up abruptly.
 *
 * @param {Object} props
 * @param {number} [props.opacity=0.3] - Layer opacity (default 0.3)
 * @param {number} [props.delay=300] - Entrance delay in ms before fade/clarify begins
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.CSSProperties} [props.style={}] - Inline styling (e.g. positioning / rotation transforms)
 */
export default function AsciiFlowerAnimation({
  opacity = 0.3,
  delay = 300,
  className = '',
  style = {},
}) {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let timer;
    // If the image is already cached by the browser, schedule entrance after delay
    if (imgRef.current && imgRef.current.complete) {
      timer = setTimeout(() => setIsLoaded(true), delay);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  /**
   * Triggers the entrance bloom when the image finishes loading over network.
   */
  const handleLoad = () => {
    setTimeout(() => setIsLoaded(true), delay);
  };

  return (
    <img
      ref={imgRef}
      src="/assets/ascii_flower_pollen.gif"
      alt="ASCII flower pollen animation"
      onLoad={handleLoad}
      className={`pointer-events-none select-none object-contain will-change-[opacity,filter] ${className}`}
      style={{
        ...style,
        opacity: isLoaded ? opacity : 0,
        filter: isLoaded ? 'blur(0px)' : 'blur(10px)',
        transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      loading="eager"
    />
  );
}
