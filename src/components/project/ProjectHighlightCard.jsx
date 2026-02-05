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
  // Using 'rounded-3xl' to match the global panel style, but with overflow-hidden for the inner gradient
  <Panel className="panel-double relative overflow-hidden text-black font-black h-64 sm:h-80 w-full max-w-sm p-6 sm:p-8 hover:scale-[1.02] transition-transform duration-500">
    {/* Purple gradient background - lighter, more pastel to match reference */}
    <div className="absolute inset-0 -z-30" style={{
      background: 'linear-gradient(135deg, #E0C3FC 0%, #C084FC 50%, #A855F7 100%)'
    }} />

    {/* Ripple background (uses the ripple component) */}
    <div className="absolute inset-0 -z-20 flex items-center justify-center opacity-40 pointer-events-none" aria-hidden>
      <Ripple />
    </div>

    {/* Center Emoji/Icon - Reference has a cool face or gear */}
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
        <span className="text-4xl">😎</span>
      </div>
    </div>

    {/* Top-left: Title - Big and bold */}
    <div className="absolute left-2 top-6 z-20 flex items-center gap-3">
      <div className="text-black/80 drop-shadow-sm animate-[spin_3s_linear_infinite]">
        <GearIcon className="w-8 h-8" />
      </div>
      <div className="text-5xl sm:text-6xl tracking-tighter leading-none opacity-90 mix-blend-multiply">PROJECTS</div>
    </div>

    {/* Vertical/right Japanese text */}
    <div className="absolute right-6 bottom-6 z-20 font-black tracking-widest text-xl opacity-60 mix-blend-overlay"
      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
      工芸
    </div>
  </Panel>
);

export default ProjectHighlightCard;
