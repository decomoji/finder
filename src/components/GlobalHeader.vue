<template>
  <VToolbar app clipped-left dark color="primary" class="GlobalHeader">
    <VToolbarTitle class="__title">decomoji-finder v1</VToolbarTitle>
    <VTextField
      :value="ui.searchQuery"
      flat
      hide-details
      solo-inverted
      prepend-inner-icon="search"
      label="Search"
      @input="updateSearchQuery"
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
        >{{ item.title }}</VBtn
      >
    </VToolbarItems>
  </VToolbar>
</template>

<script lang="ts">
import { HeaderLinks } from '@/configs/HeaderLinks'
import { UiActionDispatchers, UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class GlobalHeader extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * アクションを引き当てる
   */
  @Action('ui/updateSearchQuery')
  updateSearchQuery!: UiActionDispatchers['updateSearchQuery']

  /**
   * 内部プロパティを定義する
   */
  items = HeaderLinks
}
</script>
<style lang="stylus" scoped>
@import '~vuetify/src/stylus/settings/_variables'

.GlobalHeader
  .__title
    width: 300px
</style>
