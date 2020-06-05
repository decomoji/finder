<template>
  <details class="Tooltip">
    <summary class="__summary">表示サイズ</summary>
    <div class="__panel">
      <label v-for="size in displaySizeList" :key="size.value">
        <input
          :value="size.value"
          :checked="size.value === ui.size"
          type="radio"
          name="size"
          @change="handleCange(size.value)"
        />
        {{ size.text }}
      </label>
    </div>
  </details>
</template>

<script lang="ts">
import { DisplaySizeList } from "@/configs/DisplaySizeList";
import { IconSizeId } from "@/models/IconSizeId";
import { IconSizeItem } from "@/models/IconSizeItem";
import { UiActions, UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class SizeSelector extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;

  // アクションを引き当てる
  @Action("ui/updateSize") updateSize!: UiActions["updateSize"];

  // 内部プロパティを定義する
  displaySizeList: IconSizeItem[] = DisplaySizeList;

  // @listen - 表示サイズを選択する
  handleCange(value: IconSizeId) {
    this.updateSize(value);
  }
}
</script>
