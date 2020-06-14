<template>
  <i v-if="category === 'extra'" :data-decomoji="name" class="DecomojiImg" />
  <img
    v-else
    :alt="name"
    :src="`/decomoji/${category}/${name}.png`"
    class="__img"
    height="64"
    width="64"
  />
</template>

<script lang="ts">
import { CategoryName } from "@/models/CategoryName";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DecomojiButton extends Vue {
  // 入力プロパティを定義する
  @Prop() category!: CategoryName;
  @Prop() name!: string;
  @Prop() size!: string;
}
</script>

<style>
@import url("/decomoji/sprites/extra-sprite.css");

.DecomojiImg {
  background-image: url("/decomoji/sprites/extra-sprite.png");
  background-size: 640px auto;
  display: inline-block;
  height: 64px;
  transform-origin: top left;
  width: 64px;
}

/* .-l .DecomojiImg {
  transform: scale(1);
} */
.-m .DecomojiImg {
  transform: scale(0.5);
}
.-s .DecomojiImg {
  transform: scale(0.25);
}
</style>
