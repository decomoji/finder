<template>
  <header class="Header flex items-center p-4">
    <h1>
      <a class="text-xl text-white" href="/">decomoji-finder</a>
    </h1>

    <div class="flex items-center ml-6">
      <label class="sr-only" for="search">検索する</label>
      <div class="relative">
        <input
          id="search"
          :value="ui.search"
          class="__searchInput appearance-none flex-auto rounded p-2 pr-10 leading-tight bg-white bg-opacity-25 focus:bg-white focus:outline-none"
          type="text"
          @input="debounceUpdateSearch($event.target.value)"
        />
        <Icon
          value="search"
          class="__searchIcon absolute top-0 right-0 mt-2 mr-2 text-white"
        />
      </div>
    </div>

    <details class="relative ml-8">
      <summary class="text-white text-sm">サイズ</summary>
      <div
        class="absolute mt-2 py-2 px-3 rounded text-sm whitespace-no-wrap space-y-2 bg-white"
      >
        <label
          v-for="size in displaySizeList"
          :key="size.value"
          class="flex items-baseline"
        >
          <input
            :value="size.value"
            :checked="size.value === ui.size"
            type="radio"
            name="size"
            class="mr-2 leading-tight"
            @change="handleCangeSize(size.value)"
          />
          {{ size.text }}
        </label>
      </div>
    </details>

    <details class="relative ml-8">
      <summary class="text-white text-sm">カテゴリー</summary>
      <div
        class="absolute mt-2 py-2 px-3 rounded text-sm whitespace-no-wrap space-y-2 bg-white"
      >
        <label
          v-for="category in displayCategoryList"
          :key="category.value"
          class="flex items-baseline"
        >
          <input
            :value="category.value"
            :checked="ui.category[category.value]"
            type="checkbox"
            name="category"
            class="mr-2 leading-tight"
            @change="handleClickCategory(category.value)"
          />
          {{ category.text }}
        </label>
      </div>
    </details>

    <details class="relative ml-8">
      <summary class="text-white text-sm">オプション</summary>
      <div
        class="absolute mt-2 py-2 px-3 rounded text-sm whitespace-no-wrap space-y-2 bg-white"
      >
        <label class="flex items-baseline">
          <input
            :value="ui.name"
            :checked="ui.name"
            :disabled="!isDefaultSize"
            type="checkbox"
            class="mr-2 leading-tight"
            @change="handleClickNameShows"
          />
          ファイル名の表示
        </label>
        <label class="flex items-baseline">
          <input
            :value="ui.reacted"
            :checked="ui.reacted"
            type="checkbox"
            class="mr-2 leading-tight"
            @change="handleClickReacted"
          />
          リアクション済みのスタイル
        </label>
        <label class="flex items-baseline">
          <input
            :value="ui.dark"
            :checked="ui.dark"
            type="checkbox"
            class="mr-2 leading-tight"
            @change="handleClickDarkMode"
          />
          ダークモード
        </label>
      </div>
    </details>
  </header>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
import { DefaultSize } from "@/configs/DefaultSize";
import { DisplayCategoryList } from "@/configs/DisplayCategoryList";
import { DisplaySizeList } from "@/configs/DisplaySizeList";
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
  @Action("ui/updateSearch")
  updateSearch!: UiActions["updateSearch"];
  @Action("ui/toggleCategory") toggleCategory!: UiActions["toggleCategory"];
  @Action("ui/toggleDarkMode") toggleDarkMode!: UiActions["toggleDarkMode"];
  @Action("ui/toggleNameShows") toggleNameShows!: UiActions["toggleNameShows"];
  @Action("ui/toggleReacted") toggleReacted!: UiActions["toggleReacted"];
  @Action("ui/updateSize") updateSize!: UiActions["updateSize"];

  /**
   * 内部プロパティを定義する
   */
  displayCategoryList = DisplayCategoryList;
  displaySizeList = DisplaySizeList;
  timer: number = 0;

  /**
   * @get - デフォルトのアイコンサイズが選択されてるか否かを返す
   */
  get isDefaultSize() {
    return this.ui.size === DefaultSize;
  }

  /**
   * @method
   */
  debounceUpdateSearch(query: string) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log(query);
      this.updateSearch(query);
    }, 300);
  }

  handleClickCategory(categoryId: CategoryId) {
    this.toggleCategory(categoryId);
  }

  handleCangeSize(value: IconSizeId) {
    this.updateSize(value);
  }

  handleClickNameShows() {
    if (!this.isDefaultSize) return;
    this.toggleNameShows(this.ui.name);
  }

  handleClickReacted() {
    this.toggleReacted(this.ui.reacted);
  }

  handleClickDarkMode() {
    this.toggleDarkMode(this.ui.dark);
  }
}
</script>
<style lang="sass" scoped>
.Header
  background-color: #290829
  .-dark &
    background-color: #0f0e12

  .__searchInput
    &:focus
      box-shadow: 0 0 0 4px rgba(255,255,255, 0.5)
      + .__searchIcon
        @apply .text-current
</style>
