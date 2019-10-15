import { CategoryId } from '@/models/CategoryId'
import { NullableString } from '@/models/NullableString'
import { DefinedActionTree, VuexActionDispatchers } from '@/store/models'
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE,
  UPDATE_SEARCH_QUERY,
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE
} from '@/store/modules/ui/mutation-types'

interface CategoryState {
  basic: boolean
  explicit: boolean
  extra: boolean
}

export interface UiState {
  dark: boolean
  category: CategoryState
  searchQuery: NullableString
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
  [UPDATE_SEARCH_QUERY]: string
  [TOGGLE_CATEGORY]: CategoryId
  [TOGGLE_DARK_MODE]: boolean
}

export interface UiActionPayloads {
  decrementGlobalLoadingQueue: UiMutationPayloads[typeof DECREMENT_GLOBAL_LOADING_QUEUE]
  incrementGlobalLoadingQueue: UiMutationPayloads[typeof INCREMENT_GLOBAL_LOADING_QUEUE]
  updateSearchQuery: UiMutationPayloads[typeof UPDATE_SEARCH_QUERY]
  toggleCategory: UiMutationPayloads[typeof TOGGLE_CATEGORY]
  toggleDarkMode: UiMutationPayloads[typeof TOGGLE_DARK_MODE]
}

export type UiActionTree = DefinedActionTree<UiState, UiActionPayloads>

export type UiActionDispatchers = VuexActionDispatchers<
  UiActionTree,
  UiState,
  UiActionPayloads
>
