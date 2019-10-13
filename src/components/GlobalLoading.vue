<template>
  <div class="GlobalLoading">
    <div class="__inner">
      <VProgressCircular indeterminate color="primary" size="50" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GlobalLoading extends Vue {}
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/app'

.GlobalLoading
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 1
  background-color: $body-bg-color

  .__inner
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    display: flex
    justify-content: center
    align-items: center
</style>
