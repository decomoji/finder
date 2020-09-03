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
import { VersionName } from "@/models/VersionName";
import { isStringOfNotEmpty } from "@/utilities/isString";

export const getters: GetterTree<ThisState, RootState> = {
  /**
   * 表示カテゴリーをパラメータ文字列に変換したものを返す
   */
  categoryParam: (state) => {
    const arrayedCategories = (Object.keys(
      state.category
    ) as CategoryName[]).filter((key) => state.category[key]);
    return arrayedCategories.length > 0
      ? `category=${arrayedCategories.join(",")}`
      : null;
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

    return paramaterizedArray.length > 0 ? paramaterizedArray.join("&") : null;
  },

  /**
   * ダークモード表示か否かをパラメータ文字列に変換したものを返す
   */
  darkParam: (state) => {
    return state.dark ? "dark=true" : null;
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
    return state.reacted ? "reacted=true" : null;
  },

  /**
   * 検索クエリをパラメータ文字列に変換したものを返す
   */
  searchParam: (state) => {
    return isStringOfNotEmpty(state.search)
      ? `search=${encodeURIComponent(state.search)}`
      : null;
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
      versionParam,
      verticalParam,
    }
  ) => {
    return [
      sizeParam,
      categoryParam,
      darkParam,
      reactedParam,
      verticalParam,
      versionParam,
      searchParam,
      collectionParam,
    ]
      .filter((v) => !!v)
      .join("&");
  },
  /**
   * 表示バージョンをパラメータ文字列に変換したものを返す
   */
  versionParam: (state) => {
    const versions = (Object.keys(state.version) as VersionName[]).filter(
      (key) => state.version[key]
    );
    return versions.length > 0 ? `version=${versions.join(",")}` : null;
  },

  /**
   * コレクションが垂直分割表示か否かをパラメータ文字列に変換したものを返す
   */
  verticalParam: (state) => {
    return state.vertical ? "vertical=true" : null;
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
