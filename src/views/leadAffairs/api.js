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
    url: `/kukacms/self/roster/selectDefaultOrgan`,
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
//根据职类查询职级
export function queryRank (queryData) {
  return fetch({
    url: `/kukacms/self/roster/listRank`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取传给后台的部门名称和部门id
export function queryDeptIdName (queryData) {
  return fetch({
    url: `/kukacms/self/roster/selectDefaultRoster`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//查询条件
export function querySome (queryData) {
  return fetch({
    url: `/kukacms/self/roster/selectEmployeeCondition`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}

//人员结构部分----------------------------------------------------------

//获取选择的时间
export function querySelectTime (queryData) {
  return fetch({
    url: `/kukacms/self/findDateList`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}