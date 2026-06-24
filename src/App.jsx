import React, { useState, useEffect, useMemo } from 'react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragOverlay 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  sortableKeyboardCoordinates 
} from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/global.css';

import AppShell from './components/layout/AppShell.jsx';
import TechStackPanel from './components/tech/TechStackPanel.jsx';
import ProfileCard from './components/profile/ProfileCard.jsx';
import LinksPanel from './components/links/LinksPanel.jsx';
import DailyToolsWidget from './components/daily/DailyToolsWidget.jsx';
import ProjectHighlightCard from './components/project/ProjectHighlightCard.jsx';
import ProjectsGallery from './components/project/ProjectsGallery.jsx';
import { CrowdCanvas } from './components/ui/CrowdWalking.tsx';
import peepsImage from './assets/all-peeps.png';
import { WidgetColumn } from './components/layout/WidgetColumn.jsx';
import { DraggableWidget } from './components/layout/DraggableWidget.jsx';

const DEFAULT_LAYOUT = {
  left: ['techStack'],
  middle: ['profile', 'dailyTools'],
  right: ['links', 'projects']
};

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isProjectsGalleryOpen, setProjectsGalleryOpen] = useState(false);
  
  const [layout, setLayout] = useState(DEFAULT_LAYOUT);

  const [activeId, setActiveId] = useState(null);

  const isLayoutModified = useMemo(() => {
    return JSON.stringify(layout) !== JSON.stringify(DEFAULT_LAYOUT);
  }, [layout]);

  const widgetComponents = useMemo(() => ({
    techStack: <TechStackPanel />,
    profile: <ProfileCard />,
    dailyTools: <DailyToolsWidget />,
    links: <LinksPanel />,
    projects: <ProjectHighlightCard onClick={() => setProjectsGalleryOpen(true)} />
  }), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 5000); // Show landing for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findColumn = (id) => {
    if (layout.left.includes(id)) return 'left';
    if (layout.middle.includes(id)) return 'middle';
    if (layout.right.includes(id)) return 'right';
    return null;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId) || (['left', 'middle', 'right'].includes(overId) ? overId : null);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }

    setLayout((prev) => {
      const activeItems = [...prev[activeColumn]];
      const overItems = [...prev[overColumn]];

      const activeIndex = activeItems.indexOf(activeId);
      const overIndex = overItems.indexOf(overId);

      const newIndex = overIndex >= 0 ? overIndex : overItems.length;

      activeItems.splice(activeIndex, 1);
      overItems.splice(newIndex, 0, activeId);

      return {
        ...prev,
        [activeColumn]: activeItems,
        [overColumn]: overItems,
      };
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId) || (['left', 'middle', 'right'].includes(overId) ? overId : null);

    if (activeColumn && overColumn && activeColumn === overColumn) {
      setLayout((prev) => {
        const items = [...prev[activeColumn]];
        const activeIndex = items.indexOf(activeId);
        const overIndex = items.indexOf(overId);

        if (activeIndex !== overIndex) {
          return {
            ...prev,
            [activeColumn]: arrayMove(items, activeIndex, overIndex),
          };
        }

        return prev;
      });
    }
  };

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
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <AppShell>
          {/* Left Column */}
          <WidgetColumn id="left" items={layout.left} className="lg:sticky lg:top-6 h-full min-h-[200px]">
            {layout.left.map((id) => (
              <DraggableWidget key={id} id={id}>
                {widgetComponents[id]}
              </DraggableWidget>
            ))}
          </WidgetColumn>

          {/* Middle Column */}
          <WidgetColumn id="middle" items={layout.middle} className="h-full min-h-[200px]">
            {layout.middle.map((id) => (
              <DraggableWidget key={id} id={id}>
                {widgetComponents[id]}
              </DraggableWidget>
            ))}
          </WidgetColumn>

          {/* Right Column */}
          <WidgetColumn id="right" items={layout.right} className="lg:sticky lg:top-6 h-full min-h-[200px]">
            {layout.right.map((id) => (
              <DraggableWidget key={id} id={id}>
                {widgetComponents[id]}
              </DraggableWidget>
            ))}
          </WidgetColumn>
        </AppShell>

        <DragOverlay>
          {activeId ? (
            <div className="opacity-80 scale-105 transition-transform shadow-2xl cursor-grabbing">
              {widgetComponents[activeId]}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <ProjectsGallery 
        isOpen={isProjectsGalleryOpen} 
        onClose={() => setProjectsGalleryOpen(false)} 
      />

      <AnimatePresence>
        {isLayoutModified && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLayout(DEFAULT_LAYOUT)}
            className="fixed bottom-6 right-6 z-40 group flex items-center bg-white/80 dark:bg-black/60 border border-black/10 dark:border-white/10 backdrop-blur-md text-neutral-800 dark:text-neutral-200 px-4 py-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer text-xs font-semibold tracking-wide select-none transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:shadow-[0_12px_40px_rgba(255,255,255,0.08)]"
          >
            <svg 
              className="w-3.5 h-3.5 mr-2 text-neutral-600 dark:text-neutral-400 transition-transform duration-500 group-hover:-rotate-180" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset Layout
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
