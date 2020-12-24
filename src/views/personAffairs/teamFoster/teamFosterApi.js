import fetch from '@/api/fetch.js'
import qs from 'qs'

/**
 * 团队培育模块Api
 * @param {*} queryData 请求参数，默认{}
 */
//获取详情
export function findTeamBuildingInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findTeamBuildingInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//添加或修改接口flag(1代表修改2代表新增)
export function updateTeamBuildingInfo (queryData) {
  return fetch({
    url: `/kukacms/self/updateTeamBuildingInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//查询所有修改和新增的待审核信息
export function findAdd (queryData) {
  return fetch({
    url: `/kukacms/self/findAddTeamBuildingInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//（修改flag为1xinz flag为2）
export function deleteTeamBuildingInfo (queryData) {
  return fetch({
    url: `/kukacms/self/deleteTeamBuildingInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//（修改flag为1xinz flag为2）
export function findTeamBuildingJGLJInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findTeamBuildingJGLJInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
export function findNameBySearch (queryData) {
  return fetch({
    url: `/kukacms/self/findNameBySearch`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
