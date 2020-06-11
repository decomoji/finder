import { RootState } from "@/store/models";
import { pickState } from "@/store/utilities";
import { state as defaultState } from "./index";
import {
  DecomojiGetters as ThisGetter,
  DecomojiState as ThisState
} from "./models";
import { GetterTree } from "vuex";

export const getters: GetterTree<ThisState, RootState> = {
  /**
   * コレクションをパラメータ文字列に変換したものを返す
   */
  collectionQueries: state => {
    const { collection } = state;

    const basic: string = collection
      .filter(item => item.category === "basic")
      .map(item => item.name)
      .join(",");
    const extra: string = collection
      .filter(item => item.category === "extra")
      .map(item => item.name)
      .join(",");
    const explicit: string = collection
      .filter(item => item.category === "explicit")
      .map(item => item.name)
      .join(",");
    const preview: string = collection
      .filter(item => item.category === "preview")
      .map(item => item.name)
      .join(",");

    return `basic=${basic}&extra=${extra}&explicit=${explicit}&preview=${preview}`;
  },

  /**
   * ViewModel
   * @param state
   * @param hasGlobalLoadingQueue
   */
  viewModel: (state, { collectionQueries }: ThisGetter) => ({
    ...pickState(defaultState, state),
    collectionQueries
  })
};
