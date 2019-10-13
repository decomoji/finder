import { DefinedMutationTree } from '@/store/models'
import { UiMutationPayloads, UiState } from '@/store/modules/ui/models'
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE
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
  }
}
