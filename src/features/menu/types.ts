export interface Ingredient {
  name: string;
  count: number;
  unit: string; // единица измерения
}

export interface Dish {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

export interface Meal {
  type: string;
  dishes: string[];
}

export interface Day {
  day: string;
  meals: Meal[];
}

export interface Menu {
  id: string;
  name: string;
  days: Day[];
}

export interface MenuStore {
  menus: Menu[];
  dishes: Dish[];
}
