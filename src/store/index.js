import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // data
    user: "admin",
    // 报表界面的层级选择器
    handleChangeData: "",
    facility: {
      eCount: "",
      oCount: ""
    },
    // 打印渲染数据
    dayPrint: [],
    // 打印渲染数据标题
    dayPrintTitle: ""

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
