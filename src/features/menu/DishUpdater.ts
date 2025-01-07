import { produce } from "immer";
import { Dish, DishGroup, Ingredient, MenuStore } from "./types";
import { GetState, SetState } from "../../shared/types";
import { generateNewId } from "../../shared/helpers/generateId";

export const getDishUpdater = (
  get: GetState<MenuStore>,
  set: SetState<MenuStore>
) => ({
  getDishesGroups: (filter?: string): DishGroup[] => {
    const dishes = filter
      ? get().dishes.filter((d) =>
          d.name.toLowerCase().includes(filter.toLocaleLowerCase())
        )
      : get().dishes;
    const groups = [...new Set(dishes.map((d) => d.groupName))];
    const getGroupName = (g: string) => (g == "" ? "без категории" : g);

    return groups
      .map((g) => ({
        groupName: getGroupName(g),
        dishes: dishes.filter((d) => d.groupName == g).sort(compare),
      }))
      .filter((g) => g.dishes.length);
  },

  getDishesList: (filter?: string): Dish[] => {
    if (!filter) return get().dishes;
    return get().dishes.filter((d) =>
      d.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  },

  getDishGroupsNames: () => {
    const dishes = get().dishes;
    return [...new Set(dishes.map((d) => d.groupName))].filter((g) => g);
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

  addDish: (groupName: string, name?: string) => {
    let newId: string | undefined;
    set(
      produce((state: MenuStore) => {
        newId = generateNewId(state.dishes);
        state.dishes.push({
          id: newId,
          name: name ?? "",
          groupName: groupName,
          ingredients: [],
        });
      })
    );
    return newId;
  },

  deleteDish: (id: string) => {
    set(
      produce((state: MenuStore) => {
        state.dishes = state.dishes.filter((d) => d.id != id);
      })
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

  changeGroup: (id: string, groupName: string) => {
    set(
      produce((state: MenuStore) => {
        const dish = state.dishes.find((d) => d.id == id);
        if (dish) dish.groupName = groupName;
      })
    );
  },

  setIngredient: (dishId: string, nIngr: number, ingredient: Ingredient) => {
    set(
      produce((state: MenuStore) => {
        const dish = state.dishes.find((d) => d.id == dishId);
        if (!dish) return;
        dish.ingredients[nIngr] = ingredient;
        dish.ingredients = dish.ingredients.filter((i) => i.name);
      })
    );
  },

  importDishes: async () => {
    const resp = await fetch(
      "https://functions.yandexcloud.net/d4ebrnlthjs0ghcce0j5"
    );
    const data = await resp.json();
    set({ dishes: data });
  },

  exportDishes: async () => {
    fetch("https://functions.yandexcloud.net/d4ebrnlthjs0ghcce0j5", {
      body: JSON.stringify(get().dishes),
      headers: {
        "Content-Type": "text/plain",
      },
      method: "POST",
      mode: "cors",
    });
  },
});

export type DishUpdater = ReturnType<typeof getDishUpdater>;

function compare(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name);
}
