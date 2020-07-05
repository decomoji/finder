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
   * 表示カテゴリーをパラメータ文字列に変換したものを返す
   */
  categoryParam: (state) => {
    const arrayedCategories = (Object.keys(
      state.category
    ) as CategoryName[]).filter((key) => state.category[key]);
    return `c=${arrayedCategories.join(",")}`;
  },

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
   * ダークモード表示か否かをパラメータ文字列に変換したものを返す
   */
  darkParam: (state) => {
    return state.dark ? "dark" : null;
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
   * リアクション済みスタイルか否かをパラメータ文字列に変換したものを返す
   */
  reactedParam: (state) => {
    return state.reacted ? "reacted" : null;
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
      categoryParam,
      collectionParam,
      darkParam,
      formattedJson,
      reactedParam,
      searchParam,
      sizeParam,
    }: ThisGetter
  ) => ({
    ...pickState(defaultState, state),
    categoryParam,
    collectionParam,
    darkParam,
    formattedJson,
    reactedParam,
    searchParam,
    sizeParam,
  }),
};
