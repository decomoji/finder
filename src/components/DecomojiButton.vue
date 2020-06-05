<template>
  <button @click="$emit('add', $event)">
    <img
      :alt="nameShows ? '' : name"
      :src="`/decomoji/${category}/${name}.png`"
      width="64"
    />
    <span v-show="nameShows" :aria-label="name">{{ colonedName }}</span>
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
  @Prop({ default: false }) nameShows!: boolean;

  // @get - コロン記号で挟んだ name を返す
  get colonedName() {
    return `:${this.name}:`;
  }
}
</script>
