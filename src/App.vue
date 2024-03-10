<script setup lang="ts"></script>

<template>
  <div
    class="sticky top-0 left-0 flex items-center p-[--paddingHeader] w-full text-[--colorHeader] bg-[--bgHeader] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_8px_8px_rgba(0,0,0,0.075)]"
  ></div>

  <main></main>

  <footer
    class="sticky top-0 left-0 flex items-center p-[--paddingFooter] w-full text-[--colorFooter] bg-[--bgFooter] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_-8px_8px_rgba(0,0,0,0.075)]"
  >
    <p>
      このウェブアプリは
      <a
        href="https://twitter.com/otiext"
        class="link:text-inherit visited:text-inherit hover:text-inherit active:text-inherit"
        >oti</a
      >
      が作りました。
    </p>
    <p class="ml-auto">
      <a
        href="https://github.com/decomoji/finder/"
        class="link:text-inherit visited:text-inherit hover:text-inherit active:text-inherit"
        >GitHub</a
      >, MIT License.
    </p>
  </footer>
</template>
