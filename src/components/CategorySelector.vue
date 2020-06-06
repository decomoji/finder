<template>
  <details class="Tooltip">
    <summary class="__summary">カテゴリー</summary>
    <div class="__panel">
      <label
        v-for="category in displayCategoryList"
        :key="category.value"
        class="__label"
      >
        <input
          :value="category.value"
          :checked="ui.category[category.value]"
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
import { CategoryId } from "@/models/CategoryId";
import { CategoryItem } from "@/models/CategoryItem";
import { UiActions, UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class CategorySelector extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;

  // アクションを引き当てる
  @Action("ui/toggleCategory") toggleCategory!: UiActions["toggleCategory"];

  // 内部プロパティを定義する
  displayCategoryList: CategoryItem[] = DisplayCategoryList;

  // @listen - 表示カテゴリーを選択する
  handleCange(categoryId: CategoryId) {
    this.toggleCategory(categoryId);
  }
}
</script>
