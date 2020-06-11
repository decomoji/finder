import { CategoriesObject } from "@/models/CategoriesObject";
import { Collection, CollectionItem } from "@/models/Collection";
import {
  ADD_TO_COLLECTION,
  REMOVE_FROM_COLLECTION,
  CLEAR_COLLECTION,
  RECEIVE_COLLECTION
} from "./mutation-types";
import {
  VuexActionPayloads,
  VuexActions,
  VuexMutationPayloads
} from "@/models/Vuex";

export interface CollectionState {
  items: Collection;
}

export interface CollectionViewModel extends CollectionState {
  collectionQueries: CollectionGetters["collectionQueries"];
}

export interface CollectionGetters {
  collectionQueries: string;
  viewModel: CollectionViewModel;
}

export type CollectionMutationPayloads = VuexMutationPayloads<{
  [ADD_TO_COLLECTION]: CollectionItem;
  [REMOVE_FROM_COLLECTION]: CollectionItem;
  [CLEAR_COLLECTION]: void;
  [RECEIVE_COLLECTION]: Collection;
}>;

export type CollectionActionPayloads = VuexActionPayloads<{
  add: CollectionMutationPayloads[typeof ADD_TO_COLLECTION];
  remove: CollectionMutationPayloads[typeof REMOVE_FROM_COLLECTION];
  clear: CollectionMutationPayloads[typeof CLEAR_COLLECTION];
  receive: CategoriesObject;
}>;

export type CollectionActions = VuexActions<CollectionActionPayloads>;
