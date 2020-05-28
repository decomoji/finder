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
        <VListTile>
          <VListTileAction>
            <VBtn icon @click.stop="shrink = !shrink">
              <VIcon>{{ expandIconName }}</VIcon>
            </VBtn>
          </VListTileAction>
          <VListTileContent>
            <VListTileTitle>コレクション</VListTileTitle>
          </VListTileContent>
          <VListTileAction v-if="!shrink">
            <VMenu bottom left offset-y>
              <template v-slot:activator="{ on }">
                <VBtn icon v-on="on">
                  <VIcon>more_vert</VIcon>
                </VBtn>
              </template>
              <VList>
                <VListTile @click="handleClickDownloadManagerList">
                  <VListTileTitle
                    >追加・登録用 json をダウンロードする</VListTileTitle
                  >
                </VListTile>
                <VListTile @click="handleClickDownloadAliasList">
                  <VListTileTitle
                    >エイリアス json をダウンロードする</VListTileTitle
                  >
                </VListTile>
              </VList>
            </VMenu>
          </VListTileAction>
        </VListTile>
      </VList>
      <VDivider />
      <VList>
        <VListTile v-if="!shrink && collection.items.length > 0" dense>
          <span class="body-1"
            >デコモジをダブルクリックするか選択して delete
            キーを押すとコレクションから外せます。</span
          >
        </VListTile>
        <div :class="['__list', `-${ui.iconSize}`]">
          <button
            v-for="(item, i) in collection.items"
            :key="`${item.name}_${item.category}_${i}`"
            :class="['__item', `-${ui.iconSize}`]"
            @dblclick="handleDbclickItem(item)"
            @keydown.delete="handleDeleteItem(item)"
          >
            <img
              :alt="item.name"
              :src="`/decomoji/${item.category}/${item.name}.png`"
              :class="`__icon -${ui.iconSize}`"
              width="64"
            />
          </button>
        </div>
      </VList>
    </div>
  </VNavigationDrawer>
</template>

<script lang="ts">
import { DefaultIconSize } from '@/configs/DefaultIconSize'
import {
  DecomojiCollection,
  DecomojiCollectionItem
} from '@/models/DecomojiCollection'
import { UiViewModel } from '@/store/modules/ui/models'
import {
  CollectionActions,
  CollectionViewModel
} from '@/store/modules/collection/models'
import { isStringOfNotEmpty } from '@/utilities/isString'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class Collection extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel
  @Getter('collection/viewModel') collection!: CollectionViewModel

  // アクションを引き当てる
  @Action('collection/remove') remove!: CollectionActions['remove']
  @Action('collection/receive') receive!: CollectionActions['receive']

  /**
   * 入力プロパティを定義する
   */
  @Prop() query!: any

  shrink = true
  value = true

  /**
   * @get - ドロワーを閉じたときの最小幅を返す
   */
  get width() {
    return window.innerWidth - document.documentElement.clientWidth ? 100 : 84
  }

  /**
   * @get - ドロワーの開閉ボタンのアイコン名を返す
   */
  get expandIconName() {
    return this.shrink ? 'keyboard_arrow_left' : 'keyboard_arrow_right'
  }

  /**
   * @listens - button.dbclick
   */
  handleDbclickItem(item: DecomojiCollectionItem) {
    this.removeItem(item)
  }

  /**
   * @listens - button.keydown
   */
  handleDeleteItem(item: DecomojiCollectionItem) {
    this.removeItem(item)
  }

  /**
   * @method
   */
  removeItem(item: DecomojiCollectionItem) {
    this.remove(item)
    this.$router.push(`?${this.collection.queryStringifyValueOfCollection}`)
  }

  handleClickDownloadManagerList() {}
  handleClickDownloadAliasList() {}

  created() {
    const { n, c } = this.query

    if (!isStringOfNotEmpty(n) || !isStringOfNotEmpty(c)) return

    const names = n.split(',')
    const categories = c.split(',')

    // 名前とカテゴリーは長さが同じで1以上でなければならない
    if (
      names.length !== categories.length ||
      names.length === 0 ||
      categories.length === 0
    )
      return

    let collection: DecomojiCollection = []

    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      const category = categories[i]
      if (
        isStringOfNotEmpty(name) &&
        isStringOfNotEmpty(category) &&
        // 未知のカテゴリーが含まれていないこと
        (category === 'basic' ||
          category === 'extra' ||
          category === 'explicit' ||
          category === 'preview')
      ) {
        collection.push({ name, category })
      }
    }

    return this.receive(collection)
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
    padding: 5px
    border: 1px solid transparent
    border-radius: 4px
    line-height: 1
    text-align: center
    transition: box-shadow 0.03s ease-out

    &.-s
      padding: 0

    .theme--light &
      background-color #ffffff
    .theme--dark &
      background-color #15171a

    &:focus
      outline: 0;
      .theme--light &
        box-shadow: inset 0 0 0 4px #adbfca
      .theme--dark &
        box-shadow: inset 0 0 0 4px #5c7280

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
