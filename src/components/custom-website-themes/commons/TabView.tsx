import React from 'react';
import { cn } from '@/lib/utils/cn';

type Tab = "all" | "ceremony" | "party";

interface TabButtonsProps {
  children: {
    tabs: Tab[];
  };
  primaryColor: string;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabView: React.FC<TabButtonsProps> = ({ children, primaryColor, activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-8 mb-12">
      {children.tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "text-lg transition-colors",
            activeTab === tab ? "px-4 py-2" : "text-gray-400"
          )}
          style={{
            backgroundColor: activeTab === tab ? primaryColor : "transparent",
            color: activeTab === tab ? "white" : "inherit"
          }}
          onMouseOver={(e) => {
            if (activeTab !== tab) {
              e.currentTarget.style.color = primaryColor;
            }
          }}
          onMouseOut={(e) => {
            if (activeTab !== tab) {
              e.currentTarget.style.color = '';
            }
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabView;