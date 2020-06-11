import "@babel/polyfill";
import "@/assets/styles/app.scss";
import createRouter from "@/router";
import createStore from "@/store";
import Vue from "vue";
import App from "@/App.vue";
import VueVirtualScroller from "vue-virtual-scroller";

Vue.config.productionTip = false;

Vue.use(VueVirtualScroller);

// プラグインを引き当てる
const router = createRouter();
const store = createStore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
