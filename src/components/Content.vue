<template>
  <VContent class="Content">
    <div
      :class="[
        '__list',
        {
          '-basic': ui.category.basic,
          '-explicit': ui.category.explicit,
          '-extra': ui.category.extra,
          '-preview': ui.category.preview
        },
        `-${ui.iconSize}`
      ]"
    >
      <template v-for="category in categories">
        <button
          v-for="(name, i) in decomojis[category]"
          v-show="matched(name)"
          :key="`${name}_${category}_${i}`"
          :class="[
            '__item',
            `-${category}`,
            `-${ui.iconSize}`,
            {
              '-reacted': ui.reacted,
              '-collected': collected(name)
            }
          ]"
          @click="handleClickItem({ name, category })"
        >
          <img
            :alt="nameShows ? '' : name"
            :class="`__icon -${ui.iconSize}`"
            :src="`/decomoji/${category}/${name}.png`"
            width="64"
          />
          <span v-show="nameShows" :aria-label="name" class="__name"
            >:{{ name }}:</span
          >
        </button>
      </template>
    </div>
  </VContent>
</template>

<script lang="ts">
import { DecomojiBasic } from '@/configs/DecomojiBasic'
import { DecomojiExplicit } from '@/configs/DecomojiExplicit'
import { DecomojiExtra } from '@/configs/DecomojiExtra'
import { DecomojiPreview } from '@/configs/DecomojiPreview'
import { DefaultIconSize } from '@/configs/DefaultIconSize'
import { CategoryId } from '@/models/CategoryId'
import {
  DecomojiCollection,
  DecomojiCollectionItem
} from '@/models/DecomojiCollection'
import { DecomojiItem } from '@/models/DecomojiItem'
import { UiViewModel } from '@/store/modules/ui/models'
import {
  CollectionActions,
  CollectionViewModel
} from '@/store/modules/collection/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class Content extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel
  @Getter('collection/viewModel') collection!: CollectionViewModel

  // アクションを引き当てる
  @Action('collection/add') add!: CollectionActions['add']
  @Action('collection/remove') remove!: CollectionActions['remove']

  categories: CategoryId[] = ['basic', 'explicit', 'extra', 'preview']

  decomojis = Object.freeze({
    basic: DecomojiBasic as DecomojiItem[],
    extra: DecomojiExtra as DecomojiItem[],
    explicit: DecomojiExplicit as DecomojiItem[],
    preview: DecomojiPreview as DecomojiItem[]
  })

  /**
   * @get - ファイル名を表示するか否かを返す
   */
  get nameShows() {
    return this.ui.name && this.ui.iconSize === DefaultIconSize
  }

  /**
   * @method - コレクションにおける要素のインデックスを返す
   */
  getItemIndex(items: DecomojiCollection, name: string) {
    return items.findIndex((item: DecomojiCollectionItem) => item.name === name)
  }

  /**
   * @method - 要素が選択されているか否かを返す
   */
  collected(name: string) {
    return this.getItemIndex(this.collection.items, name) > -1
  }

  /**
   * @method - 要素が検索クエリを正規表現にマッチするか否かを返す
   */
  matched(name: string) {
    try {
      return RegExp(this.ui.searchQuery).test(name)
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * @method - 要素をクリックした時
   */
  handleClickItem(item: DecomojiCollectionItem) {
    this.collected(item.name) ? this.remove(item) : this.add(item)
    this.$router.replace(
      `/?${this.collection.queryStringifyValueOfCollection}&y=${window.scrollY}`
    )
  }
}
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/settings/_colors'
@import '~vuetify/src/stylus/settings/_variables'

.Content
  .__list
    display: grid
    grid-auto-rows: auto
    padding: 10px
    overflow-x: hidden
    &.-basic .__item.-basic
    &.-extra .__item.-extra
    &.-explicit .__item.-explicit
    &.-preview .__item.-preview
      display: block
    &.-l
      gap: 10px
      grid-template-columns: repeat(auto-fill, minmax(128px, 1fr))
    &.-m
      gap: 5px
      grid-template-columns: repeat(auto-fill, minmax(42px, 1fr))
    &.-s
      gap: 3px
      grid-template-columns: repeat(auto-fill, minmax(24px, 1fr))

  .__item
    display: none
    border: 1px solid transparent
    border-radius: 4px
    line-height: 1
    text-align: center
    transition: transform 0.03s ease-out, box-shadow 0.03s ease-out
    &.-l
      padding: 10px
    &.-m
      padding: 5px
    &.-s
      padding: 3px

    .theme--light &
      background-color: #f4f4f4
      &.-reacted
        border-color: #1d89c7
        background-color: #e6f3fa
      &.-collected
        border-color: #727272
        background-color: #ffffff
        transform: scale3d(0.7,0.7,1)
    .theme--dark &
      background-color: #1a1c20
      &.-reacted
        border-color: #135092
        background-color: #135092
      &.-collected
        border-color: #424242
        background-color: #000000
        transform: scale3d(0.7,0.7,1)

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

  .__name
    display block
    margin-top: 10px
    margin-bottom: 0
    line-height: 1.2
    word-break: break-all
</style>
