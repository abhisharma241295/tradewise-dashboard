import { useState, useRef, ReactNode, WheelEvent as ReactWheelEvent, useEffect } from 'react';

interface InteractiveViewProps {
    children: ReactNode;
    className?: string;
}

export default function InteractiveView({ children, className = '' }: InteractiveViewProps) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Prevent browser zoom on Ctrl/Cmd + scroll
    useEffect(() => {
        const preventBrowserZoom = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', preventBrowserZoom, { passive: false });

        return () => {
            window.removeEventListener('wheel', preventBrowserZoom);
        };
    }, []);

    const handleWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
        // Check for Ctrl/Cmd key for zooming
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate zoom
            const zoomSensitivity = 0.001;
            const delta = -e.deltaY * zoomSensitivity;
            const oldScale = scale;
            const newScale = Math.min(Math.max(scale + delta, 0.1), 4);

            // Calculate new position based on mouse position
            const scaleRatio = newScale / oldScale;
            const newX = mouseX - (mouseX - position.x) * scaleRatio;
            const newY = mouseY - (mouseY - position.y) * scaleRatio;

            setScale(newScale);
            setPosition({ x: newX, y: newY });
            return;
        }

        // Handle shift + scroll for horizontal movement
        if (e.shiftKey) {
            e.preventDefault();
            const newX = position.x - e.deltaY;
            setPosition(prev => ({ ...prev, x: newX }));
            return;
        }

        // Regular vertical movement
        const newY = position.y - e.deltaY;
        setPosition(prev => ({ ...prev, y: newY }));
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('.zoom-controls')) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const adjustZoom = (delta: number) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const oldScale = scale;
        const newScale = Math.min(Math.max(scale + delta, 0.1), 4);

        // Calculate new position based on center of container
        const scaleRatio = newScale / oldScale;
        const newX = centerX - (centerX - position.x) * scaleRatio;
        const newY = centerY - (centerY - position.y) * scaleRatio;

        setScale(newScale);
        setPosition({ x: newX, y: newY });
    };

    const resetZoom = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div 
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ 
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
        >
            <div
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: '0 0',
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    width: 'fit-content',
                    height: 'fit-content'
                }}
            >
                {children}
            </div>
            <div className="zoom-controls fixed bottom-2 left-16 bg-black/50 text-white rounded-md text-sm font-medium flex items-center gap-1">
                <button 
                    onClick={() => adjustZoom(-0.1)} 
                    className="px-2 py-1 hover:bg-white/10 rounded-l-md transition-colors"
                >
                    -
                </button>
                <button 
                    onClick={resetZoom}
                    className="px-2 py-1 hover:bg-white/10 transition-colors"
                >
                    {Math.round(scale * 100)}%
                </button>
                <button 
                    onClick={() => adjustZoom(0.1)} 
                    className="px-2 py-1 hover:bg-white/10 rounded-r-md transition-colors"
                >
                    +
                </button>
            </div>
        </div>
    );
}