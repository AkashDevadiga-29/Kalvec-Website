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
      className={`font-sans font-semibold text-white/80 text-justify tracking-[-3.36px] md:tracking-[-6.4px] leading-[100%] text-[38px] min-[390px]:text-[42px] md:text-[68px] lg:text-[80px] w-full max-w-[600px] select-none ${className}`}
    >
      Tastefully building software, for the love of the craft
    </h1>
  );
}
