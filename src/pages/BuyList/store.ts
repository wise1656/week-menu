import { produce } from "immer";
import { create } from "zustand";
import { GetState, SetState } from "../../shared/types";
import { persist } from "zustand/middleware";

interface BuyList {
  list: Record<string, Record<string, boolean>>;
  listCustom: Record<string, { name: string; checked: boolean }[]>;
}

const state = (set: SetState<BuyList>, get: GetState<BuyList>) => ({
  list: {},
  listCustom: {},

  isItemChecked(menuId: string, name: string) {
    return !!get().list[menuId]?.[name];
  },

  getCustomList(menuId: string) {
    return get().listCustom[menuId] ?? [];
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

  addCustom(menuId: string, value: string) {
    return set(
      produce((state: BuyList) => {
        if (!state.listCustom[menuId]) state.listCustom[menuId] = [];
        state.listCustom[menuId].push({ name: value, checked: false });
      })
    );
  },

  editCustom(menuId: string, index: number, value: string) {
    return set(
      produce((state: BuyList) => {
        state.listCustom[menuId] = state.listCustom[menuId] ?? {};
        state.listCustom[menuId][index].name = value;
        state.listCustom[menuId] = state.listCustom[menuId].filter(
          (i) => i.name
        );
      })
    );
  },

  checkCustomItem(menuId: string, index: number) {
    return set(
      produce((state: BuyList) => {
        state.listCustom[menuId] = state.listCustom[menuId] ?? {};
        state.listCustom[menuId][index].checked =
          !state.listCustom[menuId][index].checked;
      })
    );
  },

  clearChecks(menuId: string) {
    return set(
      produce((state: BuyList) => {
        state.list[menuId] = {};
        state.listCustom[menuId] = [];
      })
    );
  },
});

export const useBuyList = create<ReturnType<typeof state>>()(
  persist(state, { name: "buy-list" })
);
