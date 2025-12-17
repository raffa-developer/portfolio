import { useLanguage } from '@/contexts/LanguageContext';
import { Code2, Layout, Database, Settings } from 'lucide-react';
import { useRef, useState, useCallback } from 'react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

interface MousePosition {
  x: number;
  y: number;
}

const SkillCard = ({ 
  category, 
  categoryIndex 
}: { 
  category: SkillCategory; 
  categoryIndex: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const lastUpdateRef = useRef(0);

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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative p-6 lg:p-8 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 overflow-hidden"
      style={{ animationDelay: `${categoryIndex * 0.1}s` }}
    >
      {/* Mouse tracking glow effect - optimized */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.08), transparent 40%)`
            : 'none',
          willChange: isHovered ? 'opacity, background' : 'auto',
          transform: 'translateZ(0)', // GPU acceleration
        }}
      />
      
      {/* Category Header */}
      <div className="relative flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {category.icon}
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {category.title}
        </h3>
      </div>

      {/* Skills List */}
      <div className="relative flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-sm text-muted-foreground bg-secondary/50 rounded-md border border-border/30 hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const { t } = useLanguage();

  const skillCategories: SkillCategory[] = [
    {
      title: t('skills.backend'),
      icon: <Code2 className="w-5 h-5" />,
      skills: ['C#', '.NET', 'ASP.NET', 'PHP', 'Java', 'REST APIs', 'Node.js'],
    },
    {
      title: t('skills.frontend'),
      icon: <Layout className="w-5 h-5" />,
      skills: ['JavaScript', 'TypeScript', 'React', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
      title: t('skills.database'),
      icon: <Database className="w-5 h-5" />,
      skills: ['SQL Server', 'MySQL', 'PostgreSQL'],
    },
    {
      title: t('skills.tools'),
      icon: <Settings className="w-5 h-5" />,
      skills: ['Git', 'Docker', 'Visual Studio', 'VS Code', 'Jira', 'WordPress'],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('skills.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('skills.subtitle')}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <SkillCard
                key={category.title}
                category={category}
                categoryIndex={categoryIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
