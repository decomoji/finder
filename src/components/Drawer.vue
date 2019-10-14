<template>
  <VNavigationDrawer app clipped fixed permanent>
    <VList subheader two-line>
      <VSubheader>カテゴリー</VSubheader>

      <VListTile v-for="(item, i) in items" :key="i">
        <VListAction>
          <VCheckbox v-model="item.selected"></VCheckbox>
        </VListAction>
        <VListTileContent @click="item.selected = !item.selected">
          <VListTileTitle>{{ item.title_main }}</VListTileTitle>
          <VListTileSubTitle>{{ item.title_sub }}</VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
  </VNavigationDrawer>
</template>

<script lang="ts">
import { Categories } from '@/configs/Categories'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Drawer extends Vue {
  /**
   * 内部プロパティを定義する
   */
  items = Categories
}
</script>
