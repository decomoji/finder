import { RootState } from "@/store/models";
import {
  DecomojiActionPayloads as ThisActionPayloads,
  DecomojiState as ThisState
} from "./models";
import {
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE,
  TOGGLE_NAME_SHOWS,
  TOGGLE_REACTED,
  UPDATE_SEARCH,
  UPDATE_SIZE
} from "./mutation-types";
import { isStringOfNotEmpty } from "@/utilities/isString";
import { ActionTree } from "vuex";

export const actions: ActionTree<ThisState, RootState> = {
  /**
   * カテゴリーをトグルする
   * @param commit
   * @param payload
   */
  toggleCategory({ commit }, payload: ThisActionPayloads["toggleCategory"]) {
    commit(TOGGLE_CATEGORY, payload);
  },

  /**
   * ダークモードをトグルする
   * @param commit
   */
  toggleDarkMode({ commit }) {
    commit(TOGGLE_DARK_MODE);
  },

  /**
   * デコモジ名の表示をトグルする
   * @param commit
   */
  toggleNameShows({ commit }) {
    commit(TOGGLE_NAME_SHOWS);
  },

  /**
   * リアクション済みをトグルする
   * @param commit
   */
  toggleReacted({ commit }) {
    commit(TOGGLE_REACTED);
  },

  /**
   * 検索クエリを更新する
   * @param commit
   * @param payload
   */
  updateSearch({ commit }, payload: ThisActionPayloads["updateSearch"]) {
    commit(UPDATE_SEARCH, isStringOfNotEmpty(payload) ? payload : "");
  },

  /**
   * アイコンサイズを更新する
   * @param commit
   * @param payload
   */
  updateSize({ commit }, payload: ThisActionPayloads["updateSize"]) {
    commit(UPDATE_SIZE, payload);
  }
};
