import {
  VuexActionPayloads,
  VuexActions,
  VuexMutationPayloads
} from "@/models/Vuex";
import { CategoryId } from "@/models/CategoryId";
import { CategoryState } from "@/models/CategoryState";
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE,
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE,
  TOGGLE_NAME_SHOWS,
  TOGGLE_REACTED,
  UPDATE_SEARCH_QUERY,
  UPDATE_SIZE
} from "./mutation-types";

export interface UiState {
  category: CategoryState;
  dark: boolean;
  globalLadingQueue: number;
  name: boolean;
  reacted: boolean;
  searchQuery: string;
  size: string;
}

export interface UiViewModel extends UiState {
  hasGlobalLoadingQueue: UiGetters["hasGlobalLoadingQueue"];
}

export interface UiGetters {
  hasGlobalLoadingQueue: boolean;
  viewModel: UiViewModel;
}

export type UiMutationPayloads = VuexMutationPayloads<{
  [DECREMENT_GLOBAL_LOADING_QUEUE]: number | undefined;
  [INCREMENT_GLOBAL_LOADING_QUEUE]: number | undefined;
  [TOGGLE_CATEGORY]: CategoryId;
  [TOGGLE_DARK_MODE]: boolean;
  [TOGGLE_NAME_SHOWS]: boolean;
  [TOGGLE_REACTED]: boolean;
  [UPDATE_SEARCH_QUERY]: string;
  [UPDATE_SIZE]: string;
}>;

export type UiActionPayloads = VuexActionPayloads<{
  decrementGlobalLoadingQueue: number | undefined;
  incrementGlobalLoadingQueue: number | undefined;
  toggleCategory: CategoryId;
  toggleDarkMode: boolean;
  toggleNameShows: boolean;
  toggleReacted: boolean;
  updateSearchQuery: string;
  updateSize: string;
}>;

export type UiActions = VuexActions<UiActionPayloads>;
