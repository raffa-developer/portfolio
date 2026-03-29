import { useEffect, useState, useCallback, useRef, useMemo } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

export const MouseGlow = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 720,
  });
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastUpdateRef = useRef(0);
  // Check if mobile device - initialize immediately
  const isMobileRef = useRef(
    typeof window !== 'undefined' && 
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768)
  );

  const visualConfig = useMemo(() => {
    const sizeScale = Math.min(1.8, Math.max(1, viewport.width / 1280));

    return {
      frameRate: viewport.width < 900 ? 36 : 45,
      fadeFactor: 0.96,
      maxPoints: viewport.width < 900 ? 48 : 70,
      minDistance: Math.max(2.5, 4.2 * sizeScale),
      glowStrokeWidth: 12 * sizeScale,
      coreStrokeWidth: 4 * sizeScale,
      glowBlur: 8 * sizeScale,
      glowOpacity: 0.2,
      coreOpacity: 0.55,
      interpolationOpacity: 0.9,
    };
  }, [viewport.width]);

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

  useEffect(() => {
    if (isMobileRef.current) return;

    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
    const targetFPS = visualConfig.frameRate;
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
          opacity: p.opacity * visualConfig.fadeFactor,
        })).filter(p => p.opacity > 0.02);
        
        // Add new point at mouse position with larger threshold to reduce points
        const lastPoint = newTrail[newTrail.length - 1];
        const mouse = mouseRef.current;
        
        if (!lastPoint || 
            Math.abs(mouse.x - lastPoint.x) > visualConfig.minDistance ||
            Math.abs(mouse.y - lastPoint.y) > visualConfig.minDistance) {
          if (lastPoint) {
            const interpX = lastPoint.x + (mouse.x - lastPoint.x) * 0.45;
            const interpY = lastPoint.y + (mouse.y - lastPoint.y) * 0.45;
            newTrail.push({
              x: interpX,
              y: interpY,
              opacity: visualConfig.interpolationOpacity,
            });
          }

          newTrail.push({
            x: mouse.x,
            y: mouse.y,
            opacity: 1,
          });
        }
        
        return newTrail.slice(-visualConfig.maxPoints);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible, visualConfig]);

  // Generate smooth bezier path
  const generatePath = (points: TrailPoint[]) => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const midX = (curr.x + next.x) / 2;
      const midY = (curr.y + next.y) / 2;
      path += ` Q ${curr.x} ${curr.y}, ${midX} ${midY}`;
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
        transition: 'opacity 0.35s ease-out',
        willChange: isVisible ? 'opacity' : 'auto',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
      aria-hidden="true"
    >
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${viewport.width} ${viewport.height}`}
        preserveAspectRatio="none"
        style={{ 
          contain: 'layout style paint', // Isolate paint operations
          willChange: isVisible ? 'contents' : 'auto',
        }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={visualConfig.glowBlur} result="blur" />
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
              stroke="#FFFFFF"
              strokeWidth={visualConfig.glowStrokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              opacity={visualConfig.glowOpacity}
              style={{ 
                vectorEffect: 'non-scaling-stroke',
                willChange: 'd',
              }}
            />
            
            {/* Core line */}
            <path
              d={generatePath(trail)}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={visualConfig.coreStrokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={visualConfig.coreOpacity}
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
