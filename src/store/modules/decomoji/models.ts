import {
  VuexActionPayloads,
  VuexActions,
  VuexMutationPayloads
} from "@/models/Vuex";
import { CategoryName } from "@/models/CategoryName";
import { CategoriesState } from "@/models/CategoriesState";
import { Collection } from "@/models/Collection";
import {
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE,
  TOGGLE_NAME_SHOWS,
  TOGGLE_REACTED,
  UPDATE_SEARCH,
  UPDATE_SIZE
} from "./mutation-types";

export interface DecomojiState {
  category: CategoriesState;
  collection: Collection;
  dark: boolean;
  name: boolean;
  reacted: boolean;
  search: string;
  size: string;
}

export interface DecomojiViewModel extends DecomojiState {}

export interface DecomojiGetters {
  viewModel: DecomojiViewModel;
}

export type DecomojiMutationPayloads = VuexMutationPayloads<{
  [TOGGLE_CATEGORY]: CategoryName;
  [TOGGLE_DARK_MODE]: boolean;
  [TOGGLE_NAME_SHOWS]: boolean;
  [TOGGLE_REACTED]: boolean;
  [UPDATE_SEARCH]: string;
  [UPDATE_SIZE]: string;
}>;

export type DecomojiActionPayloads = VuexActionPayloads<{
  toggleCategory: CategoryName;
  toggleDarkMode: boolean;
  toggleNameShows: boolean;
  toggleReacted: boolean;
  updateSearch: string;
  updateSize: string;
}>;

export type DecomojiAction = VuexActions<DecomojiActionPayloads>;
