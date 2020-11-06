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
export function getOrz (searchData) {
  return fetch({
    url: `/kukacms/self/roster/selectOrgan`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(searchData)
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
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
    // data: qs.stringify(queryData)
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
//组件pickOne的选择时判断是否有权限选择(流失率和人员结构选择部门)
export function checkDept (queryData) {
  return fetch({
    url: `/kukacms/self/dept/checkDept`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}
//组件chooseDepet的选择时判断是否有权限选择(花名册选择部门)
export function isHaveQx (queryData) {
  return fetch({
    url: `/kukacms/self/isHaveQx`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}
//从其他页面进入花名册查看
export function queryRoster (queryData) {
  return fetch({
    url: `/kukacms/self/roster/selectEmployeeByJobnumber`,
    method: 'post',
    headers:{"content-type":"application/json"},
    dataType: 'json',
    data: JSON.stringify(queryData)
  })
}
//花名册导出表格
export function exportExl (queryData) {
  return fetch({
    url: `/kukacms/self/roster/exportExcel`,
    method: 'post',
    headers:{"content-type":"application/json"},
    dataType: 'json',
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
//获取按岗位分类
export function queryGwfl (queryData) {
  return fetch({
    url: `/kukacms/self/findGwTeamInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取按岗位层级
export function queryGwcj (queryData) {
  return fetch({
    url: `/kukacms/self/findGwcjTeamInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取按学历
export function queryXlTeam (queryData) {
  return fetch({
    url: `/kukacms/self/findXlTeamInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取按年龄
export function queryAgeTeam (queryData) {
  return fetch({
    url: `/kukacms/self/findAgeTeamInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取按性别
export function querySexTeam (queryData) {
  return fetch({
    url: `/kukacms/self/findSexTeamInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取按司龄
export function queryJobAgeTeam (queryData) {
  return fetch({
    url: `/kukacms/self/findJobAgeTeamInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//查看部门详细
export function queryDeptDetailTeam (queryData) {
  return fetch({
    url: `/kukacms/self/findDetailsTeamInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//流失率部分--------------------------------------------------------
export function queryRunoff (queryData) {
  return fetch({
    url: `/kukacms/self/runoff/list`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}
export function selectPerson (queryData) {
  return fetch({
    url: `/kukacms/self/runoff/selectPerson`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//人员异动部分--------------------------------------------------------
export function queryChanges (queryData) {
  return fetch({
    url: `/kukacms/self/turnover/selectTurnoverByCondition`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}
// 查询异动分类
export function getClassic (queryData) {
  return fetch({
    url: `/kukacms/self/turnover/getSelector`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
// 异动分类导出表格
export function exportExcel (queryData) {
  return fetch({
    url: `/kukacms/self/turnover/exportExcel`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}