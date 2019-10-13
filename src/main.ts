import '@babel/polyfill'
import '@/assets/app.styl'
import useVuetify from '@/plugins/vuetify'
import createRouter from '@/router'
import createStore from '@/store'
import Vue from 'vue'
import App from '@/App.vue'

Vue.config.productionTip = false

// プラグインを引き当てる
useVuetify()
const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
