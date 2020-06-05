<template>
  <header class="Header">
    <div>
      <Logo />
      <Search />
    </div>

    <div>
      <SizeSelector />

      <CategorySelector />

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
import CategorySelector from "@/components/CategorySelector.vue";
import Logo from "@/components/Logo.vue";
import Search from "@/components/Search.vue";
import SizeSelector from "@/components/SizeSelector.vue";
import { DefaultSize } from "@/configs/DefaultSize";
import { DisplayCategoryList } from "@/configs/DisplayCategoryList";

import { CategoryId } from "@/models/CategoryId";

import { UiActions, UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    CategorySelector,
    Logo,
    Search,
    SizeSelector
  }
})
export default class Header extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;

  /**
   * アクションを引き当てる
   */

  @Action("ui/toggleDarkMode") toggleDarkMode!: UiActions["toggleDarkMode"];
  @Action("ui/toggleNameShows") toggleNameShows!: UiActions["toggleNameShows"];
  @Action("ui/toggleReacted") toggleReacted!: UiActions["toggleReacted"];

  /**
   * 内部プロパティを定義する
   */

  /**
   * @get - デフォルトのアイコンサイズが選択されてるか否かを返す
   */
  get isDefaultSize() {
    return this.ui.size === DefaultSize;
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
