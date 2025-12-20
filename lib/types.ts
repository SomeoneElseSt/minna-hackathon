export type Challenge = {
  id: number;
  title: string;
  description: string;
  goals: string[];
  order: number;
  icon: string | null;
  points: number;
};
