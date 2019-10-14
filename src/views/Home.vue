<template>
  <div>
    <VNavigationDrawer clipped fixed permanent app>
      <VList subheader two-line>
        <VSubheader>カテゴリー</VSubheader>

        <VListTile>
          <VListAction>
            <VCheckbox v-model="category.basic"></VCheckbox>
          </VListAction>
          <VListTileContent @click="category.basic = !category.basic">
            <VListTileTitle>Basic</VListTileTitle>
            <VListTileSubTitle>基本セット</VListTileSubTitle>
          </VListTileContent>
        </VListTile>

        <VListTile>
          <VListAction>
            <VCheckbox v-model="category.extra"></VCheckbox>
          </VListAction>
          <VListTileContent @click="category.extra = !category.extra">
            <VListTileTitle>Extra</VListTileTitle>
            <VListTileSubTitle>拡張セット</VListTileSubTitle>
          </VListTileContent>
        </VListTile>

        <VListTile>
          <VListAction>
            <VCheckbox v-model="category.explicit"></VCheckbox>
          </VListAction>
          <VListTileContent @click="category.explicit = !category.explicit">
            <VListTileTitle>Explicit</VListTileTitle>
            <VListTileSubTitle>要注意セット</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>
    </VNavigationDrawer>
    <GlobalHeader />
    <VContent>
      <VContainer fluid fill-height>
        <VLayout>
          <VFLex grow>
            <VTextField flat prepend-icon="search" label="Search" />
          </VFLex>
        </VLayout>
      </VContainer>
    </VContent>
  </div>
</template>

<script lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

interface Category {
  basic: boolean
  extra: boolean
  explicit: boolean
}

@Component({
  components: {
    GlobalHeader
  }
})
export default class Home extends Vue {
  /**
   * 内部プロパティを定義する
   */
  category: Category = {
    basic: true,
    extra: true,
    explicit: true
  }
}
</script>
