import { CategoriesObject } from "@/models/CategoriesObject";
import { CategoryName } from "@/models/CategoryName";
import { CategoriesState } from "@/models/CategoriesState";
import { Collection, CollectionItem } from "@/models/Collection";
import { NullableString } from "@/models/NullableString";
import {
  VuexActionPayloads,
  VuexActions,
  VuexMutationPayloads,
} from "@/models/Vuex";
import {
  ADD_TO_COLLECTION,
  CLEAR_COLLECTION,
  REMOVE_FROM_COLLECTION,
  RECEIVE_COLLECTION,
  TOGGLE_CATEGORY,
  TOGGLE_DARK_MODE,
  TOGGLE_REACTED,
  TOGGLE_VERTICAL_DIVINE,
  UPDATE_SEARCH,
  UPDATE_SIZE,
} from "./mutation-types";

export interface DecomojiState {
  category: CategoriesState;
  collection: Collection;
  dark: boolean;
  reacted: boolean;
  search: string;
  size: string;
  vertical: boolean;
}

export interface DecomojiViewModel extends DecomojiState {
  collectionParam: DecomojiGetters["collectionParam"];
  formattedJson: DecomojiGetters["formattedJson"];
}

export interface DecomojiGetters {
  categoryParam: string;
  collectionParam: string;
  darkParam: NullableString;
  formattedJson: any;
  reactedParam: NullableString;
  searchParam: string;
  sizeParam: string;
  viewModel: DecomojiViewModel;
}

export type DecomojiMutationPayloads = VuexMutationPayloads<{
  [ADD_TO_COLLECTION]: CollectionItem;
  [CLEAR_COLLECTION]: void;
  [REMOVE_FROM_COLLECTION]: CollectionItem;
  [RECEIVE_COLLECTION]: Collection;
  [TOGGLE_CATEGORY]: CategoryName;
  [TOGGLE_DARK_MODE]: boolean;
  [TOGGLE_REACTED]: boolean;
  [TOGGLE_VERTICAL_DIVINE]: boolean;
  [UPDATE_SEARCH]: string;
  [UPDATE_SIZE]: string;
}>;

export type DecomojiActionPayloads = VuexActionPayloads<{
  add: CollectionItem;
  clear: void;
  remove: CollectionItem;
  receive: CategoriesObject;
  toggleCategory: CategoryName;
  toggleDarkMode: boolean;
  toggleReacted: boolean;
  toggleVerticalDivine: boolean;
  updateSearch: string;
  updateSize: string;
}>;

export type DecomojiAction = VuexActions<DecomojiActionPayloads>;
