import { RootState } from "@/store/models";
import { actions } from "./actions";
import { getters } from "./getters";
import { DecomojiState as ThisState } from "./models";
import { mutations } from "./mutations";
import { Module } from "vuex";

/**
 * 初期ステート
 */
export const state: () => ThisState = () => ({
  category: {
    basic: false,
    explicit: false,
    extra: false,
    preview: false,
  },
  collection: [],
  dark: false,
  reacted: false,
  result: 0,
  search: "",
  size: "ll",
  vertical: false,
});

export const storeModule: Module<ThisState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
