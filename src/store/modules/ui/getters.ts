import { DefinedGetterTree } from '@/store/models'
import { state as defaultState } from '@/store/modules/ui/index'
import { UiGetterReturns, UiState } from '@/store/modules/ui/models'
import { pickState } from '@/store/utilities'

export const getters: DefinedGetterTree<UiState, UiGetterReturns> = {
  /**
   * グローバルのローディングキューがあるか否かを返す
   * @param globalLadingQueue
   */
  hasGlobalLoadingQueue: ({ globalLadingQueue }) => globalLadingQueue > 0,

  /**
   * ViewModel
   * @param state
   * @param hasGlobalLoadingQueue
   */
  viewModel: (state, { hasGlobalLoadingQueue }) => ({
    ...pickState(defaultState, state),
    hasGlobalLoadingQueue
  })
}
