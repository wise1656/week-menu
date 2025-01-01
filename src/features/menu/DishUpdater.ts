import { produce } from "immer";
import { Dish, Ingredient, MenuStore } from "./types";
import { GetState, SetState } from "../../shared/types";

export const getDishUpdater = (
  get: GetState<MenuStore>,
  set: SetState<MenuStore>
) => ({
  getDishesList: (filter?: string): Dish[] => {
    if (!filter) return get().dishes;
    return get().dishes.filter((d) =>
      d.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  },

  renameDish: (id: string, name: string) => {
    set(
      produce((state: MenuStore) => {
        const dish = state.dishes.find((d) => d.id == id);
        if (dish) dish.name = name;
      })
    );
  },

  setIngredient: (dishId: string, nIngr: number, ingredient: Ingredient) => {
    set(
      produce((state: MenuStore) => {
        const dish = state.dishes.find((d) => d.id == dishId);
        if (!dish) return;
        dish.ingredients[nIngr] = ingredient;
      })
    );
  },
});

export type DishUpdater = ReturnType<typeof getDishUpdater>;
