// ингридиент
export interface Ingredient {
  name: string;
  count: number;
  unit: string; // единица измерения
}

// блюдо
export interface Dish {
  id: string;
  name: string;
  groupName: string; // категория блюда (завтрак, салат, выпечка..)
  ingredients: Ingredient[];
}

export interface DishGroup {
  groupName: string;
  dishes: Dish[];
}

// один прием пищи
export interface Meal {
  type: string;
  dishes: string[]; // список id блюд
}

// описание одного дня в меню
export interface Day {
  day: string;
  meals: Meal[];
}

// недельное меню
export interface Menu {
  id: string;
  name: string;
  days: Day[];
}

export interface MenuStore {
  menus: Menu[];
  dishes: Dish[];
}
