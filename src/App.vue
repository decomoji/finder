<template>
  <body :class="['App', { '-dark': ui.dark }]">
    <RouterView />
  </body>
</template>

<script lang="ts">
import { UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

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
