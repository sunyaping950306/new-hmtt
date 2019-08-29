// 封装成插件的形式 Vue.js（插件）  执行插件的配置对象中install函数，且传入Vue对象
import MyBread from '@/components/my-bread.vue'
export default {
  install (Vue) {
    // 注册所有组件在Vue下
    Vue.component(MyBread.name, MyBread)
    // ...以此类推components下的左右组件都可以在这里注册了
  }
}
