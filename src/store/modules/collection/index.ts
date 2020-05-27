import { RootState } from '@/store/models'
import { actions } from './actions'
import { getters } from './getters'
import { CollectionState as ThisState } from './models'
import { mutations } from './mutations'
import { Module } from 'vuex'

// ステートの初期値を返す
export const state: () => ThisState = () => ({
  items: []
})

export const storeModule: Module<ThisState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
