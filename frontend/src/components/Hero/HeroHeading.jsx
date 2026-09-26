import React from 'react';

/**
 * HeroHeading component renders the manifesto headline:
 * "Tastefully building software, for the love of the craft"
 * Configured as a single justified sentence with text-align: justify
 * and width: 600px matching the Figma Dev Mode CSS specification.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional custom classes
 */
export default function HeroHeading({ className = '' }) {
  return (
    <h1
      className={`font-sans font-semibold text-white/80 text-justify tracking-[-2px] sm:tracking-[-3.2px] md:tracking-[-5px] lg:tracking-[-6.4px] leading-[102%] text-[30px] min-[360px]:text-[34px] min-[390px]:text-[40px] md:text-[60px] lg:text-[72px] xl:text-[80px] w-full max-w-[600px] select-none ${className}`}
    >
      Tastefully building software, for the love of the craft
    </h1>
  );
}
