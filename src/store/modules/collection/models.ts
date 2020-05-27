import { DecomojiItem } from '@/models/DecomojiItem'
import { DecomojiManagerList } from '@/models/DecomojiManagerList'
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
  items: DecomojiItem[]
}

export interface CollectionViewModel extends CollectionState {
  formatedDecomojiManagerList: CollectionGetters['formatedDecomojiManagerList']
}

export interface CollectionGetters {
  formatedDecomojiManagerList: DecomojiManagerList
  viewModel: CollectionViewModel
}

export type CollectionMutationPayloads = VuexMutationPayloads<{
  [ADD_TO_COLLECTION]: string
  [REMOVE_FROM_COLLECTION]: number
  [CLEAR_COLLECTION]: void
  [RECEIVE_COLLECTION]: DecomojiItem[]
}>

export type CollectionActionPayloads = VuexActionPayloads<{
  add: string
  remove: number
  clear: void
  receive: DecomojiItem[]
}>

export type CollectionActions = VuexActions<CollectionActionPayloads>
