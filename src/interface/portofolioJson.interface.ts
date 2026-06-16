export interface PortfolioJson {
  hero: {
    badge: string;
    title: {
      prefix: string;
      highlight: string;
    };
    description: string;
    headline: string;
    short_description?: string;
  };
  skill_section: {
    title: string;
    subtitle: string;
    categories: {
      category: string;
      score: number;
      items: string[];
    }[];
  };
  experience_section: {
    title: string;
    items: any[];
  };
  project_section: {
    title: string;
    categories: string[];
    items: any[];
  };
  stats: {
    label: string;
    value: number;
  }[];
}