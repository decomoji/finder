import { UiActionTree } from '@/store/modules/ui/models'
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE,
  TOGGLE_DARK_MODE
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
   * ダークモードをトグルする
   * @param commit
   */
  toggleDarkMode({ commit }) {
    commit(TOGGLE_DARK_MODE)
  }
}
