import { AboutSection } from '../components/sections/aboutSection';
import { SkillsSection } from '../components/sections/skillsSection';
import { ProjectsSection } from '../components/sections/projectsSection';
import { ExperienceSection } from '../components/sections/experienceSection';
import { ContactSection } from '../components/sections/contactSection';
import { Footer } from '../components/footer';
import { HeroSection } from '../components/sections/heroSection';
import { useOutletContext } from 'react-router-dom';
import { ExperienceSectionTwo } from '../components/sections/experienceSectionTwo';

type ThemeContext = {
  isDark: boolean;
};

export const LandingPage = () => {
  const { isDark } = useOutletContext<ThemeContext>();
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection/>
      {/* <ExperienceSection /> */}
      <ExperienceSectionTwo  />
      <ContactSection />
      <Footer />
    </div>
  );
}
