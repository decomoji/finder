import { DefinedModule, StateCreator } from '@/store/models'
import { actions } from '@/store/modules/ui/actions'
import { getters } from '@/store/modules/ui/getters'
import {
  UiActionPayloads,
  UiGetterReturns,
  UiMutationPayloads,
  UiState
} from '@/store/modules/ui/models'
import { mutations } from '@/store/modules/ui/mutations'

// ステートの初期値を返す
export const state: StateCreator<UiState> = () => ({
  category: {
    basic: true,
    explicit: false,
    extra: false
  },
  dark: false,
  globalLadingQueue: 0,
  name: false,
  searchQuery: ''
})

export const storeModule: DefinedModule<
  UiState,
  UiGetterReturns,
  UiMutationPayloads,
  UiActionPayloads
> = {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
