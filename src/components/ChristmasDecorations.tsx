import { useChristmas } from '@/contexts/ThemeContext';
import { Star, Sparkles } from 'lucide-react';

export const ChristmasDecorations = () => {
  const { isChristmasSeason } = useChristmas();

  if (!isChristmasSeason) return null;

  return (
    <>
      {/* Floating Stars */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Star
              className="h-4 w-4 text-yellow-400 fill-yellow-400 opacity-70"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.8))',
              }}
            />
          </div>
        ))}
      </div>

      {/* Christmas Lights */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none z-40 h-20 overflow-hidden">
        <div className="flex justify-around items-start h-full px-4">
          {[...Array(20)].map((_, i) => (
            <div
              key={`light-${i}`}
              className="relative"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#22c55e' : '#fbbf24',
                  boxShadow: `0 0 10px ${i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#22c55e' : '#fbbf24'}`,
                  animationDuration: `${1 + (i % 3) * 0.5}s`,
                }}
              />
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-8"
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3))',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sparkles Effect */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Sparkles
              className="h-3 w-3 text-yellow-300 opacity-60"
              style={{
                filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.6))',
              }}
            />
          </div>
        ))}
      </div>

      {/* Corner Decorations */}
      <div className="fixed top-4 left-4 pointer-events-none z-40">
        <div className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>
          🎄
        </div>
      </div>
      <div className="fixed top-4 right-4 pointer-events-none z-40">
        <div className="text-2xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
          ⭐
        </div>
      </div>
      <div className="fixed bottom-4 left-4 pointer-events-none z-40">
        <div className="text-2xl animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '1s' }}>
          🎁
        </div>
      </div>
      <div className="fixed bottom-4 right-4 pointer-events-none z-40">
        <div className="text-2xl animate-bounce" style={{ animationDuration: '2.3s', animationDelay: '1.5s' }}>
          ❄️
        </div>
      </div>
    </>
  );
};

