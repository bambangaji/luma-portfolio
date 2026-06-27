import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Footer } from '../../components/footer';
import { HeroSection } from '../../components/sections/hero-section';
import { AboutSection } from '../../components/sections/about-section';
import { SkillsSection } from '../../components/sections/skills-section';
import { ProjectsSection } from '../../components/sections/projects-section';
import { ExperienceSectionTwo } from '../../components/sections/experience-section-two';
import { ContactSection } from '../../components/sections/contact-section';
import { LandingPageService } from '../../services/landing-page-service';
import type { ResumeJson } from '../../interface/resume-json.interface';

type Props = { resume: ResumeJson };
type ThemeContext = { isDark: boolean };

export const PortfolioPage = ({ resume }: Props) => {
  const { isDark } = useOutletContext<ThemeContext>();

  // Swap data before first render and restore on unmount
  LandingPageService.setData(resume);
  useEffect(() => () => { LandingPageService.reset(); }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSectionTwo />
      <ContactSection />
      <Footer />
    </div>
  );
};
