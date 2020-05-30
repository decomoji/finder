<template>
  <header class="Header flex items-center p-4">
    <h1>
      <a class="text-xl text-white" href="/">decomoji-finder</a>
    </h1>

    <div class="flex items-center ml-6">
      <label class="sr-only" for="search">検索する</label>
      <input
        id="search"
        class="__search appearance-none flex-auto rounded p-2 leading-tight bg-white bg-opacity-25 focus:bg-white focus:outline-none"
        type="text"
        :value="ui.searchQuery"
        @input="debounceUpdateSearchQuery($event)"
      />
      <Icon value="search" class="ml-2 text-white" />
    </div>

    <div class="relative ml-6">
      <p class="text-white text-sm">サイズ</p>
      <div
        class="absolute bg-white bg-opacity-75 rounded py-2 px-3 text-sm whitespace-no-wrap space-y-1"
      >
        <label class="flex items-baseline">
          <input type="radio" name="iconSize" class="mr-2 leading-tight" />
          64px
        </label>
        <label class="flex items-baseline">
          <input type="radio" name="iconSize" class="mr-2 leading-tight" />
          32px
        </label>
        <label class="flex items-baseline">
          <input type="radio" name="iconSize" class="mr-2 leading-tight" />
          16px
        </label>
      </div>
    </div>

    <div class="relative ml-6">
      <p class="text-white text-sm">カテゴリー</p>
      <div
        class="absolute bg-white bg-opacity-75 rounded py-2 px-3 text-sm whitespace-no-wrap space-y-1"
      >
        <label class="flex items-baseline">
          <input type="checkbox" class="mr-2 leading-tight" />
          Basic
        </label>
        <label class="flex items-baseline">
          <input type="checkbox" class="mr-2 leading-tight" />
          Extra
        </label>
        <label class="flex items-baseline">
          <input type="checkbox" class="mr-2 leading-tight" />
          Preview
        </label>
      </div>
    </div>

    <div class="relative ml-6">
      <p class="text-white text-sm">オプション</p>
      <div
        class="absolute bg-white bg-opacity-75 rounded py-2 px-3 text-sm whitespace-no-wrap space-y-1"
      >
        <label class="flex items-baseline">
          <input type="checkbox" class="mr-2 leading-tight" />
          ファイル名の表示
        </label>
        <label class="flex items-baseline">
          <input type="checkbox" class="mr-2 leading-tight" />
          リアクション済みのスタイル
        </label>
        <label class="flex items-baseline">
          <input type="checkbox" class="mr-2 leading-tight" />
          ダークモード
        </label>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
import { DefaultIconSize } from "@/configs/DefaultIconSize";
import { DrawerCategoryList } from "@/configs/DrawerCategoryList";
import { DrawerIconSizeList } from "@/configs/DrawerIconSizeList";
import { CategoryId } from "@/models/CategoryId";
import { IconSizeId } from "@/models/IconSizeId";
import { IconSizeItem } from "@/models/IconSizeItem";
import { UiActions, UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    Icon
  }
})
export default class Header extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;

  /**
   * アクションを引き当てる
   */
  @Action("ui/updateSearchQuery")
  updateSearchQuery!: UiActions["updateSearchQuery"];
  @Action("ui/toggleCategory") toggleCategory!: UiActions["toggleCategory"];
  @Action("ui/toggleDarkMode") toggleDarkMode!: UiActions["toggleDarkMode"];
  @Action("ui/toggleNameShows") toggleNameShows!: UiActions["toggleNameShows"];
  @Action("ui/toggleReacted") toggleReacted!: UiActions["toggleReacted"];
  @Action("ui/updateIconSize") updateIconSize!: UiActions["updateIconSize"];

  /**
   * 内部プロパティを定義する
   */
  drawerCategoryList = DrawerCategoryList;
  drawerIconSizeList = DrawerIconSizeList;

  /**
   * @get - デフォルトのアイコンサイズが選択されてるか否かを返す
   */
  get defaultIconSizeSelects() {
    return this.ui.iconSize === DefaultIconSize;
  }

  /**
   * @method
   */
  debounceUpdateSearchQuery(query: string) {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.updateSearchQuery(query);
    }, 300);
  }

  handleClickCategory(categoryId: CategoryId) {
    this.toggleCategory(categoryId);
  }

  handleClickDarkMode() {
    this.toggleDarkMode(this.ui.dark);
  }

  handleCangeIconSize(value: IconSizeId) {
    this.updateIconSize(value);
  }

  handleClickNameShows() {
    if (!this.defaultIconSizeSelects) return;
    this.toggleNameShows(this.ui.name);
  }

  handleClickReacted() {
    this.toggleReacted(this.ui.reacted);
  }
}
</script>
<style lang="sass" scoped>
.Header
  background-color: #290829
  .-dark &
    background-color: #0f0e12

  .__search
    &:focus
      box-shadow: 0 0 0 4px rgba(255,255,255, 0.5)
</style>
