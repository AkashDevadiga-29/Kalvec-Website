import React from 'react';

/**
 * Reusable IconButton component for navigation buttons and social links.
 * Features dark background with seamless hover transitions to black,
 * optional colored icon badge, and customizable typography.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.icon] - Icon element or image to display in the icon badge
 * @param {string} [props.label] - Text label displayed inside the button (Source Serif font)
 * @param {string} [props.iconBg] - Background color of the icon container (e.g., #81222F)
 * @param {string} [props.href] - Link destination (defaults to '#')
 * @param {string} [props.className] - Additional Tailwind classes
 * @param {boolean} [props.isSquare] - If true, renders a square icon-only button (e.g., 40x40)
 * @param {string} [props.ariaLabel] - Accessibility label
 * @param {function} [props.onClick] - Optional click handler
 */
export default function IconButton({
  icon,
  label,
  iconBg = '#81222F',
  href = '#',
  className = '',
  isSquare = false,
  ariaLabel,
  onClick,
}) {
  const content = (
    <>
      {icon && (
        <span
          className="flex items-center justify-center shrink-0 w-[26px] h-[26px] md:w-[30px] md:h-[30px] overflow-hidden select-none"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </span>
      )}
      {label && (
        <span className="font-display uppercase tracking-normal text-xs md:text-base text-white font-normal whitespace-nowrap">
          {label}
        </span>
      )}
    </>
  );

  const baseStyles =
    'inline-flex items-center justify-center bg-[#1A1A1A] hover:bg-[#000000] text-white transition-colors duration-200 cursor-pointer select-none';

  const shapeStyles = isSquare
    ? 'w-10 h-10 md:w-11 md:h-11'
    : 'h-10 md:h-11 pl-1.5 md:pl-2 pr-3 md:pr-3.5 gap-2 md:gap-2.5';

  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={`${baseStyles} ${shapeStyles} ${className}`}
    >
      {content}
    </a>
  );
}
