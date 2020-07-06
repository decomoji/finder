import { CategoryName } from "@/models/CategoryName";
import { RootState } from "@/store/models";
import {
  DecomojiActionPayloads as ThisActionPayloads,
  DecomojiState as ThisState,
} from "./models";
import {
  ADD_TO_COLLECTION,
  CLEAR_COLLECTION,
  RECEIVE_COLLECTION,
  REMOVE_FROM_COLLECTION,
  REPLACE_URL_PARAMS,
  UPDATE_CATEGORY,
  UPDATE_DARK,
  UPDATE_REACTED,
  UPDATE_SEARCH,
  UPDATE_SIZE,
  UPDATE_VERTICAL,
} from "./mutation-types";
import { isStringOfNotEmpty } from "@/utilities/isString";
import { ActionTree } from "vuex";
import { Collection } from "@/models/Collection";

export const actions: ActionTree<ThisState, RootState> = {
  /**
   * 選択した要素を選択済みデコモジリストに加える
   * @param commit
   * @param payload
   */
  add({ commit, getters }, payload: ThisActionPayloads["add"]) {
    commit(ADD_TO_COLLECTION, payload);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * 選択済みデコモジリストを空にする
   * @param commit
   * @param payload
   */
  clear({ commit, getters }) {
    commit(CLEAR_COLLECTION);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * 選択解除した要素を選択済みデコモジリストから削除する
   * @param commit
   * @param payload
   */
  remove({ commit, getters }, payload: ThisActionPayloads["remove"]) {
    commit(REMOVE_FROM_COLLECTION, payload);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * 選択済みデコモジリストを受領する
   * @param commit
   * @param payload
   */
  receive({ commit, getters }, payload: ThisActionPayloads["receive"]) {
    type IdentifiedArray = [CategoryName, string];
    // パラメータをパースしてコレクションに追加する
    const parsedParams = payload || {};

    const collection = (Object.entries(parsedParams) as IdentifiedArray[])
      .map<Collection>((parsedParam: IdentifiedArray) => {
        const [category, rest] = parsedParam;
        const decomojis: string[] = rest ? rest.split(",") : [];
        return decomojis.map((name) => ({ name, category }));
      })
      .flat();

    commit(RECEIVE_COLLECTION, collection);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * カテゴリーをトグルする
   * @param commit
   * @param payload
   */
  toggleCategory(
    { commit, getters },
    payload: ThisActionPayloads["toggleCategory"]
  ) {
    commit(TOGGLE_CATEGORY, payload);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  },

  },

  },

  /**
   * 表示カテゴリーを更新する
   * @param commit
   * @param payload
   */
  updateCategory(
    { commit, getters },
    payload: ThisActionPayloads["updateCategory"]
  ) {
    commit(UPDATE_CATEGORY, payload);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * ダークモードを更新する
   * @param commit
   * @param payload
   */
  updateDark({ commit, getters }, payload: ThisActionPayloads["updateDark"]) {
    commit(UPDATE_DARK, payload);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * リアクション済み表示をトグルする
   * @param commit
   */
  updateReacted(
    { commit, getters },
    payload: ThisActionPayloads["updateReacted"]
  ) {
    commit(UPDATE_REACTED, payload);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * 検索クエリを更新する
   * @param commit
   * @param payload
   */
  updateSearch(
    { commit, getters },
    payload: ThisActionPayloads["updateSearch"]
  ) {
    commit(UPDATE_SEARCH, isStringOfNotEmpty(payload) ? payload : "");
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * アイコンサイズを更新する
   * @param commit
   * @param payload
   */
  updateSize({ commit, getters }, payload: ThisActionPayloads["updateSize"]) {
    commit(UPDATE_SIZE, payload);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * 垂直分割表示をトグルする
   * @param commit
   */
  updateVertical(
    { commit, getters },
    payload: ThisActionPayloads["updateVertical"]
  ) {
    commit(UPDATE_VERTICAL, payload);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },
};
