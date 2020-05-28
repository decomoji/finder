<template>
  <div :dark="ui.dark" class="App">
    <RouterView role="main" class="mb-4" />
    <GlobalLoading v-if="ui.hasGlobalLoadingQueue" />
  </div>
</template>

<script lang="ts">
import GlobalLoading from "@/components/GlobalLoading.vue";
import { UiActions, UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    GlobalLoading
  }
})
export default class App extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;

  /**
   * アクションを引き当てる
   */
  @Action("ui/decrementGlobalLoadingQueue")
  decrementGlobalLoadingQueue!: UiActions["decrementGlobalLoadingQueue"];
  @Action("ui/incrementGlobalLoadingQueue")
  incrementGlobalLoadingQueue!: UiActions["incrementGlobalLoadingQueue"];

  /**
   * @lifecycles
   */
  created() {}
}
</script>
<style lang="sass" scoped>
.App
  &.theme--light
    background-color: #ffffff
  &.theme--dark
    background-color: #15171a
</style>
