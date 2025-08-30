"use client";

import React, { useEffect, useRef, useState } from "react";


// (Types removed for JS build)

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  as = "span",
  delay = 0,
}) {
  const elementRef = useRef(null);
  const annotationRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Basic IntersectionObserver (optional)
  useEffect(() => {
    if (!isView) { setInView(true); return; }
    const el = elementRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setInView(true); return; }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: '-10% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isView]);

  const ready = !isView || inView;

  useEffect(() => {
    let cancelled = false;
    if (!ready) return;
    if (annotationRef.current) return; // already drawn
    const el = elementRef.current;
    if (!el) return;
    const timer = window.setTimeout(() => {
      import('rough-notation').then(mod => {
        if (cancelled) return;
        const annotate = mod.annotate;
        annotationRef.current = annotate(el, {
          // cast to any to satisfy possible TS inference mismatch in JS build
          type: action as any,
            color,
            strokeWidth,
            animationDuration,
            iterations,
            padding,
            multiline,
        });
        annotationRef.current.show();
      }).catch(() => {/* silent fail */});
    }, delay);
    return () => { cancelled = true; window.clearTimeout(timer); annotationRef.current?.remove(); annotationRef.current = null; };
  }, [ready, action, color, strokeWidth, animationDuration, iterations, padding, multiline, delay]);

  const Tag: any = as;
  return <Tag ref={elementRef} className="relative inline-block bg-transparent">{children}</Tag>;
}

export default Highlighter;
