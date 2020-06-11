<template>
  <section class="Main">
    <h2 class="VisuallyHidden">デコモジ一覧</h2>
    <DynamicScroller :items="decomojis" :min-item-size="24" class="scroller">
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.name]"
          :data-index="index"
        >
          <!-- <DecomojiButton
            v-show="matches(item.name, item.category)"
            :category="item.category"
            :name="item.name"
            :name-shows="nameShows"
            :collected="matches(item.name, item.category) && collected(item.name, item.category)"
            @add="handleAdd(item)"
            @remove="handleRemove(item)"
          /> -->
          {{ index }}: {{ item }} _ {{ active }}
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </section>
</template>

<script lang="ts">
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import DecomojiButton from "@/components/DecomojiButton.vue";
import { AvailableCategories } from "@/configs/AvailableCategories";
import { AvailableDecomojis } from "@/configs/AvailableDecomojis";
import { DefaultSize } from "@/configs/DefaultSize";
import { CategoryName } from "@/models/CategoryName";
import { CollectionItem } from "@/models/Collection";
import {
  DecomojiAction,
  DecomojiViewModel
} from "@/store/modules/decomoji/models";
import { replaceState } from "@/utilities/replaceState";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    DecomojiButton
  }
})
export default class Main extends Vue {
  // viewModel を引き当てる
  @Getter("decomoji/viewModel") decomoji!: DecomojiViewModel;

  // アクションを引き当てる
  @Action("decomoji/add") add!: DecomojiAction["add"];
  @Action("decomoji/remove") remove!: DecomojiAction["remove"];

  // 内部プロパティを定義する
  decomojis = AvailableDecomojis;

  // @get - ファイル名を表示するか否かを返す
  get nameShows() {
    return this.decomoji.name && this.decomoji.size === DefaultSize;
  }

  // @method - 検索クエリが空であるか検索クエリがデコモジ名にマッチしているかし、かつカテゴリー選択にマッチしていれば true を返す
  matches(name: string, category: CategoryName) {
    return (
      (this.decomoji.search === "" || this.nameMatches(name)) &&
      this.categoryMatches(category)
    );
  }

  // @method - デコモジが検索クエリを正規表現にマッチするか否かを返す
  nameMatches(name: string) {
    try {
      return RegExp(this.decomoji.search).test(name);
    } catch (err) {
      throw err;
    }
  }

  // @method - デコモジのカテゴリーが表示カテゴリーであるか否かを返す
  categoryMatches(category: CategoryName) {
    const { basic, extra, explicit, preview } = this.decomoji.category;
    return (
      (basic && category === "basic") ||
      (explicit && category === "explicit") ||
      (extra && category === "extra") ||
      (preview && category === "preview")
    );
  }

  // @method - デコモジがコレクションされているか否かを返す
  collected(name: string, category: CategoryName) {
    return this.decomoji.collection.find(
      (v: CollectionItem) => v.name === name && v.category === category
    );
  }

  // @listen - デコモジがをコレクションに追加する
  handleAdd(item: CollectionItem) {
    this.add(item);
    replaceState(this.decomoji.collectionQueries);
  }

  // @listen - デコモジをコレクションから削除する
  handleRemove(item: CollectionItem) {
    this.remove(item);
    replaceState(this.decomoji.collectionQueries);
  }
}
</script>

<style scoped>
.scroller {
  height: 100%;
}
</style>
