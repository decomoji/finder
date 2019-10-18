import { CategoryId } from '@/models/CategoryId'
import { CategoryState } from '@/models/CategoryState'
import { NullableString } from '@/models/NullableString'
import { DefinedActionTree, VuexActionDispatchers } from '@/store/models'
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE,
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE,
  TOGGLE_NAME_SHOWS,
  TOGGLE_REACTED,
  UPDATE_SEARCH_QUERY
} from '@/store/modules/ui/mutation-types'

export interface UiState {
  category: CategoryState
  dark: boolean
  globalLadingQueue: number
  name: boolean
  reacted: boolean
  searchQuery: string
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
  [TOGGLE_CATEGORY]: CategoryId
  [TOGGLE_DARK_MODE]: boolean
  [TOGGLE_NAME_SHOWS]: boolean
  [TOGGLE_REACTED]: boolean
  [UPDATE_SEARCH_QUERY]: string
}

export interface UiActionPayloads {
  decrementGlobalLoadingQueue: UiMutationPayloads[typeof DECREMENT_GLOBAL_LOADING_QUEUE]
  incrementGlobalLoadingQueue: UiMutationPayloads[typeof INCREMENT_GLOBAL_LOADING_QUEUE]
  toggleCategory: UiMutationPayloads[typeof TOGGLE_CATEGORY]
  toggleDarkMode: UiMutationPayloads[typeof TOGGLE_DARK_MODE]
  toggleNameShows: UiMutationPayloads[typeof TOGGLE_NAME_SHOWS]
  updateSearchQuery: UiMutationPayloads[typeof UPDATE_SEARCH_QUERY]
}

export type UiActionTree = DefinedActionTree<UiState, UiActionPayloads>

export type UiActionDispatchers = VuexActionDispatchers<
  UiActionTree,
  UiState,
  UiActionPayloads
>
