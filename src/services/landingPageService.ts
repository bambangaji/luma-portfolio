import data from '../data/dummy.json';

import type {
  About,
  ContactItem,
  Experience,
  Hero,
  PersonalInformation,
  Project,
  Skills,
} from '../models/landingPageModel';

interface LandingPageData {
  experiences: Experience[];
  projects: Project[];
  abouts: About;
  hero: Hero;
  contacts: ContactItem[];
  skills: Skills;
  personal_information: PersonalInformation;
}

const landingPageData = data as LandingPageData;

export class LandingPageService {

  static getExperiences(): Experience[] {
    return landingPageData.experiences;
  }

  static getExperienceById(
    id: string
  ): Experience | undefined {
    return landingPageData.experiences.find(
      (experience) => experience.id === id
    );
  }

  static getProjects(): Project[] {
    return landingPageData.projects;
  }

  static getProjectById(
    id: string
  ): Project | undefined {
    return landingPageData.projects.find(
      (project) => project.id === id
    );
  }

  static getAbout(): About {
    return landingPageData.abouts;
  }

  static getHero(): Hero {
    return landingPageData.hero;
  }

  static getContactInfo(): ContactItem[] {
    return landingPageData.contacts;
  }

  static getSkills(): Skills {
    return landingPageData.skills;
  }

  static getPersonalInformation(): PersonalInformation {
    return landingPageData.personal_information;
  }
}