export interface ResumeJson {
  personal_information: PersonalInformation;
  socials: Social[];
  education: Education[];
  certifications: Certification[];
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
}

export interface PersonalInformation {
  full_name: string;
  email: string;
  phone: string;
  location: Location;
  image?: string;
  description: string;
}

export interface Location {
  city: string;
  province: string;
  country: string;
}

export interface Social {
  type: string;
  url: string;
  value: string;
}

export interface Education {
  degree: string;
  institution: string;
  gpa: number;
  start_date: string;
  end_date: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string[];
  technologies: string[];
}

export interface Project {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}