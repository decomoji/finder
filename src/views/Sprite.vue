<template>
  <div :style="{ fontSize: '0', width: `${width * 10}px` }">
    <img
      v-for="name in decomojis"
      :key="name"
      :alt="name"
      :src="toSrc(name)"
      :height="width"
      :width="width"
    />
  </div>
</template>

<script lang="ts">
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
  components: {}
})
export default class Top extends Vue {
  get width() {
    return 64;
  }

  get decomojis() {
    return DecomojiExtra; //.slice(0, 33);
  }

  toSrc(name: string) {
    const category = "extra";
    return `/decomoji/${category}/${name}.png`;
  }

  // mounted() {
  //   const width = 64;
  //   const cols = 10;
  //   const rules = this.decomojis.map((name, index) => {
  //     const selector = `.DecomojiImg[data-decomoji="${name}"]`;

  //     const top = Math.floor(index / cols) * width;
  //     const left = (index % cols) * width;
  //     const rule = `background-position: -${left}px -${top}px `;

  //     const line = `${selector}{${rule}}`;
  //     return line;
  //   });
  //   window.x_stylesheet = rules.join("\n");
  //   console.log(`# run \`copy(window.x_stylesheet)\``);
  // }
}
</script>
