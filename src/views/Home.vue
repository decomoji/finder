<template>
  <div>
    <Drawer />

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
import Drawer from '@/components/Drawer.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Drawer,
    GlobalHeader
  }
})
export default class Home extends Vue {}
</script>
