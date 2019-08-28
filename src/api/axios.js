// 封装axios
import axios from 'axios'
const instance = axios.create({
  // 基准路径
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  // 请求头
  header: {
    // token需要认证的字段 值：注意需要加上前缀'Bearer '
    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('new-hmtt')).token
  }
})

export default instance
