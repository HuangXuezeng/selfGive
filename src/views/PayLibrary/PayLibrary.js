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
//平均年薪
export function findPerYearInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findPerYearInfo`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}
//平均年薪部门选择
export function findPayrollDept (queryData) {
  return fetch({
    url: `/kukacms/self/findPayrollDept`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//薪资库查询
export function findPayrollInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findPayrollInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
