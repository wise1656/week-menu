import { create } from "zustand";
import { produce } from "immer";

interface Ingredient {
  name: string;
  count: number;
  unit: string; // единица измерения
}

interface Dish {
  name: string;
  ingredients: Ingredient[];
}

interface Meal {
  type: string;
  dishes: Dish[];
}

interface Day {
  day: string;
  meals: Meal[];
}

interface Menu {
  id: string;
  name: string;
  days: Day[];
}

interface MenuStore {
  menus: Menu[];
  dishes: Dish[];
  getMenuById: (id: string) => Menu | undefined;
  updateMenuName: (id: string, newName: string) => void;
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  menus: [
    {
      id: "1",
      name: "Week 1",
      days: [
        {
          day: "Monday",
          meals: [
            {
              type: "Breakfast",
              dishes: [{ name: "Oatmeal", ingredients: [] }],
            },
            { type: "Lunch", dishes: [{ name: "Soup", ingredients: [] }] },
            {
              type: "Dinner",
              dishes: [{ name: "Grilled Chicken", ingredients: [] }],
            },
          ],
        },
      ],
    },
  ],
  dishes: [],
  getMenuById: (id) => get().menus.find((menu) => menu.id === id),
  updateMenuName: (id: string, newName: string) => {
    set(
      produce((state: MenuStore): void => {
        const menu = state.menus.find((menu) => menu.id === id);
        if (menu) {
          menu.name = newName; // Прямое изменение с помощью immer
        }
      })
    );
  },
}));
