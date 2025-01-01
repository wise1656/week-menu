import { create } from "zustand";
import { MenuStore } from "./types";
import { MenuUpdater, getMenuUpdater } from "./MenuUpdater";
import { DishUpdater, getDishUpdater } from "./DishUpdater";
import { defaultMenuValue } from "./consts";

export const useMenuStore = create<MenuStore & MenuUpdater & DishUpdater>(
  (set, get) => ({
    ...defaultMenuValue,
    ...getMenuUpdater(get, set),
    ...getDishUpdater(get, set),
  })
);
