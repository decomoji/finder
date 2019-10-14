<template>
  <div>
    <Drawer />

    <GlobalHeader />

    <Content />
  </div>
</template>

<script lang="ts">
import Content from '@/components/Content.vue'
import Drawer from '@/components/Drawer.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Content,
    Drawer,
    GlobalHeader
  }
})
export default class Home extends Vue {}
</script>
