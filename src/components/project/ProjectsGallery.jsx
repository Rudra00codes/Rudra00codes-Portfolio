import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

const projects = [
  { 
    id: 'skiper', 
    title: 'Skiper OSS 001', 
    subtitle: 'Billion Dollar Saas', 
    category: 'freelance',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati id natus dignissimos totam at incidunt ipsam odio consequatur ducimus!\n\nplaceat assumenda. Saepe repellendus delectus minima ullam facilis laboriosam facere harum quas laudantium voluptate corrupti reiciendis ipsa, odio repudiandae ab accusantium dicta rerum rem?\n\nWant to create something cool together? Let\'s do it!', 
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    liveUrl: '#',
    sourceUrl: '#'
  },
  { 
    id: 'neonsync', 
    title: 'NeonSync Pro', 
    subtitle: 'Creative Workflow', 
    category: 'freelance',
    desc: 'Optimize your creative processes with seamless syncing.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati id natus dignissimos totam at incidunt ipsam odio consequatur ducimus!\n\nplaceat assumenda. Saepe repellendus delectus minima ullam facilis laboriosam facere harum quas laudantium voluptate corrupti reiciendis ipsa, odio repudiandae ab accusantium dicta rerum rem?', 
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    liveUrl: '#',
    sourceUrl: '#'
  },
  { 
    id: 'pixelforge', 
    title: 'PixelForge Studio', 
    subtitle: 'Design System', 
    category: 'academic',
    desc: 'The ultimate tool for managing your design systems.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati id natus dignissimos totam at incidunt ipsam odio consequatur ducimus!\n\nplaceat assumenda. Saepe repellendus delectus minima ullam facilis laboriosam facere harum quas laudantium voluptate corrupti reiciendis ipsa, odio repudiandae ab accusantium dicta rerum rem?', 
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop',
    liveUrl: '#',
    sourceUrl: '#'
  },
  { 
    id: 'taskflow', 
    title: 'TaskFlow Sonet', 
    subtitle: 'Productivity App', 
    category: 'academic',
    desc: 'Keep track of your tasks without the bloat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati id natus dignissimos totam at incidunt ipsam odio consequatur ducimus!\n\nplaceat assumenda. Saepe repellendus delectus minima ullam facilis laboriosam facere harum quas laudantium voluptate corrupti reiciendis ipsa, odio repudiandae ab accusantium dicta rerum rem?', 
    image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1000&auto=format&fit=crop',
    liveUrl: '#',
    sourceUrl: '#'
  },
  { 
    id: 'cloudvibe', 
    title: 'CloudVibe Bruh', 
    subtitle: 'Cloud Management', 
    category: 'freelance',
    desc: 'Easily manage your cloud instances with a single dashboard.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati id natus dignissimos totam at incidunt ipsam odio consequatur ducimus!\n\nplaceat assumenda. Saepe repellendus delectus minima ullam facilis laboriosam facere harum quas laudantium voluptate corrupti reiciendis ipsa, odio repudiandae ab accusantium dicta rerum rem?', 
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    liveUrl: '#',
    sourceUrl: '#'
  }
];

export const ProjectsGallery = ({ isOpen, onClose }) => {
  const [hoveredProject, setHoveredProject] = useState(projects[0]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const containerRef = useRef(null);

  const filteredProjects = projects.filter(
    (project) => activeTab === 'all' || project.category === activeTab
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const newFiltered = projects.filter(
      (project) => tabId === 'all' || project.category === tabId
    );
    if (newFiltered.length > 0) {
      setHoveredProject(newFiltered[0]);
    }
  };

  // When opening/closing, reset state
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedProject(null);
      setHoveredProject(projects[0]);
      setActiveTab('all');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-neutral-50 dark:bg-[#111111] text-neutral-900 dark:text-white overflow-y-auto overflow-x-hidden"
        >
          <button 
            onClick={() => selectedProject ? setSelectedProject(null) : onClose()} 
            className="fixed top-8 right-8 z-50 text-neutral-500 hover:text-neutral-900 dark:text-white/50 dark:hover:text-white transition-colors"
          >
            <X size={40} />
          </button>

          <div className="w-full max-w-6xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center">
            
            {/* LIST STATE */}
            {!selectedProject && (
              <motion.div 
                key="list-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-24"
              >
                {/* Left side: Image Preview */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                  <motion.div 
                    layoutId={`project-image-${hoveredProject.id}`}
                    drag
                    dragConstraints={containerRef}
                    dragSnapToOrigin={true}
                    dragElastic={0.4}
                    whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 50 }}
                    className="relative w-full aspect-[4/3] max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/5 cursor-grab"
                  >
                    <img 
                      src={hoveredProject.image} 
                      alt={hoveredProject.title} 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </motion.div>
                </div>

                {/* Right side: Project List */}
                <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end text-left lg:text-right">
                  <p className="text-sm font-bold text-neutral-500 dark:text-white/50 tracking-widest uppercase mb-6 flex items-center gap-4">
                    MY PROJECTS
                    <span className="h-px bg-neutral-200 dark:bg-white/20 w-16 hidden lg:block"></span>
                  </p>
                  
                  {/* Category Filter Tabs */}
                  <div className="flex gap-1 mb-8 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/10 dark:border-white/10 w-fit">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'freelance', label: 'Freelance' },
                      { id: 'academic', label: 'Academic' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`relative px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full transition-colors ${
                          activeTab === tab.id ? 'text-white dark:text-black' : 'text-neutral-500 hover:text-neutral-900 dark:text-white/50 dark:hover:text-white'
                        }`}
                      >
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="active-tab-pill"
                            className="absolute inset-0 bg-black dark:bg-white rounded-full -z-10"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1 items-start lg:items-end w-full">
                    <AnimatePresence mode="popLayout">
                      {filteredProjects.map((project) => (
                        <motion.div 
                          key={project.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="relative cursor-pointer"
                          onMouseEnter={() => setHoveredProject(project)}
                          onClick={() => setSelectedProject(project)}
                        >
                          <motion.h2
                            layoutId={`project-title-${project.id}`}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter transition-colors duration-300 ${
                              hoveredProject.id === project.id ? 'text-black dark:text-white' : 'text-neutral-300 dark:text-white/30 hover:text-neutral-500 dark:hover:text-white/60'
                            }`}
                          >
                            {project.title} {hoveredProject.id === project.id && '·'}
                          </motion.h2>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DETAIL STATE */}
            {selectedProject && (
              <motion.div 
                key="detail-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-12 py-12"
              >
                
                <motion.h2 
                  layoutId={`project-title-${selectedProject.id}`}
                  className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-black dark:text-white text-center"
                >
                  {selectedProject.title}
                </motion.h2>

                <motion.div
                  layoutId={`project-image-${selectedProject.id}`}
                  drag
                  dragConstraints={containerRef}
                  dragSnapToOrigin={true}
                  dragElastic={0.4}
                  whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 50 }}
                  className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 cursor-grab"
                >
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="w-full text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <h3 className="text-3xl font-black tracking-tight">{selectedProject.subtitle}</h3>
                    <div className="hidden sm:block flex-1 h-px bg-neutral-200 dark:bg-white/20"></div>
                  </div>

                  <div className="space-y-4 text-neutral-600 dark:text-white/60 text-xl leading-relaxed font-medium mb-10 max-w-3xl whitespace-pre-line">
                    {selectedProject.desc}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={selectedProject.liveUrl}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-black font-bold rounded-full hover:scale-105 transition-transform shadow-md"
                    >
                      Live Preview <ExternalLink size={20} />
                    </a>
                    <a 
                      href={selectedProject.sourceUrl}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 font-bold rounded-full transition-colors hover:scale-105"
                    >
                      See Source Code <Github size={20} />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectsGallery;
