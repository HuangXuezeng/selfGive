/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2020/4/15
 * Description: 文件描述
 */
import axios from "../axios"
import loginUrls from "../urls/login"
import qs from 'qs'
export default {
  // 账号密码登陆
  fetchLogin (data) {
    return axios.post(loginUrls.login, data)
  },
  fetchFindPayrollDept (data) {
    debugger
    data = qs.stringify(data)
    return axios.post(loginUrls.findPayrollDept, data)
  }
}
