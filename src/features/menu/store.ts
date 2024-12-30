import {create} from 'zustand';

interface Meal {
  type: string;
  dish: string;
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
  getMenuById: (id: string) => Menu | undefined;
}

export const useMenuStore = create<MenuStore>((_, get) => ({
  menus: [
    {
      id: '1',
      name: 'Week 1',
      days: [
        {
          day: 'Monday',
          meals: [
            { type: 'Breakfast', dish: 'Oatmeal' },
            { type: 'Lunch', dish: 'Soup' },
            { type: 'Dinner', dish: 'Grilled Chicken' },
          ],
        },
      ],
    },
  ],
  getMenuById: (id) => get().menus.find((menu) => menu.id === id),
}));