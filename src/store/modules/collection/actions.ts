import { CategoryId } from "@/models/CategoryId";
import { RootState } from "@/store/models";
import { isStringOfNotEmpty } from "@/utilities/isString";
import {
  CollectionActionPayloads as ThisActionPayloads,
  CollectionState as ThisState
} from "./models";
import {
  ADD_TO_COLLECTION,
  REMOVE_FROM_COLLECTION,
  CLEAR_COLLECTION,
  RECEIVE_COLLECTION,
  UPDATE_HEIGHT
} from "./mutation-types";
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
   * 選択解除した要素を選択済みデコモジリストから削除する
   * @param commit
   * @param payload
   */
  remove({ commit }, payload: ThisActionPayloads["remove"]) {
    commit(REMOVE_FROM_COLLECTION, payload);
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
          .map((name: string) => ({ name, category: "basic" as CategoryId }))
      : [];
    const _extra = isStringOfNotEmpty(extra)
      ? extra
          .split(",")
          .map((name: string) => ({ name, category: "extra" as CategoryId }))
      : [];
    const _explicit = isStringOfNotEmpty(explicit)
      ? explicit
          .split(",")
          .map((name: string) => ({ name, category: "explicit" as CategoryId }))
      : [];
    const _preview = isStringOfNotEmpty(preview)
      ? preview
          .split(",")
          .map((name: string) => ({ name, category: "preview" as CategoryId }))
      : [];

    commit(RECEIVE_COLLECTION, [
      ..._basic,
      ..._extra,
      ..._explicit,
      ..._preview
    ]);
  },

  /**
   * 選択済みデコモジリストコンテナの高さを更新する
   * @param commit
   * @param payload
   */
  height({ commit }, payload: ThisActionPayloads["height"]) {
    commit(UPDATE_HEIGHT, payload);
  }
};
