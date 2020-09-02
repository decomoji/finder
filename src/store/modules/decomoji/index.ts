import { AvailableVersions } from "@/configs/AvailableVersions";
import { RootState } from "@/store/models";
import { actions } from "./actions";
import { getters } from "./getters";
import { DecomojiState as ThisState } from "./models";
import { mutations } from "./mutations";
import { Module } from "vuex";

/**
 * 初期ステート
 * recieve() アクションで size = "ll" と category.basic = true を設定しているよ
 */
export const state: () => ThisState = () => ({
  category: {
    basic: false,
    explicit: false,
    extra: false,
  },
  collection: [],
  dark: false,
  reacted: false,
  search: "",
  size: "",
  version: AvailableVersions.reduce((memo, value: string) => {
    // 全ての value をキーにして false を与えたオブジェクトにまとめる
    return {
      ...memo,
      [value]: false,
    };
  }, {}),
  vertical: false,
});

export const storeModule: Module<ThisState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
