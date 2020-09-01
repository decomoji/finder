<template>
  <section class="Main">
    <h2 class="VisuallyHidden">デコモジ一覧</h2>
    <RecycleScroller
      v-if="gridColumnLength > 0"
      v-slot="{ index: row }"
      :items="dummyRowsForVirtualScroll"
      :item-size="gridRowHeight"
      :buffer="bufferHeight"
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
import DecomojiButton from "@/components/DecomojiButton.vue";
import { AvailableCategories } from "@/configs/AvailableCategories";
import { AvailableDecomojis } from "@/configs/AvailableDecomojis";
import {
  GridContainerPaddingValue,
  GridItemGapValue,
  GridMinItemWidthValue,
  GridRowHeightValue,
} from "@/configs/GridSizeValue";
import { CategoryName } from "@/models/CategoryName";
import { CollectionItem } from "@/models/Collection";
import { Decomoji } from "@/models/Decomoji";
import {
  DecomojiAction,
  DecomojiViewModel,
} from "@/store/modules/decomoji/models";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    DecomojiButton,
  },
})
export default class Main extends Vue {
  // viewModel を引き当てる
  @Getter("decomoji/viewModel") decomoji!: DecomojiViewModel;

  // アクションを引き当てる
  @Action("decomoji/add") add!: DecomojiAction["add"];
  @Action("decomoji/remove") remove!: DecomojiAction["remove"];
  @Action("decomoji/updateResult")
  updateResult!: DecomojiAction["updateResult"];
  @Action("decomoji/updateVertical")
  updateVertical!: DecomojiAction["updateVertical"];

  // 内部プロパティを定義する
  decomojis = AvailableDecomojis;
  gridContainerWidth = window.innerWidth;
  bufferHeight = window.innerHeight / 2;

  // @get - 一覧に表示するデコモジ
  get filteredDecomojis() {
    const filterd = this.decomojis.filter((v) =>
      this.matches(v.name, v.category)
    );
    this.updateResult(filterd.length);
    return filterd;
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

  // @get - 1行分の高さを返す
  get gridRowHeight() {
    return GridRowHeightValue[this.decomoji.size];
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

  // @watch - 項目が減って虚無を表示していたらスクロール位置を戻す
  @Watch("filteredDecomojis")
  scrollToSeeList(newList: Decomoji[], oldList: Decomoji[]) {
    if (newList.length > oldList.length) {
      return;
    }

    const el = document.documentElement;
    const screenHeight = el.clientHeight;

    if (!(this.$el instanceof HTMLElement)) {
      throw new Error("Component must be rendered as an HTMLElement");
    }
    const headerHeight = this.$el.offsetTop; // ということにする

    const numOfRows = this.dummyRowsForVirtualScroll.length;
    const listHeight = this.gridRowHeight * numOfRows;
    const maxScrollTop = headerHeight + listHeight - screenHeight; // 下部paddingは省略

    el.scrollTop = Math.min(el.scrollTop, maxScrollTop);
  }

  // @method - 一覧領域の幅と高さを更新
  updateGridContainerSize() {
    this.$nextTick(() => {
      this.gridContainerWidth = this.$el.clientWidth;
      this.bufferHeight = window.innerHeight / 2;
    });
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
    const { basic, extra, explicit } = this.decomoji.category;
    return (
      (basic && category === "basic") ||
      (explicit && category === "explicit") ||
      (extra && category === "extra")
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
  }

  // @listen - デコモジをコレクションから削除する
  handleRemove(item: CollectionItem) {
    this.remove(item);
    // アイテムが空になったら垂直分割表示をやめる
    if (this.decomoji.collection.length === 0) {
      this.updateVertical(false);
      window.dispatchEvent(new Event("resize"));
    }
  }

  // @lifecycle
  mounted() {
    window.addEventListener("resize", this.updateGridContainerSize);
    this.updateGridContainerSize();
  }

  // @lifecycle
  destroyed() {
    window.removeEventListener("resize", this.updateGridContainerSize);
  }
}
</script>
