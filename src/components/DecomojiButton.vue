<template>
  <button
    :class="[
      'Decomoji',
      {
        '-collected': collected,
      },
    ]"
    @click="$emit(collected ? 'remove' : 'add', $event)"
    @dblclick="$emit('remove', $event)"
    @keydown.delete="$emit('remove', $event)"
  >
    <img
      :alt="name"
      :src="`/decomoji/${category}/${name}.png`"
      class="__img"
      height="64"
      width="64"
    />
    <span class="__name"
      ><span aria-hidden="true">:</span>{{ name
      }}<span aria-hidden="true">:</span></span
    >
  </button>
</template>

<script lang="ts">
import { CategoryName } from "@/models/CategoryName";
import { DecomojiName } from "@/models/DecomojiName";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DecomojiButton extends Vue {
  // 入力プロパティを定義する
  @Prop() category!: CategoryName;
  @Prop() name!: DecomojiName;
  @Prop({ default: false }) collected!: boolean;
  @Prop({ default: undefined }) created!: string;
  @Prop({ default: undefined }) updated!: string;
}
</script>
