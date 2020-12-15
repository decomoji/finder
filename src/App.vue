<template>
  <body
    :class="[
      'App',
      `-${decomoji.size}`,
      {
        '-created': decomoji.created,
        '-dark': decomoji.dark,
        '-reacted': decomoji.reacted,
        '-updated': decomoji.updated,
        '-vertical': decomoji.vertical,
      },
    ]"
  >
    <RouterView />
  </body>
</template>

<script lang="ts">
import { DecomojiViewModel } from "@/store/modules/decomoji/models";
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class App extends Vue {
  /**
   * UIストアの viewModel を引き当てる
   */
  @Getter("decomoji/viewModel") decomoji!: DecomojiViewModel;
}
</script>
