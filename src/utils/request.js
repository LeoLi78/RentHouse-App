/**
 * 封装 axios 请求模块
 */
import axios from "axios"
import store from '@/store'

const instance = axios.create({
  baseURL: "http://liufusong.top:8080/",// 基础路径

})

instance.interceptors.request.use(function (config) {
  if (store.state.user && store.state.user.token) {
    config.headers = ({
      Authorization: store.state.user.token
    })
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})


export default instance