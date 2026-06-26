
import { useNavigate } from "react-router-dom";
import { ExperienceEditor } from "../components/portofolio-editor/experience-editor";
import { FloatingActionButton } from "../components/portofolio-editor/floating-button";
import { HeroEditor } from "../components/portofolio-editor/hero-editor";
import { ProjectEditor } from "../components/portofolio-editor/project-editor";
import { SkillsEditor } from "../components/portofolio-editor/skills-editor";
import { ThemeEditor } from "../components/portofolio-editor/theme-editor";
import { EducationEditor } from "../components/portofolio-editor/education-editor";
import { ButtonMenuPortfolio } from "../components/portofolio-editor/button-menu";
export const PortfolioBuilderPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        mx-auto
        max-w-5xl
        space-y-6
        px-6
        py-20 
        card
      "
    >
      <ButtonMenuPortfolio />
      <HeroEditor />
      <EducationEditor />
      <SkillsEditor />
      <ExperienceEditor />
      <ProjectEditor />

      {/* <ThemeEditor /> */}
    </div>
  );
};