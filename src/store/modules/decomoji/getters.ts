import { RootState } from "@/store/models";
import { pickState } from "@/store/utilities";
import { state as defaultState } from "./index";
import {
  DecomojiGetters as ThisGetter,
  DecomojiState as ThisState
} from "./models";
import { GetterTree } from "vuex";
import { CategorizedItems } from "@/models/CategorizedItems";
import { CategoryName } from "@/models/CategoryName";
import { DecomojiName } from "@/models/DecomojiName";

export const getters: GetterTree<ThisState, RootState> = {
  /**
   * コレクションをパラメータ文字列に変換したものを返す
   */
  collectionQueries: state => {
    const categorizedItems = state.collection.reduce<CategorizedItems>(
      (acc, { name, category }) => {
        acc[category] ? acc[category].push(name) : (acc[category] = []);
        return acc;
      },
      {}
    );

    const paramaterizedArray = (Object.keys(
      categorizedItems
    ) as CategoryName[]).map(
      (key: CategoryName) => `${key}=${categorizedItems[key].join(",")}`
    );

    return paramaterizedArray.join("&");
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
