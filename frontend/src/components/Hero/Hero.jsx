import React from 'react';
import Navbar from '../Navbar/Navbar';
import HeroDescription from './HeroDescription';
import HeroHeading from './HeroHeading';

/**
 * Hero component is the primary showcase section of the Kalvec website.
 * Faithfully mirrors the "New Kalvec Website - V1" Figma design across
 * desktop (1440px), tablet (810px), and mobile (360px) breakpoints.
 *
 * @param {Object} props
 * @param {string} [props.writeToUsUrl] - Contact / email URL
 * @param {string} [props.discussProjectUrl] - Meeting / call URL
 * @param {string} [props.linkedInUrl] - LinkedIn URL
 * @param {string} [props.xUrl] - X (Twitter) URL
 */
export default function Hero({
  writeToUsUrl = '#',
  discussProjectUrl = '#',
  linkedInUrl = '#',
  xUrl = '#',
}) {
  return (
    <section
      aria-label="Kalvec Hero Section"
      className="relative w-full min-h-screen bg-[#81222F] text-white flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden box-border"
    >
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (All Breakpoints)                                          */}
      {/* ========================================================================= */}
      <Navbar
        writeToUsUrl={writeToUsUrl}
        discussProjectUrl={discussProjectUrl}
        linkedInUrl={linkedInUrl}
        xUrl={xUrl}
      />

      {/* ========================================================================= */}
      {/* 2. MAIN HERO BODY CONTENT                                                 */}
      {/* ========================================================================= */}
      <div className="w-full flex-1 flex flex-col justify-between pt-[26px] pb-2">
        {/* DESKTOP (>=1280px): Asymmetrical two-column layout */}
        <div className="hidden xl:flex flex-row justify-between items-stretch flex-1 w-full gap-8 2xl:gap-12">
          {/* Left Column: Agency Description & Client Logos aligned to bottom */}
          <div className="flex flex-col justify-end self-end pb-2 max-w-[466px]">
            <HeroDescription />
          </div>

          {/* Right Column: Headline aligned to top (exactly 26px below navbar) */}
          <div className="flex flex-col justify-start self-start max-w-[600px]">
            <HeroHeading />
          </div>
        </div>

        {/* TABLET (768px - 1279px): Top-right Headline, Bottom-left Description */}
        {/* Faithfully matches Figma "hero-tablet" (W 810, H 861) with right-aligned heading */}
        <div className="hidden md:flex xl:hidden flex-col justify-between flex-1 w-full pb-4">
          {/* Headline on the RIGHT side, exactly 26px below navbar */}
          <div className="flex justify-end w-full">
            <HeroHeading />
          </div>

          {/* Description & Logos on the LEFT side at the bottom */}
          <div className="flex justify-start w-full mt-auto pt-8">
            <HeroDescription />
          </div>
        </div>

        {/* MOBILE (<768px): Vertical stack at bottom */}
        {/* Faithfully matches Figma "hero-mobile" (W 360, H 740) */}
        <div className="flex md:hidden flex-col justify-end gap-5 sm:gap-6 w-full mt-auto pb-2">
          {/* Headline */}
          <HeroHeading />

          {/* Description & 3 Logo Cards */}
          <HeroDescription />
        </div>
      </div>
    </section>
  );
}
