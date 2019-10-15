import { DefinedMutationTree } from '@/store/models'
import { UiMutationPayloads, UiState } from '@/store/modules/ui/models'
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE,
  UPDATE_SEARCH_QUERY,
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE
} from '@/store/modules/ui/mutation-types'

export const mutations: DefinedMutationTree<UiState, UiMutationPayloads> = {
  /**
   * グローバルのローディングキューを減少させる
   * @param state
   * @param length
   */
  [DECREMENT_GLOBAL_LOADING_QUEUE](state, length = 1) {
    if (length <= 0) {
      return
    }

    state.globalLadingQueue = Math.max(
      0,
      state.globalLadingQueue - Math.ceil(length)
    )
  },

  /**
   * グローバルのローディングキューを増加させる
   * @param state
   * @param length
   */
  [INCREMENT_GLOBAL_LOADING_QUEUE](state, length = 1) {
    if (length <= 0) {
      return
    }

    state.globalLadingQueue = state.globalLadingQueue + Math.ceil(length)
  },

  /**
   * 検索クエリを更新する
   * @param state
   * @param payload
   */
  [UPDATE_SEARCH_QUERY](state, payload) {
    state.searchQuery = payload
  },

  /**
   * カテゴリーをトグルする
   * @param state
   * @param payload
   */
  [TOGGLE_CATEGORY](state, payload) {
    state.category = {
      ...state.category,
      ...{
        [payload]: !state.category[payload]
      }
    }
  },

  /**
   * ダークモードをトグルする
   * @param state
   */
  [TOGGLE_DARK_MODE](state) {
    state.dark = !state.dark
  }
}
