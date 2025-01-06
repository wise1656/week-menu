import { produce } from "immer";
import { create } from "zustand";
import { GetState, SetState } from "../../shared/types";
import { persist } from "zustand/middleware";

interface BuyList {
  list: Record<string, Record<string, boolean>>;
}

const state = (set: SetState<BuyList>, get: GetState<BuyList>) => ({
  list: {},

  isItemChecked(menuId: string, name: string) {
    return !!get().list[menuId]?.[name];
  },

  checkItem(menuId: string, ingredientName: string) {
    return set(
      produce((state: BuyList) => {
        state.list[menuId] = state.list[menuId] ?? {};
        state.list[menuId][ingredientName] =
          !state.list[menuId][ingredientName];
      })
    );
  },

  clearChecks(menuId: string) {
    return set(
      produce((state: BuyList) => {
        state.list[menuId] = {};
      })
    );
  },
});

export const useBuyList = create<ReturnType<typeof state>>()(
  persist(state, { name: "buy-list" })
);
