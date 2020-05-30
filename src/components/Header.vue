<template>
  <div class="Header px-4 divide-y divide-white divide-opacity-25">
    <div class="flex items-center py-2">
      <div class="flex w-1/2">
        <div class="pr-4">
          <a class="text-2xl text-white" href="/">decomoji-finder</a>
        </div>

        <div class="flex items-center">
          <label class="pr-2 text-white leading-none" for="search">
            <Icon value="search" />
            <span class="sr-only">検索する</span>
          </label>
          <input
            id="search"
            class="__search flex-auto rounded px-4 px-2 w-auto h-10 bg-white bg-opacity-75 focus:bg-white focus:outline-none"
            type="text"
            :value="ui.searchQuery"
            @input="debounceUpdateSearchQuery($event)"
          />
        </div>
      </div>

      <div class="flex w-1/2"></div>
    </div>

    <div class="flex items-center py-2"></div>
  </div>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
import { HeaderLinks } from "@/configs/HeaderLinks";
import { UiActions, UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    Icon
  }
})
export default class Header extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;

  /**
   * アクションを引き当てる
   */
  @Action("ui/updateSearchQuery")
  updateSearchQuery!: UiActions["updateSearchQuery"];

  /**
   * 内部プロパティを定義する
   */
  items = HeaderLinks;

  /**
   * @method
   */
  debounceUpdateSearchQuery(query: string) {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.updateSearchQuery(query);
    }, 300);
  }
}
</script>
<style lang="sass" scoped>
.Header
  background-color: #290829
  .-dark &
    background-color: #0f0e12

  .__search
    &:focus
      box-shadow: 0 0 0 4px rgba(255,255,255, 0.5)
</style>
