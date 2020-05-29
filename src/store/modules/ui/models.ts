import {
  VuexActionPayloads,
  VuexActions,
  VuexMutationPayloads
} from '@/models/Vuex'
import { CategoryId } from '@/models/CategoryId'
import { CategoryState } from '@/models/CategoryState'
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE,
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE,
  TOGGLE_NAME_SHOWS,
  TOGGLE_REACTED,
  UPDATE_ICON_SIZE,
  UPDATE_SEARCH_QUERY
} from './mutation-types'

export interface UiState {
  category: CategoryState
  dark: boolean
  globalLadingQueue: number
  iconSize: string
  name: boolean
  reacted: boolean
  searchQuery: string
}

export interface UiViewModel extends UiState {
  hasGlobalLoadingQueue: UiGetters['hasGlobalLoadingQueue']
}

export interface UiGetters {
  hasGlobalLoadingQueue: boolean
  viewModel: UiViewModel
}

export type UiMutationPayloads = VuexMutationPayloads<{
  [DECREMENT_GLOBAL_LOADING_QUEUE]: number | undefined
  [INCREMENT_GLOBAL_LOADING_QUEUE]: number | undefined
  [TOGGLE_CATEGORY]: CategoryId
  [TOGGLE_DARK_MODE]: boolean
  [TOGGLE_NAME_SHOWS]: boolean
  [TOGGLE_REACTED]: boolean
  [UPDATE_ICON_SIZE]: string
  [UPDATE_SEARCH_QUERY]: string
}>

export type UiActionPayloads = VuexActionPayloads<{
  decrementGlobalLoadingQueue: number | undefined
  incrementGlobalLoadingQueue: number | undefined
  toggleCategory: CategoryId
  toggleDarkMode: boolean
  toggleNameShows: boolean
  toggleReacted: boolean
  updateIconSize: string
  updateSearchQuery: string
}>

export type UiActions = VuexActions<UiActionPayloads>
