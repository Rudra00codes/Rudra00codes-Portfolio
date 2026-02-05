import React from 'react';
import Panel from '../layout/Panel.jsx';

// Simple SVG placeholders for proper "App Icon" feel
const Icons = {
  VS: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#007ACC]" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.291L4.8 12.254l-2.8-6.06A1.5 1.5 0 0 0 .611 5.353l-.266.26a.5.6 0 0 0-.015.75l3.057 5.29L1.4 16.982a.5.5 0 0 0-.01.761l.244.238a1.5 1.5 0 0 0 1.408.847l2.766-6.103 11.666 11.72a1.5 1.5 0 0 0 1.693.3L23.15 21.41a1.5 1.5 0 0 0 .85-1.35V3.94a1.5 1.5 0 0 0-.85-1.353z" /></svg>
  ),
  V0: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="currentColor"><path d="M12 2L2 19h20L12 2zm0 3.8L18.5 17H5.5L12 5.8z" /></svg>
  ),
  Ray: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#FF6363]" fill="currentColor"><circle cx="12" cy="12" r="10" /><path d="M12 7l-3 9h6l-3-9z" fill="white" /></svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C15.3137 24 18 21.3137 18 18C18 14.6863 15.3137 12 12 12V6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12H12V18C12 21.3137 12 24 12 24Z" fill="#0ACF83" /><path d="M6 12C2.68629 12 0 14.6863 0 18C0 21.3137 2.68629 24 6 24H12V12H6Z" fill="#0ACF83" /><path d="M18 12C21.3137 12 24 9.31371 24 6C24 2.68629 21.3137 0 18 0H12V12H18Z" fill="#1ABCFE" /><path d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#F24E1E" /><path d="M18 18C18 14.6863 15.3137 12 12 12H18V18Z" fill="#A259FF" /></svg>
  )
};

const ToolIconRail = ({ horizontal = false }) => {
  const tools = [
    { id: 'VS', icon: Icons.VS },
    { id: 'V0', icon: Icons.V0 },
    { id: 'Ray', icon: Icons.Ray },
    { id: 'Figma', icon: Icons.Figma },
  ];

  if (horizontal) {
    return (
      <Panel className="panel-double p-5">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar snap-x px-1">
          {tools.map(t => (
            <div key={t.id} className="shrink-0 snap-start w-16 h-16 rounded-[1.2rem] bg-white flex items-center justify-center shadow-lg transition-transform active:scale-95">
              {t.icon}
            </div>
          ))}
        </div>
      </Panel>
    );
  }
  return (
    <Panel className="panel-double flex flex-col items-center gap-4 py-6 w-32 bg-black/60">
      {tools.map(t => (
        <div key={t.id} className="w-16 h-16 rounded-[1.2rem] bg-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
          {t.icon}
        </div>
      ))}
    </Panel>
  );
};

export default ToolIconRail;
