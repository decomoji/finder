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
import { DecomojiCollectionItem } from "@/models/DecomojiCollection";
import { DecomojiItem } from "@/models/DecomojiItem";
import { CollectionViewModel } from "@/store/modules/collection/models";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class DecomojiButton extends Vue {
  // viewModel を引き当てる
  @Getter("collection/viewModel") collection!: CollectionViewModel;

  // 入力プロパティを定義する
  @Prop() category!: CategoryId;
  @Prop() name!: DecomojiItem;
}
</script>
