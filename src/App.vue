<template>
  <VApp>
    <RouterView role="main" class="mb-4" />
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
