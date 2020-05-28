<template>
  <div class="GlobalLoading">
    <div class="__inner">
      <div indeterminate color="primary" size="50" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class GlobalLoading extends Vue {}
</script>

<style lang="sass" scoped>

.GlobalLoading
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 1
  background-color: #000

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
