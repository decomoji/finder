<template>
  <section v-show="shows" class="Collection">
    <div class="__header">
      <h2 class="__heading">コレクション</h2>
      <p class="__desc">
        ダブルクリックするか delete キーでコレクションから外せます
      </p>
      <button
        aria-label="垂直分割表示を切り替える"
        class="__toggle"
        @click="handleClickToggleVerticalDivine"
      >
        <Icon :value="toggleVerticalDivineIconValue" />
      </button>
    </div>
    <div class="__body">
      <DecomojiButton
        v-for="(item, i) in decomoji.collection"
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
import Icon from "@/components/Icon.vue";
import { CollectionItem } from "@/models/Collection";
import { CategoryName } from "@/models/CategoryName";
import {
  DecomojiAction,
  DecomojiViewModel,
} from "@/store/modules/decomoji/models";
import { isStringOfNotEmpty } from "@/utilities/isString";
import { replaceState } from "@/utilities/replaceState";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    DecomojiButton,
    Icon,
  },
})
export default class Collection extends Vue {
  // viewModel を引き当てる
  @Getter("decomoji/viewModel") decomoji!: DecomojiViewModel;

  // アクションを引き当てる
  @Action("decomoji/remove") remove!: DecomojiAction["remove"];
  @Action("decomoji/toggleVerticalDivine")
  toggleVerticalDivine!: DecomojiAction["toggleVerticalDivine"];

  // @get - コレクションのアイテム数を返す
  get collectionLength() {
    return this.decomoji.collection.length;
  }

  // @get - コレクションを表示するか否かを返す
  get shows() {
    return this.collectionLength > 0;
  }

  // @get - 垂直分割表示のトグルアイコン文字列を返す
  get toggleVerticalDivineIconValue() {
    return this.decomoji.vertical ? "south_west" : "north_east";
  }

  // @listen - 垂直分割表示をトグルする
  handleClickToggleVerticalDivine() {
    this.toggleVerticalDivine();
    // Main.vue の updateGridContainerWidth() を呼び出すために resize イベントを発行する
    window.dispatchEvent(new Event("resize"));
  }

  // @listen - コレクションからアイテムを削除する
  handleRemove(item: CollectionItem) {
    this.remove(item);
    replaceState(this.decomoji.collectionQueries);
  }
}
</script>
