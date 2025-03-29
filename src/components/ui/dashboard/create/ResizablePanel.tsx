import { useCallback, useEffect, useRef, useState } from 'react';

interface ResizablePanelProps {
  children: React.ReactNode;
  rightPanel: React.ReactNode;
  defaultRightPanelWidth?: number; // percentage
  minRightPanelWidth?: number; // percentage
  maxRightPanelWidth?: number; // percentage
}

export default function ResizablePanel({
  children,
  rightPanel,
  defaultRightPanelWidth = 30,
  minRightPanelWidth = 20,
  maxRightPanelWidth = 50
}: ResizablePanelProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [rightPanelWidth, setRightPanelWidth] = useState(defaultRightPanelWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const rightWidth = containerRect.right - e.clientX;
        const rightWidthPercentage = (rightWidth / containerWidth) * 100;

        if (
          rightWidthPercentage >= minRightPanelWidth &&
          rightWidthPercentage <= maxRightPanelWidth
        ) {
          setRightPanelWidth(rightWidthPercentage);
        }
      }
    },
    [isResizing, minRightPanelWidth, maxRightPanelWidth]
  );

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResizing);
    }

    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  return (
    <div ref={containerRef} className="flex flex-1 overflow-hidden">
      <div className="h-full" style={{ width: `${100 - rightPanelWidth}%` }}>
        {children}
      </div>

      <div
        ref={resizeRef}
        className={`w-1 bg-gray-200 hover:bg-blue-500 cursor-col-resize transition-colors
          ${isResizing ? 'bg-blue-500' : ''}`}
        onMouseDown={startResizing}
      />

      <div className="h-full" style={{ width: `${rightPanelWidth}%` }}>
        {rightPanel}
      </div>
    </div>
  );
}