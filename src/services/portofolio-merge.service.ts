import type { PortfolioJson } from "../interface/portofolio-json.interface";
import type { ResumeJson } from "../interface/resume-json.interface";
import { PortfolioMappingService } from "./portofolio-mapping-service";

export class PortfolioMergeService {
    static merge(
        resume: ResumeJson,
        aiPortfolio: PortfolioJson
    ): PortfolioJson {
        const mapped =
            PortfolioMappingService.mapResumeToPortfolio(
                resume
            );

        return {
            hero: {
                badge:
                    mapped.hero.badge,

                headline:
                    aiPortfolio.hero
                        ?.headline ??
                    '',

                title: {
                    prefix:
                        aiPortfolio.hero
                            ?.title
                            ?.prefix ??
                        '',

                    highlight:
                        aiPortfolio.hero
                            ?.title
                            ?.highlight ??
                        '',
                },

                description:
                    resume
                        .personal_information
                        ?.description ??
                    '',
                short_description:
                    aiPortfolio.hero
                        ?.description ??
                    '',
            },

            skill_section: {
                title:
                    mapped.skill_section
                        .title,

                subtitle:
                    aiPortfolio
                        .skill_section
                        ?.subtitle ??
                    '',

                categories:
                    mapped.skill_section
                        .categories,
            },

            experience_section:
                mapped.experience_section,

            project_section:
                mapped.project_section,

            stats:
                mapped.stats,
            education_section: resume.education
        };
    }
}