
import { AccordionSection } from './accordion-sections';
import { ProjectItemEditor } from './project-item-editor';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

  const projects = portfolio.project_section.items;

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
      title={t('editor_projects')}
      subtitle={t('editor_projects_count', { count: projects.length })}
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
            flex w-full items-center justify-center gap-2
            rounded-xl border-2 border-dashed
            border-violet-200 bg-violet-50/50
            px-4 py-4 text-sm font-semibold text-violet-600
            transition-colors hover:bg-violet-100 hover:border-violet-300
            dark:border-violet-500/30 dark:bg-violet-500/10
            dark:text-violet-400 dark:hover:bg-violet-500/20
          "
        >
          {t('editor_btn_add_project')}
        </button>
      </div>
    </AccordionSection>
  );
};