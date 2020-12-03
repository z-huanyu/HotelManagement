import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http'//导入http模块
Vue.prototype.$http = http//挂载http到原型

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
