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

  getIngredients: () => {
    return [
      ...new Set(get().dishes.flatMap((d) => d.ingredients.map((i) => i.name))),
    ].filter((i) => i);
  },

  getIngredientUnits: (name: string) => {
    const ingredients = get().dishes.flatMap((d) => d.ingredients);
    const curIngredientsUnits = ingredients
      .filter((i) => i.name == name)
      .map((i) => i.unit);
    const allUnits = ingredients.map((i) => i.unit);
    return [...new Set([...curIngredientsUnits, ...allUnits])].filter((i) => i);
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
