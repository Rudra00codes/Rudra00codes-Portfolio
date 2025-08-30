import React from 'react';
import Panel from '../layout/Panel.jsx';
import Ripple from '../ui/ripple';

const GearIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path fill="currentColor" d="M19.14,12.94a7.14,7.14,0,0,0,0-1.88l2.03-1.58a0.5,0.5,0,0,0,.12-0.64l-1.92-3.32a0.5,0.5,0,0,0-.6-0.22l-2.39,0.96a7.11,7.11,0,0,0-1.62-0.94L14.6,2.7a0.5,0.5,0,0,0-.49-0.37H10a0.5,0.5,0,0,0-.49.37L8.86,5.33A7.11,7.11,0,0,0,7.24,6.27L4.85,5.31a0.5,0.5,0,0,0-.6.22L2.33,8.85a0.5,0.5,0,0,0,.12.64L4.48,11.07a7.14,7.14,0,0,0,0,1.88L2.45,14.53a0.5,0.5,0,0,0-.12.64l1.92,3.32a0.5,0.5,0,0,0,.6.22l2.39-0.96a7.11,7.11,0,0,0,1.62.94l0.65,2.66a0.5,0.5,0,0,0,.49.37h4.12a0.5,0.5,0,0,0,.49-0.37l0.65-2.66a7.11,7.11,0,0,0,1.62-0.94l2.39,0.96a0.5,0.5,0,0,0,.6-0.22l1.92-3.32a0.5,0.5,0,0,0-.12-0.64ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>
);

const ProjectHighlightCard = () => (
  <Panel className="panel-double relative overflow-hidden text-black font-extrabold h-56 sm:h-72 w-full max-w-sm p-4 sm:p-6">
    {/* Purple gradient background */}
    <div className="absolute inset-0 -z-30" style={{
      background: 'linear-gradient(135deg,#e9d5ff 0%,#d8b4ff 35%,#c084fc 100%)'
    }} />

    {/* Ripple background (uses the ripple component) */}
    <div className="absolute inset-0 -z-20 flex items-center justify-center pointer-events-none" aria-hidden>
      <Ripple />
    </div>

  {/* Ripple background (uses the ripple component) */}
  {/* Static vignette/circle elements removed — Ripple component provides animated rings */}

    {/* Top-left: gear + title inline */}
    <div className="absolute left-4 top-4 z-10 flex items-center gap-4">
      <div className="text-black/90 drop-shadow-sm">
        <GearIcon className="w-10 h-10" />
      </div>
      <div className="text-4xl sm:text-5xl leading-none tracking-tight drop-shadow-md">PROJECTS</div>
    </div>

      {/* Vertical/right Japanese text */}
    <div className="absolute right-4 bottom-4 z-10 font-black tracking-wider text-lg"
         style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
      工芸
    </div>
  </Panel>
);

export default ProjectHighlightCard;
