import React from 'react';

/**
 * NavLogo component renders the Kalvec brand badge in the navbar.
 * Displays the distinctive white Kalvec wordmark inside a dark rectangular container
 * with a subtle hover transition to pure black.
 *
 * @param {Object} props
 * @param {string} [props.href] - Link target for the logo (defaults to '/')
 * @param {string} [props.className] - Optional extra classes
 */
export default function NavLogo({ href = '/', className = '' }) {
  return (
    <a
      href={href}
      aria-label="Kalvec Home"
      className={`inline-flex items-center justify-center bg-[#1A1A1A] hover:bg-[#000000] transition-colors duration-200 cursor-pointer select-none ${className}`}
    >
      <img
        src="/assets/klv-logo.png"
        alt="Kalvec"
        className="w-[115px] h-[44px] object-contain"
      />
    </a>
  );
}
