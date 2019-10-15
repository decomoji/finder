<template>
  <VContent>
    <VContainer grid-list-lg pa-4>
      <VLayout row wrap align-baseline>
        <VFlex v-for="item in items" :key="item" xs1>
          <VTooltip bottom>
            <template v-slot:activator="{ on }">
              <VBtn flat icon v-on="on">
                <img
                  :src="
                    `https://raw.githubusercontent.com/decomoji/slack-reaction-decomoji/master/decomoji/extra/${item}.png`
                  "
                />
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
    const memo: string[] = []
    const basic = DecomojiBasic.basic
    const extra = DecomojiExtra.extra
    const items = memo.concat(basic, extra)
    const query = this.query

    return items.reduce<string[]>((memo, item) => {
      return item.includes(isStringOfNotEmpty(query) ? query : '')
        ? memo.concat(item)
        : memo
    }, [])
  }
}
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/app'
</style>
