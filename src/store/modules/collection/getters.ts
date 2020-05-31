import { DecomojiManagerListItem } from "@/models/DecomojiManagerList";
import { DecomojiCollectionItem } from "@/models/DecomojiCollection";
import { RootState } from "@/store/models";
import { pickState } from "@/store/utilities";
import { state as defaultState } from "./index";
import {
  CollectionGetters as ThisGetter,
  CollectionState as ThisState
} from "./models";
import { GetterTree } from "vuex";

export const getters: GetterTree<ThisState, RootState> = {
  /**
   * コレクションをパラメータ文字列に変換したものを返す
   */
  collectionQueries: state => {
    const { items } = state;

    const basic: string = items
      .filter(item => item.category === "basic")
      .map(item => item.name)
      .join(",");
    const extra: string = items
      .filter(item => item.category === "extra")
      .map(item => item.name)
      .join(",");
    const explicit: string = items
      .filter(item => item.category === "explicit")
      .map(item => item.name)
      .join(",");
    const preview: string = items
      .filter(item => item.category === "preview")
      .map(item => item.name)
      .join(",");

    return `basic=${basic}&extra=${extra}&explicit=${explicit}&preview=${preview}`;
  },

  /**
   * コレクションから decomoji-manager で管理できる形式のリストを返す
   */
  managerList: state => {
    const { items } = state;
    return items.map<DecomojiManagerListItem>(
      (item: DecomojiCollectionItem) => {
        const { name, category } = item;
        return {
          name,
          category,
          path: `./decomoji/${category}/${name}.png`
        };
      }
    );
  },

  /**
   * コレクションコンテナの高さを値にした margin-bottom プロパティを返す
   */
  marginBottom: state => {
    return `margin-bottom: ${state.height}px`;
  },

  /**
   * ViewModel
   * @param state
   * @param hasGlobalLoadingQueue
   */
  viewModel: (
    state,
    { collectionQueries, managerList, marginBottom }: ThisGetter
  ) => ({
    ...pickState(defaultState, state),
    collectionQueries,
    managerList,
    marginBottom
  })
};
