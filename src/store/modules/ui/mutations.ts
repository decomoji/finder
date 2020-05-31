import {
  UiMutationPayloads as ThisMutationPayloads,
  UiState as ThisState
} from "./models";
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE,
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE,
  TOGGLE_NAME_SHOWS,
  TOGGLE_REACTED,
  UPDATE_SEARCH_QUERY,
  UPDATE_SIZE
} from "./mutation-types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<ThisState> = {
  /**
   * グローバルのローディングキューを減少させる
   * @param state
   * @param length
   */
  [DECREMENT_GLOBAL_LOADING_QUEUE](
    state,
    length: ThisMutationPayloads[typeof DECREMENT_GLOBAL_LOADING_QUEUE] = 1
  ) {
    if (length <= 0) {
      return;
    }

    state.globalLadingQueue = Math.max(
      0,
      state.globalLadingQueue - Math.ceil(length)
    );
  },

  /**
   * グローバルのローディングキューを増加させる
   * @param state
   * @param length
   */
  [INCREMENT_GLOBAL_LOADING_QUEUE](
    state,
    length: ThisMutationPayloads[typeof INCREMENT_GLOBAL_LOADING_QUEUE] = 1
  ) {
    if (length <= 0) {
      return;
    }

    state.globalLadingQueue = state.globalLadingQueue + Math.ceil(length);
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
        [payload]: !state.category[payload]
      }
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
  [UPDATE_SEARCH_QUERY](
    state,
    payload: ThisMutationPayloads[typeof UPDATE_SEARCH_QUERY]
  ) {
    state.searchQuery = payload;
  },

  /**
   * アイコンサイズを更新する
   * @param state
   * @param payload
   */
  [UPDATE_SIZE](state, payload: ThisMutationPayloads[typeof UPDATE_SIZE]) {
    state.size = payload;
  }
};
