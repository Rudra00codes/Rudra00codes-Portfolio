import React, { useState, useEffect } from 'react';
import './styles/global.css';
import AppShell from './components/layout/AppShell.jsx';
import TechStackPanel from './components/tech/TechStackPanel.jsx';
import ProfileCard from './components/profile/ProfileCard.jsx';
import LinksPanel from './components/links/LinksPanel.jsx';
import DailyToolStack from './components/daily/DailyToolStack.jsx';
import ToolIconRail from './components/daily/ToolIconRail.jsx';
import ProjectHighlightCard from './components/project/ProjectHighlightCard.jsx';
import { CrowdCanvas } from './components/ui/CrowdWalking.tsx';
import peepsImage from './assets/all-peeps.png';

const App = () => {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 5000); // Show landing for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (showLanding) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-start pt-32 overflow-hidden">
        <div className="absolute inset-0">
           <CrowdCanvas src={peepsImage} rows={15} cols={7} />
        </div>
        <div className="relative z-10 text-center">
           <h1 className="text-6xl font-black tracking-tighter mb-4 text-black">Rudra00codes</h1>
           <p className="text-xl text-gray-600 font-medium">Loading Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      {/* Left Column */}
      <div className="flex flex-col gap-6 lg:gap-8 lg:sticky lg:top-6">
        <TechStackPanel />
      </div>
      {/* Middle Column */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <ProfileCard />
        <div className="grid gap-6 lg:grid-cols-[120px_minmax(0,1fr)]">
          {/* On small screens, show the tool icons as a horizontal scroll rail */}
          <div className="lg:block hidden">
            <ToolIconRail />
          </div>
          <div className="lg:hidden block">
            <ToolIconRail horizontal />
          </div>
          <DailyToolStack />
        </div>
      </div>
      {/* Right Column */}
      <div className="flex flex-col gap-6 lg:gap-8 lg:sticky lg:top-6">
        <LinksPanel />
        <ProjectHighlightCard />
      </div>
    </AppShell>
  );
};

export default App;
