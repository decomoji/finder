import { CategoriesObject } from "@/models/CategoriesObject";
import { CategoryNameValue } from "@/models/CategoryNameValue";
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
  RECEIVE_COLLECTION,
  REMOVE_FROM_COLLECTION,
  REPLACE_URL_PARAMS,
  UPDATE_CATEGORY,
  UPDATE_DARK,
  UPDATE_REACTED,
  UPDATE_SEARCH,
  UPDATE_SIZE,
  UPDATE_VERTICAL,
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
  categoryParam: DecomojiGetters["categoryParam"];
  collectionParam: DecomojiGetters["collectionParam"];
  darkParam: DecomojiGetters["darkParam"];
  formattedJson: DecomojiGetters["formattedJson"];
  reactedParam: DecomojiGetters["reactedParam"];
  searchParam: DecomojiGetters["searchParam"];
  sizeParam: DecomojiGetters["sizeParam"];
  urlParams: DecomojiGetters["urlParams"];
  verticalParam: DecomojiGetters["verticalParam"];
  viewModel: DecomojiGetters["viewModel"];
}

export interface DecomojiGetters {
  categoryParam: NullableString;
  collectionParam: NullableString;
  darkParam: NullableString;
  formattedJson: any;
  reactedParam: NullableString;
  searchParam: NullableString;
  sizeParam: string;
  urlParams: string;
  verticalParam: NullableString;
  viewModel: DecomojiViewModel;
}

export type DecomojiMutationPayloads = VuexMutationPayloads<{
  [ADD_TO_COLLECTION]: CollectionItem;
  [CLEAR_COLLECTION]: void;
  [RECEIVE_COLLECTION]: Collection;
  [REMOVE_FROM_COLLECTION]: CollectionItem;
  [REPLACE_URL_PARAMS]: string;
  [UPDATE_CATEGORY]: CategoryNameValue;
  [UPDATE_DARK]: boolean;
  [UPDATE_REACTED]: boolean;
  [UPDATE_SEARCH]: string;
  [UPDATE_SIZE]: string;
  [UPDATE_VERTICAL]: boolean;
}>;

export type DecomojiActionPayloads = VuexActionPayloads<{
  add: CollectionItem;
  clear: void;
  remove: CollectionItem;
  receive: CategoriesObject;
  updateCategory: CategoryNameValue;
  updateDark: boolean;
  updateReacted: boolean;
  updateSearch: string;
  updateSize: string;
  updateVertical: boolean;
}>;

export type DecomojiAction = VuexActions<DecomojiActionPayloads>;
