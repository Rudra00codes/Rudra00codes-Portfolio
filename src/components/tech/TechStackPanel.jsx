import React from 'react';
import Panel from '../layout/Panel.jsx';

const groups = [
  { title: 'Frontend', tags: ['React', 'Nextjs', 'Shadcn', 'SCSS', 'Tailwindcss', 'Framer-Motion', 'Recoil', 'Tanstack Query'] },
  { title: 'Backend', tags: ['Nodejs', 'Honojs', 'Expressjs', 'NPM'] },
  { title: 'Db & Services', tags: ['Cloudflare Workers', 'Docker', 'Appwrite', 'Supabase', 'Prisma ORM', 'Postman', 'Postgres', 'MongoDB'] }
];

const Tag = ({ children }) => (
  <span className="inline-flex items-center justify-center rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-[13px] font-medium text-neutral-300 tracking-wide leading-none transition-colors hover:bg-white/10 hover:border-white/20 hover:text-white cursor-default">
    {children}
  </span>
);

const TechStackPanel = () => {
  return (
    <Panel className="panel-double p-5 flex flex-col h-full bg-black/60">
      <header className="mb-8 relative z-10">
        <div className="text-4xl sm:text-[3.5rem] font-black leading-none tracking-tighter text-white opacity-90">{`{ }`}</div>
        <h2 className="mt-2 text-4xl sm:text-[3.5rem] font-black leading-[0.9] tracking-tighter text-white">TECH<br />STACK</h2>
      </header>
      <div className="space-y-8 flex-1">
        {groups.map(g => (
          <div key={g.title} className="space-y-3">
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest pl-1">{g.title}:</h3>
            <div className="flex flex-wrap gap-2">
              {g.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default TechStackPanel;
