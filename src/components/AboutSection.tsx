import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Briefcase, Code2, Heart, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import type { ComponentType, RefObject } from 'react';

interface Stat {
  icon: ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`rounded-2xl border border-border/60 bg-card p-4 text-center shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <stat.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
      <div className="font-heading text-2xl font-bold text-gradient">{stat.value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {stat.label}
      </div>
    </div>
  );
};

export const AboutSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.12 });

  const stats: Stat[] = [
    { icon: Briefcase, value: '1+', label: t('about.stat.experience') },
    { icon: Code2, value: '5+', label: t('about.stat.projects') },
    { icon: Layers, value: '10+', label: t('about.stat.technologies') },
  ];

  const focusAreas = [t('skills.backend'), t('skills.frontend'), t('skills.database'), t('skills.tools')];

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as RefObject<HTMLDivElement>}
          className={`mx-auto max-w-6xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="mb-14 text-center md:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
              <Heart className="h-3.5 w-3.5 text-primary" />
              {t('about.subtitle')}
            </div>
            <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {t('about.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              {t('about.description')}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-card">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src="/profile.jpg"
                    alt="Profile photo"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 text-white">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                      {t('experience.job1.company')}
                    </p>
                    <p className="mt-1 text-lg font-semibold">{t('experience.job1.title')}</p>
                    <p className="mt-1 text-sm text-white/80">{t('experience.job1.period')}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-card md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      {t('about.snapshot')}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                      {t('about.passion')}
                    </h3>
                  </div>
                  <div className="hidden rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground md:block">
                    1+ {t('about.stat.experience')}
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
                  <p>{t('about.description')}</p>
                  <p>{t('about.personal.description')}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 md:items-start">
                <div className="rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-card">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {t('about.personal.title')}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    A few things that fill the time away from the keyboard.
                  </p>
                  <ul className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
                    <li className="border-b border-border/40 pb-3 flex items-start gap-3">
                      <span className="text-base">🎮</span>
                      <span>{t('about.personal.hobby1')}</span>
                    </li>
                    <li className="border-b border-border/40 pb-3 flex items-start gap-3">
                      <span className="text-base">📚</span>
                      <span>{t('about.personal.hobby2')}</span>
                    </li>
                    <li className="border-b border-border/40 pb-3 flex items-start gap-3">
                      <span className="text-base">🎵</span>
                      <span>{t('about.personal.hobby3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-base">⚽</span>
                      <span>{t('about.personal.hobby4')}</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-card">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {t('about.work.title')}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Short feedback loops, readable code, and handoffs that do not need a cleanup pass.
                  </p>
                  <ul className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
                    <li className="border-b border-border/40 pb-3">{t('about.work.point1')}</li>
                    <li className="border-b border-border/40 pb-3">{t('about.work.point2')}</li>
                    <li>{t('about.work.point3')}</li>
                  </ul>

                  <div className="mt-6">
                    <Button asChild variant="outline" className="group w-full gap-2 sm:w-auto">
                      <a href="#contact">
                        {t('about.work.cta')}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};