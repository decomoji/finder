<template>
  <button
    :class="[
      'Decomoji',
      {
        '-collected': collected
      }
    ]"
    @click="$emit('add', $event)"
    @dblclick="$emit('remove', $event)"
    @keydown.delete="$emit('remove', $event)"
  >
    <img
      :alt="nameShows ? '' : name"
      :src="`/decomoji/${category}/${name}.png`"
      class="__img"
      width="64"
    />
    <span v-show="nameShows" :aria-label="name" class="__name"
      >:{{ name }}:</span
    >
  </button>
</template>

<script lang="ts">
import { CategoryName } from "@/models/CategoryName";
import { CollectionItem } from "@/models/Collection";
import { DecomojiName } from "@/models/DecomojiName";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DecomojiButton extends Vue {
  // 入力プロパティを定義する
  @Prop() category!: CategoryName;
  @Prop() name!: DecomojiName;
  @Prop({ default: false }) nameShows!: boolean;
  @Prop({ default: false }) collected!: boolean;

  // @get - コロン記号で挟んだ name を返す
  get colonedName() {
    return `:${this.name}:`;
  }
}
</script>
