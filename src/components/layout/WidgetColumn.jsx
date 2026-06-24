import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export const WidgetColumn = ({ id, items, children, className = '' }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className={`flex flex-col gap-6 lg:gap-8 ${className}`}>
        {children}
      </div>
    </SortableContext>
  );
};
