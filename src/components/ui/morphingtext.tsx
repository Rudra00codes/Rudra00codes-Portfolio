"use client"
import { useCallback, useEffect, useRef, useId } from "react";

import { cn } from "../../lib/utils";

const morphTime = 2;
const cooldownTime = 1;
const EPS = 0.0001; // clamp to avoid division by zero

const blurFor = (f: number) => {
  const safe = Math.max(f, EPS);
  return Math.min(8 / safe - 8, 16); // cap blur for smoother look
};

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());

  // Un-typed refs to remain compatible with plain JS build setup
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const current1 = text1Ref.current;
      const current2 = text2Ref.current;
      if (!current1 || !current2 || texts.length < 2) return;

      let f = fraction;
      if (f < 0) f = 0;
      if (f > 1) f = 1;

      current2.style.filter = `blur(${blurFor(f)}px)`;
      current2.style.opacity = `${Math.pow(f, 0.4) * 100}%`;

      const invertedFraction = 1 - f;
      current1.style.filter = `blur(${blurFor(invertedFraction)}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      // Accessibility: hide the one that is mostly invisible
      current1.setAttribute('aria-hidden', invertedFraction < 0.5 ? 'true' : 'false');
      current2.setAttribute('aria-hidden', f < 0.5 ? 'true' : 'false');

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const current1 = text1Ref.current;
    const current2 = text2Ref.current;
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current2.setAttribute('aria-hidden', 'false');
      current1.style.filter = "none";
      current1.style.opacity = "0%";
      current1.setAttribute('aria-hidden', 'true');
    }
  }, []);

  useEffect(() => {
    if (texts.length < 2) return; // no RAF if not morphing
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown, texts.length]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
  inline?: boolean; // render inline without large sizing
  lockWidth?: boolean; // reserve width using longest word to avoid layout shift
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 inline-block"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 inline-block"
        ref={text2Ref}
      />
    </>
  );
};

const SvgFilters: React.FC<{ id: string }> = ({ id }) => (
  <svg className="hidden" aria-hidden="true" focusable="false">
    <defs>
      <filter id={id}>
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

const MorphingText: React.FC<MorphingTextProps> = ({ texts, className, inline = false, lockWidth = true }) => {
  const filterId = useId().replace(/:/g, '-') + '-threshold';
  if (!texts || texts.length === 0) return null;
  if (texts.length === 1) {
    return (
      <div
        className={cn(
          inline
            ? 'relative inline-block align-baseline h-[1em] leading-none'
            : 'relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] font-bold leading-none md:h-24 lg:text-[6rem]',
          className,
        )}
      >
        <span className={inline ? 'inline-block' : 'inline-block w-full'}>{texts[0]}</span>
      </div>
    );
  }
  const base = inline
    ? 'relative inline-block align-baseline h-[1em] leading-none'
    : 'relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] font-bold leading-none md:h-24 lg:text-[6rem]';
  const blurStrength = inline ? 0.3 : 0.6;
  const longest = lockWidth ? texts.reduce((a, b) => (b.length > a.length ? b : a), '') : '';
  return (
    <div className={cn(base, className, lockWidth && 'whitespace-nowrap')} style={{ filter: `url(#${filterId}) blur(${blurStrength}px)` }}>
      {lockWidth && (
        <span aria-hidden="true" className={inline ? 'invisible inline-block font-inherit pointer-events-none select-none' : 'invisible block font-inherit pointer-events-none select-none'}>
          {longest}
        </span>
      )}
      <Texts texts={texts} />
      <SvgFilters id={filterId} />
    </div>
  );
};

export { MorphingText };
export default MorphingText;
