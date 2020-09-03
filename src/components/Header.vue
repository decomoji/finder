<template>
  <section class="Header">
    <h2 class="VisuallyHidden">絞り込み検索</h2>
    <div class="__inner">
      <Logo />
      <Search />
    </div>

    <h2 class="VisuallyHidden">表示オプション</h2>
    <div class="__inner">
      <SizeSelector />
      <CategorySelector />
      <VersionSelector />
      <OptionSelector />
    </div>
  </section>
</template>

<script lang="ts">
import CategorySelector from "@/components/CategorySelector.vue";
import Logo from "@/components/Logo.vue";
import OptionSelector from "@/components/OptionSelector.vue";
import Search from "@/components/Search.vue";
import SizeSelector from "@/components/SizeSelector.vue";
import VersionSelector from "@/components/VersionSelector.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    CategorySelector,
    Logo,
    OptionSelector,
    Search,
    SizeSelector,
    VersionSelector,
  },
})
export default class Header extends Vue {}
</script>
