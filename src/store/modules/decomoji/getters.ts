import { RootState } from "@/store/models";
import { pickState } from "@/store/utilities";
import { state as defaultState } from "./index";
import {
  DecomojiGetters as ThisGetter,
  DecomojiState as ThisState,
} from "./models";
import { GetterTree } from "vuex";
import { CategorizedItems } from "@/models/CategorizedItems";
import { CategoryName } from "@/models/CategoryName";

export const getters: GetterTree<ThisState, RootState> = {
  /**
   * コレクションを decomoji-manager 向けの json 形式に変換したものを返す
   */
  formattedJson: (state) => {
    return state.collection.map((item) => ({
      name: item.name,
      path: `./decomoji/${item.category}/${item.name}.png`,
    }));
  },

  /**
   * コレクションをパラメータ文字列に変換したものを返す
   */
  collectionQueries: (state) => {
    const categorizedItems = state.collection.reduce<CategorizedItems>(
      (acc, { name, category }) => {
        acc[category] ? acc[category].push(name) : (acc[category] = [name]);
        return acc;
      },
      {}
    );

    const paramaterizedArray = (Object.keys(
      categorizedItems
    ) as CategoryName[]).map(
      (key) => `${key}=${categorizedItems[key].join(",")}`
    );

    return paramaterizedArray.join("&");
  },

  /**
   * ViewModel
   * @param state
   * @param hasGlobalLoadingQueue
   */
  viewModel: (state, { collectionQueries, formattedJson }: ThisGetter) => ({
    ...pickState(defaultState, state),
    collectionQueries,
    formattedJson,
  }),
};
