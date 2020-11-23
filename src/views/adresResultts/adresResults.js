import fetch from '@/api/fetch.js'
import qs from 'qs'
//http://172.16.28.67:7080/kukacms/self/findDateList
//查询年份
export function findDateList(queryData) {
    return fetch({
        url: `/kukacms/self/findDateList`,
        method: 'post',
        data: qs.stringify(queryData)
    })
}
// http://172.16.28.67:7080/kukacms/self/findCadreReportFbInfo?jobnumber=6006212
//
//按照工号查询奖惩详情
export function findCadreReportFbInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreReportFbInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
export function selectEmployeeByJobnumber(queryData) {
    return fetch({
        url: `/kukacms/self/roster/selectEmployeeByJobnumber`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
export function findCadreReportWholeInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreReportWholeInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 干部才报干部人数年度情况
export function findCadreReportYearChangeInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreReportYearChangeInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
//http://172.16.28.66:7080
// 干部才报干部人数年度情况
export function findCadreRepotrRangeInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreRepotrRangeInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 干部储备度
export function findCadreReportReserveInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreReportReserveInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 干部雷达图 http://172.16.28.33:7080/kukacms/self/findCadreChartInfo?
export function findCadreChartInfo(queryData) {
  return fetch({
      url: `/kukacms/self/findCadreChartInfo`,
      headers: {
          "content-type": "application/json"
      },
      dataType: 'json',
      method: 'post',
      data: JSON.stringify(queryData)
  })
}
