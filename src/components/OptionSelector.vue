<template>
  <details class="Detail">
    <summary class="__summary">オプション</summary>
    <div class="__panel -option">
      <label class="__label">
        <input
          :value="decomoji.created"
          :checked="decomoji.created"
          class="__checkbox"
          name="option"
          type="checkbox"
          @change="handleChangeCreated"
        />
        作成バージョンの表示
      </label>
      <label class="__label">
        <input
          :value="decomoji.updated"
          :checked="decomoji.updated"
          class="__checkbox"
          name="option"
          type="checkbox"
          @change="handleChangeUpdated"
        />
        修正バージョンの表示
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
  @Action("decomoji/updateCreated")
  updateCreated!: DecomojiAction["updateCreated"];
  @Action("decomoji/updateUpdated")
  updateUpdated!: DecomojiAction["updateUpdated"];
  @Action("decomoji/updateDark")
  updateDark!: DecomojiAction["updateDark"];
  @Action("decomoji/updateReacted")
  updateReacted!: DecomojiAction["updateReacted"];

  // @listen - 作成バージョン表示を更新する
  handleChangeCreated() {
    this.updateCreated(!this.decomoji.created);
  }

  // @listen - 修正バージョン表示を更新する
  handleChangeUpdated() {
    this.updateUpdated(!this.decomoji.updated);
  }

  // @listen - リアクション済み表示を更新する
  handleChangeReacted() {
    this.updateReacted(!this.decomoji.reacted);
  }

  // @listen - ダークモード表示を更新する
  handleChangeDarkMode() {
    this.updateDark(!this.decomoji.dark);
  }
}
</script>
