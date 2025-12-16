import { useLanguage } from '@/contexts/LanguageContext';
import { Code2, Briefcase, Layers } from 'lucide-react';

export const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Briefcase, value: '1+', label: t('about.stat.experience') },
    { icon: Code2, value: '5+', label: t('about.stat.projects') },
    { icon: Layers, value: '10+', label: t('about.stat.technologies') },
  ];

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
            {/* Content */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                {t('about.passion')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-card shadow-card border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-heading text-2xl md:text-3xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Photo */}
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-full bg-card shadow-card border border-border/50 flex items-center justify-center overflow-hidden">
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
    </section>
  );
};
