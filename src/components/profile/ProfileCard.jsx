import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Panel from '../layout/Panel.jsx';
import avatar from '@/assets/images/picofme.png';
import MorphingText from '@/components/ui/morphingtext';
import Highlighter from '@/components/ui/highlighter';
import rickGif from '@/assets/Rick_Astley.gif';

const SPIN_MS = 650; // keep spin and ink in sync
const GIF_DURATION_MS = 2400; // duration to show GIF overlay (ms) — adjust to match your asset

const ProfileCard = () => {
  const [spinning, setSpinning] = useState(false);
  const [ink, setInk] = useState({ active: false, left: 0, top: 0, start: 16 });
  const [transitionActive, setTransitionActive] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [overlayClass, setOverlayClass] = useState('');
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const btnRef = useRef(null);
  // preload GIF fallback asset
  const gifSrc = rickGif;

  useEffect(() => {
    // Preload GIF to avoid jank on first use
    const img = new Image();
    img.src = gifSrc;
  }, [gifSrc]);

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

      // Theme toggle using React Portal + GIF overlay (no synchronous canvas snapshot)
      const doGifToggle = () => {
        // Respect reduced-motion preference: skip GIF and toggle immediately
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          try {
            const nextIsDark = !document.documentElement.classList.contains('dark');
            document.documentElement.classList.toggle('dark', nextIsDark);
            try { localStorage.setItem('theme', nextIsDark ? 'dark' : 'light'); } catch (e) { }
          } catch (e) { }
          return;
        }

        const currentlyDark = document.documentElement.classList.contains('dark');
        setOverlayClass(currentlyDark ? 'theme-overlay--dark' : 'theme-overlay--light');
        setOverlayOpacity(1);
        setTransitionActive(true);
        setBackdropVisible(false);

        // Timeline:
        // 1. Show GIF overlay (transitionActive = true)
        // 2. Start blur backdrop fade-in mid-way (so it's fully blurred when we swap theme)
        const freezeTime = Math.round(GIF_DURATION_MS * 0.5);
        
        setTimeout(() => {
          setBackdropVisible(true);
          // Wait for backdrop to fade in, then swap theme
          setTimeout(() => {
            const nextIsDark = !document.documentElement.classList.contains('dark');
            document.documentElement.classList.toggle('dark', nextIsDark);
            try { localStorage.setItem('theme', nextIsDark ? 'dark' : 'light'); } catch (e) { }

            // Immediately start fading out backdrop after theme swap
            setTimeout(() => {
              setBackdropVisible(false);
            }, 50);
          }, 200); // 200ms is enough for the backdrop transition
        }, freezeTime - 100);

        // Fade out then unmount
        setTimeout(() => {
          setOverlayOpacity(0);
          setTimeout(() => {
            setTransitionActive(false);
          }, 360); // match fade transition
        }, GIF_DURATION_MS);
      };

      doGifToggle();

      // Stop ink after animation ends as fallback (in case onAnimationEnd misses)
      window.setTimeout(() => setInk((s) => ({ ...s, active: false })), SPIN_MS + 50);
    }
  }, []);

  return (
    <Panel className="panel-double p-5 sm:p-7 flex flex-col justify-between h-full">
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
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[28%] overflow-hidden bg-black/5 dark:bg-white/10">
          <img src={avatar} alt="Profile picture" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-base sm:text-lg">Rudra Pratap Singh</h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">@rudra00codes</p>
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
          className={`group/yinyang relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer select-none transition-colors yin-yang-glow ${spinning ? 'animate-[spin_650ms_ease-in-out]' : ''
            }`}
        >
          <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 opacity-80"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="32" cy="32" r="30" fill="#fff" />
            <path d="M32 2c16.569 0 30 13.431 30 30S48.569 62 32 62c-8.284 0-15-6.716-15-15 0-7.732 6.268-14 14-14s14-6.268 14-14C45 8.716 39.284 2 32 2z" fill="#000" />
            <circle cx="31" cy="19" r="4" fill="#000" />
            <circle cx="33" cy="45" r="4" fill="#fff" />
          </svg>

          {/* Glassmorphic Tooltip */}
          <span className="pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 scale-95 opacity-0 group-hover/yinyang:scale-100 group-hover/yinyang:opacity-100 transition-all duration-200 ease-out origin-right whitespace-nowrap px-2.5 py-1 text-[10px] font-medium tracking-wide text-neutral-800 dark:text-neutral-200 bg-white/80 dark:bg-black/60 border border-black/5 dark:border-white/10 backdrop-blur-md rounded-md shadow-lg">
            Toggle Theme
          </span>
        </span>
      </div>

      {/* Bio / Content */}
      <div className="mt-8 mb-6">
        <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight mb-3">
          I build{' '}
          <span className="inline-block text-neutral-500 dark:text-neutral-400">
            <MorphingText inline texts={['WebApps', 'Frontends', 'Experiences']} />
          </span>
        </p>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
          Hello, I'm <span className="text-black dark:text-white font-semibold">Rudra</span>! A 20 year old developer based in Punjab - India.
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between text-xs sm:text-sm text-neutral-500 font-medium pt-2">
        <p className="leading-relaxed opacity-60">"Still centering a div!"<br /> (┬┬﹏┬┬) </p>
        <div className="flex items-center gap-2.5 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-neutral-700 dark:text-neutral-300">Available for work</span>
        </div>
      </div>

      {transitionActive &&
        createPortal(
          <>
            <div
              className={`theme-backdrop ${backdropVisible ? 'theme-backdrop--visible' : ''}`}
            />
            <img
              src={gifSrc}
              className={`theme-overlay ${overlayClass}`}
              style={{
                opacity: overlayOpacity,
                transition: 'opacity 360ms ease',
                borderRadius: '12px'
              }}
              alt=""
            />
          </>,
          document.body
        )}
    </Panel>
  );
};

export default ProfileCard;
