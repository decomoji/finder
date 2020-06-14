import Top from "@/views/Top.vue";
import Sprite from "@/views/Sprite.vue";
import Sprite2 from "@/views/Sprite2.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Router, { RouterOptions } from "vue-router";

const { BASE_URL } = process.env;

/**
 * ルート
 */
export const routes: RouterOptions["routes"] = [
  // ホーム
  {
    path: "/",
    name: "top",
    component: Top,
    props: route => ({ query: route.query })
  },
  {
    path: "/sprites",
    name: "sprites",
    component: Sprite
  },
  {
    path: "/sprites2",
    name: "sprites2",
    component: Sprite2
  }
];

/**
 * スクロールの振る舞い
 * @see https://router.vuejs.org/ja/guide/advanced/scroll-behavior.html
 * @param to
 * @param from
 * @param savedPosition
 */
export const scrollBehavior: RouterOptions["scrollBehavior"] = (
  to,
  from,
  savedPosition
) => savedPosition || { x: 0, y: 0 };

/**
 * ルーターオプション
 */
export const routerOptions: RouterOptions = {
  mode: "history",
  base: BASE_URL,
  routes,
  scrollBehavior
};

/**
 * プラグインを引き当てる
 */
export function useRouter(ctx = Vue) {
  // ルーターフックをコンポーネントに引き当てる
  Component.registerHooks([
    "beforeRouteEnter",
    "beforeRouteLeave",
    "beforeRouteUpdate"
  ]);

  return ctx.use(Router);
}

/**
 * ルーターを生成する
 * @param options
 * @param ctx
 */
export default function createRouter(options = routerOptions, ctx = Vue) {
  useRouter(ctx);
  return new Router(options);
}
