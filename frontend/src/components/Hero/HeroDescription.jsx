import React from 'react';
import LogoCarousel from './LogoCarousel';

/**
 * HeroDescription component displays the agency capability statement
 * paired directly with the client logo showcase carousel.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional container classes
 */
export default function HeroDescription({ className = '' }) {
  return (
    <div className={`flex flex-col gap-4 md:gap-5 max-w-[466px] w-full ${className}`}>
      {/* Agency Sub-description */}
      <p className="font-body font-medium text-white text-[14px] leading-[21px] md:text-[20px] md:leading-[30px] lg:text-[24px] lg:leading-[36px] tracking-normal select-none">
        We make Shopify stores for DTC brands, beautiful Framer websites and design driven software.
      </p>

      {/* Client Logo Showcase */}
      <LogoCarousel />
    </div>
  );
}
