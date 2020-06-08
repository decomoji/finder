<template>
  <details class="Detail">
    <summary class="__summary">オプション</summary>
    <div class="__panel -option">
      <label class="__label">
        <input
          :value="ui.name"
          :checked="ui.name"
          :disabled="!isDefaultSize"
          class="__checkbox"
          name="option"
          type="checkbox"
          @change="handleChangeNameShows"
        />
        ファイル名の表示
      </label>
      <label class="__label">
        <input
          :value="ui.reacted"
          :checked="ui.reacted"
          class="__checkbox"
          name="option"
          type="checkbox"
          @change="handleChangeReacted"
        />
        リアクション済みのスタイル
      </label>
      <label class="__label">
        <input
          :value="ui.dark"
          :checked="ui.dark"
          class="__checkbox"
          name="option"
          type="checkbox"
          @change="handleChangeDarkMode"
        />
        ダークモード
      </label>
    </div>
  </details>
</template>

<script lang="ts">
import { DefaultSize } from "@/configs/DefaultSize";
import { UiActions, UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class OptionSelector extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;

  // アクションを引き当てる
  @Action("ui/toggleDarkMode") toggleDarkMode!: UiActions["toggleDarkMode"];
  @Action("ui/toggleNameShows") toggleNameShows!: UiActions["toggleNameShows"];
  @Action("ui/toggleReacted") toggleReacted!: UiActions["toggleReacted"];

  // @get - デフォルトのアイコンサイズが選択されてるか否かを返す
  get isDefaultSize() {
    return this.ui.size === DefaultSize;
  }

  // @listen - ファイル名表示を選択する
  handleChangeNameShows() {
    this.toggleNameShows(this.ui.name);
  }

  // @listen - リアクション済み表示を選択する
  handleChangeReacted() {
    this.toggleReacted(this.ui.reacted);
  }

  // @listen - ダークモード表示を選択する
  handleChangeDarkMode() {
    this.toggleDarkMode(this.ui.dark);
  }
}
</script>
