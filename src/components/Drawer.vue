<template>
  <VNavigationDrawer app clipped fixed permanent>
    <VList subheader two-line>
      <VSubheader>表示カテゴリー</VSubheader>
      <VListTile v-for="(category, i) in drawerCategoryList" :key="i">
        <VListTileAction>
          <VCheckbox
            :input-value="ui.category[category.id]"
            @change="handleClickCategory(category.id)"
          />
        </VListTileAction>
        <VListTileContent @click="handleClickCategory(item.id)">
          <VListTileTitle>{{ category.title_main }}</VListTileTitle>
          <VListTileSubTitle>{{ category.title_sub }}</VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
    <VDivider />
    <VList subheader two-line>
      <VSubheader>表示オプション</VSubheader>
      <VListTile>
        <VListTileAction>
          <VCheckbox :input-value="ui.dark" @change="handleClickDarkMode" />
        </VListTileAction>
        <VListTileContent @click="handleClickDarkMode">
          <VListTileTitle>ダークモード</VListTileTitle>
        </VListTileContent>
      </VListTile>
      <VListTile>
        <VListTileAction>
          <VCheckbox :input-value="ui.name" @change="handleClickNameShows" />
        </VListTileAction>
        <VListTileContent @click="handleClickNameShows">
          <VListTileTitle>ファイル名の表示</VListTileTitle>
        </VListTileContent>
      </VListTile>
    </VList>
  </VNavigationDrawer>
</template>

<script lang="ts">
import { CategoryId } from '@/models/CategoryId'
import { DrawerCategoryList } from '@/configs/DrawerCategoryList'
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
  drawerCategoryList = DrawerCategoryList

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
