<template>
  <main
    :class="[
      'Main',
      'grid grid-flow-row p-3',
      {
        '-basic': ui.category.basic,
        '-explicit': ui.category.explicit,
        '-extra': ui.category.extra,
        '-preview': ui.category.preview
      },
      `-${ui.iconSize}`
    ]"
  >
    <template v-for="category in categories">
      <button
        v-for="(name, i) in decomojis[category]"
        v-show="matched(name)"
        :key="`${name}_${category}_${i}`"
        :class="[
          '__item border border-solid border-transparent rounded leading-none text-center focus:outline-none',
          `-${category}`,
          `-${ui.iconSize}`,
          {
            '-reacted': ui.reacted,
            '-collected': collected(name)
          }
        ]"
        @click="handleClickItem({ name, category })"
      >
        <img
          :alt="nameShows ? '' : name"
          :class="['__icon block m-auto w-full', `-${ui.iconSize}`]"
          :src="`/decomoji/${category}/${name}.png`"
          width="64"
        />
        <span
          v-show="nameShows"
          :aria-label="name"
          class="block mt-1 leading-tight break-all"
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
import { DefaultIconSize } from "@/configs/DefaultIconSize";
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
    return this.ui.name && this.ui.iconSize === DefaultIconSize;
  }

  /**
   * @method - 要素が選択されているか否かを返す
   */
  collected(name: string) {
    return (
      this.collection.items.findIndex(
        (item: DecomojiCollectionItem) => item.name === name
      ) > -1
    );
  }

  /**
   * @method - 要素が検索クエリを正規表現にマッチするか否かを返す
   */
  matched(name: string) {
    try {
      return RegExp(this.ui.searchQuery).test(name);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * @method - 要素をクリックした時
   */
  handleClickItem(item: DecomojiCollectionItem) {
    this.collected(item.name) ? this.remove(item) : this.add(item);

    window.history.replaceState(
      {},
      "",
      "?" + this.collection.collectionQueries
    );
  }
}
</script>

<style lang="sass" scoped>
.Main
  &.-basic .__item.-basic
  &.-extra .__item.-extra
  &.-explicit .__item.-explicit
  &.-preview .__item.-preview
    display: block
  &.-l
    gap: 10px
    grid-template-columns: repeat(auto-fill, minmax(128px, 1fr))
  &.-m
    gap: 5px
    grid-template-columns: repeat(auto-fill, minmax(42px, 1fr))
  &.-s
    gap: 3px
    grid-template-columns: repeat(auto-fill, minmax(24px, 1fr))

  .__item
    transition: transform 0.03s ease-out, box-shadow 0.03s ease-out
    &.-l
      padding: 10px
    &.-m
      padding: 5px
    &.-s
      padding: 3px

    background-color: #f4f4f4
    &.-reacted
      border-color: #1d89c7
      background-color: #e6f3fa
    &.-collected
      border-color: #727272
      background-color: #ffffff
    .-dark &
      background-color: #1a1c20
      &.-reacted
        border-color: #135092
        background-color: #135092
      &.-collected
        border-color: #424242
        background-color: #000000

    &:focus
      box-shadow: 0 0 0 4px #adbfca
      .-dark &
        box-shadow: 0 0 0 4px #5c7280

  .__icon
    &.-l
      width: 64px
    &.-m
      width: 32px
    &.-s
      width: 16px
</style>
