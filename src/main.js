import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Contextmenu from 'vue-contextmenujs'
import '@/style/index.less'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import $to from 'await-to-js'
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$to = $to

Vue.use(Contextmenu);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
