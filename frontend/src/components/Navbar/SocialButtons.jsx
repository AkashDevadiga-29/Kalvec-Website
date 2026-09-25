import React from 'react';

/**
 * SocialButtons component displays the LinkedIn and X (Twitter) buttons.
 * Renders dark square buttons that invert or darken on hover,
 * with props to supply custom destination URLs.
 *
 * @param {Object} props
 * @param {string} [props.linkedInUrl] - LinkedIn profile URL (defaults to '#')
 * @param {string} [props.xUrl] - X (Twitter) profile URL (defaults to '#')
 * @param {string} [props.className] - Optional extra classes for container
 * @param {string} [props.sizeClasses] - Sizing classes for individual buttons
 */
export default function SocialButtons({
  linkedInUrl = '#',
  xUrl = '#',
  className = '',
  sizeClasses = 'w-10 h-10 md:w-11 md:h-11',
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* LinkedIn Button */}
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kalvec on LinkedIn"
        className={`inline-flex items-center justify-center bg-[#1A1A1A] hover:bg-[#000000] transition-colors duration-200 cursor-pointer p-2 ${sizeClasses}`}
      >
        <img
          src="/assets/linkedin-icon.png"
          alt="LinkedIn"
          className="w-5 h-5 md:w-6 md:h-6 object-contain"
        />
      </a>

      {/* X (Twitter) Button */}
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kalvec on X (Twitter)"
        className={`inline-flex items-center justify-center bg-[#1A1A1A] hover:bg-[#000000] transition-colors duration-200 cursor-pointer p-2 ${sizeClasses}`}
      >
        <img
          src="/assets/x-icon.png"
          alt="X"
          className="w-4 h-4 md:w-5 md:h-5 object-contain"
        />
      </a>
    </div>
  );
}
