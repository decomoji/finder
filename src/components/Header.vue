<template>
  <header
    class="Header fixed inset-x-0 top-0 md:flex md:items-center p-4 space-y-4 md:space-y-0 md:space-x-8"
  >
    <div class="flex items-center space-x-6">
      <h1 class="flex">
        <a
          class="Logo rounded-full focus:outline-none"
          href="/"
          tile="decomoji-finder"
          ><img
            class="rounded-full"
            src="/assets/images/logo.png"
            width="32"
            alt="デコモジロゴ"
        /></a>
        <span class="sr-only ml-4 text-sm sm:text-xl text-gray-400"
          >decomoji-finder</span
        >
      </h1>

      <div class="flex-shrink flex items-center">
        <label class="sr-only" for="search">検索する</label>
        <div class="relative">
          <input
            id="search"
            :value="ui.search"
            :class="[
              '__searchInput appearance-none flex-auto rounded-md p-2 pl-10 leading-tight bg-white bg-opacity-25 focus:bg-white focus:outline-none',
              {
                '-hasValue': ui.search.length > 0
              }
            ]"
            type="text"
            @input="debounceUpdateSearch($event.target.value)"
          />
          <Icon
            value="search"
            class="__searchIcon absolute top-0 left-0 mt-2 ml-2 text-gray-400"
          />
        </div>
      </div>
    </div>

    <div class="flex items-center space-x-8">
      <details class="Tooltip relative">
        <summary
          class="__summary rounded-md p-2 text-gray-400 text-sm focus:outline-none"
          >サイズ</summary
        >
        <div
          class="__detailsPanel absolute mt-2 py-2 px-3 rounded-md text-sm whitespace-no-wrap space-y-2"
        >
          <label
            v-for="size in displaySizeList"
            :key="size.value"
            class="flex items-baseline text-gray-400"
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

      <details class="Tooltip relative">
        <summary
          class="__summary rounded-md p-2 text-gray-400 text-sm focus:outline-none"
          >カテゴリー</summary
        >
        <div
          class="__detailsPanel absolute mt-2 py-2 px-3 rounded-md text-sm whitespace-no-wrap space-y-2"
        >
          <label
            v-for="category in displayCategoryList"
            :key="category.value"
            class="flex items-baseline text-gray-400"
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

      <details class="Tooltip relative">
        <summary
          class="__summary rounded-md p-2 text-gray-400 text-sm focus:outline-none"
          >オプション</summary
        >
        <div
          class="__detailsPanel absolute right-0 md:right-auto mt-2 py-2 px-3 rounded-md text-sm whitespace-no-wrap space-y-2"
        >
          <label class="flex items-baseline text-gray-400">
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
          <label class="flex items-baseline text-gray-400">
            <input
              :value="ui.reacted"
              :checked="ui.reacted"
              type="checkbox"
              class="mr-2 leading-tight"
              @change="handleClickReacted"
            />
            リアクション済みのスタイル
          </label>
          <label class="flex items-baseline text-gray-400">
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
    </div>
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
  background-color: #1f061f
  box-shadow: 0 2px 4px rgba(0,0,0, 0.15), 0 8px 8px rgba(0,0,0, 0.075)
  .-dark &
    background-color: #0e0d10

  .__searchInput
    &.-hasValue
      @apply .text-gray-400
      &:focus
        @apply .text-current
    &:focus
      box-shadow: 0 0 0 4px rgba(255,255,255, 0.5)
      + .__searchIcon
        color: #1f061f

  .__detailsPanel
    background-color: #240726
    box-shadow: 0 0 0 4px #240726
    .-dark &
      background-color: #110f13
      box-shadow: 0 0 0 4px #110f13

.Logo
  &:focus
    box-shadow: 0 0 0 4px rgba(255,255,255, 0.5)

.Tooltip
  .__summary
    &:focus
      box-shadow: 0 0 0 4px rgba(255,255,255, 0.5)
</style>
