import { create } from "zustand";
import { MenuStore } from "./types";
import { getMenuUpdater } from "./MenuUpdater";
import { getDishUpdater } from "./DishUpdater";

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
              dishes: ["1"],
            },
            {
              type: "Lunch",
              dishes: ["2"],
            },
            {
              type: "Dinner",
              dishes: ["3"],
            },
          ],
        },
      ],
    },
  ],
  dishes: [
    { id: "1", name: "Oatmeal", ingredients: [] },
    { id: "2", name: "Soup", ingredients: [] },
    { id: "3", name: "Grilled Chicken", ingredients: [] },
    { id: "4", name: "New soup", ingredients: [] },
  ],
  ...getMenuUpdater(get, set),
  ...getDishUpdater(get, set),
}));
