import React from 'react';

/**
 * AsciiFlowerAnimation Component
 *
 * Renders the looping ASCII flower pollen animation GIF (/assets/ascii_flower_pollen.gif).
 * Matches the exact Figma layout coordinates, dimensions (480x854), and rotation.
 * Set to loop indefinitely on the background layer.
 *
 * @param {Object} props
 * @param {number} [props.opacity=0.3] - Layer opacity matching Figma (default 0.3)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.CSSProperties} [props.style={}] - Inline styling (e.g. positioning / rotation transforms)
 */
export default function AsciiFlowerAnimation({
  opacity = 0.3,
  className = '',
  style = {},
}) {
  return (
    <img
      src="/assets/ascii_flower_pollen.gif"
      alt="ASCII flower pollen animation"
      className={`pointer-events-none select-none object-contain ${className}`}
      style={{
        opacity,
        ...style,
      }}
      loading="eager"
    />
  );
}
