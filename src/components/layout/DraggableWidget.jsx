import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripHorizontal } from 'lucide-react';

export const DraggableWidget = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag Handle Container */}
      <div 
        className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white/85 dark:bg-black/60 backdrop-blur-md rounded-full px-3 py-1 cursor-grab active:cursor-grabbing border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-white/50 hover:text-black dark:hover:text-white"
        {...attributes}
        {...listeners}
      >
        <GripHorizontal size={16} />
      </div>
      
      {/* Widget Content */}
      <div className={isDragging ? 'pointer-events-none' : ''}>
        {children}
      </div>
    </div>
  );
};
