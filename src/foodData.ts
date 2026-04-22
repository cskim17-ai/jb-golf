export interface FoodItem {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  signatureDishes: string[];
  visitorTips: string[];
  quickInfo: {
    label: string;
    value: string;
  }[];
  image: string;
  category: 'LocalTop10' | 'KSL' | 'Nearby' | 'Market';
}

export const FOOD_DATA: FoodItem[] = [];
