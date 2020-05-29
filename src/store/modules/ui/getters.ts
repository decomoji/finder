import { RootState } from '@/store/models'
import { UiGetters as ThisGetter, UiState as ThisState } from './models'
import { GetterTree } from 'vuex'

export const getters: GetterTree<ThisState, RootState> = {
  /**
   * グローバルのローディングキューがあるか否かを返す
   * @param globalLadingQueue
   */
  hasGlobalLoadingQueue: ({ globalLadingQueue }) => globalLadingQueue > 0,

  /**
   * ViewModel を返す
   * @param state
   * @param hasGlobalLoadingQueue
   */
  viewModel: (
    state,
    { hasGlobalLoadingQueue }: ThisGetter
  ): ThisGetter['viewModel'] => ({
    ...state,
    hasGlobalLoadingQueue
  })
}
