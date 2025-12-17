import { useState, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { IntroAnimation } from '@/components/IntroAnimation';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    // Small delay before revealing content for smooth transition
    setTimeout(() => setContentVisible(true), 100);
  }, []);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      
      {/* Navigation outside the animated container so it's always fixed */}
      {contentVisible && <Navigation />}
      
      <div 
        className={`min-h-screen bg-background transition-all duration-1000 ease-out ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
