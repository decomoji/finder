<template>
  <header class="Header">
    <div>
      <h1>
        <a href="/" tile="デコモジファインダー"
          ><img src="/assets/images/logo.png" width="32" alt="デコモジ"
        /></a>
        <span class="VisuallyHidden">デコモジファインダー</span>
      </h1>

      <Search />
    </div>

    <div>
      <details>
        <summary>サイズ</summary>
        <div>
          <label v-for="size in displaySizeList" :key="size.value">
            <input
              :value="size.value"
              :checked="size.value === ui.size"
              type="radio"
              name="size"
              @change="handleCangeSize(size.value)"
            />
            {{ size.text }}
          </label>
        </div>
      </details>

      <details>
        <summary>カテゴリー</summary>
        <div>
          <label v-for="category in displayCategoryList" :key="category.value">
            <input
              :value="category.value"
              :checked="ui.category[category.value]"
              type="checkbox"
              name="category"
              @change="handleClickCategory(category.value)"
            />
            {{ category.text }}
          </label>
        </div>
      </details>

      <details>
        <summary>オプション</summary>
        <div>
          <label>
            <input
              :value="ui.name"
              :checked="ui.name"
              :disabled="!isDefaultSize"
              type="checkbox"
              @change="handleClickNameShows"
            />
            ファイル名の表示
          </label>
          <label>
            <input
              :value="ui.reacted"
              :checked="ui.reacted"
              type="checkbox"
              @change="handleClickReacted"
            />
            リアクション済みのスタイル
          </label>
          <label>
            <input
              :value="ui.dark"
              :checked="ui.dark"
              type="checkbox"
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
import Search from "@/components/Search.vue";
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
    Search
  }
})
export default class Header extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;

  /**
   * アクションを引き当てる
   */
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

  /**
   * @get - デフォルトのアイコンサイズが選択されてるか否かを返す
   */
  get isDefaultSize() {
    return this.ui.size === DefaultSize;
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
