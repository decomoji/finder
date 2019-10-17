import { UiActionTree } from '@/store/modules/ui/models'
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE,
  UPDATE_SEARCH_QUERY,
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE,
  TOGGLE_NAME_SHOWS
} from '@/store/modules/ui/mutation-types'

export const actions: UiActionTree = {
  /**
   * グローバルのローディングキューを減少させる
   * @param commit
   * @param length
   */
  decrementGlobalLoadingQueue({ commit }, length?) {
    commit(DECREMENT_GLOBAL_LOADING_QUEUE, length)
  },

  /**
   * グローバルのローディングキューを増加させる
   * @param commit
   * @param length
   */
  incrementGlobalLoadingQueue({ commit }, length?) {
    commit(INCREMENT_GLOBAL_LOADING_QUEUE, length)
  },

  /**
   * 検索クエリを更新する
   * @param commit
   * @param payload
   */
  updateSearchQuery({ commit }, payload) {
    commit(UPDATE_SEARCH_QUERY, payload)
  },

  /**
   * カテゴリーをトグルする
   * @param commit
   * @param payload
   */
  toggleCategory({ commit }, payload) {
    commit(TOGGLE_CATEGORY, payload)
  },

  /**
   * ダークモードをトグルする
   * @param commit
   */
  toggleDarkMode({ commit }) {
    commit(TOGGLE_DARK_MODE)
  },

  /**
   * デコモジ名の表示をトグルする
   * @param commit
   */
  toggleNameShows({ commit }) {
    commit(TOGGLE_NAME_SHOWS)
  }
}
