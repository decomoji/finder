<template>
  <VContent>
    <VContainer grid-list-lg pa-4>
      <VLayout row wrap align-baseline>
        <VFlex v-for="item in items" :key="item" xs1>
          <VTooltip bottom>
            <template v-slot:activator="{ on }">
              <VBtn flat fab large v-on="on">
                <img :src="`/decomoji/${item}.png`" />
              </VBtn>
            </template>
            <span>{{ item }}</span>
          </VTooltip>
        </VFlex>
      </VLayout>
    </VContainer>
  </VContent>
</template>

<script lang="ts">
import { DecomojiBasic } from '@/configs/DecomojiBasic'
import { DecomojiExplicit } from '@/configs/DecomojiExplicit'
import { DecomojiExtra } from '@/configs/DecomojiExtra'
import { isStringOfNotEmpty } from '@/utilities/isString'
import { UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Content extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * @get
   */
  get items() {
    const { category, searchQuery } = this.ui
    const _basic = category.basic ? DecomojiBasic.basic : []
    const _extra = category.extra ? DecomojiExtra.extra : []
    const _explicit = category.explicit ? DecomojiExplicit.explicit : []
    // カテゴリーの選択に合わせて返すデコモジの配列を変える
    const _items: string[] = Array(0).concat(_basic, _extra, _explicit)
    // 検索クエリをノーマライズする
    const _query = isStringOfNotEmpty(searchQuery) ? searchQuery : ''

    // 検索クエリにマッチする配列に絞り込む
    return _items.reduce<string[]>((memo, item) => {
      return item.includes(_query) ? memo.concat(item) : memo
    }, [])
  }
}
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/app'
</style>
