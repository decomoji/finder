<script setup lang="ts"></script>

<template>
  <div
    class="sticky top-0 left-0 flex items-center p-[--paddingHeader] w-full text-[--colorHeader] bg-[--bgHeader] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_8px_8px_rgba(0,0,0,0.075)]"
  >
    <div class="flex items-center gap-[--betweenLogoSearch]">
      <h1 class="flex-[0_0_auto]">
        <a class="block w-8 h-8 rounded-full overflow-hidden  " href="/">
          <img class="block" src="/logo.png" alt="デコモジファインダー" width="32" height="32" />
        </a>
      </h1>
      <div class="relative flex-[1_1_auto] text-[--shade-200] focus-within:text-[--shade-800]">
        <input
          class="py-[--space-sm] pl-[calc(1.5rem+var(--space-md))] pr-[calc(6.5rem+var(--space-md))] rounded-md w-full text-md bg-[rgba(255,255,255,0.25)] focus-within:bg-[rgba(255,255,255,0.95)]"
          name="search"
          type="text"
          title="検索"
        />
        <span class="material-icons pointer-events-none absolute top-[1px] bottom-0 left-[--space-xs] m-auto w-6 h-6" aria-hidden="true">search</span>
        <span class="pointer-events-none absolute top-0 bottom-0 right-[--space-xs] m-auto h-4 leading-none" aria-hidden="true">36000/36000</span>
        <span class="sr-only">36000個中36000個が該当しています。</span>
      </div>
    </div>
  </div>

<<<<<<< HEAD
  <main></main>
=======
  <main>

  </main>

  <footer class="sticky top-0 left-0 p-[--paddingFooter] w-full colr-[--colorFooter] bg-[--bgFooter] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_-8px_8px_rgba(0,0,0,0.075)]">
>>>>>>> d2e56cc (feat: src/App.vue, フッターのベースを Tailwind 化した)

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
