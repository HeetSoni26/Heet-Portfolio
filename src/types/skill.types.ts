export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools';
  level?: number;
}
