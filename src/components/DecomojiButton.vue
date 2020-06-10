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
    <span v-show="nameShows" :aria-label="name" class="__name">{{
      colonedName
    }}</span>
  </button>
</template>

<script lang="ts">
import { CategoryId } from "@/models/CategoryId";
import { DecomojiCollectionItem } from "@/models/DecomojiCollection";
import { DecomojiItem } from "@/models/DecomojiItem";
import { CollectionViewModel } from "@/store/modules/collection/models";
import { UiViewModel } from "@/store/modules/ui/models";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class DecomojiButton extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;
  @Getter("collection/viewModel") collection!: CollectionViewModel;

  // 入力プロパティを定義する
  @Prop() category!: CategoryId;
  @Prop() name!: DecomojiItem;
  @Prop({ default: false }) nameShows!: boolean;
  @Prop({ default: false }) collected!: boolean;

  // @get - コロン記号で挟んだ name を返す
  get colonedName() {
    return `:${this.name}:`;
  }
}
</script>
