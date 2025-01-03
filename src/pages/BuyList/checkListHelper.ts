import { Dish, Ingredient, Menu } from "../../features/menu/types";

type IngredientWithDish = Ingredient & { dish: string; dishId: string };

export interface IngredientsList {
  name: string;
  value: string;
  dishes: {
    id: string;
    name: string;
    countWithUnits: string;
  }[];
}

export function getIngredientsList(
  dishList: Dish[],
  menu: Menu
): IngredientsList[] {
  const dishesMap = dishList.reduce(
    (map, item) => ({ ...map, [item.id]: item }),
    {} as { [id: string]: Dish }
  );
  const ingredientList: IngredientWithDish[] = menu.days.flatMap((m) =>
    m.meals.flatMap((meal) =>
      meal.dishes
        .map((id) => dishesMap[id])
        .filter((i) => i)
        .flatMap((dish) =>
          dish.ingredients.map((i) => ({
            ...i,
            dish: dish.name,
            dishId: dish.id,
          }))
        )
    )
  );
  const ingredientMap = ingredientList.reduce((map, item) => {
    const list = map[item.name] ?? (map[item.name] = []);
    list.push(item);
    return map;
  }, {} as { [name: string]: IngredientWithDish[] });

  const list = Object.entries(ingredientMap).map(([name, ingredients]) => ({
    name,
    value: joinUnits(name, ingredients),
    dishes: getDishes(ingredients),
  }));

  return list;
}

function joinUnits(name: string, ingredients: Ingredient[]): string {
  const units = [...new Set(ingredients.map((i) => i.unit))];
  const sumByUnits = units.map((u) => {
    let count = ingredients
      .filter((i) => i.unit == u)
      .reduce((acc, cur) => acc + +cur.count, 0);
    count = Math.round(count * 100) / 100;
    return `${count} ${u}`;
  });
  const sum = sumByUnits.join(" и ");
  return `${name}: ${sum}`;
}

function getDishes(ingredients: IngredientWithDish[]) {
  const dishes = ingredients.map((i) => ({
    id: i.dishId,
    name: i.dish,
    countWithUnits: `${i.count} ${i.unit}`,
  }));

  const dedupDishes: any[] = [];
  dishes.forEach((d) => {
    const duplDish = dedupDishes.find((dedup) => dedup.id == d.id);
    if (!duplDish) dedupDishes.push({ ...d, count: 1 } as any);
    else duplDish.count++;
  });
  dedupDishes.forEach((d) => {
    d.countWithUnits =
      d.count > 1 ? `${d.countWithUnits} x ${d.count}` : d.countWithUnits;
  });

  return dedupDishes;
}
