import {
  DecomojiMutationPayloads as ThisMutationPayloads,
  DecomojiState as ThisState,
} from "./models";
import {
  ADD_TO_COLLECTION,
  REMOVE_FROM_COLLECTION,
  CLEAR_COLLECTION,
  RECEIVE_COLLECTION,
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE,
  TOGGLE_NAME_SHOWS,
  TOGGLE_REACTED,
  UPDATE_SEARCH,
  UPDATE_SIZE,
} from "./mutation-types";
import { clearArray, replaceArray } from "@/utilities/array";
import { MutationTree } from "vuex";

export const mutations: MutationTree<ThisState> = {
  /**
   * 選択したデコモジをコレクションに追加する
   * @param state
   */
  [ADD_TO_COLLECTION](
    state,
    payload: ThisMutationPayloads[typeof ADD_TO_COLLECTION]
  ) {
    state.collection.splice(state.collection.length, 0, payload);
  },

  /**
   * 選択したデコモジをコレクションから削除する
   * @param state
   * @param payload
   */
  [REMOVE_FROM_COLLECTION](
    state,
    payload: ThisMutationPayloads[typeof REMOVE_FROM_COLLECTION]
  ) {
    const index = state.collection.findIndex(
      (item) => item.name === payload.name && item.category === payload.category
    );
    state.collection.splice(index, 1);
  },

  /**
   * コレクションを消去する
   * @param state
   */
  [CLEAR_COLLECTION](state) {
    clearArray(state.collection);
  },

  /**
   * コレクションを受領する
   * @param state
   * @param payload
   */
  [RECEIVE_COLLECTION](
    state,
    payload: ThisMutationPayloads[typeof RECEIVE_COLLECTION]
  ) {
    replaceArray(state.collection, ...payload);
  },

  /**
   * カテゴリーをトグルする
   * @param state
   * @param payload
   */
  [TOGGLE_CATEGORY](
    state,
    payload: ThisMutationPayloads[typeof TOGGLE_CATEGORY]
  ) {
    state.category = {
      ...state.category,
      ...{
        [payload]: !state.category[payload],
      },
    };
  },

  /**
   * ダークモードをトグルする
   * @param state
   */
  [TOGGLE_DARK_MODE](state) {
    state.dark = !state.dark;
  },

  /**
   * デコモジ名の表示をトグルする
   * @param state
   */
  [TOGGLE_NAME_SHOWS](state) {
    state.name = !state.name;
  },

  /**
   * リアクション済みをトグルする
   * @param state
   */
  [TOGGLE_REACTED](state) {
    state.reacted = !state.reacted;
  },

  /**
   * 検索クエリを更新する
   * @param state
   * @param payload
   */
  [UPDATE_SEARCH](state, payload: ThisMutationPayloads[typeof UPDATE_SEARCH]) {
    state.search = payload;
  },

  /**
   * アイコンサイズを更新する
   * @param state
   * @param payload
   */
  [UPDATE_SIZE](state, payload: ThisMutationPayloads[typeof UPDATE_SIZE]) {
    state.size = payload;
  },
};
