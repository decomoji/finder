import { DecomojiManagerList } from '@/models/DecomojiManagerList'
import {
  DecomojiCollection,
  DecomojiCollectionItem
} from '@/models/DecomojiCollection'
import {
  ADD_TO_COLLECTION,
  REMOVE_FROM_COLLECTION,
  CLEAR_COLLECTION,
  RECEIVE_COLLECTION
} from './mutation-types'
import {
  VuexActionPayloads,
  VuexActions,
  VuexMutationPayloads
} from '@/models/Vuex'

export interface CollectionState {
  items: DecomojiCollection
}

export interface CollectionViewModel extends CollectionState {
  formatedDecomojiManagerList: CollectionGetters['formatedDecomojiManagerList']
}

export interface CollectionGetters {
  formatedDecomojiManagerList: DecomojiManagerList
  viewModel: CollectionViewModel
}

export type CollectionMutationPayloads = VuexMutationPayloads<{
  [ADD_TO_COLLECTION]: DecomojiCollectionItem
  [REMOVE_FROM_COLLECTION]: DecomojiCollectionItem
  [CLEAR_COLLECTION]: void
  [RECEIVE_COLLECTION]: DecomojiCollection
}>

export type CollectionActionPayloads = VuexActionPayloads<{
  add: CollectionMutationPayloads[typeof ADD_TO_COLLECTION]
  remove: CollectionMutationPayloads[typeof REMOVE_FROM_COLLECTION]
  clear: CollectionMutationPayloads[typeof CLEAR_COLLECTION]
  receive: CollectionMutationPayloads[typeof RECEIVE_COLLECTION]
}>

export type CollectionActions = VuexActions<CollectionActionPayloads>
