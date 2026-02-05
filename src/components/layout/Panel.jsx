import React from 'react';

/* Panel now supports a 'double-ring' effect by leveraging a ::after inner outline.
   To enable, add the class 'panel-double'. */
const Panel = ({ className = '', children, as: Tag = 'div' }) => (
  <Tag className={`panel-base relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_4px_24px_-8px_rgba(0,0,0,0.8)] p-6 ${className}`}>
    {children}
  </Tag>
);

export default Panel;

// Tailwind can't style pseudo for arbitrary classes inline easily, so we add global styles via injected style tag once.
if (typeof document !== 'undefined' && !document.getElementById('panel-double-style')) {
  const style = document.createElement('style');
  style.id = 'panel-double-style';
  style.textContent = `
    .panel-base.panel-double { position: relative; }
    .panel-base.panel-double:after {
      content: '';
      pointer-events: none;
      position: absolute; inset: 3px;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 1.3rem; /* match rounded-3xl minus offset */
    }
  `;
  document.head.appendChild(style);
}
