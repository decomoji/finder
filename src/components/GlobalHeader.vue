<template>
  <VToolbar app clipped-left>
    <VToolbarTitle>decomoji-finder</VToolbarTitle>
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
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GlobalHeader extends Vue {
  /**
   * 内部プロパティを定義する
   */
  items = HeaderLinks
}
</script>
