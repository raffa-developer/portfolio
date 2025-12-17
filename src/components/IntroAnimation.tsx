import { useState, useEffect, useCallback } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'fadeOut'>('typing');
  
  const fullText = 'Believe in yourself.';
  
  // Realistic typing effect with variable speed
  useEffect(() => {
    if (phase !== 'typing') return;
    
    if (displayedText.length < fullText.length) {
      const nextChar = fullText[displayedText.length];
      // Variable delays for realistic typing feel
      let delay = 80 + Math.random() * 40; // Base speed
      
      // Longer pause after punctuation
      if (['.', ',', '!', '?'].includes(fullText[displayedText.length - 1] || '')) {
        delay = 300 + Math.random() * 100;
      }
      // Slight pause before uppercase (like starting a word)
      if (nextChar === nextChar.toUpperCase() && nextChar !== ' ') {
        delay += 50;
      }
      // Quick for spaces
      if (nextChar === ' ') {
        delay = 60;
      }
      
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, delay);
      
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPhase('pause');
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, phase]);
  
  // Pause phase
  useEffect(() => {
    if (phase !== 'pause') return;
    
    const timeout = setTimeout(() => {
      setPhase('fadeOut');
    }, 1200);
    
    return () => clearTimeout(timeout);
  }, [phase]);
  
  // Fade out phase
  useEffect(() => {
    if (phase !== 'fadeOut') return;
    
    const timeout = setTimeout(() => {
      onComplete();
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [phase, onComplete]);
  
  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all ease-out ${
        phase === 'fadeOut' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #020617 0%, #0a1224 50%, #020617 100%)',
        transitionDuration: '1500ms',
      }}
    >
      {/* Subtle animated gradient orbs - very dark */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[1000px] h-[1000px] rounded-full animate-orb-1"
          style={{
            background: 'radial-gradient(circle, rgba(30, 58, 138, 0.15) 0%, transparent 60%)',
            left: '-30%',
            top: '-40%',
          }}
        />
        <div 
          className="absolute w-[800px] h-[800px] rounded-full animate-orb-2"
          style={{
            background: 'radial-gradient(circle, rgba(30, 27, 75, 0.2) 0%, transparent 60%)',
            right: '-25%',
            bottom: '-30%',
          }}
        />
      </div>
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Main text container */}
      <div className="relative z-10 text-center px-6">
        <h1 
          className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white/90 transition-all duration-1000 ${
            phase === 'fadeOut' ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{
            textShadow: '0 0 60px rgba(30, 58, 138, 0.5), 0 0 120px rgba(30, 58, 138, 0.2)',
          }}
        >
          <span className="inline-block">
            {displayedText}
          </span>
          <span 
            className={`inline-block w-[2px] h-[0.9em] ml-0.5 bg-white/70 align-middle transition-opacity duration-75 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              boxShadow: '0 0 8px rgba(255,255,255,0.5)',
            }}
          />
        </h1>
        
        {/* Subtle glow beneath text */}
        <div 
          className="h-[2px] mx-auto mt-8 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: displayedText.length > 10 ? '180px' : '0px',
            opacity: displayedText.length > 10 ? 0.4 : 0,
            background: 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.6), transparent)',
            boxShadow: '0 0 20px rgba(148, 163, 184, 0.3)',
          }}
        />
      </div>
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(2, 6, 23, 0.5) 100%)',
        }}
      />

      <style>{`
        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.03); }
          66% { transform: translate(-30px, 40px) scale(0.97); }
        }
        
        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 30px) scale(1.05); }
          66% { transform: translate(35px, -45px) scale(0.95); }
        }
        
        .animate-orb-1 {
          animation: orb-float-1 20s ease-in-out infinite;
        }
        
        .animate-orb-2 {
          animation: orb-float-2 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
