<template>
  <div
    v-show="shows"
    class="Collection fixed inset-x-0 bottom-0 p-4 overflow-y-auto scrolling-touch"
  >
    <p class="text-base">
      ダブルクリックするか delete キーでコレクションから外せます。
    </p>
    <div :class="['__list', 'grid grid-flow-row', `-${ui.iconSize}`]">
      <button
        v-for="(item, i) in collection.items"
        :key="`${item.name}_${item.category}_${i}`"
        :class="[
          '__item',
          'p-1 rounded-md border border-solid border-transparent text-center leading-none focus:outline-none',
          `-${ui.iconSize}`
        ]"
        @dblclick="removeItem(item)"
        @keydown.delete="removeItem(item)"
      >
        <img
          :alt="item.name"
          :class="['__icon block m-auto w-full', `-${ui.iconSize}`]"
          :src="`/decomoji/${item.category}/${item.name}.png`"
          width="64"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { DefaultIconSize } from "@/configs/DefaultIconSize";
import {
  DecomojiCollection,
  DecomojiCollectionItem
} from "@/models/DecomojiCollection";
import { CategoryId } from "@/models/CategoryId";
import { QueryObject } from "@/models/QueryObject";
import { UiViewModel } from "@/store/modules/ui/models";
import {
  CollectionActions,
  CollectionViewModel
} from "@/store/modules/collection/models";
import { isStringOfNotEmpty } from "@/utilities/isString";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Collection extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;
  @Getter("collection/viewModel") collection!: CollectionViewModel;

  // アクションを引き当てる
  @Action("collection/remove") remove!: CollectionActions["remove"];
  @Action("collection/receive") receive!: CollectionActions["receive"];

  /**
   * 入力プロパティを定義する
   */
  @Prop() query!: QueryObject;

  // @get - コレクションを表示するか否かを返す
  get shows() {
    return this.collection.items.length > 0;
  }

  /**
   * @method - コレクションからアイテムを削除する
   */
  removeItem(item: DecomojiCollectionItem) {
    this.remove(item);

    window.history.replaceState(
      {},
      "",
      "?" + this.collection.collectionQueries
    );
  }

  /**
   * @lifecyle
   */
  created() {
    // パラメータをパースしてコレクションに追加する
    const { basic, extra, explicit, preview } = this.query || {};
    const _basic = isStringOfNotEmpty(basic)
      ? basic
          .split(",")
          .map((name: string) => ({ name, category: "basic" as CategoryId }))
      : [];
    const _extra = isStringOfNotEmpty(extra)
      ? extra
          .split(",")
          .map((name: string) => ({ name, category: "extra" as CategoryId }))
      : [];
    const _explicit = isStringOfNotEmpty(explicit)
      ? explicit
          .split(",")
          .map((name: string) => ({ name, category: "explicit" as CategoryId }))
      : [];
    const _preview = isStringOfNotEmpty(preview)
      ? preview
          .split(",")
          .map((name: string) => ({ name, category: "preview" as CategoryId }))
      : [];

    return this.receive([..._basic, ..._extra, ..._explicit, ..._preview]);
  }
}
</script>

<style lang="sass" scoped>
.Collection
  background-color: #f4f4f4
  .-dark &
    background-color: #1a1c20
  .__list
    &.-l
      gap: 10px
      grid-template-columns: repeat(auto-fill, minmax(84px, 1fr))
    &.-m
      gap: 5px
      grid-template-columns: repeat(auto-fill, minmax(42px, 1fr))
    &.-s
      gap: 3px
      grid-template-columns: repeat(auto-fill, minmax(24px, 1fr))

  .__item
    background-color: #ffffff
    transition: box-shadow 0.03s ease-out

    &.-s
      padding: 0

    .-dark &
      background-color: #15171a

    &:focus
      box-shadow: 0 0 0 4px #adbfca
      .-dark &
        box-shadow: 0 0 0 4px #5c7280

  .__icon
    &.-l
      max-width: 64px
    &.-m
      max-width: 32px
    &.-s
      max-width: 16px
</style>
