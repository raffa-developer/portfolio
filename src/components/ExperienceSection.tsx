import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Experience {
  titleKey: string;
  companyKey: string;
  periodKey: string;
  descriptionKey: string;
  locationKey: string;
  isCurrent: boolean;
  skills: string[];
}

interface ExperienceCardProps {
  exp: Experience;
  index: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const ExperienceCard = ({ exp, index }: ExperienceCardProps) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Anima sempre que entrar na viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset quando sair para animar novamente quando voltar
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Só anima quando está realmente visível
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Throttle mouse updates to ~30fps for better performance
    const now = Date.now();
    if (now - lastUpdateRef.current < 33) return; // ~30fps
    lastUpdateRef.current = now;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div className={`ml-14 sm:ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative p-4 sm:p-6 md:p-8 rounded-2xl bg-card border border-border/50 shadow-card hover:border-primary/40 hover:shadow-glow/20 transition-all duration-500 overflow-hidden ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
        style={{
          transitionDuration: '600ms',
          transitionTimingFunction: 'ease-out',
        }}
      >
        {/* Mouse tracking glow effect - optimized */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: isHovered
              ? `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.08), transparent 40%)`
              : 'none',
            willChange: isHovered ? 'opacity, background' : 'auto',
            transform: 'translateZ(0)', // GPU acceleration
          }}
        />
        {/* Header with badge */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            {exp.isCurrent && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {t('experience.current')}
              </span>
            )}
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {t(exp.titleKey)}
            </h3>
          </div>
        </div>

        {/* Company and meta info */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Briefcase className="h-4 w-4" />
            <span>{t(exp.companyKey)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{t(exp.periodKey)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{exp.locationKey}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5">
          {t(exp.descriptionKey)}
        </p>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const experiences: Experience[] = [
    {
      titleKey: 'experience.job1.title',
      companyKey: 'experience.job1.company',
      periodKey: 'experience.job1.period',
      descriptionKey: 'experience.job1.description',
      locationKey: 'Portugal',
      isCurrent: true,
      skills: ['PHP', 'Java', '.NET', 'SQL Server', 'ReactJS'],
    },
    {
      titleKey: 'experience.job2.title',
      companyKey: 'experience.job2.company',
      periodKey: 'experience.job2.period',
      descriptionKey: 'experience.job2.description',
      locationKey: 'Portugal',
      isCurrent: false,
      skills: ['VBA', 'MySQL', 'JavaScript'],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const scrollPosition = window.scrollY;
      const sectionStart = scrollPosition + sectionTop - windowHeight;
      const sectionEnd = sectionStart + sectionHeight + windowHeight;
      
      // Progress from 0 to 1
      const progress = Math.max(0, Math.min(1, (window.scrollY - sectionStart) / (sectionEnd - sectionStart)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate gradient stop position based on scroll progress
  const gradientStop = Math.min(100, 30 + scrollProgress * 50); // Start at 30%, go to 80%

  return (
    <section ref={sectionRef} id="experience" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              {t('experience.title')}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t('experience.subtitle')}
            </h2>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Main timeline line with animated gradient */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2"
              style={{
                background: `linear-gradient(to bottom, 
                  hsl(var(--primary)) 0%, 
                  hsl(var(--primary)) ${gradientStop}%, 
                  hsl(var(--primary) / 0.5) ${Math.min(100, gradientStop + 10)}%, 
                  hsl(var(--border)) ${Math.min(100, gradientStop + 20)}%, 
                  hsl(var(--border)) 100%)`,
                transition: 'background 0.1s ease-out',
              }}
            />

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative mb-12 last:mb-0 md:mb-16 ${
                  index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center border-4 border-background ${
                      exp.isCurrent
                        ? 'bg-primary shadow-glow'
                        : 'bg-muted'
                    }`}
                  >
                    <Briefcase className={`h-5 w-5 ${exp.isCurrent ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                    {exp.isCurrent && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Content card */}
                <ExperienceCard exp={exp} index={index} />
              </div>
            ))}

            {/* Timeline end node */}
            <div className="absolute left-6 md:left-1/2 -bottom-4 md:-translate-x-1/2 -translate-x-1/2">
              <div className="w-4 h-4 rounded-full bg-border border-4 border-background" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
