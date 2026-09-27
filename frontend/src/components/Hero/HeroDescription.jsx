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
    <div className={`flex flex-col gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 max-w-[466px] w-full ${className}`}>
      {/* Agency Sub-description */}
      <p className="font-sans font-medium text-white text-[13px] leading-[20px] min-[360px]:text-[14px] min-[360px]:leading-[21px] sm:text-[18px] sm:leading-[27px] md:text-[24px] md:leading-[36px] w-full md:w-[466px] tracking-normal select-none">
        We make Shopify stores for DTC brands, beautiful Framer websites and design driven software.
      </p>

      {/* Client Logo Showcase */}
      <LogoCarousel />
    </div>
  );
}
