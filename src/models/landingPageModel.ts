export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
};
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metrics: string;
  category: string;

  url: string | null;

  thumbnail: string | null;
}

export interface Education {
  degree: string;
  field: string;
  university: string;
  graduationYear: number;
}

export interface About {
  tagline: string;
  headline: string;
  description: string;
  expertise: string[];
  education: Education;
}

export interface HeroTitle {
  prefix: string;
  highlight: string;
}

export interface HeroButton {
  label: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface Hero {
  badge: string;
  title: HeroTitle;
  description: string;
  stats: HeroStat[];
}

export interface ContactItem {
  type: ContactType;
  value: string;
  url: string;
}

export interface FormField {
  label: string;
  placeholder: string;
}

export interface SubmitButton {
  defaultText: string;
  successText: string;
}

export interface ContactForm {
  name: FormField;
  email: FormField;
  message: FormField;
  submitButton: SubmitButton;
}

export interface ContactContent {
  headline: string;
  description: string;
}

export interface Contact {
  title: string;
  subtitle: string;
  content: ContactContent;
  contacts: ContactItem[];
}

export interface SkillCategory {
  category: string;
  level: number;
  items: string[];
}

export interface Skills {
  title: string;
  subtitle: string;
  categories: SkillCategory[];
}

export type ContactType =
  | 'email'
  | 'whatsapp'
  | 'linkedin'
  | 'github'
  | 'resume';
