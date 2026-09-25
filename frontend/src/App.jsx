import React from 'react';
import Hero from './components/Hero/Hero';

/**
 * Main application component for the Kalvec website.
 * Renders the hero section faithfully matching the Figma design V1.
 */
export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#81222F]">
      {/* Primary Hero Section */}
      <Hero />
    </div>
  );
}
