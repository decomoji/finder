<template>
  <body
    :class="[
      'App',
      'font-noto-sans-jp',
      {
        'bg-body-ligth': !ui.dark,
        'bg-body-dark': ui.dark
      }
    ]"
  >
    <RouterView />
  </body>
</template>

<script lang="ts">
import { UiActions, UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class App extends Vue {
  /**
   * UIストアの viewModel を引き当てる
   */
  @Getter("ui/viewModel") ui!: UiViewModel;

  /**
   * @lifecycles
   */
  created() {}
}
</script>
