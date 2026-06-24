// Lightweight tooltip component (Tailwind based) to sit inside a parent with class 'group'
// Appears on parent hover via group-hover utilities (so it works inside tiles with overlay anchors)
// Props: label (string), optional position (top|bottom), optional groupName (string)
import React from 'react';

export function Tooltip({ label, position = 'top', groupName = 'group', className = '' }) {
  const vertical = position === 'top'
    ? (groupName === 'tile'
        ? '-top-1 -translate-y-full group-hover/tile:-translate-y-[calc(100%+6px)]'
        : '-top-1 -translate-y-full group-hover:-translate-y-[calc(100%+6px)]')
    : (groupName === 'tile'
        ? '-bottom-1 translate-y-full group-hover/tile:translate-y-[calc(-100%-6px)]'
        : '-bottom-1 translate-y-full group-hover:translate-y-[calc(-100%-6px)]');

  const hoverOpacity = groupName === 'tile'
    ? 'group-hover/tile:opacity-100'
    : 'group-hover:opacity-100';

  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${vertical} whitespace-nowrap rounded-md text-neutral-800 dark:text-neutral-200 bg-white/80 dark:bg-black/60 border border-black/5 dark:border-white/10 backdrop-blur px-2 py-1 text-[10px] font-medium shadow-md opacity-0 ${hoverOpacity} transition-all duration-200 ${className}`}
    >
      {label}
      <span className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white/80 dark:bg-black/60 border-black/5 dark:border-white/10 ${position === 'top' ? 'top-full -mt-1 border-b border-r' : 'bottom-full -mb-1 border-t border-l'}`} />
    </span>
  );
}

export default Tooltip;
