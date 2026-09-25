import React from 'react';

/**
 * HeroHeading component renders the manifesto headline:
 * "Tastefully building software, for the love of the craft"
 * Uses General Sans Semibold (weight 600) with -8% letter spacing,
 * 100% line height, and 80% white opacity matching the Figma specification.
 * Each phrase is preserved on its intended line using whitespace-nowrap.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional custom classes
 */
export default function HeroHeading({ className = '' }) {
  return (
    <h1
      className={`font-sans font-semibold text-white/80 select-none tracking-[-0.08em] leading-[100%] text-[38px] min-[390px]:text-[42px] md:text-[68px] lg:text-[80px] ${className}`}
    >
      <span className="block whitespace-nowrap">Tastefully building</span>
      <span className="block whitespace-nowrap">software, for the</span>
      <span className="block whitespace-nowrap">love of the craft</span>
    </h1>
  );
}
