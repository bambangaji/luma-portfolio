import type { PortfolioJson } from '../interface/portofolio-json.interface';

export class PortfolioSanitizerService {
  static sanitize(
    response: unknown
  ): PortfolioJson {
    const data =
      (response as any)?.json ??
      response ??
      {};

    return {
      hero: {
        badge:
          data.hero?.badge ?? '',

        headline:
          data.hero?.headline ??
          '',

        title: {
          prefix:
            data.hero?.title
              ?.prefix ?? '',

          highlight:
            data.hero?.title
              ?.highlight ??
            '',
        },

        description:
          data.hero
            ?.description ?? '',
      },

      skill_section: {
        title:
          data.skills?.title ??
          'Skills & Expertise',

        subtitle:
          data.skills
            ?.subtitle ?? '',

        categories: Array.isArray(
          data.skills
            ?.categories
        )
          ? data.skills.categories.map(
              (
                category: any
              ) => ({
                category:
                  category.name ??
                  category.category ??
                  '',

                score:
                  Number(
                    category.score
                  ) || 0,

                items:
                  Array.isArray(
                    category.items
                  )
                    ? category.items
                    : [],
              })
            )
          : [],
      },

      experience_section: {
        title:
          data.experience
            ?.title ??
          'Work Experience',

        items: Array.isArray(
          data.experience
            ?.items
        )
          ? data.experience.items
          : [],
      },

      project_section: {
        title:
          data.projects
            ?.title ??
          'Featured Projects',

        categories:
          Array.isArray(
            data.projects
              ?.filters
          )
            ? data.projects
                .filters
            : [],

        items: Array.isArray(
          data.projects
            ?.items
        )
          ? data.projects.items
          : [],
      },

      stats: [
        {
          label:
            'Years Experience',
          value:
            Number(
              data.stats
                ?.years_experience
            ) || 0,
        },

        {
          label: 'Projects',
          value:
            Number(
              data.stats
                ?.projects
            ) || 0,
        },

        {
          label: 'Companies',
          value:
            Number(
              data.stats
                ?.companies
            ) || 0,
        },

        {
          label: 'Skills',
          value:
            Number(
              data.stats
                ?.skills
            ) || 0,
        },
      ],

      education_section: Array.isArray(
        data.education_section
      )
        ? data.education_section.map(
            (edu: any) => ({
              degree:
                edu.degree ?? '',
              institution:
                edu.institution ?? '',
              gpa:
                edu.gpa ?? null,
              start_date:
                edu.start_date ?? null,
              end_date:
                edu.end_date ?? null,
              description: Array.isArray(
                edu.description
              )
                ? edu.description
                : [],
            })
          )
        : [],
    };
  }
}