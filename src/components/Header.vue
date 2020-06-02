<template>
  <header
    :class="[
      'fixed inset-x-0 top-0 md:flex md:items-center p-3 pb-1 md:p-4 space-y-1 md:space-y-0 md:space-x-6 shadow-bottom',
      {
        'bg-aubergine-900': !ui.dark,
        'bg-night-900': ui.dark
      }
    ]"
  >
    <div class="md:w-1/2 flex items-center space-x-3 md:space-x-6">
      <h1 class="flex flex-shrink-0">
        <a
          class="Logo rounded-full focus:outline-none focus:shadow-shade-100-op50"
          href="/"
          tile="デコモジファインダー"
          ><img
            class="rounded-full"
            src="/assets/images/logo.png"
            width="32"
            alt="デコモジ"
        /></a>
        <span class="sr-only">デコモジファインダー</span>
      </h1>

      <div class="flex-grow flex items-center">
        <label class="sr-only" for="search">検索する</label>
        <div class="flex-grow relative text-gray-300 focus-within:text-current">
          <input
            id="search"
            :value="ui.search"
            class="appearance-none rounded-md p-2 pl-10 w-full text-gray-300 leading-tight bg-white bg-opacity-25 focus:text-current focus:bg-white focus:outline-none focus:shadow-shade-100-op50"
            type="text"
            @input="debounceUpdateSearch($event.target.value)"
          />
          <Icon class="absolute top-0 left-0 mt-2 ml-2" value="search" />
        </div>
      </div>
    </div>

    <div
      class="flex-shrink flex items-center md:ml-auto space-x-3 md:space-x-8"
    >
      <details class="relative">
        <summary
          class="rounded-md p-2 text-gray-400 text-sm focus:outline-none focus:shadow-shade-100-op50"
          >サイズ</summary
        >
        <div
          :class="[
            'absolute mt-2 py-4 px-5 rounded-md text-sm whitespace-no-wrap space-y-2',
            {
              'bg-aubergine-800': !ui.dark,
              'bg-night-800': ui.dark
            }
          ]"
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

      <details class="relative">
        <summary
          class="rounded-md p-2 text-gray-400 text-sm focus:outline-none focus:shadow-shade-100-op50"
          >カテゴリー</summary
        >
        <div
          :class="[
            'absolute mt-2 py-4 px-5 rounded-md text-sm whitespace-no-wrap space-y-2',
            {
              'bg-aubergine-800': !ui.dark,
              'bg-night-800': ui.dark
            }
          ]"
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

      <details class="relative">
        <summary
          class="rounded-md p-2 text-gray-400 text-sm focus:outline-none focus:shadow-shade-100-op50"
          >オプション</summary
        >
        <div
          :class="[
            'absolute right-0 mt-2 py-4 px-5 rounded-md text-sm whitespace-no-wrap space-y-2',
            {
              'bg-aubergine-800': !ui.dark,
              'bg-night-800': ui.dark
            }
          ]"
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

  /**
   * @listen - 表示カテゴリーを選択する
   */
  handleClickCategory(categoryId: CategoryId) {
    this.toggleCategory(categoryId);
  }

  /**
   * @listen - 表示サイズを選択する
   */
  handleCangeSize(value: IconSizeId) {
    this.updateSize(value);
  }

  /**
   * @listen - ファイル名表示を選択する
   */
  handleClickNameShows() {
    if (!this.isDefaultSize) return;
    this.toggleNameShows(this.ui.name);
  }

  /**
   * @listen - リアクション済み表示を選択する
   */
  handleClickReacted() {
    this.toggleReacted(this.ui.reacted);
  }

  /**
   * @listen - ダークモード表示を選択する
   */
  handleClickDarkMode() {
    this.toggleDarkMode(this.ui.dark);
  }
}
</script>
