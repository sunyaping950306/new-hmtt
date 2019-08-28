import Vue from 'vue'
import App from './App.vue'
// 导入elementUI
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入路由文件
import router from '@/router'

// 导入axios并挂载到vue原型中
import axios from 'axios'
// 基准路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头
axios.defaults.header = {
  // token需要认证的字段 值：注意需要加上前缀'Bearer'
  Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('new-hmtt')).token
}
Vue.prototype.$http = axios

// 在全局范围内注册element-ui组件库
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
