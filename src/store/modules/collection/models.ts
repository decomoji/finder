import { CategoriesObject } from "@/models/CategoriesObject";
import { DecomojiManagerList } from "@/models/DecomojiManagerList";
import {
  DecomojiCollection,
  DecomojiCollectionItem
} from "@/models/DecomojiCollection";
import {
  ADD_TO_COLLECTION,
  REMOVE_FROM_COLLECTION,
  CLEAR_COLLECTION,
  RECEIVE_COLLECTION,
  UPDATE_HEIGHT
} from "./mutation-types";
import {
  VuexActionPayloads,
  VuexActions,
  VuexMutationPayloads
} from "@/models/Vuex";

export interface CollectionState {
  items: DecomojiCollection;
  height: CollectionGetters["height"];
}

export interface CollectionViewModel extends CollectionState {
  collectionQueries: CollectionGetters["collectionQueries"];
  managerList: CollectionGetters["managerList"];
  marginBottom: CollectionGetters["marginBottom"];
}

export interface CollectionGetters {
  collectionQueries: string;
  height: number;
  managerList: DecomojiManagerList;
  marginBottom: string;
  viewModel: CollectionViewModel;
}

export type CollectionMutationPayloads = VuexMutationPayloads<{
  [ADD_TO_COLLECTION]: DecomojiCollectionItem;
  [REMOVE_FROM_COLLECTION]: DecomojiCollectionItem;
  [CLEAR_COLLECTION]: void;
  [RECEIVE_COLLECTION]: DecomojiCollection;
  [UPDATE_HEIGHT]: number;
}>;

export type CollectionActionPayloads = VuexActionPayloads<{
  add: CollectionMutationPayloads[typeof ADD_TO_COLLECTION];
  remove: CollectionMutationPayloads[typeof REMOVE_FROM_COLLECTION];
  clear: CollectionMutationPayloads[typeof CLEAR_COLLECTION];
  receive: CategoriesObject;
  height: CollectionMutationPayloads[typeof UPDATE_HEIGHT];
}>;

export type CollectionActions = VuexActions<CollectionActionPayloads>;
