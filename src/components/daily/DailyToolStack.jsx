import React from 'react';
import Panel from '../layout/Panel.jsx';

const DailyToolStack = () => (
  <div className="grid gap-6 md:grid-cols-2">
    {/* Left Column */}
    <div className="flex flex-col gap-6">
      <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
        DAILY<br/>Tool<br/>STACK.
      </h2>
      
      {/* Blue Card (Reference: Wavy Card) */}
      <Panel className="h-32 bg-gradient-to-br from-blue-600/40 to-blue-900/20 border-blue-500/30 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent)]" />
      </Panel>

      {/* Spotify Widget */}
      <div className="rounded-xl overflow-hidden">
        <iframe 
          style={{borderRadius: '12px', border: 0}} 
          src="https://open.spotify.com/embed/track/1LFNOKVaFVBFCiLwz8Ay4O?utm_source=generator" 
          width="100%" 
          height="152" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
      </div>
    </div>

    {/* Right Column */}
    <div className="flex flex-col gap-6">
      {/* NASA Image */}
      <Panel className="aspect-square flex items-center justify-center relative overflow-hidden">
        <span className="text-white/50">NASA IMG</span>
      </Panel>

      {/* Quote Section */}
      <div className="space-y-3">
        <p className="text-lg font-medium text-white/80 pl-1">
          "I'm gonna be Hokage one day."
        </p>
        <Panel className="aspect-[4/3] flex items-center justify-center">
           <span className="text-white/50">Quote Image</span>
        </Panel>
      </div>
    </div>
  </div>
);

export default DailyToolStack;
