import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http'//导入http模块
Vue.prototype.$http = http//挂载http到原型

Vue.prototype.getNowFormatDate = function () {//获取当前时间
  let date = new Date();
  let seperator1 = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let m = date.getMinutes();
  m = m < 10 ? "0" + m : m;
  let s = date.getSeconds();
  s = s < 10 ? "0" + s : s;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  let currentdate = year + seperator1 + month + seperator1 + day + seperator1 + h + ':' + m + ':' + s;
  return currentdate;
};

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
