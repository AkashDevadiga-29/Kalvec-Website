import React from 'react';
import IconButton from '../ui/IconButton';
import NavButtons from './NavButtons';
import NavLogo from './NavLogo';
import SocialButtons from './SocialButtons';

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
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z" />
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
 * Navbar component for the Kalvec website hero section.
 * Implements responsive layouts:
 * - Desktop & Tablet (>=768px): Inline horizontal bar with logo on left, social + CTA buttons on right.
 * - Mobile (<768px): Top row with logo on left, and right-aligned vertical stacked buttons
 *   (Write to us -> Discuss project -> Social icons).
 *
 * @param {Object} props
 * @param {string} [props.writeToUsUrl] - URL for "Write to us"
 * @param {string} [props.discussProjectUrl] - URL for "Discuss your project"
 * @param {string} [props.linkedInUrl] - URL for LinkedIn
 * @param {string} [props.xUrl] - URL for X (Twitter)
 * @param {string} [props.className] - Optional container classes
 */
export default function Navbar({
  writeToUsUrl = '#',
  discussProjectUrl = '#',
  linkedInUrl = '#',
  xUrl = '#',
  className = '',
}) {
  return (
    <header className={`w-full z-20 ${className}`}>
      {/* ========================================================================= */}
      {/* DESKTOP & TABLET LAYOUT (>=768px)                                         */}
      {/* ========================================================================= */}
      <nav
        aria-label="Desktop Navigation"
        className="hidden md:flex items-center justify-between w-full"
      >
        {/* Left: Kalvec Logo Badge */}
        <NavLogo />

        {/* Right: Inline Button Group ([in] [X] [@ WRITE TO US] [📞 DISCUSS]) */}
        <div className="flex items-center gap-2">
          <SocialButtons
            linkedInUrl={linkedInUrl}
            xUrl={xUrl}
          />
          <NavButtons
            writeToUsUrl={writeToUsUrl}
            discussProjectUrl={discussProjectUrl}
          />
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (<768px)                                                    */}
      {/* ========================================================================= */}
      <nav
        aria-label="Mobile Navigation"
        className="flex md:hidden items-start justify-between w-full"
      >
        {/* Left: Kalvec Logo */}
        <NavLogo />

        {/* Right: Stacked Action Buttons */}
        <div className="flex flex-col items-end gap-1.5">
          {/* Row 1: Write to us */}
          <IconButton
            label="WRITE TO US"
            icon={<AtIcon />}
            iconBg="#81222F"
            href={writeToUsUrl}
            ariaLabel="Write to us"
            className="h-10 text-xs px-2.5"
          />

          {/* Row 2: Discuss your project */}
          <IconButton
            label="DISCUSS YOUR PROJECT"
            icon={<PhoneIcon />}
            iconBg="#81222F"
            href={discussProjectUrl}
            ariaLabel="Discuss your project"
            className="h-10 text-xs px-2.5"
          />

          {/* Row 3: Social Buttons side-by-side */}
          <SocialButtons
            linkedInUrl={linkedInUrl}
            xUrl={xUrl}
            sizeClasses="w-10 h-10"
            className="justify-end pt-0.5"
          />
        </div>
      </nav>
    </header>
  );
}
