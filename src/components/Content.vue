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
          v-for="decomoji in decomojis[category]"
          v-show="matched(decomoji.name)"
          :key="decomoji.name"
          :class="`__item -${category}`"
        >
          <img
            :src="`/decomoji/${category}/${decomoji.name}.png`"
            width="64"
            height="64"
            :alt="decomoji.name"
          />
          <p v-show="ui.name" class="__name">:{{ decomoji.name }}:</p>
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
import { isStringOfNotEmpty } from '@/utilities/isString'
import { UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Content extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel

  categories: CategoryId[] = ['basic', 'explicit', 'extra']

  decomojis = Object.freeze({
    basic: DecomojiBasic,
    extra: DecomojiExtra,
    explicit: DecomojiExplicit
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
    padding: $spacers.four.y $spacers.three.x
    overflow-x: hidden
    &.-basic .__item.-basic
    &.-extra .__item.-extra
    &.-explicit .__item.-explicit
      display: block
  .__item
    display: none
    padding-bottom: 10px
    text-align: center
  .__name
    margin: 0
    padding: 3px 5px
    border-radius: 3px
    word-break: break-all
    background-color: $blue-grey.lighten-5
</style>
