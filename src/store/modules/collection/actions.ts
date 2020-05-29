import { RootState } from '@/store/models'
import {
  CollectionActionPayloads as ThisActionPayloads,
  CollectionState as ThisState
} from './models'
import {
  ADD_TO_COLLECTION,
  REMOVE_FROM_COLLECTION,
  CLEAR_COLLECTION,
  RECEIVE_COLLECTION
} from './mutation-types'
import { ActionTree } from 'vuex'

export const actions: ActionTree<ThisState, RootState> = {
  /**
   * 選択した要素を選択済みデコモジリストに加える
   * @param commit
   * @param payload
   */
  add({ commit }, payload: ThisActionPayloads['add']) {
    commit(ADD_TO_COLLECTION, payload)
  },

  /**
   * 選択解除した要素を選択済みデコモジリストから削除する
   * @param commit
   * @param payload
   */
  remove({ commit }, payload: ThisActionPayloads['remove']) {
    commit(REMOVE_FROM_COLLECTION, payload)
  },

  /**
   * 選択済みデコモジリストを空にする
   * @param commit
   * @param payload
   */
  clear({ commit }) {
    commit(CLEAR_COLLECTION)
  },

  /**
   * 選択済みデコモジリストを受領する
   * @param commit
   * @param payload
   */
  receive({ commit }, payload: ThisActionPayloads['receive']) {
    commit(RECEIVE_COLLECTION, payload)
  }
}
