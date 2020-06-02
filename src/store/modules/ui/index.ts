import { RootState } from "@/store/models";
import { actions } from "./actions";
import { getters } from "./getters";
import { UiState as ThisState } from "./models";
import { mutations } from "./mutations";
import { Module } from "vuex";

/**
 * 初期ステート
 */
export const state: () => ThisState = () => ({
  category: {
    basic: true,
    explicit: false,
    extra: false,
    preview: false
  },
  dark: false,
  globalLadingQueue: 0,
  name: true,
  reacted: false,
  search: "",
  size: "l"
});

export const storeModule: Module<ThisState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
