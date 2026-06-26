import type { PortfolioJson } from "../interface/portofolio-json.interface";
import type { Experience, Project, ResumeJson } from "../interface/resume-json.interface";

export class PortfolioMappingService {
  static mapResumeToPortfolio(
    resume: ResumeJson
  ): PortfolioJson {
    const latestExperience =
      resume.experiences.find(
        experience =>
          experience.is_current
      ) ??
      resume.experiences[0];

    const totalSkills =
      resume.skills.reduce(
        (
          total,
          category
        ) =>
          total +
          category.items.length,
        0
      );

    const totalCompanies =
      new Set(
        resume.experiences.map(
          experience =>
            experience.company
        )
      ).size;

    const totalProjects =
      resume.projects.length;

    const yearsExperience =
      this.calculateYearsExperience(
        resume.experiences
      );

    return {
      hero: {
        badge:
          latestExperience?.role ??
          '',

        headline:
          latestExperience?.company ??
          '',

        title: {
          prefix: '',
          highlight: '',
        },

        description: '',
      },

      skill_section: {
        title:
          'Skills & Expertise',

        subtitle: '',

        categories:
          resume.skills.map(
            skill => ({
              category:
                skill.category,

              score:
                this.calculateSkillScore(
                  skill.items.length
                ),

              items:
                skill.items,
            })
          ),
      },

      experience_section: {
        title:
          'Work Experience',

        items:
          resume.experiences,
      },

      project_section: {
        title:
          'Featured Projects',

        categories:
          this.extractProjectCategories(
            resume.projects
          ),

        items:
          resume.projects,
      },

      stats: [
        {
          label:
            'Years Experience',
          value:
            yearsExperience,
        },

        {
          label:
            'Projects',
          value:
            totalProjects,
        },

        {
          label:
            'Companies',
          value:
            totalCompanies,
        },

        {
          label:
            'Skills',
          value:
            totalSkills,
        },
      ],
      education_section:
        resume.education.map(
          education => ({
            degree:
              education.degree,
            institution:
              education.institution,
            gpa:
              education.gpa,
            start_date:
              education.start_date,
            end_date:
              education.end_date,
            description:
              education.description,
          })
        ),
    }
  }
  private static calculateSkillScore(
      count: number
    ): number {
    if (count <= 3)
      return 60;

    if (count <= 6)
      return 75;

    if (count <= 10)
      return 90;

    return 100;
  }

  private static calculateYearsExperience(
    experiences: Experience[]
  ): number {
    const dates =
      experiences
        .map(
          experience =>
            Date.parse(
              experience.start_date
            )
        )
        .filter(
          date =>
            !Number.isNaN(
              date
            )
        );

    if (
      dates.length === 0
    ) {
      return 0;
    }

    const earliest =
      Math.min(...dates);

    return (
      new Date().getFullYear() -
      new Date(
        earliest
      ).getFullYear()
    );
  }

  private static extractProjectCategories(
    projects: Project[]
  ): string[] {
    const categories =
      new Set<string>();

    const technologyToCategory:
      Record<
        string,
        string
      > = {
      Angular:
        'Frontend',

      React:
        'Frontend',

      Vue:
        'Frontend',

      'Spring Boot':
        'Backend',

      NodeJS:
        'Backend',

      '.NET':
        'Backend',

      Flutter:
        'Mobile',

      Ionic:
        'Mobile',

      PostgreSQL:
        'Database',

      MySQL:
        'Database',

      AWS:
        'Cloud',

      Docker:
        'Cloud',

      Kubernetes:
        'Cloud',

      n8n: 'AI',

      LLaMA:
        'AI',
    };

    projects.forEach(
      project => {
        project.technologies.forEach(
          (technology: string) => {
            categories.add(
              technologyToCategory[
              technology
              ] ??
              technology
            );
          }
        );
      }
    );

    return [
      ...categories,
    ];
  }
}