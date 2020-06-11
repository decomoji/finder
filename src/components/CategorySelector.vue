<template>
  <details class="Detail">
    <summary class="__summary">カテゴリー</summary>
    <div class="__panel">
      <label
        v-for="category in displayCategoryList"
        :key="category.value"
        class="__label"
      >
        <input
          :value="category.value"
          :checked="decomoji.category[category.value]"
          class="__checkbox"
          name="category"
          type="checkbox"
          @change="handleCange(category.value)"
        />
        {{ category.text }}
      </label>
    </div>
  </details>
</template>

<script lang="ts">
import { DisplayCategoryList } from "@/configs/DisplayCategoryList";
import { CategoryName } from "@/models/CategoryName";
import { CategoryItem } from "@/models/CategoryItem";
import {
  DecomojiAction,
  DecomojiViewModel
} from "@/store/modules/decomoji/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class CategorySelector extends Vue {
  // viewModel を引き当てる
  @Getter("decomoji/viewModel") decomoji!: DecomojiViewModel;

  // アクションを引き当てる
  @Action("decomoji/toggleCategory")
  toggleCategory!: DecomojiAction["toggleCategory"];

  // 内部プロパティを定義する
  displayCategoryList: CategoryItem[] = DisplayCategoryList;

  // @listen - 表示カテゴリーを選択する
  handleCange(categoryId: CategoryName) {
    this.toggleCategory(categoryId);
  }
}
</script>
