import { useEffect, useState, useCallback, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

export const MouseGlow = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Smooth animation loop
  useEffect(() => {
    const animate = () => {
      setTrail(prev => {
        const newTrail = prev.map(p => ({
          ...p,
          opacity: p.opacity * 0.95, // Fade out gradually
        })).filter(p => p.opacity > 0.01);
        
        // Add new point at mouse position
        const lastPoint = newTrail[newTrail.length - 1];
        const mouse = mouseRef.current;
        
        if (!lastPoint || 
            Math.abs(mouse.x - lastPoint.x) > 3 || 
            Math.abs(mouse.y - lastPoint.y) > 3) {
          newTrail.push({
            x: mouse.x,
            y: mouse.y,
            opacity: 1,
          });
        }
        
        return newTrail.slice(-50); // Keep max 50 points
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Generate smooth bezier path
  const generatePath = (points: TrailPoint[]) => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      path += ` Q ${prev.x} ${prev.y}, ${midX} ${midY}`;
    }
    
    const last = points[points.length - 1];
    path += ` L ${last.x} ${last.y}`;
    
    return path;
  };

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
          <linearGradient id="fade-gradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {trail.length > 1 && (
          <>
            {/* Soft outer glow */}
            <path
              d={generatePath(trail)}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              opacity={0.04}
            />
            
            {/* Main trail */}
            <path
              d={generatePath(trail)}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              opacity={0.08}
            />
            
            {/* Core line */}
            <path
              d={generatePath(trail)}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.15}
            />
          </>
        )}
      </svg>
    </div>
  );
};
