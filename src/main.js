import Vue from 'vue'
import App from './App.vue'
// 导入elementUI
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入路由文件
import router from '@/router'
// 导入axios并挂载到vue原型中
import axios from '@/api/axios.js'
// 导入组件文件
import components from '@/components'

Vue.prototype.$http = axios

// 在全局范围内注册element-ui组件库
Vue.use(ElementUI)
// 在全局范围内注册组件
Vue.use(components)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
