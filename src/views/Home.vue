<template>
  <div>
    <Drawer />

    <Header />

    <Content />
  </div>
</template>

<script lang="ts">
import Content from '@/components/Content.vue'
import Drawer from '@/components/Drawer.vue'
import Header from '@/components/Header.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Content,
    Drawer,
    Header
  }
})
export default class Home extends Vue {}
</script>
