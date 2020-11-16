import fetch from '@/api/fetch.js'
import qs from 'qs'
//http://172.16.28.67:7080/kukacms/self/findDateList
//查询年份
export function findDateList (queryData) {
  return fetch({
    url: `/kukacms/self/findDateList`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
// http://172.16.28.67:7080/kukacms/self/findCadreReportFbInfo?jobnumber=6006212
//
//按照工号查询奖惩详情
export function findCadreReportFbInfo (queryData) {
  return fetch({
    url: `/kukacms/self/findCadreReportFbInfo`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}
export function selectEmployeeByJobnumber (queryData) {
  return fetch({
    url: `/kukacms/self/roster/selectEmployeeByJobnumber`,
    headers:{"content-type":"application/json"},
    dataType: 'json',
    method: 'post',
    data: JSON.stringify(queryData)
  })
}


