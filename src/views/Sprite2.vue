<template>
  <div :style="{ fontSize: '0', width: `${width * 10}px` }">
    <DecomojiImg
      v-for="name in decomojis"
      :key="name"
      :name="name"
      category="extra"
    />
  </div>
</template>

<script lang="ts">
import DecomojiImg from "@/components/DecomojiImg.vue";
import Collection from "@/components/Collection.vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import { CategoriesObject } from "@/models/CategoriesObject";
import { DecomojiAction } from "@/store/modules/decomoji/models";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import {
  AvailableDecomoji,
  AvailableDecomojis
} from "@/configs/AvailableDecomojis";
import { DecomojiExtra } from "../configs/DecomojiExtra";

@Component({
  components: {
    DecomojiImg
  }
})
export default class Top extends Vue {
  get width() {
    return 64;
  }

  get decomojis() {
    return DecomojiExtra;
  }

  toSrc(name: string) {
    const category = "extra";
    return `/decomoji/${category}/${name}.png`;
  }
}
</script>
