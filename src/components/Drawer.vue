<template>
  <div app clipped dark fixed permanent class="Drawer">
    <div>
      <div>表示カテゴリー</div>
      <div
        v-for="category in drawerCategoryList"
        :key="category.id"
        ripple
        @click="handleClickCategory(category.id)"
      >
        <input
          :input-value="ui.category[category.id]"
          :label="`${category.name}（${category.id}）`"
          :value="ui.category[category.id]"
          class="__check"
          @change="() => {}"
        />
      </div>
    </div>
    <hr />
    <div subheader>
      <div>アイコンサイズ</div>
      <div>
        <select
          :items="drawerIconSizeList"
          :value="ui.iconSize"
          color="accent"
          item-text="label"
          item-value="value"
          label="アイコンサイズ"
          menu-props="auto"
          single-line
          @input="handleClickIconSize"
        />
      </div>
    </div>
    <hr />
    <div subheader>
      <div>表示オプション</div>
      <div ripple @click="handleClickNameShows">
        <input
          :input-value="ui.name"
          :disabled="!defaultIconSizeSelects"
          class="__check"
          label="ファイル名の表示"
          @change="() => {}"
        />
      </div>
      <div ripple @click="handleClickReacted">
        <input
          :input-value="ui.reacted"
          class="__check"
          label="リアクション済みのスタイル"
          @change="() => {}"
        />
      </div>
      <div ripple @click="handleClickDarkMode">
        <input
          :input-value="ui.dark"
          class="__check"
          label="ダークモード"
          @change="() => {}"
        />
      </div>
      <div>
        <p class="__desc">テーマはSlackのAubergineをエミュレートしています。</p>
      </div>
      <div>
        <p class="__github">
          <a
            href="https://github.com/decomoji/decomoji-finder/"
            target="_blacnk"
            rel="noopener"
            >GitHub</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DefaultSize } from "@/configs/DefaultSize";
import { CategoryId } from "@/models/CategoryId";
import { IconSizeId } from "@/models/IconSizeId";
import { IconSizeItem } from "@/models/IconSizeItem";
import { DisplayCategoryList } from "@/configs/DisplayCategoryList";
import { DisplaySizeList } from "@/configs/DisplaySizeList";
import { UiActions, UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Drawer extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;

  /**
   * アクションを引き当てる
   */
  @Action("ui/toggleCategory") toggleCategory!: UiActions["toggleCategory"];
  @Action("ui/toggleDarkMode") toggleDarkMode!: UiActions["toggleDarkMode"];
  @Action("ui/toggleNameShows") toggleNameShows!: UiActions["toggleNameShows"];
  @Action("ui/toggleReacted") toggleReacted!: UiActions["toggleReacted"];
  @Action("ui/updateIconSize") updateIconSize!: UiActions["updateIconSize"];

  /**
   * 内部プロパティを定義する
   */
  drawerCategoryList = DisplayCategoryList;
  drawerIconSizeList = DisplaySizeList;

  /**
   * @get - デフォルトのアイコンサイズが選択されてるか否かを返す
   */
  get defaultIconSizeSelects() {
    return this.ui.iconSize === DefaultSize;
  }

  /**
   * @listens VCheckbox[v-model=ui.category[id]].change
   * @listens div.click
   */
  handleClickCategory(categoryId: CategoryId) {
    this.toggleCategory(categoryId);
  }

  /**
   * @listens VCheckbox[v-model=ui.dark].change
   * @listens div.click
   */
  handleClickDarkMode() {
    this.toggleDarkMode(this.ui.dark);
  }

  /**
   * @listens VRadio.click
   */
  handleClickIconSize(value: IconSizeId) {
    this.updateIconSize(value);
  }

  /**
   * @listens VCheckbox[v-model=ui.name].change
   * @listens div.click
   */
  handleClickNameShows() {
    if (!this.defaultIconSizeSelects) return;
    this.toggleNameShows(this.ui.name);
  }

  /**
   * @listens VCheckbox[v-model=ui.reacted].change
   * @listens div.click
   */
  handleClickReacted() {
    this.toggleReacted(this.ui.reacted);
  }
}
</script>
<style lang="sass" scoped>
.Drawer
  .theme--light &
    background-color: #300832
  .theme--dark &
    background-color: #141217
  .__check
    pointer-events: none
  .__desc
    margin-bottom: 0
  .__github
    margin-bottom: 0
    a:link,
    a:visited,
    a:hover,
    a:active
      color: #ffffff
</style>
