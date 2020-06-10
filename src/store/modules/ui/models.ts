import {
  VuexActionPayloads,
  VuexActions,
  VuexMutationPayloads
} from "@/models/Vuex";
import { CategoryId } from "@/models/CategoryId";
import { CategoryState } from "@/models/CategoryState";
import {
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE,
  TOGGLE_NAME_SHOWS,
  TOGGLE_REACTED,
  UPDATE_SEARCH,
  UPDATE_SIZE
} from "./mutation-types";

export interface UiState {
  category: CategoryState;
  dark: boolean;
  name: boolean;
  reacted: boolean;
  search: string;
  size: string;
}

export interface UiViewModel extends UiState {
}

export interface UiGetters {
  viewModel: UiViewModel;
}

export type UiMutationPayloads = VuexMutationPayloads<{
  [TOGGLE_CATEGORY]: CategoryId;
  [TOGGLE_DARK_MODE]: boolean;
  [TOGGLE_NAME_SHOWS]: boolean;
  [TOGGLE_REACTED]: boolean;
  [UPDATE_SEARCH]: string;
  [UPDATE_SIZE]: string;
}>;

export type UiActionPayloads = VuexActionPayloads<{
  toggleCategory: CategoryId;
  toggleDarkMode: boolean;
  toggleNameShows: boolean;
  toggleReacted: boolean;
  updateSearch: string;
  updateSize: string;
}>;

export type UiActions = VuexActions<UiActionPayloads>;
