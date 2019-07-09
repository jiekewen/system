import Vue from 'vue'
import App from './App'
import router from './router'
// 引入common.css
import './assets/css/home/common.css'
// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 导入axios
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// 线上请求头
axios.defaults.baseURL = 'http://101.201.73.248:8002/netgate-server/'
// 本地请求头
// axios.defaults.baseURL = 'http://192.168.0.219:8002/netgate-server'
let token = localStorage.getItem('token') || '';
axios.defaults.headers.common['token'] = token;
// 导入依赖包，解决ie不支持es6语法的兼容性问题
import "babel-polyfill"
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
// 引入vuex
import store from './store/index.js'
import Vuex from 'vuex'
Vue.use(Vuex)
// 引入百度vue - baidu - map插件
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: '4IU3oIAMpZhfWZsMu7xzqBBAf6vMHcoa'
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store, //使用store
  components: {
    App
  },
  template: '<App/>'
})
