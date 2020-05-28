<template>
  <div>
    <Drawer />

    <Header />

    <Content />

    <Collection :query="query" />
  </div>
</template>

<script lang="ts">
import Collection from "@/components/Collection.vue";
import Content from "@/components/Content.vue";
import Drawer from "@/components/Drawer.vue";
import Header from "@/components/Header.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    Collection,
    Content,
    Drawer,
    Header
  }
})
export default class Home extends Vue {
  @Prop() query!: any;
}
</script>
