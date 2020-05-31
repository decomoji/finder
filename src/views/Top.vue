<template>
  <div>
    <Header :query="query" />
    <Main :query="query" />
    <Collection :query="query" />
  </div>
</template>

<script lang="ts">
import Collection from "@/components/Collection.vue";
import Main from "@/components/Main.vue";
import Drawer from "@/components/Drawer.vue";
import Header from "@/components/Header.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    Collection,
    Main,
    Drawer,
    Header
  }
})
export default class Top extends Vue {
  @Prop() query!: string;
}
</script>
