import { AvailableVersions } from "@/configs/AvailableVersions";
import { DefaultCategory } from "@/configs/DefaultCategory";
import { DefaultSize } from "@/configs/DefaultSize";
import { Collection } from "@/models/Collection";
import { CollectionEntry } from "@/models/CollectionEntry";
import { RootState } from "@/store/models";
import { isStringOfNotEmpty } from "@/utilities/isString";
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
  UPDATE_CREATED,
  UPDATE_DARK,
  UPDATE_REACTED,
  UPDATE_SEARCH,
  UPDATE_SIZE,
  UPDATE_UPDATED,
  UPDATE_VERSION,
  UPDATE_VERTICAL,
} from "./mutation-types";
import { ActionTree } from "vuex";

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
   * URLパラメータを受領する
   * @param commit
   * @param payload
   */
  receive({ commit, getters }, payload: ThisActionPayloads["receive"]) {
    const {
      basic,
      created,
      extra,
      explicit,
      category,
      dark,
      reacted,
      search,
      size,
      updated,
      version,
      vertical,
    } = payload || {};

    // コレクションを受領する
    const collection = (Object.entries({
      basic,
      extra,
      explicit,
    }) as CollectionEntry[])
      .map<Collection>((collectionEntry: CollectionEntry) => {
        const [category, rest] = collectionEntry;
        const decomojis: string[] = rest ? rest.split(",") : [];
        return decomojis.map((name) => ({ name, category }));
      })
      .flat();
    commit(RECEIVE_COLLECTION, collection);

    // 表示カテゴリーを受領する
    const displayCategories = category ? category.split(",") : [];
    // 表示カテゴリーのパラメータがない時はデフォルトとして basic を表示する
    if (displayCategories.length === 0) {
      commit(UPDATE_CATEGORY, { name: DefaultCategory, value: true });
    }
    // 表示カテゴリーのパラメータがある時はそれに従う
    else {
      displayCategories.forEach((name) => {
        commit(UPDATE_CATEGORY, { name, value: true });
      });
    }

    // ダークモードを受領する
    commit(UPDATE_DARK, !!dark);

    // リアクション済み表示を受領する
    commit(UPDATE_REACTED, !!reacted);

    // 検索クエリを受領する
    commit(
      UPDATE_SEARCH,
      isStringOfNotEmpty(search) ? decodeURIComponent(search) : ""
    );

    // 表示サイズを受領する
    commit(UPDATE_SIZE, size || DefaultSize);

    // 表示バージョンを受領する
    const displayVersions = version ? version.split(",") : AvailableVersions;
    displayVersions.forEach((name) => {
      commit(UPDATE_VERSION, { name, value: true });
    });

    // 作成バージョン表示を受領する
    commit(UPDATE_CREATED, !!created);

    // 修正バージョン表示を受領する
    commit(UPDATE_UPDATED, !!updated);

    // リアクション済み表示を受領する
    commit(UPDATE_VERTICAL, !!vertical);

    // URLパラメータを更新する
    commit(REPLACE_URL_PARAMS, getters.urlParams);
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
   * コレクションを更新する
   * @param param
   * @param payload
   */
  updateCollection(
    { commit, getters },
    payload: ThisActionPayloads["updateCollection"]
  ) {
    commit(RECEIVE_COLLECTION, payload);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * 作成バージョン表示を更新する
   * @param commit
   * @param payload
   */
  updateCreated(
    { commit, getters },
    payload: ThisActionPayloads["updateCreated"]
  ) {
    commit(UPDATE_CREATED, payload);
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
   * リアクション済み表示を更新する
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
   * 修正バージョン表示を更新する
   * @param commit
   * @param payload
   */
  updateUpdated(
    { commit, getters },
    payload: ThisActionPayloads["updateUpdated"]
  ) {
    commit(UPDATE_UPDATED, payload);
    commit(REPLACE_URL_PARAMS, getters.urlParams);
  },

  /**
   * 表示バージョンを更新する
   * @param commit
   * @param payload
   */
  updateVersion(
    { commit, getters },
    payload: ThisActionPayloads["updateVersion"]
  ) {
    commit(UPDATE_VERSION, payload);
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
