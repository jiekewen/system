import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // data
    user: "admin"
  },
  mutations: {
    // 数据处理方法
    showUser(state, user) {
      state.user = user
    }
  },
  getters: {
    // 数据包装（过滤器）
  }
})
