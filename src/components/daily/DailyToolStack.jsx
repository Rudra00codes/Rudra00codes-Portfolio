import React from 'react';
import Panel from '../layout/Panel.jsx';

const DailyToolStack = () => (
  // Main grid: Two columns with specific height rows
  <div className="grid gap-6 sm:grid-cols-2 h-full">

    {/* Left Column Stack */}
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-4xl sm:text-5xl font-black leading-[0.9] tracking-tighter text-white">
        DAILY<br />Tool<br />STACK.
      </h2>

      {/* Blue Wave Card */}
      <Panel className="h-32 relative overflow-hidden bg-[#2563EB] border-none shadow-[0_8px_32px_rgba(37,99,235,0.4)]">
        {/* Wave SVG Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-[140%] text-blue-400/30 fill-current">
            <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-[110%] text-blue-500 fill-current">
            <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,197.3C960,224,1056,224,1152,202.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        {/* Simple icon or text can go here if needed, keeping it abstract for now like reference */}
      </Panel>

      {/* Spotify Widget - Customized with Panel wrapper for consistency */}
      <div className="relative rounded-[1.8rem] overflow-hidden shadow-2xl h-[152px]">
        <iframe
          src="https://open.spotify.com/embed/track/2eQh3ZgsExgbnU6bWcp57i?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Embed"
          className="rounded-[1.8rem] bg-[#1a1a1a] w-full h-full"
          style={{ border: 0 }}
        ></iframe>
      </div>
    </div>

    {/* Right Column Stack */}
    <div className="flex flex-col gap-6 h-full">
      {/* NASA Image - Occupies top half */}
      <Panel className="flex-1 min-h-[16rem] sm:min-h-0 relative overflow-hidden group p-0 border-0">
        <div className="absolute inset-0 bg-neutral-900">
          {/* Fallback pattern if image fails */}
          <div className="w-full h-full opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <img src="https://source.unsplash.com/random/400x400/?space,cosmos,stars" alt="NASA Space" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 mix-blend-screen" />
        </div>
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">NASA API</span>
          <div className="text-right">
            <div className="text-2xl text-white font-bold">16</div>
            <div className="text-xs text-neutral-400 uppercase tracking-widest">Oct</div>
          </div>
        </div>
      </Panel>

      {/* Quote / Anime Section */}
      <div className="space-y-4">
        <p className="text-xl font-bold leading-tight text-white/90">
          "I'm gonna be Hokage one day."
        </p>
        <Panel className="aspect-square relative overflow-hidden p-0 border-0 group">
          <div className="absolute inset-0 bg-orange-500/10"></div>
          {/* Using a placeholder for the Naruto image that fits the vibe */}
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Naruto&backgroundColor=ffdfbf" alt="Quote Avatar" className="w-full h-full object-cover scale-90 group-hover:scale-100 transition-transform duration-500" />
        </Panel>
      </div>
    </div>
  </div>
);

export default DailyToolStack;
