import React from 'react';
import IconButton from '../ui/IconButton';

/**
 * Custom telephone handset icon SVG for the "Discuss your project" button.
 */
function PhoneIcon({ className = 'w-3.5 h-3.5 text-white' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1C10.74 21 3 13.26 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z" />
    </svg>
  );
}

/**
 * At (@) symbol badge icon for "Write to us" button.
 */
function AtIcon({ className = 'text-white text-xs md:text-sm font-semibold' }) {
  return (
    <span className={className} aria-hidden="true">
      @
    </span>
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
