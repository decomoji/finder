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
   * コレクションをパラメータ文字列に変換したものを返す
   */
  collectionParam: (state) => {
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
   * コレクションを decomoji-manager 向けの json 形式に変換したものを返す
   */
  formattedJson: (state) => {
    return state.collection.map((item) => ({
      name: item.name,
      path: `./decomoji/${item.category}/${item.name}.png`,
    }));
  },

  /**
   * 表示オプションをパラメータ文字列に変換したものを返す
   */
  optionParam: (state) => {
    const { dark, reacted } = state;
    let options: string[] = [];
    if (dark) {
      options.push("dark");
    }
    if (reacted) {
      options.push("reacted");
    }
    return `o=${options.join(",")}`;
  },

  /**
   * 検索クエリをパラメータ文字列に変換したものを返す
   */
  searchParam: (state) => {
    return `q=${encodeURIComponent(state.search)}`;
  },

  /**
   * 表示サイズをパラメータ文字列に変換したものを返す
   */
  sizeParam: (state) => {
    return `s=${state.size}`;
  },

  /**
   * ViewModel
   * @param state
   * @param hasGlobalLoadingQueue
   */
  viewModel: (
    state,
    {
      collectionParam,
      formattedJson,
      optionParam,
      searchParam,
      sizeParam,
    }: ThisGetter
  ) => ({
    ...pickState(defaultState, state),
    collectionParam,
    formattedJson,
    optionParam,
    searchParam,
    sizeParam,
  }),
};
