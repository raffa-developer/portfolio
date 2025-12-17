import { useLanguage } from '@/contexts/LanguageContext';
import { Code2, Briefcase, Layers, Heart, RotateCcw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`text-center p-3 sm:p-4 rounded-xl bg-card shadow-card border border-border/50 hover:border-primary/30 transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-primary" />
      <div className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
        {stat.value}
      </div>
      <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">
        {stat.label}
      </div>
    </div>
  );
};

const StatsGrid = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-8">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </div>
  );
};

const FlipCardContainer = ({ 
  isFlipped, 
  setIsFlipped, 
  t 
}: { 
  isFlipped: boolean; 
  setIsFlipped: (flipped: boolean) => void;
  t: (key: string) => string;
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const stats = [
    { icon: Briefcase, value: '1+', label: t('about.stat.experience') },
    { icon: Code2, value: '5+', label: t('about.stat.projects') },
    { icon: Layers, value: '10+', label: t('about.stat.technologies') },
  ];

  return (
    <div className="perspective-1000" ref={ref as React.RefObject<HTMLDivElement>}>
      <div
        className={`relative transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        } ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
          transition: 'transform 700ms, opacity 600ms ease-out, transform 600ms ease-out',
        }}
      >
        {/* Front Side - Professional */}
        <div 
          className="backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              {t('about.passion')}
            </p>

            {/* Stats */}
            <StatsGrid stats={stats} />

            {/* Flip Button */}
            <div className="pt-6">
              <Button
                variant="outline"
                onClick={() => setIsFlipped(true)}
                className="group gap-2"
              >
                <Heart className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                {t('about.personal.button') || 'Get to know me personally'}
              </Button>
            </div>
          </div>
        </div>

        {/* Back Side - Personal */}
        <div 
          className="absolute inset-0 rotate-y-180 backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="space-y-4 sm:space-y-6 p-6 rounded-2xl bg-card border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="font-heading text-xl font-semibold">
                {t('about.personal.title') || 'Beyond the Code'}
              </h3>
            </div>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t('about.personal.description') || 'When I\'m not coding, you\'ll find me exploring new technologies, playing video games, or enjoying time with friends and family. I believe in continuous learning and personal growth.'}
            </p>
            
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🎮</span>
                <span className="text-muted-foreground">{t('about.personal.hobby1') || 'Gaming enthusiast'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📚</span>
                <span className="text-muted-foreground">{t('about.personal.hobby2') || 'Always learning something new'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🎵</span>
                <span className="text-muted-foreground">{t('about.personal.hobby3') || 'Music lover'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">⚽</span>
                <span className="text-muted-foreground">{t('about.personal.hobby4') || 'F.C. Porto fan'}</span>
              </div>
            </div>

            {/* Flip Back Button */}
            <div className="pt-6">
              <Button
                variant="outline"
                onClick={() => setIsFlipped(false)}
                className="group gap-2"
              >
                <RotateCcw className="w-4 h-4 group-hover:rotate-[-180deg] transition-transform duration-500" />
                {t('about.personal.back') || 'Back to professional'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutSection = () => {
  const { t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t('about.title')}
            </h2>
            <p className="text-muted-foreground text-lg">{t('about.subtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Profile Photo - shows first on mobile */}
            <div className="relative flex justify-center lg:hidden order-first mb-8">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-card shadow-card border border-border/50 flex items-center justify-center overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Flip Card Container */}
            <FlipCardContainer isFlipped={isFlipped} setIsFlipped={setIsFlipped} t={t} />

            {/* Profile Photo - desktop only */}
            <div className="relative hidden lg:flex justify-center lg:justify-start">
              <div className="w-full aspect-square rounded-full bg-card shadow-card border border-border/50 flex items-center justify-center overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-4 -right-4 w-24 h-24 grid grid-cols-4 gap-2">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-primary/30" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};
