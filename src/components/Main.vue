<template>
  <main>
    <h2 class="VisuallyHidden">デコモジ一覧</h2>
    <template v-for="category in categories">
      <DecomojiButton
        v-for="(name, i) in decomojis[category]"
        v-show="matched(name, category)"
        :key="`${name}_${category}_${i}`"
        :category="category"
        :name="name"
        :name-shows="nameShows"
        @add="handleAdd({ name, category })"
      />
    </template>
  </main>
</template>

<script lang="ts">
import DecomojiButton from "@/components/DecomojiButton.vue";
import { DecomojiBasic } from "@/configs/DecomojiBasic";
import { DecomojiExplicit } from "@/configs/DecomojiExplicit";
import { DecomojiExtra } from "@/configs/DecomojiExtra";
import { DecomojiPreview } from "@/configs/DecomojiPreview";
import { DefaultSize } from "@/configs/DefaultSize";
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
    return this.ui.name && this.ui.size === DefaultSize;
  }

  /**
   * @method - 要素が選択されているか否かを返す
   */
  collected(item: DecomojiCollectionItem) {
    return (
      this.collection.items.findIndex(
        (colleted: DecomojiCollectionItem) =>
          colleted.name === item.name && colleted.category === item.category
      ) > -1
    );
  }

  /**
   * @method - 検索クエリが空か要素が検索クエリにマッチするかし、カテゴリー選択にマッチすれば true を返す
   */
  matched(name: string, category: CategoryId) {
    return (
      (this.ui.search === "" || this.nameMatched(name)) &&
      this.categoryMatched(category)
    );
  }

  /**
   * @method - 要素が検索クエリを正規表現にマッチするか否かを返す
   */
  nameMatched(name: string) {
    try {
      return RegExp(this.ui.search).test(name);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method - 要素のカテゴリーが表示カテゴリーであるか否かを返す
   */
  categoryMatched(category: CategoryId) {
    const { basic, extra, explicit, preview } = this.ui.category;
    return (
      (basic && category === "basic") ||
      (explicit && category === "explicit") ||
      (extra && category === "extra") ||
      (preview && category === "preview")
    );
  }

  /**
   * @method - 要素をクリックした時
   */
  handleAdd(item: DecomojiCollectionItem) {
    this.collected(item) ? this.remove(item) : this.add(item);
    replaceState(this.collection.collectionQueries);
  }
}
</script>
