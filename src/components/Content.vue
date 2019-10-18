<template>
  <VContent class="Content">
    <div
      :class="[
        '__list',
        {
          '-basic': ui.category.basic,
          '-explicit': ui.category.explicit,
          '-extra': ui.category.extra
        }
      ]"
    >
      <template v-for="category in categories">
        <div
          v-for="name in decomojis[category]"
          v-show="matched(name)"
          :key="name"
          :class="`__item -${category}`"
        >
          <img
            :alt="name"
            :src="`/decomoji/${category}/${name}.png`"
            width="64"
            height="64"
            class="__icon"
          />
          <p v-show="ui.name" class="__name">:{{ name }}:</p>
        </div>
      </template>
    </div>
  </VContent>
</template>

<script lang="ts">
import { DecomojiBasic } from '@/configs/DecomojiBasic'
import { DecomojiExplicit } from '@/configs/DecomojiExplicit'
import { DecomojiExtra } from '@/configs/DecomojiExtra'
import { CategoryId } from '@/models/CategoryId'
import { DecomojiItem } from '@/models/DecomojiItem'
import { UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Content extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel

  categories: CategoryId[] = ['basic', 'explicit', 'extra']

  decomojis = Object.freeze({
    basic: DecomojiBasic as DecomojiItem[],
    extra: DecomojiExtra as DecomojiItem[],
    explicit: DecomojiExplicit as DecomojiItem[]
  })

  /**
   * @method - 各要素が検索クエリを含んでいるかを返す
   */
  matched(name: string) {
    return name.includes(this.ui.searchQuery)
  }
}
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/settings/_colors'
@import '~vuetify/src/stylus/settings/_variables'

.Content
  .__list
    display: grid
    gap: 10px
    grid-template-columns: repeat(auto-fill, minmax(128px, 1fr))
    grid-auto-rows: auto;
    padding: 10px
    overflow-x: hidden
    &.-basic .__item.-basic
    &.-extra .__item.-extra
    &.-explicit .__item.-explicit
      display: block
  .__item
    display: none
    padding: 10px
    border-radius: 4px
    text-align: center
  .__icon
    vertical-align: top
  .__name
    margin-top: 10px
    margin-bottom: 0
    line-height: 1.4
    word-break: break-all
</style>
