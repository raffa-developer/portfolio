import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Github, Construction, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Project {
  titleKey: string;
  descriptionKey: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  inDevelopment?: boolean;
  image?: string;
  images?: string[];
}

export const ProjectsSection = () => {
  const { t } = useLanguage();
  const [carouselIndices, setCarouselIndices] = useState<{ [key: number]: number }>({});

  const projects: Project[] = [
    {
      titleKey: 'projects.project1.title',
      descriptionKey: 'projects.project1.description',
      technologies: ['C#', 'ASP.NET', 'SQL Server', 'HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com/raffa-developer/PlataformaEscolar',
      inDevelopment: false,
      images: [
        '/login.png',
        '/project.jpg',
        '/avaliacao.png',
        '/project2.jpg',
        '/horario.png',
        '/notas.png',
        '/notas2.png',
        '/reuniao.png',
        '/reuniao2.png',
      ],
    },
    {
      titleKey: 'projects.project2.title',
      descriptionKey: 'projects.project2.description',
      technologies: ['React', 'TypeScript'],
      githubUrl: 'https://github.com/raffa-developer/fogo-alerta-portugal-vivo',
      inDevelopment: false,
      images: [
        '/projeto1.png',
        '/projeto2.png',
        '/projeto3.png',
        '/projeto4.png',
        '/projeto5.png',
      ],
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-muted-foreground text-lg">{t('projects.subtitle')}</p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {projects.map((project, index) => {
              const isCarousel = project.images && project.images.length > 0;
              const currentImageIndex = isCarousel ? (carouselIndices[index] || 0) : 0;
              const currentImage = isCarousel ? project.images[currentImageIndex] : project.image;

              const handlePrev = () => {
                if (isCarousel) {
                  setCarouselIndices((prev) => {
                    const current = prev[index] ?? 0;
                    return {
                      ...prev,
                      [index]: current === 0 ? project.images!.length - 1 : current - 1,
                    };
                  });
                }
              };

              const handleNext = () => {
                if (isCarousel) {
                  setCarouselIndices((prev) => {
                    const current = prev[index] ?? 0;
                    return {
                      ...prev,
                      [index]: current === project.images!.length - 1 ? 0 : current + 1,
                    };
                  });
                }
              };

              return (
              <div
                key={index}
                className="group relative rounded-2xl bg-card border border-border/50 shadow-card overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                {/* Project Image with Carousel */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden relative">
                  {currentImage ? (
                    <>
                      <img
                        src={currentImage}
                        alt={t(project.titleKey)}
                        className="w-full h-full object-cover"
                      />
                      {/* Carousel Controls */}
                      {isCarousel && (
                        <>
                          <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                          >
                            <ChevronLeft className="h-5 w-5 sm:h-4 sm:w-4 text-white" />
                          </button>
                          <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                          >
                            <ChevronRight className="h-5 w-5 sm:h-4 sm:w-4 text-white" />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            {project.images!.map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${
                                  i === currentImageIndex
                                    ? 'w-6 bg-white'
                                    : 'w-1.5 bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : project.inDevelopment ? (
                    <div className="text-center">
                      <Construction className="h-12 w-12 mx-auto mb-2 text-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">
                        {t('projects.inDevelopment')}
                      </span>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                      <span className="font-heading text-2xl font-bold text-primary-foreground">
                        {t(project.titleKey).charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Status badge */}
                  {project.inDevelopment && (
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-accent/50 text-accent-foreground border border-primary/20">
                      {t('projects.inDevelopment')}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(project.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 line-clamp-6">
                    {t(project.descriptionKey)}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-border/50 text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          {t('projects.viewCode')}
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        asChild
                        className="bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all"
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t('projects.viewLive')}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
