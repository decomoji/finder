<template>
  <details class="Detail" name="selectors">
    <summary class="__summary">サイズ</summary>
    <div class="__panel">
      <label v-for="size in displaySizeList" :key="size.value" class="__label">
        <input
          :value="size.value"
          :checked="size.value === decomoji.size"
          class="__radio"
          name="size"
          type="radio"
          @change="handleChange(size.value)"
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
import {
  DecomojiAction,
  DecomojiViewModel,
} from "@/store/modules/decomoji/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class SizeSelector extends Vue {
  // viewModel を引き当てる
  @Getter("decomoji/viewModel") decomoji!: DecomojiViewModel;

  // アクションを引き当てる
  @Action("decomoji/updateSize") updateSize!: DecomojiAction["updateSize"];

  // 内部プロパティを定義する
  displaySizeList: IconSizeItem[] = DisplaySizeList;

  // @listen - 表示サイズを選択する
  handleChange(value: IconSizeId) {
    this.updateSize(value);
  }
}
</script>
