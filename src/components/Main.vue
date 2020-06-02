<template>
  <main
    :class="[
      'grid grid-flow-row mt-23 md:mt-17 p-3',
      {
        'gap-10px grid-template-columns-xl': ui.size === 'l',
        'gap-5px grid-template-columns-m': ui.size === 'm',
        'gap-3px grid-template-columns-s': ui.size === 's'
      }
    ]"
    :style="collection.marginBottom"
  >
    <h2 class="sr-only">デコモジ一覧</h2>
    <template v-for="category in categories">
      <button
        v-for="(name, i) in decomojis[category]"
        v-show="matched(name, category)"
        :key="`${name}_${category}_${i}`"
        :class="[
          'border border-solid border-transparent rounded-md leading-none text-center focus:outline-none',
          {
            'border-shade-400 bg-shade-100':
              collected({ name, category }) && !ui.dark,
            'border-shade-600 bg-shade-1000':
              collected({ name, category }) && ui.dark,
            'border-sea-500 bg-sea-200':
              !collected({ name, category }) && ui.reacted && !ui.dark,
            'border-sea-800 bg-sea-800':
              !collected({ name, category }) && ui.reacted && ui.dark,
            'bg-shade-200':
              !collected({ name, category }) && !ui.reacted && !ui.dark,
            'bg-shade-800':
              !collected({ name, category }) && !ui.reacted && ui.dark,
            'focus:shadow-danube-200': !ui.dark,
            'focus:shadow-danube-600': ui.dark,
            'p-10px': ui.size === 'l',
            'p-5px': ui.size === 'm',
            'p-3px': ui.size === 's'
          }
        ]"
        @click="handleClickItem({ name, category })"
      >
        <img
          :alt="nameShows ? '' : name"
          :class="[
            'm-auto',
            {
              'w-64px': ui.size === 'l',
              'w-32px': ui.size === 'm',
              'w-16px': ui.size === 's'
            }
          ]"
          :src="`/decomoji/${category}/${name}.png`"
          width="64"
        />
        <span
          v-show="nameShows"
          :aria-label="name"
          :class="[
            'block mt-2 text-sm leading-tight break-all',
            {
              'text-gray-400': ui.dark
            }
          ]"
          >:{{ name }}:</span
        >
      </button>
    </template>
  </main>
</template>

<script lang="ts">
import { DecomojiBasic } from "@/configs/DecomojiBasic";
import { DecomojiExplicit } from "@/configs/DecomojiExplicit";
import { DecomojiExtra } from "@/configs/DecomojiExtra";
import { DecomojiPreview } from "@/configs/DecomojiPreview";
import { DefaultSize } from "@/configs/DefaultSize";
import { CategoryId } from "@/models/CategoryId";
import {
  DecomojiCollection,
  DecomojiCollectionItem
} from "@/models/DecomojiCollection";
import { DecomojiItem } from "@/models/DecomojiItem";
import { UiViewModel } from "@/store/modules/ui/models";
import {
  CollectionActions,
  CollectionViewModel
} from "@/store/modules/collection/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Main extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;
  @Getter("collection/viewModel") collection!: CollectionViewModel;

  // アクションを引き当てる
  @Action("collection/add") add!: CollectionActions["add"];
  @Action("collection/remove") remove!: CollectionActions["remove"];

  /**
   * 内部プロパティを定義する
   */
  categories: CategoryId[] = ["basic", "explicit", "extra", "preview"];

  decomojis = Object.freeze({
    basic: DecomojiBasic as DecomojiItem[],
    extra: DecomojiExtra as DecomojiItem[],
    explicit: DecomojiExplicit as DecomojiItem[],
    preview: DecomojiPreview as DecomojiItem[]
  });

  /**
   * @get - ファイル名を表示するか否かを返す
   */
  get nameShows() {
    return this.ui.name && this.ui.size === DefaultSize;
  }

  /**
   * @method - 要素が選択されているか否かを返す
   */
  collected(item: DecomojiCollectionItem) {
    return (
      this.collection.items.findIndex(
        (colleted: DecomojiCollectionItem) =>
          colleted.name === item.name && colleted.category === item.category
      ) > -1
    );
  }

  /**
   * @method - 検索クエリが空か要素が検索クエリにマッチするかし、カテゴリー選択にマッチすれば true を返す
   */
  matched(name: string, category: CategoryId) {
    return (
      (this.ui.search === "" || this.nameMatched(name)) &&
      this.categoryMatched(category)
    );
  }

  /**
   * @method - 要素が検索クエリを正規表現にマッチするか否かを返す
   */
  nameMatched(name: string) {
    try {
      return RegExp(this.ui.search).test(name);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method - 要素のカテゴリーが表示カテゴリーであるか否かを返す
   */
  categoryMatched(category: CategoryId) {
    const { basic, extra, explicit, preview } = this.ui.category;
    return (
      (basic && category === "basic") ||
      (explicit && category === "explicit") ||
      (extra && category === "extra") ||
      (preview && category === "preview")
    );
  }

  /**
   * @method - 要素をクリックした時
   */
  handleClickItem(item: DecomojiCollectionItem) {
    this.collected(item) ? this.remove(item) : this.add(item);

    window.history.replaceState(
      {},
      "",
      "?" + this.collection.collectionQueries
    );
  }
}
</script>
