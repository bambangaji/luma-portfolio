import { usePortfolioStore } from '../../store/portfolio.store';

import { ProfileEditor } from './profile-editor';
import { ExperienceEditor } from './experience-editor';
import { ProjectEditor } from './project-editor';
import { SkillsEditor } from './skills-editor';
import { ThemeEditor } from './theme-editor';

export const EditorPanel =
  () => {
    const {
      selectedSection,
    } =
      usePortfolioStore();

    return (
      <div
        className="
          overflow-y-auto
          border
          p-6
        "
      >
        {selectedSection ===
          'profile' && (
          <ProfileEditor />
        )}

        {selectedSection ===
          'experience' && (
          <ExperienceEditor />
        )}

        {selectedSection ===
          'projects' && (
          <ProjectEditor />
        )}

        {selectedSection ===
          'skills' && (
          <SkillsEditor />
        )}

        {selectedSection ===
          'theme' && (
          <ThemeEditor />
        )}
      </div>
    );
  };