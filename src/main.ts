import "@babel/polyfill";
import "@/assets/styles/app.sass";
import createRouter from "@/router";
import createStore from "@/store";
import Vue from "vue";
import App from "@/App.vue";

Vue.config.productionTip = false;

// プラグインを引き当てる
const router = createRouter();
const store = createStore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
