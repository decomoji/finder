<template>
  <div class="Search">
    <label class="VisuallyHidden" for="search">検索する</label>
    <input
      id="search"
      :value="decomoji.search"
      class="__input"
      name="decomoji_search"
      type="text"
      @input="debouncedUpdateSearch($event.target.value)"
    />
    <Icon class="__icon" value="search" />
    <span class="VisuallyHidden"
      >{{ decomoji.total }}個中{{
        decomoji.filteredDecomojis.length
      }}個が該当しています。</span
    >
    <span class="__result" aria-hidden="true"
      >{{ decomoji.filteredDecomojis.length }}/{{ decomoji.total }}</span
    >
  </div>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
import {
  DecomojiAction,
  DecomojiViewModel,
} from "@/store/modules/decomoji/models";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    Icon,
  },
})
export default class Search extends Vue {
  // viewModel を引き当てる
  @Getter("decomoji/viewModel") decomoji!: DecomojiViewModel;

  // アクションを引き当てる
  @Action("decomoji/updateSearch")
  updateSearch!: DecomojiAction["updateSearch"];

  // 内部プロパティを定義する
  timer: number = 0;

  /**
   * @method - 検索クエリの更新処理を間引いて実行する
   */
  debouncedUpdateSearch(query: string) {
    window.clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.updateSearch(query);
    }, 300);
  }
}
</script>
