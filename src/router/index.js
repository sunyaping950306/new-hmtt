// 创建路由对象、配置路由规则、配置其他路由
// 导入vue
import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import Image from '@/views/image'
import Publish from '@/views/publish'

// 注册vue-router
Vue.use(VueRouter)
// 初始化router对象(配置路由规则)
const router = new VueRouter({
  // 路由规则
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})
// 注册一个全局的前置导航守卫
router.beforeEach((to, from, next) => {
  const user = window.sessionStorage.getItem('new-hmtt')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
// 导出、挂载到main.js根实例下
export default router
