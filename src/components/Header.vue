<template>
  <header class="Header">
    <div class="__inner">
      <Logo />
      <Search />
    </div>

    <div class="__inner">
      <SizeSelector />
      <CategorySelector />
      <OptionSelector />
    </div>
  </header>
</template>

<script lang="ts">
import CategorySelector from "@/components/CategorySelector.vue";
import Logo from "@/components/Logo.vue";
import OptionSelector from "@/components/OptionSelector.vue";
import Search from "@/components/Search.vue";
import SizeSelector from "@/components/SizeSelector.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    CategorySelector,
    Logo,
    OptionSelector,
    Search,
    SizeSelector,
  },
})
export default class Header extends Vue {}
</script>
