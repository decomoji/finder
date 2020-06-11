<template>
  <button
    class="Decomoji"
    @dblclick="$emit('remove', $event)"
    @keydown.delete="$emit('remove', $event)"
  >
    <img
      :alt="nameShows ? '' : name"
      :src="`/decomoji/${category}/${name}.png`"
      class="__img"
      width="64"
    />
  </button>
</template>

<script lang="ts">
import { CategoryId } from "@/models/CategoryId";
import { DecomojiItem } from "@/models/DecomojiItem";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DecomojiButton extends Vue {
  // 入力プロパティを定義する
  @Prop() category!: CategoryId;
  @Prop() name!: DecomojiItem;
  @Prop({ default: false }) collected!: boolean;
}
</script>
