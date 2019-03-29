import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Home from '../views/home/home'
// 引入nav组件
import HomePage from '../components/1.homePage/homePage' //首页
import DataMonitor from '../components/2.dataMonitor/dataMonitor' //数据监控
import MessageList from '../components/3.dangerAlarm/messageList' //消息列表
import AlarmConfig from '../components/3.dangerAlarm/alarmConfig' //报警配置
import DataAnalysis from '../components/4.dataAnalysis/dataAnalysis' //数据分析
import SystemLog from '../components/5.systemLog/systemLog' //系统日志
import SystemReport from '../components/6.systemReport/systemReport' //系统报表
import CheckCalendar from '../components/7.checkManage/checkCalendar' //巡检日历
import CheckPlan from '../components/7.checkManage/checkPlan' //巡检计划
import Knowledge from '../components/8.knowledge/knowledge' //知识库
import SortConfig from '../components/9.sortConfig/sortConfig' //层级设置

Vue.use(Router)

export default new Router({
  mode: "history", //去掉#
  routes: [{
      name: 'login',
      path: '/',
      component: Login,
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      redirect: to => {
        return '/homePage'
      },
      children: [{
          name: '首页',
          path: '/homePage',
          component: HomePage,
        },
        {
          name: '数据监控',
          path: '/dataMonitor',
          component: DataMonitor,
        },
        // 报警管理
        {
          name: '消息列表',
          path: '/messageList',
          component: MessageList,
        },
        {
          name: '报警配置',
          path: '/alarmConfig',
          component: AlarmConfig,
        },
        {
          name: '数据分析',
          path: '/dataAnalysis',
          component: DataAnalysis,
        },
        {
          name: '系统日志',
          path: '/systemLog',
          component: SystemLog,
        },
        {
          name: '系统报表',
          path: '/systemReport',
          component: SystemReport,
        },
        //巡检管理
        {
          name: '巡检日历',
          path: '/checkCalendar',
          component: CheckCalendar,
        },
        {
          name: '巡检计划',
          path: '/checkPlan',
          component: CheckPlan,
        },
        {
          name: '知识库',
          path: '/knowledge',
          component: Knowledge,
        },
        {
          name: '层级设置',
          path: '/sortConfig',
          component: SortConfig,
        }
      ]
    }
  ]
})
