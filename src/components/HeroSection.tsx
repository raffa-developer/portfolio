import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, ArrowDown } from 'lucide-react';

export const HeroSection = () => {
  const { t } = useLanguage();

  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Background decoration - optimized with will-change */}
      <div className="absolute inset-0 overflow-hidden" style={{ contain: 'layout style paint' }}>
        <div 
          className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" 
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        />
        <div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '-3s', willChange: 'transform', transform: 'translateZ(0)' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full" 
          style={{ transform: 'translate3d(-50%, -50%, 0)' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full" 
          style={{ transform: 'translate3d(-50%, -50%, 0)' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <p className="text-primary font-medium mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t('hero.greeting')}
          </p>

          {/* Name */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Rafael{' '}
            <span className="text-gradient">Gonçalves</span>
          </h1>

          {/* Role */}
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {t('hero.role')}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 px-4 sm:px-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 w-full px-4 sm:px-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Button
              size="lg"
              onClick={() => handleScrollToSection('#projects')}
              className="w-full sm:w-auto bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all shadow-sm px-8"
            >
              {t('hero.cta.projects')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleScrollToSection('#contact')}
              
              className="w-full sm:w-auto border-border/50 text-primary hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all px-8"
            >
              {t('hero.cta.contact')}
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="https://www.linkedin.com/in/rafa-gonçalves/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/raffa-developer"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => handleScrollToSection('#about')}
          className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors animate-bounce"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};
