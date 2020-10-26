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
//获取个人信息
export function findCadreDownDept (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreDownDept`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function findCadreRosterInfoByCondition (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreRosterInfoByCondition`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function findCadreDept (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreDept`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function findCadreBasicInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreBasicInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function lsitWorkInfoByJobnumber (queryData) {
  return fetch({
    url: `/kukacms/self/workinfo/lsitWorkInfoByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function findCadreKeyEvents (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreKeyEvents`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function listProjectByJobnumber (queryData) {
  return fetch({
    url: `/kukacms/self/project/listProjectByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function listKukaWorkByJobnumber (queryData) {
  return fetch({
    url: `/kukacms/self/kukawork/listKukaWorkByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function findCadreAbility (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreAbility`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function findCadreTrainInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreTrainInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function findCadreTeamBuilding (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreTeamBuilding`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人信息
export function findCadreAchieveInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreAchieveInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}


