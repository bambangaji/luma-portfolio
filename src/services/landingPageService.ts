import data from '../data/dummyFromN8N.json';
import dataPorto from '../data/templateJsonClassification.json';
import type { PortfolioJson } from '../interface/portofolioJson.interface';
import type { ResumeJson } from '../interface/resumeJson.interface';
import { PortfolioMergeService } from './portofolio-merge.service';
import { PortfolioSanitizerService } from './portofolio-sanitizer.service';


export class LandingPageService {
  private static readonly data =
    data.json as ResumeJson;

  private static readonly portfolio_sanitize =
    PortfolioSanitizerService.sanitize(dataPorto);
  ;

  private static readonly portfolio =
    PortfolioMergeService.merge(data.json as ResumeJson, this.portfolio_sanitize);

  static getPortfolio(): PortfolioJson {
 
    return this.portfolio;
  }

  static getHero() {
       console.log('Merged Portfolio:', this.portfolio);
    return this.portfolio.hero;
  }

  static getSkillSection() {
    return this.portfolio.skill_section;
  }

  static getExperienceSection() {
    return this.portfolio.experience_section;
  }

  static getProjectSection() {
    return this.portfolio.project_section;
  }

  static getStats() {
    return this.portfolio.stats;
  }

  // Resume

  static getResume(): ResumeJson {
    return this.data;
  }

  static getPersonalInformation() {
    return this.data.personal_information;
  }

  static getSocials() {
    return this.data.socials;
  }

  static getEducation() {
    return this.data.education;
  }

  static getCertifications() {
    return this.data.certifications;
  }

  static getExperiences() {
    return this.data.experiences;
  }

  static getProjects() {
    return this.data.projects;
  }

  static getSkills() {
    return this.portfolio.skill_section;
  }
}