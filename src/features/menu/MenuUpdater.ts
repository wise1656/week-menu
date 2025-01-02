import { produce } from "immer";
import { Menu, MenuStore, Dish } from "./types";
import { GetState, SetState } from "../../shared/types";
import { EmptyMenu } from "./consts";
import { clone } from "../../shared/helpers/clone";
import { generateNewId } from "../../shared/helpers/generateId";

export function getMenuUpdater(
  get: GetState<MenuStore>,
  set: SetState<MenuStore>
) {
  return {
    getMenuById: (id: string): Menu | undefined => {
      return get().menus.find((menu) => menu.id === id);
    },

    addNewMenu: (): void => {
      set(
        produce((state: MenuStore): void => {
          const newId = generateNewId(state.menus);
          state.menus.push({ ...clone(EmptyMenu), id: newId });
        })
      );
    },

    deleteMenu: (id: string): void => {
      set(
        produce((state: MenuStore): void => {
          state.menus = state.menus.filter((m) => m.id == id);
        })
      );
    },

    duplicateMenu: (id: string): void => {
      set(
        produce((state: MenuStore): void => {
          const menu = state.menus.find((m) => m.id == id);
          if (!menu) return;
          const newId = generateNewId(state.menus);
          state.menus.push({ ...clone(menu), id: newId });
        })
      );
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
          if (!day.meals[nMeal])
            day.meals[nMeal] = { type: mealName, dishes: [] };
          else day.meals[nMeal].type = mealName;
          day.meals = day.meals.filter((m) => m.type);
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

    addDishToMeal: (
      menuId: string,
      nDay: number,
      nMeal: number,
      dishId: string
    ) => {
      set(
        produce((state: MenuStore) => {
          const menu = state.menus.find((menu) => menu.id === menuId);
          if (!menu) return;
          const day = menu.days[nDay];
          if (!day) return;
          const meal = day.meals[nMeal];
          if (!meal) return;
          meal.dishes.push(dishId);
        })
      );
    },
  };
}

export type MenuUpdater = ReturnType<typeof getMenuUpdater>;
