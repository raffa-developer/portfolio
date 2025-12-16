import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'pt' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.role': 'Full-Stack Developer',
    'hero.description': 'Building modern web solutions trough logic and code. Specialized in C#, ASP.NET, and JavaScript ecosystems.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': 'Get in Touch',
    
    // About
    'about.title': 'About Me',
    'about.subtitle': 'Get to know me better',
    'about.description': "I'm a dedicated Full-Stack Developer with over 1 year of hands-on experience in building robust web applications. Currently working at PAOS, I specialize in creating efficient backend solutions using C#, Java, PHP, .NET, and SQL Server, while also crafting intuitive frontend interfaces with modern JavaScript frameworks.",
    'about.passion': 'My passion is solving complex problems and delivering clean, maintainable code that makes a real difference.',
    'about.stat.experience': 'Years Experience',
    'about.stat.projects': 'Projects Completed',
    'about.stat.technologies': 'Technologies',
    
    // Skills
    'skills.title': 'Skills & Expertise',
    'skills.subtitle': 'Technologies I work with',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.database': 'Database',
    'skills.tools': 'Tools',
    
    // Experience
    'experience.title': 'Work Experience',
    'experience.subtitle': 'My professional journey',
    'experience.current': 'Active',
    'experience.job1.title': 'Junior Software Developer',
    'experience.job1.company': 'PAOS',
    'experience.job1.period': 'Nov 2025 - today',
    'experience.job1.description': 'Developing and maintaining web applications using PHP, Java, .NET, SQL Server and MySQL. Collaborating with cross-functional teams to deliver high-quality solutions.',
    'experience.job2.title': 'IT Intern',
    'experience.job2.company': 'PAOS',
    'experience.job2.period': 'Oct 2024 - Jul 2025',
    'experience.job2.description': 'Gained hands-on experience in Full-Stack development, database management, and software maintenance. Contributed to internal projects and learned industry best practices.',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Some of my recent work',
    'projects.viewCode': 'View Code',
    'projects.viewLive': 'Live Demo',
    'projects.inDevelopment': 'In Development',
    'projects.project1.title': 'Plataforma Escolar',
    'projects.project1.description': 'A comprehensive school management platform for managing students, teachers, grades, and administrative tasks. Built with modern web technologies.',
    
    'projects.project2.title': 'Real-time wildfire monitoring (Portugal)',
    'projects.project2.description': ' A real-time wildfire monitoring and risk assessment platform for Portugal. The project provides an interactive map, live incident data, risk levels by district, and weather information, all in a modern and responsive web interface.',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': "Let's work together",
    'contact.description': "I'm always open to new opportunities and interesting projects. Feel free to reach out!",
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'Failed to send message. Please try again.',
    
    // Footer
    'footer.rights': 'All rights reserved.',
  },
  pt: {
    // Navigation
    'nav.about': 'Sobre',
    'nav.skills': 'Habilidades',
    'nav.experience': 'Experiência',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    
    // Hero
    'hero.greeting': 'Olá, eu sou',
    'hero.role': 'Desenvolvedor Full-Stack',
    'hero.description': 'Construindo soluções web modernas através de lógica e código. Especializado em ecossistemas C#, ASP.NET e JavaScript.',
    'hero.cta.projects': 'Ver Projetos',
    'hero.cta.contact': 'Entre em Contato',
    
    // About
    'about.title': 'Sobre Mim',
    'about.subtitle': 'Conheça-me melhor',
    'about.description': 'Sou um Desenvolvedor Full-Stack dedicado com mais de 1 ano de experiência prática na criação de aplicações web robustas. Atualmente a trabalhar na PAOS, especializo-me na criação de soluções backend eficientes usando C#, Java, PHP, .NET e SQL Server, enquanto também desenvolvo interfaces frontend intuitivas com frameworks JavaScript modernos.',
    'about.passion': 'Minha paixão está em resolver problemas complexos e entregar código limpo e sustentável que faz a diferença.',
    'about.stat.experience': 'Anos de Experiência',
    'about.stat.projects': 'Projetos Concluídos',
    'about.stat.technologies': 'Tecnologias',
    
    // Skills
    'skills.title': 'Habilidades',
    'skills.subtitle': 'Tecnologias que trabalho',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.database': 'Banco de Dados',
    'skills.tools': 'Ferramentas',
    
    // Experience
    'experience.title': 'Experiência Profissional',
    'experience.subtitle': 'Minha jornada profissional',
    'experience.current': 'Ativo',
    'experience.job1.title': 'Desenvolvedor de Software Júnior',
    'experience.job1.company': 'PAOS',
    'experience.job1.period': 'Nov 2025 - hoje',
    'experience.job1.description': 'Desenvolvimento e manutenção de aplicações web usando PHP, Java, .NET, SQL Server e MySQL. Colaboração com equipas multifuncionais para entregar soluções de alta qualidade.',
    'experience.job2.title': 'Estagiário de TI',
    'experience.job2.company': 'PAOS',
    'experience.job2.period': 'Out 2024 - Jul 2025',
    'experience.job2.description': 'Adquiri experiência prática em desenvolvimento Full-Stack, gerenciamento de banco de dados e manutenção de software. Contribuí para projetos internos e aprendi melhores práticas da indústria.',
    
    // Projects
    'projects.title': 'Projetos em Destaque',
    'projects.subtitle': 'Alguns dos meus trabalhos recentes',
    'projects.viewCode': 'Ver Código',
    'projects.viewLive': 'Demo ao Vivo',
    'projects.inDevelopment': 'Em Desenvolvimento',
    'projects.project1.title': 'Plataforma Escolar',
    'projects.project1.description': 'Uma plataforma abrangente de gestão escolar para gerenciar alunos, professores, notas e tarefas administrativas. Construída com tecnologias web modernas.',
    'projects.project2.title': 'Monitorização de incêndios em tempo real (Portugal)',
    'projects.project2.description': 'Uma plataforma de monitorização e avaliação de risco de incêndios em tempo real para Portugal. O projeto fornece um mapa interativo, dados de incidentes ao vivo, níveis de risco por distrito e informações meteorológicas, tudo numa interface web moderna e responsiva.',
    
    // Contact
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Vamos trabalhar juntos',
    'contact.description': 'Estou sempre aberto a novas oportunidades e projetos interessantes. Sinta-se à vontade para entrar em contato!',
    'contact.form.name': 'Seu Nome',
    'contact.form.email': 'Seu Email',
    'contact.form.subject': 'Assunto',
    'contact.form.message': 'Sua Mensagem',
    'contact.form.send': 'Enviar Mensagem',
    'contact.form.sending': 'Enviando...',
    'contact.form.success': 'Mensagem enviada com sucesso!',
    'contact.form.error': 'Falha ao enviar mensagem. Por favor, tente novamente.',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados.',
  },
  es: {
    // Navigation
    'nav.about': 'Sobre Mí',
    'nav.skills': 'Habilidades',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.greeting': 'Hola, soy',
    'hero.role': 'Desarrollador Full-Stack',
    'hero.description': 'Construyendo soluciones web modernas a través de lógica y código. Especializado en ecosistemas C#, ASP.NET y JavaScript.',
    'hero.cta.projects': 'Ver Proyectos',
    'hero.cta.contact': 'Contactar',
    
    // About
    'about.title': 'Sobre Mí',
    'about.subtitle': 'Conóceme mejor',
    'about.description': 'Soy un Desarrollador Full-Stack dedicado con más de 1 año de experiencia práctica en la construcción de aplicaciones web robustas. Actualmente trabajando en PAOS, me especializo en crear soluciones backend eficientes usando C#, Java, PHP, .NET y SQL Server, además de crear interfaces frontend intuitivas con frameworks JavaScript modernos.',
    'about.passion': 'Mi pasión está en resolver problemas complejos y entregar código limpio y mantenible que marca la diferencia.',
    'about.stat.experience': 'Años de Experiencia',
    'about.stat.projects': 'Proyectos Completados',
    'about.stat.technologies': 'Tecnologías',
    
    // Skills
    'skills.title': 'Habilidades y Experiencia',
    'skills.subtitle': 'Tecnologías con las que trabajo',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.database': 'Base de Datos',
    'skills.tools': 'Herramientas',
    
    // Experience
    'experience.title': 'Experiencia Laboral',
    'experience.subtitle': 'Mi trayectoria profesional',
    'experience.current': 'Activo',
    'experience.job1.title': 'Desarrollador de software junior',
    'experience.job1.company': 'PAOS',
    'experience.job1.period': 'Nov 2025 - Hoy',
    'experience.job1.description': 'Desarrollando y manteniendo aplicaciones web usando PHP, Java, .NET, SQL Server y MySQL. Colaborando con equipos multifuncionales para entregar soluciones de alta calidad.',
    'experience.job2.title': 'Pasante de TI',
    'experience.job2.company': 'PAOS',
    'experience.job2.period': 'Oct 2024 - Jul 2025',
    'experience.job2.description': 'Adquirí experiencia práctica en desarrollo Full-Stack, gestión de bases de datos y mantenimiento de software. Contribuí a proyectos internos y aprendí mejores prácticas de la industria.',
    
    // Projects
    'projects.title': 'Proyectos Destacados',
    'projects.subtitle': 'Algunos de mis trabajos recientes',
    'projects.viewCode': 'Ver Código',
    'projects.viewLive': 'Demo en Vivo',
    'projects.inDevelopment': 'En Desarrollo',
    'projects.project1.title': 'Plataforma Escolar',
    'projects.project1.description': 'Una plataforma integral de gestión escolar para administrar estudiantes, profesores, calificaciones y tareas administrativas. Construida con tecnologías web modernas.',
    'projects.project2.title': 'Monitoreo de incendios en tiempo real (Portugal)',
    'projects.project2.description': 'Una plataforma de monitoreo y evaluación de riesgo de incendios en tiempo real para Portugal. El proyecto proporciona un mapa interactivo, datos de incidentes en vivo, niveles de riesgo por distrito e información meteorológica, todo en una interfaz web moderna y responsiva.',
    
    // Contact
    'contact.title': 'Ponte en Contacto',
    'contact.subtitle': 'Trabajemos juntos',
    'contact.description': 'Siempre estoy abierto a nuevas oportunidades y proyectos interesantes. ¡No dudes en contactarme!',
    'contact.form.name': 'Tu Nombre',
    'contact.form.email': 'Tu Email',
    'contact.form.subject': 'Asunto',
    'contact.form.message': 'Tu Mensaje',
    'contact.form.send': 'Enviar Mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.form.success': '¡Mensaje enviado con éxito!',
    'contact.form.error': 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados.',
  },
  fr: {
    // Navigation
    'nav.about': 'À Propos',
    'nav.skills': 'Compétences',
    'nav.experience': 'Expérience',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': 'Bonjour, je suis',
    'hero.role': 'Développeur Full-Stack',
    'hero.description': 'Construire des solutions web modernes grâce à la logique et au code. Spécialisé dans les écosystèmes C#, ASP.NET et JavaScript.',
    'hero.cta.projects': 'Voir les Projets',
    'hero.cta.contact': 'Me Contacter',
    
    // About
    'about.title': 'À Propos de Moi',
    'about.subtitle': 'Apprenez à me connaître',
    'about.description': "Je suis un Développeur Full-Stack dévoué avec plus d'un an d'expérience pratique dans la création d'applications web robustes. Actuellement chez PAOS, je me spécialise dans la création de solutions backend efficaces utilisant C#, Java, PHP, .NET et SQL Server, tout en créant des interfaces frontend intuitives avec des frameworks JavaScript modernes.",
    'about.passion': 'Ma passion réside dans la résolution de problèmes complexes et la livraison de code propre et maintenable qui fait vraiment la différence.',
    'about.stat.experience': "Années d'Expérience",
    'about.stat.projects': 'Projets Réalisés',
    'about.stat.technologies': 'Technologies',
    
    // Skills
    'skills.title': 'Compétences & Expertise',
    'skills.subtitle': 'Technologies avec lesquelles je travaille',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.database': 'Base de Données',
    'skills.tools': 'Outils',
    
    // Experience
    'experience.title': 'Expérience Professionnelle',
    'experience.subtitle': 'Mon parcours professionnel',
    'experience.current': 'Actif',
    'experience.job1.title': 'Développeur logiciel junior',
    'experience.job1.company': 'PAOS',
    'experience.job1.period': "Nov 2025 - aujourd'hui",
    'experience.job1.description': "Développement et maintenance d'applications web utilisant PHP, Java, .NET, SQL Server et MySQL. Collaboration avec des équipes pluridisciplinaires pour livrer des solutions de haute qualité.",
    'experience.job2.title': 'Stagiaire IT',
    'experience.job2.company': 'PAOS',
    'experience.job2.period': 'Oct 2024 - Juil 2025',
    'experience.job2.description': "J'ai acquis une expérience pratique en développement Full-Stack, gestion de bases de données et maintenance logicielle. J'ai contribué à des projets internes et appris les meilleures pratiques de l'industrie.",
    
    // Projects
    'projects.title': 'Projets en Vedette',
    'projects.subtitle': 'Quelques-uns de mes travaux récents',
    'projects.viewCode': 'Voir le Code',
    'projects.viewLive': 'Démo en Direct',
    'projects.inDevelopment': 'En Développement',
    'projects.project1.title': 'Plateforme Scolaire',
    'projects.project1.description': 'Une plateforme complète de gestion scolaire pour gérer les étudiants, les enseignants, les notes et les tâches administratives. Construite avec des technologies web modernes.',
    'projects.project2.title': 'Surveillance des incendies en temps réel (Portugal)',
    'projects.project2.description': "Une plateforme de surveillance et d'évaluation des risques d'incendies en temps réel pour le Portugal. Le projet fournit une carte interactive, des données d'incidents en direct, des niveaux de risque par district et des informations météorologiques, le tout dans une interface web moderne et responsive.",
    
    // Contact
    'contact.title': 'Me Contacter',
    'contact.subtitle': 'Travaillons ensemble',
    'contact.description': "Je suis toujours ouvert aux nouvelles opportunités et projets intéressants. N'hésitez pas à me contacter!",
    'contact.form.name': 'Votre Nom',
    'contact.form.email': 'Votre Email',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Votre Message',
    'contact.form.send': 'Envoyer le Message',
    'contact.form.sending': 'Envoi en cours...',
    'contact.form.success': 'Message envoyé avec succès!',
    'contact.form.error': "Échec de l'envoi du message. Veuillez réessayer.",
    
    // Footer
    'footer.rights': 'Tous droits réservés.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('portfolio-language');
    return (stored as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
