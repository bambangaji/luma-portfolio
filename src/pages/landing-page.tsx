
import { Footer } from '../components/footer';
import { useOutletContext } from 'react-router-dom';
import { HeroSection } from '../components/sections/hero-section';
import { AboutSection } from '../components/sections/about-section';
import { SkillsSection } from '../components/sections/skills-section';
import { ProjectsSection } from '../components/sections/projects-section';
import { ExperienceSectionTwo } from '../components/sections/experience-section-two';
import { ContactSection } from '../components/sections/contact-section';

type ThemeContext = {
  isDark: boolean;
};

export const LandingPage = () => {
  const { isDark } = useOutletContext<ThemeContext>();
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <HeroSection />
      <AboutSection/>
      <SkillsSection />
      <ProjectsSection/>
      {/* <ExperienceSection /> */}
      <ExperienceSectionTwo  />
      <ContactSection />
      <Footer />
    </div>
  );
}
