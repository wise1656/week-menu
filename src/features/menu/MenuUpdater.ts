import { produce } from "immer";
import {
  GetState,
  MenuUpdater,
  SetState,
  Menu,
  MenuStore,
  Dish,
} from "./types";

export const getMenuUpdater = (
  get: GetState<MenuStore>,
  set: SetState<MenuStore>
): MenuUpdater => ({
  getMenuById: (id: string): Menu | undefined => {
    return get().menus.find((menu) => menu.id === id);
  },

  updateMenuName: (id: string, newName: string): void => {
    set(
      produce((state: MenuStore): void => {
        const menu = state.menus.find((menu) => menu.id === id);
        if (menu) {
          menu.name = newName;
        }
      })
    );
  },

  updateDay: (menuId: string, nDay: number, dayName: string) => {
    set(
      produce((state: MenuStore) => {
        const menu = state.menus.find((menu) => menu.id === menuId);
        if (!menu) return;
        if (menu.days[nDay]) menu.days[nDay].day = dayName;
        else menu.days[nDay] = { day: "", meals: [] };
      })
    );
  },

  updateMeal: (
    menuId: string,
    nDay: number,
    nMeal: number,
    mealName: string
  ) => {
    set(
      produce((state: MenuStore) => {
        const menu = state.menus.find((menu) => menu.id === menuId);
        if (!menu) return;
        const day = menu.days[nDay];
        if (!day) return;
        if (day.meals[nMeal]) day.meals[nMeal] = { type: mealName, dishes: [] };
        else day.meals[nMeal].type = mealName;
      })
    );
  },

  deleteMeal: (menuId: string, nDay: number, nMeal: number) => {
    set(
      produce((state: MenuStore) => {
        const menu = state.menus.find((menu) => menu.id === menuId);
        if (!menu) return;
        const day = menu.days[nDay];
        if (!day) return;
        day.meals.splice(nMeal, 1);
      })
    );
  },

  setDishesToMeal: (
    menuId: string,
    nDay: number,
    nMeal: number,
    dishes: Dish[]
  ) => {
    set(
      produce((state: MenuStore) => {
        const menu = state.menus.find((menu) => menu.id === menuId);
        if (!menu) return;
        const day = menu.days[nDay];
        if (!day) return;
        const meal = day.meals[nMeal];
        if (!meal) return;
        meal.dishes = dishes.map((d) => d.id);
      })
    );
  },
});
