import React from 'react';
import Panel from '../layout/Panel.jsx';
import Folder from '../ui/Folder';
import { ExternalLink } from 'lucide-react';

const DailyToolStack = () => (
  // Main grid: Two columns with specific height rows
  <div className="grid gap-6 sm:grid-cols-2 h-full">

    {/* Left Column Stack */}
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-4xl sm:text-5xl font-black leading-[0.9] tracking-tighter text-black dark:text-white">
        DAILY<br />Tool<br />STACK.
      </h2>

      {/* Resume Folder Widget */}
      <Panel className="h-32 relative overflow-visible flex items-center justify-end group/folder-widget">
        <Folder 
          color="#dbbc55" 
          size={1.1}
          items={[
            null,
            null,
            <a 
              key="resume-link"
              href="https://drive.google.com/file/d/1HIHU1uhJ5XpAkjtyl9bycRfgpDuO16oz/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full h-full flex flex-col items-center justify-center bg-white text-black p-2 hover:bg-gray-200 transition-colors border border-black/10 rounded-md shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[0.6rem] font-black uppercase tracking-widest text-blue-600 mb-1">Resume</span>
              <ExternalLink size={14} className="text-black/80" />
            </a>
          ]}
        />
        <div className="absolute bottom-4 left-4 pointer-events-none">
          <p className="text-neutral-800/80 dark:text-white/80 text-xs font-bold uppercase tracking-widest">RESUME.PDF</p>
          <p className="text-neutral-500/50 dark:text-white/40 text-[0.60rem] uppercase tracking-widest mt-0.5 font-medium">VIEW & DOWNLOAD</p>
        </div>
      </Panel>
    </div>

    {/* Right Column Stack */}
    <div className="flex flex-col gap-6 h-full">
      {/* NASA Image - Occupies top half */}
      <Panel className="flex-1 min-h-[16rem] sm:min-h-0 relative overflow-hidden group p-0 border-0">
        <div className="absolute inset-0 bg-neutral-900">
          {/* Fallback pattern if image fails */}
          <div className="w-full h-full opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" alt="NASA Space" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 mix-blend-screen" />
        </div>
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">NASA API</span>
          <div className="text-right">
            <div className="text-2xl text-white font-bold">16</div>
            <div className="text-xs text-neutral-400 uppercase tracking-widest">Oct</div>
          </div>
        </div>
      </Panel>
    </div>
  </div>
);

export default DailyToolStack;
