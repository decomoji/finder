<template>
  <VContent class="Content">
    <VContainer grid-list-lg pa-4>
      <VLayout row wrap align-baseline>
        <VFlex
          v-for="name in items"
          v-show="matched(name)"
          :key="name"
          xs1
          text-xs-center
          mb-2
        >
          <img :src="`/decomoji/${name}.png`" /><br />
          <span class="__name">:{{ name }}:</span>
        </VFlex>
      </VLayout>
    </VContainer>
  </VContent>
</template>

<script lang="ts">
import { DECOMOJI_BASIC } from '@/decomoji/ts/basic'
import { DECOMOJI_EXPLICIT } from '@/decomoji/ts/explicit'
import { DECOMOJI_EXTRA } from '@/decomoji/ts/extra'
import { DecomojiItem } from '@/models/DecomojiItem'
import { isStringOfNotEmpty } from '@/utilities/isString'
import { UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Content extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel

  // 各組み合わせの配列をプリセットしておく
  decomojis = {
    all: [
      ...DECOMOJI_BASIC,
      ...DECOMOJI_EXTRA,
      ...DECOMOJI_EXPLICIT
    ] as DecomojiItem[],
    basic: DECOMOJI_BASIC as DecomojiItem[],
    extra: DECOMOJI_EXTRA as DecomojiItem[],
    explicit: DECOMOJI_EXPLICIT as DecomojiItem[],
    basic_extra: [...DECOMOJI_BASIC, ...DECOMOJI_EXTRA] as DecomojiItem[],
    basic_explicit: [...DECOMOJI_BASIC, ...DECOMOJI_EXPLICIT] as DecomojiItem[],
    extra_explicit: [...DECOMOJI_EXTRA, ...DECOMOJI_EXPLICIT] as DecomojiItem[]
  }

  /**
   * @get - カテゴリーの選択条件に合わせてデコモジの配列を返す
   */
  get items() {
    const { decomojis, ui } = this
    const { category } = ui
    const basic: string = category.basic ? '1' : '0'
    const extra: string = category.extra ? '1' : '0'
    const explicit: string = category.explicit ? '1' : '0'
    const conditionCode = basic + extra + explicit

    switch (conditionCode) {
      case '111':
        return decomojis.all
      case '100':
        return decomojis.basic
      case '010':
        return decomojis.extra
      case '001':
        return decomojis.explicit
      case '110':
        return decomojis.basic_extra
      case '101':
        return decomojis.basic_explicit
      case '011':
        return decomojis.extra_explicit
      default:
        return []
    }
  }

  /**
   * @get - ノーマライズした検索クエリを返す
   */
  get query() {
    const { searchQuery } = this.ui
    return isStringOfNotEmpty(searchQuery) ? searchQuery : ''
  }

  /**
   * @method - 各要素が検索クエリを含んでいるかを返す
   */
  matched(name: string) {
    return name.includes(this.query)
  }
}
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/settings/_colors'

.Content
  .__name
    padding: 3px 5px
    border-radius: 3px
    background-color: $blue-grey.lighten-5
</style>
