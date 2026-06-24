import React from 'react';
import ToolIconRail from '../daily/ToolIconRail.jsx';
import DailyToolStack from '../daily/DailyToolStack.jsx';

export const DailyToolsWidget = () => {
  return (
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
  );
};

export default DailyToolsWidget;
