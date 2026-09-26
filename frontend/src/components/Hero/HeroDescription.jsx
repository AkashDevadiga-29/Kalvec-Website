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
      <p className="font-body font-medium text-white text-[12.5px] leading-[18px] min-[360px]:text-[13.5px] min-[360px]:leading-[20px] md:text-[18px] md:leading-[27px] lg:text-[22px] lg:leading-[33px] xl:text-[24px] xl:leading-[36px] tracking-normal select-none">
        We make Shopify stores for DTC brands, beautiful Framer websites and design driven software.
      </p>

      {/* Client Logo Showcase */}
      <LogoCarousel />
    </div>
  );
}
