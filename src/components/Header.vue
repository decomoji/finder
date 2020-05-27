<template>
  <VToolbar app clipped-left dark class="Header">
    <VToolbarTitle class="__title">decomoji-finder v1</VToolbarTitle>
    <VTextField
      :input-value="ui.searchQuery"
      clearable
      flat
      hide-details
      solo-inverted
      class="__input"
      prepend-inner-icon="search"
      label="Search"
      @input="debounceUpdateSearchQuery($event)"
    />
    <VSpacer />
    <VToolbarItems>
      <VBtn
        v-for="(item, i) in items"
        :key="i"
        :href="item.href"
        :rel="item.rel"
        :target="item.target"
        flat
        class="__link"
        >{{ item.title }}</VBtn
      >
    </VToolbarItems>
  </VToolbar>
</template>

<script lang="ts">
import { HeaderLinks } from '@/configs/HeaderLinks'
import { UiActions, UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class Header extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * アクションを引き当てる
   */
  @Action('ui/updateSearchQuery')
  updateSearchQuery!: UiActions['updateSearchQuery']

  /**
   * 内部プロパティを定義する
   */
  items = HeaderLinks

  /**
   * @method
   */
  debounceUpdateSearchQuery(query: string) {
    let timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      this.updateSearchQuery(query)
    }, 300)
  }
}
</script>
<style lang="stylus" scoped>
@import '~vuetify/src/stylus/settings/_variables'

.Header
  .theme--light &
    background-color: #290829
  .theme--dark &
    background-color: #0f0e12
  .__title
    width: 286px
  .__input
    max-width: 450px
  .__link
    text-transform: none
</style>
