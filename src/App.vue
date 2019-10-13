<template>
  <VApp>
    <RouterView role="main" class="mb-4" />

    <VFooter role="contentinfo" absolute dark height="auto" class="px-3">
      <p class="mb-0">
        このウェブアプリは<a
          href="https://twitter.com/otiext"
          target="_blank"
          rel="noopener"
          >越智</a
        >が作りました。
      </p>
      <VSpacer />
      <p class="mb-0">
        <a
          href="https://github.com/decomoji/decomoji-finder/"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
      </p>
    </VFooter>

    <GlobalLoading v-if="ui.hasGlobalLoadingQueue" />
  </VApp>
</template>

<script lang="ts">
import GlobalLoading from '@/components/GlobalLoading.vue'
import { UiActionDispatchers, UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  components: {
    GlobalLoading
  }
})
export default class App extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * アクションを引き当てる
   */
  @Action('ui/decrementGlobalLoadingQueue')
  decrementGlobalLoadingQueue!: UiActionDispatchers['decrementGlobalLoadingQueue']
  @Action('ui/incrementGlobalLoadingQueue')
  incrementGlobalLoadingQueue!: UiActionDispatchers['incrementGlobalLoadingQueue']

  /**
   * @lifecycles
   */
  created() {}
}
</script>
