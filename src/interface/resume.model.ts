export interface ResumeModel {
  personal_information: PersonalInformation;
  summary: Summary;
  education: Education[];
  skills: Skills;
  certifications: Certification[];
  languages: Language[];
  projects: Project[];
  work_experience: WorkExperience[];
}

export interface PersonalInformation {
  full_name: string;
  location: Location;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface Location {
  city: string;
  province: string;
  country: string;
}

export interface Summary {
  title: string;
  years_of_experience: number;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  start_date: string;
  end_date: string;
  gpa: number;
  projects?: EducationProject[];
}

export interface EducationProject {
  name: string;
  technologies: string[];
}

export interface Skills {
  backend: string[];
  frontend: string[];
  database: string[];
  ai: string[];
  devops: string[];
  documentation: string[];
}

export interface Certification {
  name: string;
  date: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  type: string;
  role: string;
  company?: string | null;
  status: "completed" | "ongoing" | "maintenance";
  start_date: string;
  end_date?: string | null;

  url?: string | null;
  github_url?: string | null;
  playstore_url?: string | null;
  appstore_url?: string | null;

  thumbnail?: string | null;
  images?: string[];

  technologies: string[];
  features?: string[];
  responsibilities: string[];

  architecture?: string[];
  achievements?: string[];

  team_size?: number;
}

export interface WorkExperience {
  position: string;
  company: string;
  location: string;

  start_date: string;
  end_date: string;

  technologies?: string[];

  responsibilities: string[];

  achievements?: string[];
}

export interface ResumeSection {
    title: string;
    content: string[];
}

export interface PdfJson {
    file_name: string;
    total_pages: number;
    sections: ResumeSection[];
}