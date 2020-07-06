<template>
  <section v-show="shows" class="Collection">
    <div class="__header">
      <div class="__textCol">
        <h2 class="__heading">
          <span aria-hidden="true">コレクション：{{ collectionLength }}</span
          ><span class="VisuallyHidden"
            >コレクション（計{{ collectionLength }}個）</span
          >
        </h2>
        <p class="__desc">
          ダブルクリックするか delete キーでコレクションから外せます。
        </p>
      </div>
      <div class="__actionCol">
        <button
          aria-label="コレクションリンクをクリップボードにコピーする"
          class="__button"
          @click="handleClickCopyCollectionLink"
        >
          <Icon value="link" />
        </button>
        <a :href="downloadURL" class="__button" download="my-collection.json">
          <span class="VisuallyHidden"
            >コレクションをJSON形式でダウンロードする</span
          >
          <Icon value="save_alt" />
        </a>
        <button
          aria-label="コレクションを空にする"
          class="__button"
          @click="handleClickClearCollection"
        >
          <Icon value="delete_forever" />
        </button>
        <button
          aria-label="垂直分割表示を切り替える"
          class="__button -hideInTight"
          @click="handleClickupdateVertical"
        >
          <Icon :value="updateVerticalIconValue" />
        </button>
      </div>
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
  @Action("decomoji/clear") clear!: DecomojiAction["clear"];
  @Action("decomoji/remove") remove!: DecomojiAction["remove"];
  @Action("decomoji/updateVertical")
  updateVertical!: DecomojiAction["updateVertical"];

  // @get - コレクションのアイテム数を返す
  get collectionLength() {
    return this.decomoji.collection.length;
  }

  // @get - コレクションを表示するか否かを返す
  get shows() {
    return this.collectionLength > 0;
  }

  // @get - 垂直分割表示のトグルアイコン文字列を返す
  get updateVerticalIconValue() {
    return this.decomoji.vertical ? "south_west" : "north_east";
  }

  // @get - コレクションのJSONをblob形式で返す
  get downloadURL() {
    const jsonString = JSON.stringify(this.decomoji.formattedJson);
    const blob = new Blob([jsonString], { type: "application/json" });
    return window.URL.createObjectURL(blob);
  }

  // @listen - コレクションリンクをクリップボードにコピーする
  handleClickCopyCollectionLink() {
    window.navigator.clipboard.writeText(window.location.href).then(() => {
      window.alert("コレクションリンクをクリップボードにコピーしました");
    });
  }

  // @listen - コレクションを空にする
  handleClickClearCollection() {
    if (
      window.confirm("コレクションを空にしますか？（この操作は取り消せません）")
    ) {
      this.clear();
      this.updateVertical(false);
      window.dispatchEvent(new Event("resize"));
    }
  }

  // @listen - 垂直分割表示を更新する
  handleClickupdateVertical() {
    this.updateVertical(!this.decomoji.vertical);
    window.dispatchEvent(new Event("resize"));
  }

  // @listen - コレクションからアイテムを削除する
  handleRemove(item: CollectionItem) {
    this.remove(item);
    // アイテムが空になったら垂直分割表示をやめる
    if (this.decomoji.collection.length === 0) {
      this.updateVertical(false);
      window.dispatchEvent(new Event("resize"));
    }
  }
}
</script>
