import React from 'react';

/**
 * SocialButtons component displays the LinkedIn and X (Twitter) buttons.
 * Renders dark square buttons that invert or darken on hover,
 * with props to supply custom destination URLs.
 *
 * @param {Object} props
 * @param {string} [props.linkedInUrl] - LinkedIn profile URL (defaults to https://www.linkedin.com/company/kalvec-studio/home/)
 * @param {string} [props.xUrl] - X (Twitter) profile URL (defaults to https://x.com/ashishdvga)
 * @param {string} [props.className] - Optional extra classes for container
 * @param {string} [props.sizeClasses] - Sizing classes for individual buttons
 */
export default function SocialButtons({
  linkedInUrl = 'https://www.linkedin.com/company/kalvec-studio/home/',
  xUrl = 'https://x.com/ashishdvga',
  className = '',
  sizeClasses = 'w-10 h-10 md:w-11 md:h-11',
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* LinkedIn Button (Icon: width: 32px, height: 32px, aspect-ratio: 1/1 matching Figma) */}
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kalvec on LinkedIn"
        className={`inline-flex items-center justify-center bg-[#1A1A1A] hover:bg-[#000000] transition-colors duration-200 cursor-pointer select-none ${sizeClasses}`}
      >
        <img
          src="/assets/linkedin-icon.png"
          alt="LinkedIn"
          className="w-[32px] h-[32px] aspect-square object-contain select-none"
          style={{ width: '32px', height: '32px', aspectRatio: '1/1' }}
        />
      </a>

      {/* X (Twitter) Button (Icon: width: 32px, height: 32px, aspect-ratio: 1/1 matching Figma) */}
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kalvec on X (Twitter)"
        className={`inline-flex items-center justify-center bg-[#1A1A1A] hover:bg-[#000000] transition-colors duration-200 cursor-pointer select-none ${sizeClasses}`}
      >
        <img
          src="/assets/x-icon.png"
          alt="X"
          className="w-[32px] h-[32px] aspect-square object-contain select-none"
          style={{ width: '32px', height: '32px', aspectRatio: '1/1' }}
        />
      </a>
    </div>
  );
}
