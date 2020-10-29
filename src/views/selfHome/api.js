import fetch from '@/api/fetch.js'
import qs from 'qs'

//获取首页头部个人信息
export function queryPerson (queryData) {
  return fetch({
    url: `/kukacms/self/findSomeBasicInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取菜单
export function getMenu (queryData) {
  return fetch({
    url: `/kukacms/self/menu/listMenu`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//菜单排序
export function setMenu (queryData) {
  return fetch({
    url: `/kukacms/self/menu/saveMenuOrder`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}
//判断是否为领导
export function isLead (queryData) {
  return fetch({
    url: `/kukacms/self/dept/getDeptInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}