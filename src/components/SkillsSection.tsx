import { useLanguage } from '@/contexts/LanguageContext';

interface Skill {
  name: string;
  level: number;
  color?: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const SkillsSection = () => {
  const { t } = useLanguage();

  const skillCategories: SkillCategory[] = [
    {
      title: t('skills.backend'),
      skills: [
        { name: 'C#', level: 85 },
        { name: 'ASP.NET', level: 80 },
        { name: 'PHP', level: 70 },
        { name: 'Java', level: 70 },
        { name: 'REST APIs', level: 75 },
      ],
    },
    {
      title: t('skills.frontend'),
      skills: [
        { name: 'JavaScript', level: 70 },
        { name: 'HTML5', level: 85 },
        { name: 'CSS3', level: 75 },
        { name: 'React', level: 60 },
      ],
    },
    {
      title: t('skills.database'),
      skills: [
        { name: 'SQL Server', level: 75 },
        { name: 'MySQL', level: 70 },
        { name: 'PostgreSQL', level: 60 },
      ],
    },
    {
      title: t('skills.tools'),
      skills: [
        { name: 'Git', level: 80 },
        { name: 'Visual Studio', level: 85 },
        { name: 'VS Code', level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t('skills.title')}
            </h2>
            <p className="text-muted-foreground text-lg">{t('skills.subtitle')}</p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <h3 className="font-heading text-xl font-semibold mb-6 text-foreground">
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${(categoryIndex * 4 + skillIndex) * 0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
