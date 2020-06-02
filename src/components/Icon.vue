<template>
  <i class="material-icons leading-none" aria-hidden="true">{{ value }}</i>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Icon extends Vue {
  @Prop({ required: true }) value!: string;
}
</script>
