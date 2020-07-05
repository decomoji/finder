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
    return `category=${arrayedCategories.join(",")}`;
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

    // @TODO v5-preview まではカテゴリごとに持つが、元からカテゴリを跨いで一意な名前なので
    // v5 をリリースした後に `collection=name,name,name...` の形に変更する
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
    return `search=${encodeURIComponent(state.search)}`;
  },

  /**
   * 表示サイズをパラメータ文字列に変換したものを返す
   */
  sizeParam: (state) => {
    return `size=${state.size}`;
  },

  /**
   * 各パラメータ文字列を連結したものを返す
   */
  urlParams: (
    _,
    {
      categoryParam,
      collectionParam,
      darkParam,
      reactedParam,
      searchParam,
      sizeParam,
      verticalParam,
    }
  ) => {
    return [
      sizeParam,
      categoryParam,
      darkParam,
      reactedParam,
      verticalParam,
      searchParam,
      collectionParam,
    ]
      .filter((v) => !!v)
      .join("&");
  },

  /**
   * コレクションが垂直分割表示か否かをパラメータ文字列に変換したものを返す
   */
  verticalParam: (state) => {
    return state.vertical ? "vertical" : null;
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
      urlParams,
      verticalParam,
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
    urlParams,
    verticalParam,
  }),
};
