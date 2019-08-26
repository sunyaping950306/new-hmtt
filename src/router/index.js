// 创建路由对象、配置路由规则、配置其他路由
// 导入vue
import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
import Login from '@/views/login'
// 注册vue-router
Vue.use(VueRouter)
// 初始化router对象(配置路由规则)
const router = new VueRouter({
  // 路由规则
  routes: [
    { path: '/login', name: 'login', component: Login }
  ]
})
// 导出、挂载到main.js根实例下
export default router
