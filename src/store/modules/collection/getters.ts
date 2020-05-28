import { DecomojiManagerListItem } from '@/models/DecomojiManagerList'
import { DecomojiCollectionItem } from '@/models/DecomojiCollection'
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
   * コレクションから decomoji-manager で管理できる形式のリストを返す
   */
  managerList: state => {
    const { items } = state
    return items.map<DecomojiManagerListItem>(
      (item: DecomojiCollectionItem) => {
        const { name, category } = item
        return {
          name,
          category,
          path: `./decomoji/${category}/${name}.png`
        }
      }
    )
  },

  /**
   * コレクションをパラメータ文字列に変換したものを返す
   */
  queryStringifyValueOfCollection: state => {
    const { items } = state
    const name = items.map(item => item.name).join(',')
    const category = items.map(item => item.category).join(',')

    return `n=${name}&c=${category}`
  },

  /**
   * ViewModel
   * @param state
   * @param hasGlobalLoadingQueue
   */
  viewModel: (state, { managerList, queryStringifyValueOfCollection }: ThisGetter) => ({
    ...pickState(defaultState, state),
    managerList,
    queryStringifyValueOfCollection
  })
}
