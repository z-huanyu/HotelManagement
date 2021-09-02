import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import http from './http'
Vue.prototype.$http = http

import './scss/style.scss' //全局导入scss样式
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper)

import Footer from './components/Footer.vue'
Vue.component('my-footer', Footer)//注册全局组件,页尾

import Nav from './components/Nav.vue'
Vue.component('my-nav', Nav)//导航

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '3GtLTebc7yg9Scs6DwA7ZUbekfWw2iDA'
})

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

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
