<template>
  <VNavigationDrawer app clipped fixed permanent>
    <VList subheader two-line>
      <VSubheader>Slackのダークモードをエミュレート</VSubheader>
      <VListTile>
        <VListTileAction>
          <VCheckbox v-model="ui.dark" />
        </VListTileAction>
        <VListTileContent @click="handleClickDarkMode">
          <VListTileTitle>ダークモード</VListTileTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VList subheader two-line>
      <VSubheader>カテゴリー</VSubheader>
      <VListTile v-for="(item, i) in items" :key="i">
        <VListTileAction>
          <VCheckbox v-model="item.selected" />
        </VListTileAction>
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
import { UiActionDispatchers, UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class Drawer extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * アクションを引き当てる
   */
  @Action('ui/toggleDarkMode')
  toggleDarkMode!: UiActionDispatchers['toggleDarkMode']

  /**
   * 内部プロパティを定義する
   */
  items = Categories

  /**
   * @listens VListTileContent@click
   * @listens VCheckbox[v-model=ui.dark]@click
   */
  handleClickDarkMode() {
    this.toggleDarkMode(this.ui.dark)
  }
}
</script>
