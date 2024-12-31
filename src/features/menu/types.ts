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

export interface MenuStore extends MenuUpdater, DishUpdater {
  menus: Menu[];
  dishes: Dish[];
}

// управление меню
export interface MenuUpdater {
  getMenuById: (id: string) => Menu | undefined;
  updateMenuName: (id: string, newName: string) => void;
  updateDay: (menuId: string, nDay: number, dayName: string) => void;
  updateMeal: (
    menuId: string,
    nDay: number,
    nMeal: number,
    mealName: string
  ) => void;
  deleteMeal: (menuId: string, nDay: number, nMeal: number) => void;
  setDishesToMeal: (
    menuId: string,
    nDay: number,
    nMeal: number,
    dishes: Dish[]
  ) => void;
}

// управление списком блюд
export interface DishUpdater {
  getDishesList: (filter?: string) => Dish[];
  renameDish: (id: string, name: string) => void;
  setIngredients: (dishId: string, ingredients: Ingredient[]) => void;
}

export type SetState<T> = (
  partial: Partial<T> | ((state: T) => Partial<T>)
) => void;
export type GetState<T> = () => T;
