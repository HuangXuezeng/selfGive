import fetch from '@/api/fetch.js'
import qs from 'qs'

//获取个人信息
export function findCadreRosterInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreRosterInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
