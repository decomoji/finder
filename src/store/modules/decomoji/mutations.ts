import {
  DecomojiMutationPayloads as ThisMutationPayloads,
  DecomojiState as ThisState,
} from "./models";
import {
  ADD_TO_COLLECTION,
  CLEAR_COLLECTION,
  REMOVE_FROM_COLLECTION,
  RECEIVE_COLLECTION,
  REPLACE_URL_PARAMS,
  UPDATE_CATEGORY,
  UPDATE_CREATED,
  UPDATE_DARK,
  UPDATE_REACTED,
  UPDATE_SEARCH,
  UPDATE_SIZE,
  UPDATE_UPDATED,
  UPDATE_VERSION,
  UPDATE_VERTICAL,
} from "./mutation-types";
import { clearArray, replaceArray } from "@/utilities/array";
import { MutationTree } from "vuex";
import { replaceState } from "@/utilities/replaceState";

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
   * コレクションを消去する
   * @param state
   */
  [CLEAR_COLLECTION](state) {
    clearArray(state.collection);
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
   * URLパラメータを replaceState する
   * @param _
   * @param payload
   */
  [REPLACE_URL_PARAMS](
    _,
    payload: ThisMutationPayloads[typeof REPLACE_URL_PARAMS]
  ) {
    replaceState(payload);
  },

  /**
   * 表示カテゴリーを更新する
   * @param state
   * @param payload
   */
  [UPDATE_CATEGORY](
    state,
    payload: ThisMutationPayloads[typeof UPDATE_CATEGORY]
  ) {
    const { name, value } = payload;
    state.category[name] = value;
  },

  /**
   * 作成バージョン表示を更新する
   * @param state
   * @param payload
   */
  [UPDATE_CREATED](
    state,
    payload: ThisMutationPayloads[typeof UPDATE_CREATED]
  ) {
    state.created = payload;
  },

  /**
   * ダークモード表示を更新する
   * @param state
   * @param payload
   */
  [UPDATE_DARK](state, payload: ThisMutationPayloads[typeof UPDATE_DARK]) {
    state.dark = payload;
  },

  /**
   * リアクション済み表示を更新する
   * @param state
   * @param payload
   */
  [UPDATE_REACTED](
    state,
    payload: ThisMutationPayloads[typeof UPDATE_REACTED]
  ) {
    state.reacted = payload;
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

  /**
   * 修正バージョン表示を更新する
   * @param state
   * @param payload
   */
  [UPDATE_UPDATED](
    state,
    payload: ThisMutationPayloads[typeof UPDATE_UPDATED]
  ) {
    state.updated = payload;
  },

  /**
   * 表示バージョンを更新する
   * @param state
   * @param payload
   */
  [UPDATE_VERSION](
    state,
    payload: ThisMutationPayloads[typeof UPDATE_VERSION]
  ) {
    const { name, value } = payload;
    state.version[name] = value;
  },

  /**
   * 垂直分割表示を更新する
   * @param state
   * @param payload
   */
  [UPDATE_VERTICAL](
    state,
    payload: ThisMutationPayloads[typeof UPDATE_VERTICAL]
  ) {
    state.vertical = payload;
  },
};
