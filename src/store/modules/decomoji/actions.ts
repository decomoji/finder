import { CategoryName } from "@/models/CategoryName";
import { RootState } from "@/store/models";
import {
  DecomojiActionPayloads as ThisActionPayloads,
  DecomojiState as ThisState
} from "./models";
import {
  ADD_TO_COLLECTION,
  CLEAR_COLLECTION,
  REMOVE_FROM_COLLECTION,
  RECEIVE_COLLECTION,
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
   * 選択した要素を選択済みデコモジリストに加える
   * @param commit
   * @param payload
   */
  add({ commit }, payload: ThisActionPayloads["add"]) {
    commit(ADD_TO_COLLECTION, payload);
  },

  /**
   * 選択済みデコモジリストを空にする
   * @param commit
   * @param payload
   */
  clear({ commit }) {
    commit(CLEAR_COLLECTION);
  },

  /**
   * 選択解除した要素を選択済みデコモジリストから削除する
   * @param commit
   * @param payload
   */
  remove({ commit }, payload: ThisActionPayloads["remove"]) {
    commit(REMOVE_FROM_COLLECTION, payload);
  },

  /**
   * 選択済みデコモジリストを受領する
   * @param commit
   * @param payload
   */
  receive({ commit }, payload: ThisActionPayloads["receive"]) {
    // パラメータをパースしてコレクションに追加する
    const { basic, extra, explicit, preview } = payload || {};
    const _basic = isStringOfNotEmpty(basic)
      ? basic
          .split(",")
          .map((name: string) => ({ name, category: "basic" as CategoryName }))
      : [];
    const _extra = isStringOfNotEmpty(extra)
      ? extra
          .split(",")
          .map((name: string) => ({ name, category: "extra" as CategoryName }))
      : [];
    const _explicit = isStringOfNotEmpty(explicit)
      ? explicit.split(",").map((name: string) => ({
          name,
          category: "explicit" as CategoryName
        }))
      : [];
    const _preview = isStringOfNotEmpty(preview)
      ? preview.split(",").map((name: string) => ({
          name,
          category: "preview" as CategoryName
        }))
      : [];

    commit(RECEIVE_COLLECTION, [
      ..._basic,
      ..._extra,
      ..._explicit,
      ..._preview
    ]);
  },

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
