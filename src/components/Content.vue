<template>
  <VContent>
    <VContainer fluid fill-height>
      <VLayout>
        <VFLex grow>
          <VTextField flat prepend-icon="search" label="Search" />
        </VFLex>
      </VLayout>
    </VContainer>
  </VContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Content extends Vue {}
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/app'
</style>
