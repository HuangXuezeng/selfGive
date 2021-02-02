import axios from "../axios"
import selfServiceLogin from "../urls/selfServiceLogin"
import qs from 'qs'
export default {
  //  获取跟人信息
  findSomeBasicInfo (data) {
    data = qs.stringify(data)
    return axios.post(selfServiceLogin.findSomeBasicInfo, data)
  }
}
