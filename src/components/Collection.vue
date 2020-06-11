<template>
  <section v-show="shows" class="Collection">
    <div class="__header">
      <h2 class="__heading">コレクション</h2>
      <p class="__desc">
        ダブルクリックするか delete キーでコレクションから外せます
      </p>
    </div>
    <div class="__body">
      <DecomojiButton
        v-for="(item, i) in collection.items"
        :key="`${item.name}_${item.category}_${i}`"
        :category="item.category"
        :name="item.name"
        @remove="handleRemove(item)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import DecomojiButton from "@/components/DecomojiButton.vue";
import { CollectionItem } from "@/models/Collection";
import { CategoryName } from "@/models/CategoryName";
import { QueriesObject } from "@/models/QueriesObject";
import { DecomojiViewModel } from "@/store/modules/decomoji/models";
import {
  CollectionActions,
  CollectionViewModel
} from "@/store/modules/collection/models";
import { isStringOfNotEmpty } from "@/utilities/isString";
import { replaceState } from "@/utilities/replaceState";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    DecomojiButton
  }
})
export default class Collection extends Vue {
  // viewModel を引き当てる
  @Getter("decomoji/viewModel") decomoji!: DecomojiViewModel;
  @Getter("collection/viewModel") collection!: CollectionViewModel;

  // アクションを引き当てる
  @Action("collection/remove") remove!: CollectionActions["remove"];

  // @get - コレクションのアイテム数を返す
  get collectionLength() {
    return this.collection.items.length;
  }

  // @get - コレクションを表示するか否かを返す
  get shows() {
    return this.collectionLength > 0;
  }

  // @listen - コレクションからアイテムを削除する
  handleRemove(item: CollectionItem) {
    this.remove(item);
    replaceState(this.collection.collectionQueries);
  }
}
</script>
