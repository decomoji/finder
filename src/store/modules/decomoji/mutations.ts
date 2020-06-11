import {
  DecomojiMutationPayloads as ThisMutationPayloads,
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
import { MutationTree } from "vuex";

export const mutations: MutationTree<ThisState> = {
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
  }
};
