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
// 干部雷达图 http://172.16.28.33:7080/kukacms/self/findCadreChartInfo?
export function findIsHaveCadreInDept(queryData) {
    return fetch({
        url: `/kukacms/self/findIsHaveCadreInDept`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 干部下拉数据
//http://172.16.28.95:7080/kukacms/self/findCadreChartDownDeptInfo
export function findCadreChartDownDeptInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreChartDownDeptInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 干部九宫格 /kukacms/self/findCadreJGGinfo
export function findCadreJGGinfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreJGGinfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 干部职业路径图 /kukacms/self/findCadreJGGinfo
export function findCadreGrowInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreGrowInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 部门底下查看部门干部 /kukacms/self/findThisDeptWorkerInfo
export function findThisDeptWorkerInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findThisDeptWorkerInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 流失率 /kukacms/self/findThisDeptWorkerInfo
export function findCadresLossInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadresLossInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 仪表盘 /kukacms/self/findThisDeptWorkerInfo
export function findCadreTeamFwInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreTeamFwInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 职级分布图 /kukacms/self/findCadreReportZJFbInfo
export function findCadreReportZJFbInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreReportZJFbInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 职业发展搜索接口/kukacms/self/findCadreHomePageInfo?
export function findCadreGrowInfoBySearch(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreGrowInfoBySearch`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 人才看板接口/kukacms/self/findCadreHomePageInfo?
export function findCadreHomePageInfo(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreHomePageInfo`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 查询干部编制情况
export function findCadreBzType(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreBzType`,
        headers: {
            "content-type": "application/json"
        },
        dataType: 'json',
        method: 'post',
        data: JSON.stringify(queryData)
    })
}
// 查询默认部门
export function findCadreDeptInfoByJobnumber(queryData) {
    return fetch({
        url: `/kukacms/self/findCadreDeptInfoByJobnumber`,
        method: 'post',
        data: qs.stringify(queryData)
    })
}
// 人才池
export function findCadrePoolBySearch(queryData) {
  return fetch({
      url: `/kukacms/self/findCadrePoolBySearch`,
      headers: {
          "content-type": "application/json"
      },
      dataType: 'json',
      method: 'post',
      data: JSON.stringify(queryData)
  })
}
