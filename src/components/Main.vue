<template>
  <section class="Main">
    <h2 class="VisuallyHidden">デコモジ一覧</h2>
    <DynamicScroller
      v-if="numColumns > 0"
      :items="dummyRowsForVirtualScroll"
      :min-item-size="135"
      page-mode
      class="scroller"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.name]"
          :data-index="index"
        >
          <div class="__decomojiRow">
            <DecomojiButton
              v-for="item in getRowDecomojis(index)"
              :key="item.id"
              :category="item.category"
              :name="item.name"
              :name-shows="nameShows"
              :collected="
                matches(item.name, item.category) &&
                  collected(item.name, item.category)
              "
              @add="handleAdd(item)"
              @remove="handleRemove(item)"
            />
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </section>
</template>

<script lang="ts">
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
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

  // 一覧領域の幅
  containerWidth = 0;

  // @get - 一覧に表示するデコモジ
  get filteredDecomojis() {
    return AvailableDecomojis.filter(v => this.matches(v.name, v.category));
  }

  // @get - virtual scrollに与えるダミー。行だけ出してもらい列は自前で制御するので
  get dummyRowsForVirtualScroll() {
    const length = Math.ceil(this.filteredDecomojis.length / this.numColumns);
    return Array.from({ length }).fill(0);
  }

  // @get - CSSの設定値
  get minItemWidth() {
    // TODO
    return 128;
  }

  // @get - CSSの設定値
  get itemGap() {
    // TODO
    return 10;
  }

  // @get - CSSの設定値
  get containerPadding() {
    // TODO
    return 10;
  }

  // @get - 1行に入る項目数
  get numColumns() {
    const itemWidth = this.minItemWidth + this.itemGap;
    const containerVirtualWidth =
      this.containerWidth + this.itemGap - this.containerPadding * 2;
    return Math.floor(containerVirtualWidth / itemWidth);
  }

  // @get - 1行分のデコモジ情報配列を得る関数
  get getRowDecomojis() {
    // TODO memoize
    return (index: number) => {
      const start = this.numColumns * index;
      const end = start + this.numColumns;
      return this.filteredDecomojis.slice(start, end);
    };
  }

  // @get - ファイル名を表示するか否かを返す
  get nameShows() {
    return this.decomoji.name && this.decomoji.size === DefaultSize;
  }

  mounted() {
    window.addEventListener("resize", this.updateContainerWidth);
    this.updateContainerWidth();
  }

  destroyed() {
    window.removeEventListener("resize", this.updateContainerWidth);
  }

  // @method - 一覧領域の幅情報を更新
  updateContainerWidth() {
    const el = this.$el;
    this.containerWidth = el.clientWidth;
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

<style>
.scroller {
  height: 100%;
}
.vue-recycle-scroller__item-wrapper {
  display: grid;
  grid-auto-flow: row;
}
.-l .vue-recycle-scroller__item-wrapper {
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
  padding: 10px;
}
.-m .vue-recycle-scroller__item-wrapper {
  gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(42px, 1fr));
  padding: 5px;
}
.-s .vue-recycle-scroller__item-wrapper {
  gap: 3px;
  grid-template-columns: repeat(auto-fill, minmax(24px, 1fr));
  padding: 3px;
}
</style>
