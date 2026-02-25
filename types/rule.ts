export interface RuleCategory {
  id: string;
  label: string;
  icon: string;
}

export interface CommunityRule {
  id: string;
  name: string;
  author: string;
  category: string;
  pattern: string;
  mask: string;
  priority: number;
  downloads: number;
  description: string;
}