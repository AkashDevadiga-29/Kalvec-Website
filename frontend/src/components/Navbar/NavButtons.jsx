import React from 'react';
import IconButton from '../ui/IconButton';

/**
 * Telephone handset icon SVG for the "Discuss your project" button.
 * Configured with exact Figma specifications: width: 32px, height: 32px, aspect-ratio: 1/1.
 * Uses currentColor to guarantee visibility across all desktop, tablet, and mobile breakpoints.
 *
 * @param {Object} props
 * @param {string} [props.className] - Sizing and positioning classes
 */
export function PhoneIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={`w-[32px] h-[32px] aspect-square text-white select-none p-1.5 ${className}`}
      style={{ width: '32px', height: '32px', aspectRatio: '1/1' }}
      aria-hidden="true"
    >
      <path d="M8.83 14.39a20.07 20.07 0 008.79 8.79l2.93-2.93a1.33 1.33 0 011.36-.32 15.63 15.63 0 004.91.79 1.33 1.33 0 011.33 1.33V26.7a1.33 1.33 0 01-1.33 1.33C14.32 28.03 4 17.71 4 4.33A1.33 1.33 0 015.33 3h4.67a1.33 1.33 0 011.33 1.33 15.63 15.63 0 00.79 4.91 1.33 1.33 0 01-.32 1.36l-2.97 2.79z" />
    </svg>
  );
}

/**
 * At (@) symbol badge icon for "Write to us" button.
 * Configured with exact Figma specifications: width: 32px, height: 32px, aspect-ratio: 1/1.
 * Uses currentColor to guarantee visibility across all desktop, tablet, and mobile breakpoints.
 *
 * @param {Object} props
 * @param {string} [props.className] - Sizing classes
 */
export function AtIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={`w-[32px] h-[32px] aspect-square text-white select-none ${className}`}
      style={{ width: '32px', height: '32px', aspectRatio: '1/1' }}
      aria-hidden="true"
    >
      <text
        x="16"
        y="13.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="currentColor"
      >
        @
      </text>
    </svg>
  );
}

/**
 * NavButtons component renders the "WRITE TO US" and "DISCUSS YOUR PROJECT" action buttons.
 *
 * @param {Object} props
 * @param {string} [props.writeToUsUrl] - Contact/Email URL (e.g. mailto:hello@kalvec.com)
 * @param {string} [props.discussProjectUrl] - Meeting/Cal URL or phone link
 * @param {string} [props.className] - Container layout classes
 * @param {string} [props.buttonHeight] - Custom height class for mobile vs desktop
 */
export default function NavButtons({
  writeToUsUrl = '#',
  discussProjectUrl = '#',
  className = '',
  buttonHeight = '',
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* WRITE TO US Button */}
      <IconButton
        label="WRITE TO US"
        icon={<AtIcon />}
        iconBg="#81222F"
        href={writeToUsUrl}
        ariaLabel="Write to us"
        className={buttonHeight}
      />

      {/* DISCUSS YOUR PROJECT Button */}
      <IconButton
        label="DISCUSS YOUR PROJECT"
        icon={<PhoneIcon />}
        iconBg="#81222F"
        href={discussProjectUrl}
        ariaLabel="Discuss your project"
        className={buttonHeight}
      />
    </div>
  );
}
