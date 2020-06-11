import {
  VuexActionPayloads,
  VuexActions,
  VuexMutationPayloads
} from "@/models/Vuex";
import { CategoryName } from "@/models/CategoryName";
import { CategoriesState } from "@/models/CategoriesState";
import { Collection, CollectionItem } from "@/models/Collection";
import {
  ADD_TO_COLLECTION,
  CLEAR_COLLECTION,
  REMOVE_FROM_COLLECTION,
  RECEIVE_COLLECTION,
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
  [ADD_TO_COLLECTION]: CollectionItem;
  [CLEAR_COLLECTION]: void;
  [REMOVE_FROM_COLLECTION]: CollectionItem;
  [RECEIVE_COLLECTION]: Collection;
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
