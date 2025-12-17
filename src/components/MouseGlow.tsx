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
  const lastUpdateRef = useRef(0);
  // Check if mobile device - initialize immediately
  const isMobileRef = useRef(
    typeof window !== 'undefined' && 
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768)
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle mouse updates to reduce re-renders
    const now = Date.now();
    if (now - lastUpdateRef.current < 16) return; // ~60fps max
    
    lastUpdateRef.current = now;
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Add event listeners
  useEffect(() => {
    // Don't add listeners on mobile
    if (isMobileRef.current) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Optimized animation loop with reduced updates
  useEffect(() => {
    // Disable on mobile devices for better performance
    if (isMobileRef.current) return;

    let lastFrameTime = 0;
    const targetFPS = 30; // Reduced from 60 to 30 for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Throttle to target FPS
      if (currentTime - lastFrameTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      setTrail(prev => {
        // Only update if visible to save CPU
        if (!isVisible && prev.length === 0) {
          animationRef.current = requestAnimationFrame(animate);
          return prev;
        }

        const newTrail = prev.map(p => ({
          ...p,
          opacity: p.opacity * 0.92, // Faster fade out to reduce trail length
        })).filter(p => p.opacity > 0.02);
        
        // Add new point at mouse position with larger threshold to reduce points
        const lastPoint = newTrail[newTrail.length - 1];
        const mouse = mouseRef.current;
        
        if (!lastPoint || 
            Math.abs(mouse.x - lastPoint.x) > 8 || // Increased threshold
            Math.abs(mouse.y - lastPoint.y) > 8) {
          newTrail.push({
            x: mouse.x,
            y: mouse.y,
            opacity: 1,
          });
        }
        
        return newTrail.slice(-30); // Reduced from 50 to 30 points
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible]);

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

  // Don't render on mobile
  if (isMobileRef.current) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transition: 'opacity 0.5s',
        willChange: isVisible ? 'opacity' : 'auto',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
      aria-hidden="true"
    >
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ 
          contain: 'layout style paint', // Isolate paint operations
          willChange: isVisible ? 'contents' : 'auto',
        }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
        </defs>
        
        {trail.length > 1 && (
          <>
            {/* Simplified trail - reduced from 3 layers to 2 */}
            <path
              d={generatePath(trail)}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              opacity={0.06}
              style={{ 
                vectorEffect: 'non-scaling-stroke',
                willChange: 'd',
              }}
            />
            
            {/* Core line */}
            <path
              d={generatePath(trail)}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.12}
              style={{ 
                vectorEffect: 'non-scaling-stroke',
                willChange: 'd',
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
};
