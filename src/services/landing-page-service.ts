import data from '../data/bambang-aji-pangestu/dummy-from-n8-n.json';
import dataPorto from '../data/template-json-classification.json';
import type { PortfolioJson } from '../interface/portofolio-json.interface';
import type { ResumeJson } from '../interface/resume-json.interface';
import { PortfolioMappingService } from './portofolio-mapping-service';
import { PortfolioMergeService } from './portofolio-merge.service';
import { PortfolioSanitizerService } from './portofolio-sanitizer.service';

const defaultResume = data.json as ResumeJson;
const defaultPortfolio = PortfolioMergeService.merge(
  defaultResume,
  PortfolioSanitizerService.sanitize(dataPorto)
);

export class LandingPageService {
  private static _resume:    ResumeJson    = defaultResume;
  private static _portfolio: PortfolioJson = defaultPortfolio;

  /** Call before rendering to swap to a different persona's data */
  static setData(resume: ResumeJson): void {
    this._resume    = resume;
    this._portfolio = PortfolioMappingService.mapResumeToPortfolio(resume);
  }

  static reset(): void {
    this._resume    = defaultResume;
    this._portfolio = defaultPortfolio;
  }

  static getPortfolio()          { return this._portfolio; }
  static getHero()               { return this._portfolio.hero; }
  static getSkillSection()       { return this._portfolio.skill_section; }
  static getExperienceSection()  { return this._portfolio.experience_section; }
  static getProjectSection()     { return this._portfolio.project_section; }
  static getStats()              { return this._portfolio.stats; }
  static getResume()             { return this._resume; }
  static getPersonalInformation(){ return this._resume.personal_information; }
  static getSocials()            { return this._resume.socials; }
  static getEducation()          { return this._resume.education; }
  static getCertifications()     { return this._resume.certifications; }
  static getExperiences()        { return this._resume.experiences; }
  static getProjects()           { return this._resume.projects; }
  static getSkills()             { return this._portfolio.skill_section; }
}
