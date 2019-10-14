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
import { Link } from '@/models/Link'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GlobalHeader extends Vue {
  /**
   * 内部プロパティを定義する
   */
  items: Link[] = [
    {
      title: 'Store',
      href: 'https://suzuri.jp/decomoji',
      target: '_blank',
      rel: 'noopener'
    },
    {
      title: 'Patreon',
      href: 'https://www.patreon.com/decomoji',
      target: '_blank',
      rel: 'noopener'
    },
    {
      title: 'GitHub',
      href: 'https://github.com/decomoji/decomoji-finder/',
      target: '_blank',
      rel: 'noopener'
    }
  ]
}
</script>
