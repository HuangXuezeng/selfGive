import axios from 'axios'

// 创建 axios 实例
const fetch = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 150000
})

// request 请求拦截器
fetch.interceptors.request.use(config => {
  // 添加请求 headers 信息
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;utf-8;'
  return config
}, error => {
  // 错误提示
  Promise.reject(error)
})

// respone 响应拦截器
fetch.interceptors.response.use(response => {
  const res = response.data
  // status 为状态码，结合业务修改 code / state
  // if (res.code !== 1000) {
  //   Message({
  //     message: res.message,
  //     type: 'error',
  //     duration: 3 * 1000
  //   })
  //   return Promise.reject(res)
  // } else {
  //   return res
  // }
  return res
}, error => {
  return Promise.reject(error);
})

export default fetch