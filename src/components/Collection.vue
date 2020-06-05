<template>
  <div v-show="shows" ref="Collection">
    <div>
      <h2>コレクション</h2>
      <p>
        ダブルクリックするか delete キーでコレクションから外せます
      </p>
    </div>
    <div>
      <button
        v-for="(item, i) in collection.items"
        :key="`${item.name}_${item.category}_${i}`"
        @dblclick="removeItem(item)"
        @keydown.delete="removeItem(item)"
      >
        <img
          :alt="item.name"
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
import { replaceState } from "@/utilities/replaceState";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Collection extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;
  @Getter("collection/viewModel") collection!: CollectionViewModel;

  // アクションを引き当てる
  @Action("collection/remove") remove!: CollectionActions["remove"];
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
    replaceState(this.collection.collectionQueries);
  }
}
</script>
