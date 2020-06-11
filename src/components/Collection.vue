<template>
  <section v-show="shows" class="Collection">
    <div class="__header">
      <h2 class="__heading">コレクション</h2>
      <p class="__desc">
        ダブルクリックするか delete キーでコレクションから外せます
      </p>
    </div>
    <div class="__body">
      <DecomojiCollectionButton
        v-for="(item, i) in collection.items"
        :key="`${item.name}_${item.category}_${i}`"
        :category="item.category"
        :name="item.name"
        :collected="collected(item.name, item.category)"
        @remove="handleRemove(item)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import DecomojiCollectionButton from "@/components/DecomojiCollectionButton.vue";
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

@Component({
  components: {
    DecomojiCollectionButton
  }
})
export default class Collection extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;
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

  // @method - 要素が選択されているか否かを返す
  collected(name: string, category: string) {
    return (
      this.collection.items.findIndex(
        (colleted: DecomojiCollectionItem) =>
          colleted.name === name && colleted.category === category
      ) > -1
    );
  }

  // @listen - コレクションからアイテムを削除する
  handleRemove(item: DecomojiCollectionItem) {
    this.remove(item);
    replaceState(this.collection.collectionQueries);
  }
}
</script>
