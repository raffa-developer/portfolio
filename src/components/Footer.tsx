import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          {/* Copyright */}
          <div className="text-xs sm:text-sm text-muted-foreground order-2 md:order-1">
            © {currentYear} Rafael Gonçalves. {t('footer.rights')}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 order-1 md:order-2">
            <a
              href="https://www.linkedin.com/in/rafa-gonçalves/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/raffa-developer"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
