<template>
  <section class="Main">
    <h2 class="VisuallyHidden">デコモジ一覧</h2>
    <RecycleScroller
      v-if="gridColumnLength > 0"
      v-slot="{ index: row }"
      :items="dummyRowsForVirtualScroll"
      :item-size="140"
      class="scroller"
      key-field="id"
      page-mode
    >
      <div class="__decomojiRow">
        <DecomojiButton
          v-for="item in getRowDecomojis(row)"
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
    </RecycleScroller>
  </section>
</template>

<script lang="ts">
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import DecomojiButton from "@/components/DecomojiButton.vue";
import { AvailableCategories } from "@/configs/AvailableCategories";
import { AvailableDecomojis } from "@/configs/AvailableDecomojis";
import { DefaultSize } from "@/configs/DefaultSize";
import {
  GridContainerPaddingValue,
  GridItemGapValue,
  GridMinItemWidthValue
} from "@/configs/GridSizeValue";
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
  gridContainerWidth = 0;

  // @get - 一覧に表示するデコモジ
  get filteredDecomojis() {
    return AvailableDecomojis.filter(v => this.matches(v.name, v.category));
  }

  // @get - virtual scrollに与えるダミー。行だけ出してもらい列は自前で制御するので
  get dummyRowsForVirtualScroll() {
    const length = Math.ceil(
      this.filteredDecomojis.length / this.gridColumnLength
    );
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push({ id: i, name: `#${i}` });
    }
    return arr;
  }

  // @get - CSS Grid container の padding 値を返す
  get gridContainerPadding() {
    return GridContainerPaddingValue[this.decomoji.size];
  }

  // @get - CSS Grid item の gap 値を返す
  get gridItemGap() {
    return GridItemGapValue[this.decomoji.size];
  }

  // @get - CSS Grid item 幅の最小値を返す
  get gridMinItemWidth() {
    return GridMinItemWidthValue[this.decomoji.size];
  }

  // @get - 1行に入る項目数
  get gridColumnLength() {
    const gridItemWidth = this.gridMinItemWidth + this.gridItemGap;
    const gridContainerVirtualWidth =
      this.gridContainerWidth +
      this.gridItemGap -
      this.gridContainerPadding * 2;
    return Math.floor(gridContainerVirtualWidth / gridItemWidth);
  }

  // @get - 1行分のデコモジ情報配列を得る関数
  get getRowDecomojis() {
    // TODO memoize
    return (index: number) => {
      const start = this.gridColumnLength * index;
      const end = start + this.gridColumnLength;
      return this.filteredDecomojis.slice(start, end);
    };
  }

  // @get - ファイル名を表示するか否かを返す
  get nameShows() {
    return this.decomoji.name && this.decomoji.size === DefaultSize;
  }

  // @method - 一覧領域の幅情報を更新
  updateGridContainerWidth() {
    const el = this.$el;
    this.gridContainerWidth = el.clientWidth;
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

  // @lifecycle
  mounted() {
    window.addEventListener("resize", this.updateGridContainerWidth);
    this.updateGridContainerWidth();
  }

  // @lifecycle
  destroyed() {
    window.removeEventListener("resize", this.updateGridContainerWidth);
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
