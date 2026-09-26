import React from 'react';
import Navbar from '../Navbar/Navbar';
import HeroDescription from './HeroDescription';
import HeroHeading from './HeroHeading';
import AsciiFlowerAnimation from './AsciiFlowerAnimation';

/**
 * Hero component is the primary showcase section of the Kalvec website.
 * Faithfully mirrors the "New Kalvec Website - V1" Figma design across
 * desktop (1440px), tablet (810px), and mobile (360px) breakpoints.
 * Includes the animated ASCII flower pollen background overlays.
 *
 * @param {Object} props
 * @param {string} [props.writeToUsUrl] - Contact / email URL (defaults to mailto:ashish@kalvec.com)
 * @param {string} [props.discussProjectUrl] - Meeting / call URL
 * @param {string} [props.linkedInUrl] - LinkedIn URL (defaults to https://www.linkedin.com/company/kalvec-studio/home/)
 * @param {string} [props.xUrl] - X (Twitter) URL (defaults to https://x.com/ashishdvga)
 */
export default function Hero({
  writeToUsUrl = 'mailto:ashish@kalvec.com',
  discussProjectUrl = '#',
  linkedInUrl = 'https://www.linkedin.com/company/kalvec-studio/home/',
  xUrl = 'https://x.com/ashishdvga',
}) {
  return (
    <section
      aria-label="Kalvec Hero Section"
      className="relative w-full h-screen h-[100dvh] max-h-[100dvh] bg-[#81222F] text-white flex flex-col justify-between p-4 pb-8 md:pb-8 overflow-hidden box-border"
    >
      {/* ========================================================================= */}
      {/* BACKGROUND ASCII FLOWER POLLEN ANIMATIONS                                 */}
      {/* Matches exact Figma 'ascii_flower_pollen' absolute coordinates            */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* DESKTOP (>=1024px): Two overlapping flowers */}
        <div className="hidden lg:block w-full h-full relative">
          {/* Left-center rotated flower (id: 548:20 in Figma) */}
          {/* Figma Dev Mode: left: -271px; top: -241px; width: 480px; height: 854px; transform: rotate(134.58deg); */}
          <div
            className="absolute pointer-events-none"
            style={{
              position: 'absolute',
              left: -271,
              top: -241,
              width: 945,
              height: 941,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AsciiFlowerAnimation
              style={{
                width: 480,
                height: 854,
                transform: 'rotate(134.58deg)',
              }}
            />
          </div>

          {/* Right-side upright flower (id: 548:19 in Figma) */}
          {/* Figma Dev Mode: left: 1030px; top: -20px; width: 480px; height: 854px; */}
          <AsciiFlowerAnimation
            className="absolute"
            style={{
              position: 'absolute',
              left: 1030,
              top: -20,
              width: 480,
              height: 854,
            }}
          />
        </div>

        {/* TABLET (768px - 1023px): Two positioned flowers */}
        <div className="hidden md:block lg:hidden w-full h-full relative">
          {/* Left-center rotated flower (id: 548:21 in Figma) */}
          {/* Figma Dev Mode: left: -291px; top: -184px; width: 480px; height: 854px; transform: rotate(134.58deg); */}
          <div
            className="absolute pointer-events-none"
            style={{
              position: 'absolute',
              left: -291,
              top: -184,
              width: 945,
              height: 941,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AsciiFlowerAnimation
              style={{
                width: 480,
                height: 854,
                transform: 'rotate(134.58deg)',
              }}
            />
          </div>

          {/* Right upright flower (id: 548:23 in Figma) */}
          {/* Figma Dev Mode: left: 414px; top: 177px; width: 480px; height: 854px; */}
          <AsciiFlowerAnimation
            className="absolute"
            style={{
              position: 'absolute',
              left: 414,
              top: 177,
              width: 480,
              height: 854,
            }}
          />
        </div>

        {/* MOBILE (<768px): Single rotated flower (id: 548:27 in Figma) */}
        <div className="block md:hidden w-full h-full relative">
          {/* Center rotated flower (id: 548:27 in Figma) */}
          {/* Figma Dev Mode: left: -206px; top: -123px; width: 390px; height: 693px; transform: rotate(134.58deg); */}
          <div
            className="absolute pointer-events-none"
            style={{
              position: 'absolute',
              left: -206,
              top: -123,
              width: 767,
              height: 764,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AsciiFlowerAnimation
              style={{
                width: 390,
                height: 693,
                transform: 'rotate(134.58deg)',
              }}
            />
          </div>
        </div>
      </div>

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
      {/* 2. MAIN HERO BODY CONTENT (Strictly fits viewport without scrolling)      */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between pt-2 sm:pt-4 md:pt-[26px] md:px-4 overflow-hidden min-h-0">
        {/* DESKTOP (>=1024px): Asymmetrical two-column layout fits within viewport */}
        <div className="hidden lg:flex flex-row justify-between items-stretch flex-1 w-full gap-6 xl:gap-8 2xl:gap-12 min-h-0">
          {/* Left Column: Agency Description & Client Logos aligned to bottom */}
          <div className="flex flex-col justify-end self-end max-w-[466px]">
            <HeroDescription />
          </div>

          {/* Right Column: Headline aligned to top */}
          <div className="flex flex-col justify-start self-start max-w-[600px]">
            <HeroHeading />
          </div>
        </div>

        {/* TABLET (768px - 1023px): Top-right Headline, Bottom-left Description */}
        <div className="hidden md:flex lg:hidden flex-col justify-between flex-1 w-full pb-2 min-h-0">
          {/* Headline on the RIGHT side */}
          <div className="flex justify-end w-full">
            <HeroHeading />
          </div>

          {/* Description & Logos on the LEFT side at the bottom */}
          <div className="flex justify-start w-full mt-auto pt-4">
            <HeroDescription />
          </div>
        </div>

        {/* MOBILE (<768px): Vertical stack strictly fitting viewport */}
        <div className="flex md:hidden flex-col justify-end gap-3 sm:gap-4 w-full mt-auto pb-1 min-h-0">
          {/* Headline */}
          <HeroHeading />

          {/* Description & 3 Logo Cards */}
          <HeroDescription />
        </div>
      </div>
    </section>
  );
}
