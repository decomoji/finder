import { DecomojiManagerListItem } from '@/models/DecomojiManagerList'
import { RootState } from '@/store/models'
import { pickState } from '@/store/utilities'
import { state as defaultState } from './index'
import {
  CollectionGetters as ThisGetter,
  CollectionState as ThisState
} from './models'
import { GetterTree } from 'vuex'

export const getters: GetterTree<ThisState, RootState> = {
  /**
   * 選択したデコモジリストから decomoji-manager で管理できる形式のリストを返す
   */
  formatedDecomojiManagerList: state => {
    const { items } = state
    return items.map<DecomojiManagerListItem>((name: string) => ({
      name,
      path: `./images/${name}.png`
    }))
  },

  /**
   * ViewModel
   * @param state
   * @param hasGlobalLoadingQueue
   */
  viewModel: (state, { formatedDecomojiManagerList }: ThisGetter) => ({
    ...pickState(defaultState, state),
    formatedDecomojiManagerList
  })
}
