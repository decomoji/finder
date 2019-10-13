import { UiActionTree } from '@/store/modules/ui/models'
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE
} from '@/store/modules/ui/mutation-types'

let screenLockTimer!: number

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
  }
}
