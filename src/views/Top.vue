<template>
  <div>
    <Header :query="query" />
    <Main :query="query" />
    <Collection :query="query" />
  </div>
</template>

<script lang="ts">
import Collection from "@/components/Collection.vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    Collection,
    Header,
    Main
  }
})
export default class Top extends Vue {
  @Prop() query!: string;
}
</script>
