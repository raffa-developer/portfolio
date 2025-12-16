import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

interface Experience {
  titleKey: string;
  companyKey: string;
  periodKey: string;
  descriptionKey: string;
  locationKey: string;
  isCurrent: boolean;
  skills: string[];
}

export const ExperienceSection = () => {
  const { t } = useLanguage();

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

  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary/30">
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
          <div className="relative">
            {/* Main timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border md:-translate-x-1/2" />

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
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 shadow-card hover:border-primary/40 hover:shadow-glow/20 transition-all duration-500">
                    {/* Decorative corner */}
                    <div className={`absolute top-8 hidden md:block ${index % 2 === 0 ? '-right-3' : '-left-3'}`}>
                      <ChevronRight className={`w-6 h-6 text-border group-hover:text-primary/40 transition-colors ${index % 2 === 0 ? '' : 'rotate-180'}`} />
                    </div>

                    {/* Header with badge */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        {exp.isCurrent && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            {t('experience.current')}
                          </span>
                        )}
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {t(exp.titleKey)}
                        </h3>
                      </div>
                    </div>

                    {/* Company and meta info */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
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
                    <p className="text-muted-foreground leading-relaxed mb-5">
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
