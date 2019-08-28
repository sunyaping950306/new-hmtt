// 封装axios
import axios from 'axios'

const instance = axios.create({
  // 基准路径
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // 请求头
  // header: {
  //   // token需要认证的字段 值：注意需要加上前缀'Bearer '
  //   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('new-hmtt')).token
  // }
})
/* // 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); */

// 自己的请求拦截器
instance.interceptors.request.use(config => {
  // config请求配置对象  修改config
  const user = window.sessionStorage.getItem('new-hmtt')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

/* // 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
}) */

// 自己的响应拦截器
instance.interceptors.response.use(response => {
  return response
}, (error) => {
  /* 对响应错误进行处理
  * 如果状态码401时，拦截到登录页
  * */
  // console.dir(error) 打印内容中有response.status
  if (error.response.status === 401) {
    // hsah是location提供获取操作地址栏#后的地址的属性
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
