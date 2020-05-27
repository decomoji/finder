<template>
  <VNavigationDrawer
    v-model="value"
    :mini-variant.sync="shrink"
    :mini-variant-width="width"
    app
    clipped
    fixed
    permanent
    right
    class="Collection"
  >
    <div class="__scrollable">
      <VList class="pa-0">
        <VListTile avatar>
          <VListTileAvatar>
            <VBtn icon @click.stop="shrink = !shrink">
              <VIcon v-if="shrink">keyboard_arrow_left</VIcon>
              <VIcon v-else>keyboard_arrow_right</VIcon>
            </VBtn>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>コレクション</VListTileTitle>
          </VListTileContent>
        </VListTile>
      </VList>
      <VDivider />
      <VList class="pa-0">
        <div :class="['__list', `-${ui.iconSize}`]">
          <div
            v-for="(item, i) in collection.items"
            :key="`${item}_${i}`"
            :class="['__item', `-${ui.iconSize}`]"
          >
            <img
              :alt="item.name"
              :src="`/decomoji/${item.category}/${item.name}.png`"
              width="64"
              :class="`__icon -${ui.iconSize}`"
            />
          </div>
        </div>
      </VList>
    </div>
  </VNavigationDrawer>
</template>

<script lang="ts">
import { DefaultIconSize } from '@/configs/DefaultIconSize'
import { UiViewModel } from '@/store/modules/ui/models'
import {
  CollectionActions,
  CollectionViewModel
} from '@/store/modules/collection/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class Collection extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel
  @Getter('collection/viewModel') collection!: CollectionViewModel

  // アクションを引き当てる
  @Action('collection/add') add!: CollectionActions['add']
  @Action('collection/remove') remove!: CollectionActions['remove']

  shrink = true
  value = true

  get width() {
    return window.innerWidth - document.documentElement.clientWidth ? 100 : 84
  }
}
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/settings/_colors'
@import '~vuetify/src/stylus/settings/_variables'

.Collection
  .theme--light &
    background-color: #f4f4f4
  .theme--dark &
    background-color: #1a1c20
  .__scrollable
    height: 100%
    overflow-y: auto
  .__list
    display: grid
    grid-auto-rows: auto
    padding: 10px
    overflow-x: hidden
    &.-l
      gap: 10px
      grid-template-columns: repeat(auto-fill, minmax(64px, 1fr))
    &.-m
      gap: 5px
      grid-template-columns: repeat(auto-fill, minmax(32px, 1fr))
    &.-s
      gap: 3px
      grid-template-columns: repeat(auto-fill, minmax(16px, 1fr))

  .__item
    border: 1px solid transparent
    border-radius: 4px
    line-height: 1
    text-align: center
    transition: transform 0.1s ease-out

  .__icon
    width: 100%
    vertical-align: top
    &.-l
      max-width: 64px
    &.-m
      max-width: 32px
    &.-s
      max-width: 16px
</style>
