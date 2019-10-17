<template>
  <VNavigationDrawer app clipped fixed permanent>
    <VList subheader two-line>
      <VSubheader>Slackのダークモードをエミュレート</VSubheader>
      <VListTile>
        <VListTileAction>
          <VCheckbox :input-value="ui.dark" @change="handleClickDarkMode" />
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
          <VCheckbox
            :input-value="ui.category[item.id]"
            @change="handleClickCategory(item.id)"
          />
        </VListTileAction>
        <VListTileContent @click="handleClickCategory(item.id)">
          <VListTileTitle>{{ item.title_main }}</VListTileTitle>
          <VListTileSubTitle>{{ item.title_sub }}</VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VList subheader two-line>
      <VSubheader>デコモジのファイル名の表示</VSubheader>
      <VListTile>
        <VListTileAction>
          <VCheckbox :input-value="ui.name" @change="handleClickNameShows" />
        </VListTileAction>
        <VListTileContent @click="handleClickNameShows">
          <VListTileTitle>表示する</VListTileTitle>
        </VListTileContent>
      </VListTile>
    </VList>
  </VNavigationDrawer>
</template>

<script lang="ts">
import { Categories } from '@/configs/Categories'
import { CategoryId } from '@/models/CategoryId'
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
  @Action('ui/toggleCategory')
  toggleCategory!: UiActionDispatchers['toggleCategory']
  @Action('ui/toggleDarkMode')
  toggleDarkMode!: UiActionDispatchers['toggleDarkMode']
  @Action('ui/toggleNameShows')
  toggleNameShows!: UiActionDispatchers['toggleNameShows']

  /**
   * 内部プロパティを定義する
   */
  items = Categories

  /**
   * @listens VCheckbox[v-model=ui.category[id]].change
   * @listens VListTileContent.click
   */
  handleClickCategory(categoryId: CategoryId) {
    this.toggleCategory(categoryId)
  }

  /**
   * @listens VCheckbox[v-model=ui.dark].change
   * @listens VListTileContent.click
   */
  handleClickDarkMode() {
    this.toggleDarkMode(this.ui.dark)
  }

  /**
   * @listens VCheckbox[v-model=ui.name].change
   * @listens VListTileContent.click
   */
  handleClickNameShows() {
    this.toggleNameShows(this.ui.name)
  }
}
</script>
