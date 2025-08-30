import React, { useState, useCallback, useRef } from 'react';
import Panel from '../layout/Panel.jsx';
import avatar from '@/assets/images/picofme.png';
import MorphingText from '@/components/ui/morphingtext';
import Highlighter from '@/components/ui/highlighter';

const SPIN_MS = 650; // keep spin and ink in sync

const ProfileCard = () => {
  const [spinning, setSpinning] = useState(false);
  const [ink, setInk] = useState({ active: false, left: 0, top: 0, start: 16 });
  const btnRef = useRef(null);

  const onSpinEnd = useCallback(() => setSpinning(false), []);
  const onInkEnd = useCallback(() => setInk((s) => ({ ...s, active: false })), []);

  const triggerSpinAndInk = useCallback(() => {
    // Spin
    setSpinning(true);

    // Compute ink start position (center of the button in viewport coords)
    const btn = btnRef.current;
    if (btn) {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      // Find farthest viewport corner distance so the circle covers screen
      const corners = [
        { x: 0, y: 0 },
        { x: window.innerWidth, y: 0 },
        { x: 0, y: window.innerHeight },
        { x: window.innerWidth, y: window.innerHeight },
      ];
      const maxDist = corners.reduce((m, c) => {
        const dx = c.x - cx;
        const dy = c.y - cy;
        const d = Math.hypot(dx, dy);
        return Math.max(m, d);
      }, 0);
      // Our ink element is 1px, use scale equal to diameter in px
      const startScale = Math.ceil(maxDist * 2);
      setInk({ active: true, left: cx, top: cy, start: startScale });

      // Stop ink after animation ends as fallback (in case onAnimationEnd misses)
      window.setTimeout(() => setInk((s) => ({ ...s, active: false })), SPIN_MS + 50);
    }
  }, []);

  return (
    <Panel className="panel-double p-4 sm:p-6 max-w-[720px] w-full mx-auto">
      {/* Ink overlay (fixed to viewport) */}
      {ink.active && (
        <div
          className="pointer-events-none fixed rounded-full bg-white z-50 w-px h-px animate-[ink-pull_var(--dur)_ease-in-out]"
          style={{
            left: `${ink.left}px`,
            top: `${ink.top}px`,
            // custom properties for keyframes
            ['--ink-start']: String(ink.start),
            ['--ink-opacity']: '0.45',
            ['--dur']: `${SPIN_MS}ms`,
          }}
          onAnimationEnd={onInkEnd}
        />
      )}

      <div className="flex items-start gap-4">
        {/* Squircle avatar */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[28%] overflow-hidden bg-white/10">
          <img src={avatar} alt="Profile picture" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-base sm:text-lg">Rudra00codes</h2>
          <p className="text-xs sm:text-sm text-neutral-400">@rudra00codes</p>
        </div>

        {/* Yin Yang icon (click to spin + ink pull) */}
        <span
          ref={btnRef}
          role="button"
          tabIndex={0}
          onClick={triggerSpinAndInk}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && triggerSpinAndInk()}
          onAnimationEnd={onSpinEnd}
          aria-label="Toggle theme"
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5 ring-1 ring-white/10 cursor-pointer select-none origin-center ${
            spinning ? 'animate-[spin_650ms_ease-in-out]' : ''
          }`}
        >
          <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="32" cy="32" r="30" fill="#fff" />
            <path d="M32 2c16.569 0 30 13.431 30 30S48.569 62 32 62c-8.284 0-15-6.716-15-15 0-7.732 6.268-14 14-14s14-6.268 14-14C45 8.716 39.284 2 32 2z" fill="#000" />
            <circle cx="31" cy="19" r="4" fill="#000" />
            <circle cx="33" cy="45" r="4" fill="#fff" />
          </svg>
        </span>
      </div>

      <p className="mt-5 sm:mt-6 font-semibold text-base sm:text-lg">
        I build{' '}
        <span className="font-extrabold inline-block align-baseline">
          <MorphingText inline texts={['sane WebApps', 'snappy frontends', 'useful features', 'happy users']} />
        </span>{' '}
      </p>
      <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
        Hello, I'm{' '}
        <Highlighter action="underline" color="#ffd1dc" padding={1} iterations={2} strokeWidth={2}>
          Rudra 
        </Highlighter>
         ! a 20 year old{' '}
        <Highlighter action="box" color="#ffe8a3" padding={2} iterations={1} strokeWidth={1.5}>
           developer
        </Highlighter>{' '} based in Punjab - India.
      </p>

      <div className="mt-5 sm:mt-6 flex items-center justify-between text-[11px] text-neutral-400">
        <p>“Still centering a div!”<br /> (┬┬﹏┬┬) </p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span>Available for work</span>
        </div>
      </div>
    </Panel>
  );
};

export default ProfileCard;
