<template>
  <details class="Detail">
    <summary class="__summary">オプション</summary>
    <div class="__panel -option">
      <label class="__label">
        <input
          :value="decomoji.name"
          :checked="decomoji.name"
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
          :value="decomoji.reacted"
          :checked="decomoji.reacted"
          class="__checkbox"
          name="option"
          type="checkbox"
          @change="handleChangeReacted"
        />
        リアクション済みのスタイル
      </label>
      <label class="__label">
        <input
          :value="decomoji.dark"
          :checked="decomoji.dark"
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
import {
  DecomojiAction,
  DecomojiViewModel,
} from "@/store/modules/decomoji/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class OptionSelector extends Vue {
  // viewModel を引き当てる
  @Getter("decomoji/viewModel") decomoji!: DecomojiViewModel;

  // アクションを引き当てる
  @Action("decomoji/toggleDarkMode")
  toggleDarkMode!: DecomojiAction["toggleDarkMode"];
  @Action("decomoji/toggleNameShows")
  toggleNameShows!: DecomojiAction["toggleNameShows"];
  @Action("decomoji/toggleReacted")
  toggleReacted!: DecomojiAction["toggleReacted"];

  // @get - デフォルトのアイコンサイズが選択されてるか否かを返す
  get isDefaultSize() {
    return this.decomoji.size === DefaultSize;
  }

  // @listen - ファイル名表示を選択する
  handleChangeNameShows() {
    this.toggleNameShows(this.decomoji.name);
  }

  // @listen - リアクション済み表示を選択する
  handleChangeReacted() {
    this.toggleReacted(this.decomoji.reacted);
  }

  // @listen - ダークモード表示を選択する
  handleChangeDarkMode() {
    this.toggleDarkMode(this.decomoji.dark);
  }
}
</script>
