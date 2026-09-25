import React from 'react';
import IconButton from '../ui/IconButton';

/**
 * Telephone handset icon SVG with metallic chrome finish for the "Discuss your project" button.
 * Matches Figma's 18px size and metallic styling.
 *
 * @param {Object} props
 * @param {string} [props.className] - Sizing and positioning classes
 */
export function PhoneIcon({ className = 'w-[17px] h-[17px] md:w-[20px] md:h-[20px]' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="phone-metallic-grad" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#E2E8F0" />
          <stop offset="45%" stopColor="#94A3B8" />
          <stop offset="70%" stopColor="#F8FAFC" />
          <stop offset="85%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <filter id="phone-specular" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0.75" stdDeviation="0.5" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
      <path
        d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1C10.74 21 3 13.26 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z"
        fill="url(#phone-metallic-grad)"
        filter="url(#phone-specular)"
      />
    </svg>
  );
}

/**
 * At (@) symbol badge icon with metallic chrome gradient for "Write to us" button.
 * Matches Figma's 20px size and metallic styling.
 *
 * @param {Object} props
 * @param {string} [props.className] - Sizing classes
 */
export function AtIcon({ className = 'w-[17px] h-[17px] md:w-[21px] md:h-[21px]' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="at-metallic-grad" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="70%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <filter id="at-specular" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0.75" stdDeviation="0.5" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="17"
        fontWeight="700"
        fill="url(#at-metallic-grad)"
        filter="url(#at-specular)"
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
