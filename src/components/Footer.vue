<template>
  <footer class="Footer">
    <div class="__inner">
      <p class="__credit">
        作者：<a
          href="https://twitter.com/otiext"
          target="_blank"
          rel="noopener"
          >越智</a
        >
      </p>
      <p class="__license">
        <a
          href="https://github.com/decomoji/finder/"
          target="_blank"
          rel="noopener"
          >GitHub</a
        >, MIT License.
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>
