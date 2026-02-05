import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  const btnRef = useRef(null);
  // preload GIF fallback asset and keep a ref to overlay element
  const gifSrc = rickGif;
  const overlayRef = useRef(null);

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

      // Theme toggle using GIF overlay only (no View Transitions / immediate toggle)
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
        // Create overlay element if missing
        let overlay = overlayRef.current;
        if (!overlay) {
          overlay = document.createElement('img');
          overlayRef.current = overlay;
          overlay.id = 'theme-gif-overlay';
          // smaller centered overlay so GIF appears as a contained vignette
          overlay.style.position = 'fixed';
          overlay.style.left = '50%';
          overlay.style.top = '50%';
          overlay.style.transform = 'translate(-50%, -50%)';
          overlay.style.width = 'min(48vmin, 720px)';
          overlay.style.height = 'auto';
          overlay.style.objectFit = 'contain';
          overlay.style.zIndex = '9999';
          overlay.style.pointerEvents = 'none';
          overlay.style.borderRadius = '12px';
          overlay.style.transition = 'opacity 360ms ease';
        }

        overlay.src = gifSrc;
        // Make GIF appear black/white depending on current theme
        const currentlyDark = document.documentElement.classList.contains('dark');
        if (currentlyDark) {
          // page is dark: show GIF as white-on-dark
          overlay.classList.remove('theme-overlay--light');
          overlay.classList.add('theme-overlay--dark');
        } else {
          // page is light: show GIF as dark-on-light
          overlay.classList.remove('theme-overlay--dark');
          overlay.classList.add('theme-overlay--light');
        }

        // fade control
        overlay.classList.add('theme-overlay');
        document.body.appendChild(overlay);

        // Flip theme near midpoint of GIF so the animation masks the change.
        // To avoid an abrupt halt we add a short blur/backdrop, snapshot the frame,
        // swap to the frozen PNG and then ease the blur out for a smooth transition.
        const freezeTime = Math.round(GIF_DURATION_MS * 0.5);
        setTimeout(() => {
          try {
            // create or reuse a subtle full-screen backdrop that applies a backdrop-filter blur
            let backdrop = document.getElementById('theme-blur-backdrop');
            if (!backdrop) {
              backdrop = document.createElement('div');
              backdrop.id = 'theme-blur-backdrop';
              backdrop.style.position = 'fixed';
              backdrop.style.inset = '0';
              backdrop.style.pointerEvents = 'none';
              backdrop.style.zIndex = '9998';
              backdrop.className = 'theme-backdrop';
            }
            document.body.appendChild(backdrop);

            // start freeze visual: blur the GIF and show backdrop before snapshot
            overlay.classList.add('theme-overlay--freeze');
            // ensure the backdrop transition has a frame to start from
            requestAnimationFrame(() => {
              try { backdrop.style.opacity = '1'; } catch (e) { }
            });

            // small delay so blur/backdrop ramps up and looks smooth
            setTimeout(() => {
              try {
                // snapshot current frame into a canvas (may fail on some browsers)
                const w = overlay.naturalWidth || overlay.width || 800;
                const h = overlay.naturalHeight || overlay.height || 450;
                try {
                  const c = document.createElement('canvas');
                  c.width = w;
                  c.height = h;
                  const ctx = c.getContext('2d');
                  ctx.drawImage(overlay, 0, 0, w, h);
                  const png = c.toDataURL('image/png');
                  // replace src with frozen PNG frame
                  overlay.src = png;
                  overlay.dataset.frozen = '1';
                } catch (snapErr) {
                  // snapshot failed — fallback to leaving GIF playing
                }

                // mark frozen and ease blur out for smoothness
                overlay.classList.remove('theme-overlay--freeze');
                overlay.classList.add('theme-overlay--frozen');

                const nextIsDark = !document.documentElement.classList.contains('dark');
                document.documentElement.classList.toggle('dark', nextIsDark);
                try { localStorage.setItem('theme', nextIsDark ? 'dark' : 'light'); } catch (e) { }

                // fade backdrop away after short delay
                setTimeout(() => {
                  try { backdrop.style.opacity = '0'; } catch (e) { }
                  setTimeout(() => { try { backdrop.remove(); } catch (e) { } }, 360);
                }, 360);
              } catch (err) { }
            }, 120);
          } catch (e) { }
        }, freezeTime);

        // Fade out then remove after GIF_DURATION_MS
        setTimeout(() => {
          try { overlay.style.opacity = '0'; } catch (e) { }
          setTimeout(() => {
            try { overlay.remove(); overlayRef.current = null; } catch (e) { }
          }, 360);
        }, GIF_DURATION_MS);
      };

      doGifToggle();

      // Stop ink after animation ends as fallback (in case onAnimationEnd misses)
      window.setTimeout(() => setInk((s) => ({ ...s, active: false })), SPIN_MS + 50);
    }
  }, []);

  return (
    <Panel className="panel-double p-5 sm:p-7 flex flex-col justify-between h-full bg-black/60">
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

      {/* Header */}
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[2rem] overflow-hidden bg-white/10 shadow-inner">
            <img src={avatar} alt="Profile picture" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-white tracking-tight leading-tight">Rudra00codes</h2>
            <p className="text-sm sm:text-base text-neutral-500 font-medium">@rudra00codes</p>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-base sm:text-lg">Rudra Pratap Singh</h2>
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
          className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 cursor-pointer select-none transition-colors ${spinning ? 'animate-[spin_650ms_ease-in-out]' : ''
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
        </span>
      </div>

      {/* Bio / Content */}
      <div className="mt-8 mb-6">
        <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
          I build{' '}
          <span className="inline-block text-neutral-400">
            <MorphingText inline texts={['WebApps', 'Frontends', 'Experiences']} />
          </span>
        </p>
        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-lg">
          Hello, I'm <span className="text-white font-semibold">Rudra</span>! A 20 year old developer based in Punjab - India.
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between text-xs sm:text-sm text-neutral-500 font-medium pt-2">
        <p className="leading-relaxed opacity-60">"Still centering a div!"<br /> (┬┬﹏┬┬) </p>
        <div className="flex items-center gap-2.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-neutral-300">Available for work</span>
        </div>
      </div>
    </Panel>
  );
};

export default ProfileCard;
