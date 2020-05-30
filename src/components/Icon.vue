<template>
  <i class="material-icons" aria-hidden="true">{{ value }}</i>
</template>

<script lang="ts">
import { Prop, Vue } from "vue-property-decorator";

export default class Icon extends Vue {
  @Prop({ required: true }) value!: string;
}
</script>

<style lang="sass" scoped>
.material-icons
  line-heihgt: 1
</style>
