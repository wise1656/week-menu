import { produce } from "immer";
import {
  Dish,
  DishUpdater,
  GetState,
  Ingredient,
  MenuStore,
  SetState,
} from "./types";

export const getDishUpdater = (
  get: GetState<MenuStore>,
  set: SetState<MenuStore>
): DishUpdater => ({
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

  setIngredients: (dishId: string, ingredients: Ingredient[]) => {
    
  },
});
