import ja from '@/i18n/vuetify/ja'
import Vue from 'vue'
import Vuetify, { directives } from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/src/stylus/app.styl'

/**
 * プラグインを引き当てる
 */
export default function useVuetify(ctx = Vue) {
  return ctx.use(Vuetify, {
    directives,
    iconfont: 'md',
    lang: {
      locales: {
        'ja-JP': ja
      },
      current: 'ja-JP'
    },
    theme: {
      primary: '#3b3642',
      accent: '#2bac76'
    }
  })
}
