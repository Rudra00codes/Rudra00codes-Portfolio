import React from 'react';

const AppShell = ({ children }) => (
  <div className="relative min-h-screen w-full bg-white text-black dark:bg-black dark:text-white overflow-hidden">
    {/* Dotted radial grid background */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        // use transparent so the dotted background reads against the current page background
        background: 'transparent',
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0.9px, transparent 0.9px)',
        backgroundSize: '25px 25px',
        backgroundPosition: '0 0'
      }}
    />
    <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 py-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)_300px]">
      {children}
    </div>
  </div>
);

export default AppShell;
