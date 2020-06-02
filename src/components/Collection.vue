<template>
  <div
    v-show="shows"
    ref="Collection"
    :class="[
      'fixed inset-x-0 bottom-0 p-4 max-h-collection overflow-y-auto scrolling-touch shadow-footer',
      {
        'bg-item-light': !ui.dark,
        'bg-item-dark': ui.dark
      }
    ]"
  >
    <div class="flex items-baseline space-x-4">
      <h2
        :class="[
          {
            'text-gray-400': ui.dark
          }
        ]"
      >
        コレクション
      </h2>
      <p
        :class="[
          'text-sm',
          {
            'text-gray-800': !ui.dark,
            'text-gray-400': ui.dark
          }
        ]"
      >
        ダブルクリックするか delete キーでコレクションから外せます
      </p>
    </div>
    <div
      :class="[
        'grid grid-flow-row mt-4',
        {
          'gap-10px grid-template-columns-l': ui.size === 'l',
          'gap-5px grid-template-columns-m': ui.size === 'm',
          'gap-3px grid-template-columns-s': ui.size === 's'
        }
      ]"
    >
      <button
        v-for="(item, i) in collection.items"
        :key="`${item.name}_${item.category}_${i}`"
        :class="[
          'rounded-md border border-solid border-transparent text-center leading-none focus:outline-none',
          {
            'p-1': ui.size !== 's',
            'bg-white focus:shadow-outline-gray-light': !ui.dark,
            'bg-black focus:shadow-outline-gray-dark': ui.dark
          }
        ]"
        @dblclick="removeItem(item)"
        @keydown.delete="removeItem(item)"
      >
        <img
          :alt="item.name"
          :class="[
            'm-auto',
            {
              'w-64px': ui.size === 'l',
              'w-32px': ui.size === 'm',
              'w-16px': ui.size === 's'
            }
          ]"
          :src="`/decomoji/${item.category}/${item.name}.png`"
          width="64"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Collection extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;
  @Getter("collection/viewModel") collection!: CollectionViewModel;

  // アクションを引き当てる
  @Action("collection/remove") remove!: CollectionActions["remove"];
  @Action("collection/receive") receive!: CollectionActions["receive"];
  @Action("collection/height") height!: CollectionActions["height"];

  /**
   * 入力プロパティを定義する
   */
  @Prop() query!: QueryObject;

  /**
   *
   */
  @Watch("collectionLength")
  handleWatchCollection() {
    this.$nextTick().then(() => {
      this.height((this.$refs.Collection as HTMLDivElement).clientHeight);
    });
  }

  get collectionLength() {
    return this.collection.items.length;
  }

  // @get - コレクションを表示するか否かを返す
  get shows() {
    return this.collectionLength > 0;
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
