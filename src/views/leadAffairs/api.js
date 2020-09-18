import fetch from '@/api/fetch.js'
import qs from 'qs'

//获取个人信息
export function queryDept (queryData) {
  return fetch({
    url: `/kukacms/self/roster/selectDefaultRoster`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取下拉框的值
export function getSelectVal (queryData) {
  return fetch({
    url: `/kukacms/self/roster/listSelector`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//组织架构
export function getOrz (queryData) {
  return fetch({
    url: `/kukacms/self/roster/selectDefaultRoster`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//根据岗位分类1查分类2的选择条件
export function queryFen2 (queryData) {
  return fetch({
    url: `/kukacms/self/roster/listPersonTypeTwo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//查询人员表
export function queryPerson (queryData) {
  return fetch({
    url: `/kukacms/self/roster/selectDefaultEmployee`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}