import Vue from 'vue'
import App from './App.vue'
// 导包
import ElementUI from 'element-ui'
// 导入路由文件
import router from '@/router'

// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 在全局范围内注册element-ui组件库
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
