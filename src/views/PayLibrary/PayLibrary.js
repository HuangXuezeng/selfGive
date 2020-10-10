import fetch from '@/api/fetch.js'
import qs from 'qs'

//获取个人信息
export function findRewardInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findRewardInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
