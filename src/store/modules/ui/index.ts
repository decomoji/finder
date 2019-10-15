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

export const state: StateCreator<UiState> = () => ({
  dark: false,
  globalLadingQueue: 0
})

export const storeModule: DefinedModule<
  UiState,
  UiGetterReturns,
  UiMutationPayloads,
  UiActionPayloads
> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
