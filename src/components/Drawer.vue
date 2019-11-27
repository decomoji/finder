<template>
  <VNavigationDrawer app clipped dark fixed permanent class="Drawer">
    <VList>
      <VSubheader>表示カテゴリー</VSubheader>
      <VListTile
        v-for="category in drawerCategoryList"
        :key="category.id"
        ripple
        @click="handleClickCategory(category.id)"
      >
        <VCheckbox
          :input-value="ui.category[category.id]"
          :label="`${category.name}（${category.id}）`"
          :value="ui.category[category.id]"
          class="__check"
          @change="() => {}"
        />
      </VListTile>
    </VList>
    <VDivider />
    <VList subheader>
      <VSubheader>アイコンサイズ</VSubheader>
      <VListTile>
        <VSelect
          :items="drawerIconSizeList"
          :value="ui.iconSize"
          color="accent"
          item-text="label"
          item-value="value"
          label="アイコンサイズ"
          menu-props="auto"
          single-line
          @input="handleClickIconSize"
        />
      </VListTile>
    </VList>
    <VDivider />
    <VList subheader>
      <VSubheader>表示オプション</VSubheader>
      <VListTile ripple @click="handleClickNameShows">
        <VCheckbox
          :input-value="ui.name"
          :disabled="!defaultIconSizeSelects"
          class="__check"
          label="ファイル名の表示"
          @change="() => {}"
        />
      </VListTile>
      <VListTile ripple @click="handleClickReacted">
        <VCheckbox
          :input-value="ui.reacted"
          class="__check"
          label="リアクション済みのスタイル"
          @change="() => {}"
        />
      </VListTile>
      <VListTile ripple @click="handleClickDarkMode">
        <VCheckbox
          :input-value="ui.dark"
          class="__check"
          label="ダークモード"
          @change="() => {}"
        />
      </VListTile>
      <VListTile>
        <p class="__desc">テーマはSlackのAubergineをエミュレートしています。</p>
      </VListTile>
    </VList>
  </VNavigationDrawer>
</template>

<script lang="ts">
import { DefaultIconSize } from '@/configs/DefaultIconSize'
import { CategoryId } from '@/models/CategoryId'
import { IconSizeId } from '@/models/IconSizeId'
import { IconSizeItem } from '@/models/IconSizeItem'
import { DrawerCategoryList } from '@/configs/DrawerCategoryList'
import { DrawerIconSizeList } from '@/configs/DrawerIconSizeList'
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
  @Action('ui/toggleReacted')
  toggleReacted!: UiActionDispatchers['toggleReacted']
  @Action('ui/updateIconSize')
  updateIconSize!: UiActionDispatchers['updateIconSize']

  /**
   * 内部プロパティを定義する
   */
  drawerCategoryList = DrawerCategoryList
  drawerIconSizeList = DrawerIconSizeList

  /**
   * @get - デフォルトのアイコンサイズが選択されてるか否かを返す
   */
  get defaultIconSizeSelects() {
    return this.ui.iconSize === DefaultIconSize
  }

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
   * @listens VRadio.click
   */
  handleClickIconSize(value: IconSizeId) {
    this.updateIconSize(value)
  }

  /**
   * @listens VCheckbox[v-model=ui.name].change
   * @listens VListTileContent.click
   */
  handleClickNameShows() {
    if (!this.defaultIconSizeSelects) return
    this.toggleNameShows(this.ui.name)
  }

  /**
   * @listens VCheckbox[v-model=ui.reacted].change
   * @listens VListTileContent.click
   */
  handleClickReacted() {
    this.toggleReacted(this.ui.reacted)
  }
}
</script>
<style lang="stylus" scoped>
.Drawer
  .theme--light &
    background-color: #301131
  .theme--dark &
    background-color: #17161a
  .__check
    pointer-events: none
  .__desc
    margin-bottom: 0
</style>
