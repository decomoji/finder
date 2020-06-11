<template>
  <section class="Main">
    <h2 class="VisuallyHidden">デコモジ一覧</h2>
    <div class="__body">
      <template v-for="category in categories">
        <DecomojiButton
          v-for="(name, i) in decomojis[category]"
          v-show="matches(name, category)"
          :key="`${name}_${category}_${i}`"
          :category="category"
          :name="name"
          :name-shows="nameShows"
          :collected="matches(name, category) && collected(name, category)"
          @click="handleClick({ name, category }, $event)"
        />
      </template>
    </div>
  </section>
</template>

<script lang="ts">
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
  categories = AvailableCategories;
  decomojis = AvailableDecomojis;

  // @get - ファイル名を表示するか否かを返す
  get nameShows() {
    return this.decomoji.name && this.decomoji.size === DefaultSize;
  }

  // @method - 検索クエリが空か要素が検索クエリにマッチするかし、カテゴリー選択にマッチすれば true を返す
  matches(name: string, category: CategoryName) {
    return (
      (this.decomoji.search === "" || this.nameMatches(name)) &&
      this.categoryMatches(category)
    );
  }

  // @method - 要素が検索クエリを正規表現にマッチするか否かを返す
  nameMatches(name: string) {
    try {
      return RegExp(this.decomoji.search).test(name);
    } catch (err) {
      throw err;
    }
  }

  // @method - 要素のカテゴリーが表示カテゴリーであるか否かを返す
  categoryMatches(category: CategoryName) {
    const { basic, extra, explicit, preview } = this.decomoji.category;
    return (
      (basic && category === "basic") ||
      (explicit && category === "explicit") ||
      (extra && category === "extra") ||
      (preview && category === "preview")
    );
  }

  // @method - 要素が選択されているか否かを返す
  collected(name: string, category: CategoryName) {
    return this.decomoji.collection.find(
      (v: CollectionItem) => v.name === name && v.category === category
    );
  }

  // @listen - デコモジがクリックされたらコレクション済みかどうかで処理を分ける
  handleClick(item: CollectionItem, collected: boolean) {
    collected ? this.remove(item) : this.add(item);
    replaceState(this.decomoji.collectionQueries);
  }
}
</script>
