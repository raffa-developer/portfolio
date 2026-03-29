import { useTheme } from '@/contexts/ThemeContext';
import { Sparkles } from 'lucide-react';

export const EasterDecorations = () => {
  const { themeVariant } = useTheme();

  if (themeVariant !== 'easter') return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={`egg-${i}`}
            className="absolute animate-float text-xl opacity-80"
            style={{
              left: `${6 + Math.random() * 88}%`,
              top: `${8 + Math.random() * 84}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3.2 + Math.random() * 2.2}s`,
            }}
          >
            {i % 3 === 0 ? '🥚' : i % 3 === 1 ? '🐇' : '🌸'}
          </div>
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-twinkle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Sparkles
              className="h-3 w-3 text-pink-300 opacity-70"
              style={{
                filter: 'drop-shadow(0 0 3px rgba(244, 114, 182, 0.55))',
              }}
            />
          </div>
        ))}
      </div>

      <div className="fixed top-4 left-4 pointer-events-none z-40 text-2xl animate-bounce" style={{ animationDuration: '2.4s' }}>
        🐣
      </div>
      <div className="fixed top-4 right-4 pointer-events-none z-40 text-2xl animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '0.4s' }}>
        🐰
      </div>
      <div className="fixed bottom-4 left-4 pointer-events-none z-40 text-2xl animate-bounce" style={{ animationDuration: '2.6s', animationDelay: '0.8s' }}>
        🌷
      </div>
      <div className="fixed bottom-4 right-4 pointer-events-none z-40 text-2xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '1.1s' }}>
        🧺
      </div>
    </>
  );
};
