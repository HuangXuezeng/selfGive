import fetch from '@/api/fetch.js'
import qs from 'qs'

//按照工号查询奖惩
export function findRewardInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findRewardInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//按照工号查询奖惩详情
export function findRewardDetailsInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findRewardDetailsInfo`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}
//按照工号查询人均工资
export function findPerGetInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findPerGetInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//职级工资折线图
export function findPerGetDetailsInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findPerGetDetailsInfo`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}
//按照
