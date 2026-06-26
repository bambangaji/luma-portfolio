
import { AccordionSection } from './accordion-sections';
import { ProjectItemEditor } from './project-item-editor';

import { usePortfolioStore } from '../../store/portfolio.store';

export const ProjectEditor = () => {
  const portfolio =
    usePortfolioStore(
      state => state.portfolio
    );

  const setPortfolio =
    usePortfolioStore(
      state => state.setPortfolio
    );

  if (!portfolio) {
    return null;
  }

  const projects =
    portfolio.project_section.items;

  const addProject = () => {
    setPortfolio({
      ...portfolio,

      project_section: {
        ...portfolio.project_section,

        items: [
          ...projects,
          {
            title: '',
            description: '',
            url: '',
            thumbnail: '',
            technologies: [],
          },
        ],
      },
    });
  };

  return (
    <AccordionSection
      title="Projects"
      subtitle={`${projects.length} Projects`}
    >
      <div className="space-y-4">
        {projects.map(
          (
            project,
            index
          ) => (
            <ProjectItemEditor
              key={`${project.title}-${index}`}
              project={project}
              index={index}
            />
          )
        )}

        <button
          onClick={addProject}
          className="
            rounded-xl

            border
            border-dashed

            px-4 py-3

            text-sm
            font-medium

            hover:bg-gray-50

            dark:hover:bg-gray-800
            dark:text-white
          "
        >
          + Add Project
        </button>
      </div>
    </AccordionSection>
  );
};