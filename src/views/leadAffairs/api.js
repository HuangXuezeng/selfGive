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
//花名册图形查询
export function personalRatio (queryData) {
  return fetch({
    url: `/kukacms/self/roster/personalRatio`,
    method: 'post',
    headers:{"content-type":"application/json"},
    dataType: 'json',
    data: JSON.stringify(queryData)
  })
}
//花名册表格下一页
export function selectEmployeeLimit (queryData) {
  return fetch({
    url: `/kukacms/self/roster/selectEmployeeLimit`,
    method: 'post',
    data: qs.stringify(queryData)
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
    method: 'post',
    data: qs.stringify(queryData)
  })
}
// 异动分类表格分页
export function selectTurnoverLimit (queryData) {
  return fetch({
    url: `/kukacms/self/turnover/selectTurnoverLimit`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
// 编制分析部分--------------------------------------------------------------------------------------------
export function getSelector (queryData) {
  return fetch({
    url: `/kukacms/self/bianzhi/getSelector`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
// 编制分析查询
export function selectBianzhi (queryData) {
  return fetch({
    url: `/kukacms/self/bianzhi/selectBianzhiCondition`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}
//根据部门查询岗位分类一
export function getPostOne (queryData) {
  return fetch({
    url: `/kukacms/self/bianzhi/getPostOne`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//图形展示接口
export function selectDraw (selectData) {
  return fetch({
    url: `/kukacms/self/bianzhi/selectDraw`,
    method: 'post',
    data: qs.stringify(selectData)
  })
}

//人效分析部分—————————————————————————————————————————————————————————————————————
//获取下拉框的值
export function querySelectVal (selectData) {
  return fetch({
    url: `/kukacms/self/analysis/getSelector`,
    method: 'post',
    data: qs.stringify(selectData)
  })
}
//查询人效
export function selectAnalysisCondition (selectData) {
  return fetch({
    url: `/kukacms/self/analysis/selectAnalysisCondition`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(selectData)
  })
}
//下一页
export function nextPage (selectData) {
  return fetch({
    url: `/kukacms/self/analysis/nextPage`,
    method: 'post',
    data: qs.stringify(selectData)
  })
}
//获取图形单选部门数据
export function getDrawDept (drawDatas) {
  return fetch({
    url: `/kukacms/self/analysis/getDrawDept`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(drawDatas)
  })
}
//查询图形数据
export function selectDrawInfo (queryData) {
  return fetch({
    url: `/kukacms/self/analysis/selectDrawInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}