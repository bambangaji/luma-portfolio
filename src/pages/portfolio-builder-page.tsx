import { motion } from "framer-motion";
import { ExperienceEditor } from "../components/portofolio-editor/experience-editor";
import { HeroEditor } from "../components/portofolio-editor/hero-editor";
import { ProjectEditor } from "../components/portofolio-editor/project-editor";
import { SkillsEditor } from "../components/portofolio-editor/skills-editor";
import { EducationEditor } from "../components/portofolio-editor/education-editor";
import { ButtonMenuPortfolio } from "../components/portofolio-editor/button-menu";
import { CvSummaryEditor } from "../components/portofolio-editor/cv-summary-editor";
import { AppHeader } from "../components/app-header";

export const PortfolioBuilderPage = () => {

  return (
    <div className="relative min-h-screen w-full bg-slate-50 font-sans selection:bg-violet-200 dark:bg-gray-950 dark:selection:bg-violet-900/50">
      {/* Background Decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10 h-full w-full">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>
        {/* Soft glow blobs */}
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/20 blur-[100px] dark:bg-violet-900/30"></div>
      </div>

      <AppHeader />

      <main className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Action Menu & Header info */}
          <ButtonMenuPortfolio />

          {/* Editors Layout */}
          <div className="grid gap-6">
            <CvSummaryEditor />
            
            <div className="flex flex-col gap-6">
              <HeroEditor />
              <EducationEditor />
              <SkillsEditor />
              <ExperienceEditor />
              <ProjectEditor />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};