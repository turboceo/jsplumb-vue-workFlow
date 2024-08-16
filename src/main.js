import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Contextmenu from 'vue-contextmenujs'
import '@/style/index.less'

import './platform-theme/common.less'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import $to from 'await-to-js'
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$to = $to

Vue.use(Contextmenu);

import PyzlPlugin from "@/plugin/pyzl";
import SqlPlugin from "@/plugin/sql";
Vue.use(PyzlPlugin);
Vue.use(SqlPlugin);

/**
 * 判断当前用户是否拥有某个产品的权限
 * @param {Object} options
 * @returns {Boolean}
 *
 * @example
 * ``` html
 * //  非dev环境下并且具有staff_add将会返回true
 * v-if="$hasPerm({p:["staff_add"],n:["dev"]});"
 * //  dev或者zgwl环境下并且具有staff_add将会返回true
 * v-if="$hasPerm({p:["staff_add"],y:["dev", 'zgwl']});"
 * ```
 *
 * ``` javascript
 * 当前环境通过`this.$runtime`进行访问
 * ```
 */
let hasOwn = {}.hasOwnProperty;
let $hasPerm = function (options) {
  // let { p, y, n } = options;
  // let $runtime = this.$runtime;
  // let hasOwnYProperty = hasOwn.call(options, "y");
  // let hasOwnNProperty = hasOwn.call(options, "n");
  // if (!hasOwnYProperty && !hasOwnNProperty)
  //   return this.$checkUserHasPermission(this, p);
  // if (hasOwnYProperty && y.indexOf($runtime) > -1)
  //   return this.$checkUserHasPermission(this, p);
  // if (hasOwnNProperty && n.indexOf($runtime) === -1)
  //   return this.$checkUserHasPermission(this, p);
  // return false;
  return true
};

Vue.prototype.$hasPerm = $hasPerm

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
