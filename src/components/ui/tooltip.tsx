// Lightweight tooltip component (Tailwind based) to sit inside a parent with class 'group'
// Appears on parent hover via group-hover utilities (so it works inside tiles with overlay anchors)
// Props: label (string), optional position (top|bottom)
import React from 'react';

export function Tooltip({ label, position = 'top', className = '' }) {
  const vertical = position === 'top'
    ? '-top-1 -translate-y-full group-hover:-translate-y-[calc(100%+6px)]'
    : '-bottom-1 translate-y-full group-hover:translate-y-[calc(-100%-6px)]';
  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${vertical} whitespace-nowrap rounded-md bg-white/10 backdrop-blur px-2 py-1 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-200 ${className}`}
    >
      {label}
      <span className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white/10 ${position === 'top' ? 'top-full' : 'bottom-full'}`} />
    </span>
  );
}

export default Tooltip;
