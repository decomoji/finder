import { CategoryNameValue } from "@/models/CategoryNameValue";
import { CategoriesState } from "@/models/CategoriesState";
import { Collection, CollectionItem } from "@/models/Collection";
import { Decomoji } from "@/models/Decomoji";
import { NullableString } from "@/models/NullableString";
import { ParsedParamsObject } from "@/models/ParsedParamsObject";
import { VersionNameValue } from "@/models/VersionNameValue";
import { VersionState } from "@/models/VersionState";
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
  UPDATE_CREATED,
  UPDATE_DARK,
  UPDATE_REACTED,
  UPDATE_SEARCH,
  UPDATE_SIZE,
  UPDATE_UPDATED,
  UPDATE_VERSION,
  UPDATE_VERTICAL,
} from "./mutation-types";

export interface DecomojiState {
  category: CategoriesState;
  collection: Collection;
  created: boolean;
  dark: boolean;
  reacted: boolean;
  search: string;
  size: string;
  updated: boolean;
  version: VersionState;
  vertical: boolean;
}

export interface DecomojiViewModel extends DecomojiState {
  categoryParam: DecomojiGetters["categoryParam"];
  collectionParam: DecomojiGetters["collectionParam"];
  createdParam: DecomojiGetters["createdParam"];
  darkParam: DecomojiGetters["darkParam"];
  filteredDecomojis: DecomojiGetters["filteredDecomojis"];
  formattedJson: DecomojiGetters["formattedJson"];
  reactedParam: DecomojiGetters["reactedParam"];
  searchParam: DecomojiGetters["searchParam"];
  sizeParam: DecomojiGetters["sizeParam"];
  total: DecomojiGetters["total"];
  updatedParam: DecomojiGetters["updatedParam"];
  urlParams: DecomojiGetters["urlParams"];
  versionParam: DecomojiGetters["versionParam"];
  verticalParam: DecomojiGetters["verticalParam"];
  viewModel: DecomojiGetters["viewModel"];
}

export interface DecomojiGetters {
  categoryParam: NullableString;
  collectionParam: NullableString;
  createdParam: NullableString;
  darkParam: NullableString;
  filteredDecomojis: Decomoji[];
  formattedJson: any;
  reactedParam: NullableString;
  searchParam: NullableString;
  sizeParam: string;
  total: number;
  updatedParam: NullableString;
  urlParams: string;
  versionParam: NullableString;
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
  [UPDATE_CREATED]: boolean;
  [UPDATE_DARK]: boolean;
  [UPDATE_REACTED]: boolean;
  [UPDATE_SEARCH]: string;
  [UPDATE_SIZE]: string;
  [UPDATE_UPDATED]: boolean;
  [UPDATE_VERSION]: VersionNameValue;
  [UPDATE_VERTICAL]: boolean;
}>;

export type DecomojiActionPayloads = VuexActionPayloads<{
  add: CollectionItem;
  clear: void;
  remove: CollectionItem;
  receive: ParsedParamsObject;
  updateCategory: CategoryNameValue;
  updateCollection: Collection;
  updateCreated: boolean;
  updateDark: boolean;
  updateReacted: boolean;
  updateSearch: string;
  updateSize: string;
  updateUpdated: boolean;
  updateVersion: VersionNameValue;
  updateVertical: boolean;
}>;

export type DecomojiAction = VuexActions<DecomojiActionPayloads>;
