import {
  CollectionMutationPayloads as ThisMutationPayloads,
  CollectionState as ThisState
} from "./models";
import {
  ADD_TO_COLLECTION,
  REMOVE_FROM_COLLECTION,
  CLEAR_COLLECTION,
  RECEIVE_COLLECTION,
  UPDATE_HEIGHT
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
    state.items.splice(state.items.length, 0, payload);
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
    const index = state.items.findIndex(
      item => item.name === payload.name && item.category === payload.category
    );
    state.items.splice(index, 1);
  },

  /**
   * コレクションを消去する
   * @param state
   */
  [CLEAR_COLLECTION](state) {
    clearArray(state.items);
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
    replaceArray(state.items, ...payload);
  },

  /**
   * コレクションを受領する
   * @param state
   * @param payload
   */
  [UPDATE_HEIGHT](state, payload: ThisMutationPayloads[typeof UPDATE_HEIGHT]) {
    state.height = payload;
  }
};
