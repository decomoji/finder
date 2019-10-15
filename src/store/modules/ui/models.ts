import { DefinedActionTree, VuexActionDispatchers } from '@/store/models'
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE,
  TOGGLE_DARK_MODE
} from '@/store/modules/ui/mutation-types'

export interface UiState {
  dark: boolean
  globalLadingQueue: number
}

export interface UiViewModel extends UiState {
  hasGlobalLoadingQueue: UiGetterReturns['hasGlobalLoadingQueue']
}

export interface UiGetterReturns {
  hasGlobalLoadingQueue: boolean
  viewModel: UiViewModel
}

export interface UiMutationPayloads {
  [DECREMENT_GLOBAL_LOADING_QUEUE]: number | undefined
  [INCREMENT_GLOBAL_LOADING_QUEUE]: number | undefined
  [TOGGLE_DARK_MODE]: boolean
}

export interface UiActionPayloads {
  decrementGlobalLoadingQueue: UiMutationPayloads[typeof DECREMENT_GLOBAL_LOADING_QUEUE]
  incrementGlobalLoadingQueue: UiMutationPayloads[typeof INCREMENT_GLOBAL_LOADING_QUEUE]
  toggleDarkMode: UiMutationPayloads[typeof TOGGLE_DARK_MODE]
}

export type UiActionTree = DefinedActionTree<UiState, UiActionPayloads>

export type UiActionDispatchers = VuexActionDispatchers<
  UiActionTree,
  UiState,
  UiActionPayloads
>
