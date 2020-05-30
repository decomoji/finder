<template>
  <div
    :value="value"
    :mini-variant.sync="shrink"
    :mini-variant-width="width"
    app
    fixed
    permanent
    right
    class="Collection"
  >
    <div class="__scrollable">
      <div>
        <div>
          <div>
            <VBtn icon @click.stop="shrink = !shrink">
              <div>{{ expandIconName }}</div>
            </VBtn>
          </div>
          <div>
            <div>コレクション</div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div v-if="!shrink && collection.items.length > 0">
          <span class="body-1"
            >ダブルクリックするか delete キーでコレクションから外せます。</span
          >
        </div>
        <div :class="['__list', `-${ui.iconSize}`]">
          <button
            v-for="(item, i) in collection.items"
            :key="`${item.name}_${item.category}_${i}`"
            :class="['__item', `-${ui.iconSize}`]"
            @dblclick="handleDbclickItem(item)"
            @keydown.delete="handleDeleteItem(item)"
          >
            <img
              :alt="item.name"
              :src="`/decomoji/${item.category}/${item.name}.png`"
              :class="`__icon -${ui.iconSize}`"
              width="64"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DefaultIconSize } from "@/configs/DefaultIconSize";
import {
  DecomojiCollection,
  DecomojiCollectionItem
} from "@/models/DecomojiCollection";
import { QueryObject } from "@/models/QueryObject";
import { UiViewModel } from "@/store/modules/ui/models";
import {
  CollectionActions,
  CollectionViewModel
} from "@/store/modules/collection/models";
import { isStringOfNotEmpty } from "@/utilities/isString";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Collection extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;
  @Getter("collection/viewModel") collection!: CollectionViewModel;

  // アクションを引き当てる
  @Action("collection/remove") remove!: CollectionActions["remove"];
  @Action("collection/receive") receive!: CollectionActions["receive"];

  /**
   * 入力プロパティを定義する
   */
  @Prop() query!: QueryObject;

  shrink = true;
  value = true;

  /**
   * @get - ドロワーを閉じたときの最小幅を返す
   */
  get width() {
    return window.innerWidth - document.documentElement.clientWidth ? 100 : 84;
  }

  /**
   * @get - ドロワーの開閉ボタンのアイコン名を返す
   */
  get expandIconName() {
    return this.shrink ? "keyboard_arrow_left" : "keyboard_arrow_right";
  }

  /**
   * @listens - button.dbclick
   */
  handleDbclickItem(item: DecomojiCollectionItem) {
    this.removeItem(item);
  }

  /**
   * @listens - button.keydown
   */
  handleDeleteItem(item: DecomojiCollectionItem) {
    this.removeItem(item);
  }

  /**
   * @method
   */
  removeItem(item: DecomojiCollectionItem) {
    this.remove(item);

    window.history.replaceState(
      {},
      "",
      "?" + this.collection.collectionQueries
    );
  }

  handleClickDownloadManagerList() {}
  handleClickDownloadAliasList() {}

  created() {
    // パラメータをパースしてコレクションに追加する
    const { basic, extra, explicit, preview } = this.query;
    const _basic = basic
      ? basic.split(",").map((name: string) => ({ name, category: "basic" }))
      : [];
    const _extra = extra
      ? extra.split(",").map((name: string) => ({ name, category: "extra" }))
      : [];
    const _explicit = explicit
      ? explicit
          .split(",")
          .map((name: string) => ({ name, category: "explicit" }))
      : [];
    const _preview = preview
      ? preview
          .split(",")
          .map((name: string) => ({ name, category: "preview" }))
      : [];

    return this.receive([..._basic, ..._extra, ..._explicit, ..._preview]);
  }
}
</script>

<style lang="sass" scoped>
.Collection
  .theme--light &
    background-color: #f4f4f4
  .theme--dark &
    background-color: #1a1c20
  .__scrollable
    height: 100%
    overflow-y: auto
  .__list
    display: grid
    grid-auto-rows: auto
    padding: 10px
    overflow-x: hidden
    &.-l
      gap: 10px
      grid-template-columns: repeat(auto-fill, minmax(64px, 1fr))
    &.-m
      gap: 5px
      grid-template-columns: repeat(auto-fill, minmax(32px, 1fr))
    &.-s
      gap: 3px
      grid-template-columns: repeat(auto-fill, minmax(16px, 1fr))

  .__item
    padding: 5px
    border: 1px solid transparent
    border-radius: 4px
    line-height: 1
    text-align: center
    transition: box-shadow 0.03s ease-out

    &.-s
      padding: 0

    .theme--light &
      background-color: #ffffff
    .theme--dark &
      background-color: #15171a

    &:focus
      outline: 0;
      .theme--light &
        box-shadow: inset 0 0 0 4px #adbfca
      .theme--dark &
        box-shadow: inset 0 0 0 4px #5c7280

  .__icon
    width: 100%
    vertical-align: top
    &.-l
      max-width: 64px
    &.-m
      max-width: 32px
    &.-s
      max-width: 16px
</style>
