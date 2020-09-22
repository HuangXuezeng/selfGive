import fetch from '@/api/fetch.js'
import qs from 'qs'

//获取个人信息
export function queryPerson (queryData) {
  return fetch({
    url: `/kukacms/self/findBasicInfo`,
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
//获取头部个人信息
export function querySome (queryData) {
  return fetch({
    url: `/kukacms/self/findSomeBasicInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取联系信息
export function queryLx (queryData) {
  return fetch({
    url: `/kukacms/self/findContactInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取社会工作经历
export function querySocial (queryData) {
  return fetch({
    url: `/kukacms/self/workinfo/lsitWorkInfoByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取顾家工作经历
export function queryFamily (queryData) {
  return fetch({
    url: `/kukacms/self/kukawork/listKukaWorkByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取教育学历信息
export function queryEducation (queryData) {
  return fetch({
    url: `/kukacms/self/findQualificationsInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取绩效考核信息
export function queryPerformance (queryData) {
  return fetch({
    url: `/kukacms/self/achievement/selectAchievementByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//亲属关系
export function queryRelatives (queryData) {
  return fetch({
    url: `/kukacms/self/findRelativesInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//家庭成员
export function queryMembers (queryData) {
  return fetch({
    url: `/kukacms/self/findFamilyInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//考勤信息
export function queryCheck (queryData) {
  return fetch({
    url: `/kukacms/self/attendance/listAttendancesByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//奖惩信息
export function queryRewards (queryData) {
  return fetch({
    url: `/kukacms/self/rewardspunish/listRewardspunishByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//工作信息
export function queryJob (queryData) {
  return fetch({
    url: `/kukacms/self/findJobInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//判断用户是否设置过密码
export function checkPwd (queryData) {
  return fetch({
    url: `/kukacms/self/salary/checkPasswordByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//设置密码
export function setPwd (queryData) {
  return fetch({
    url: `/kukacms/self/salary/setPassword`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//重置修改置密码
export function resetPwd (queryData) {
  return fetch({
    url: `/kukacms/self/salary/resetPassword`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//重置修改置密码(发送验证码)
export function sendCode (queryData) {
  return fetch({
    url: `/kukacms/self/salary/sendCode`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//薪资登陆
export function login (queryData) {
  return fetch({
    url: `/kukacms/self/salary/login`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//查询获取薪资数据
export function querySalary (queryData) {
  return fetch({
    url: `/kukacms/self/salary/getSalaryByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//职业资格
export function queryZige (queryData) {
  return fetch({
    url: `/kukacms/self/professional/listProfessionalByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//个人发展目标
export function queryTarget (queryData) {
  return fetch({
    url: `/kukacms/self/devgoals/listDevgoalsByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//提交修改的职业资格
export function updateZy (queryData) {
  return fetch({
    url: `/kukacms/self/professional/updateProfessionalByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//提交修改的社会履历
export function updateSh (queryData) {
  return fetch({
    url: `/kukacms/self/workinfo/updateWorkInfoByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//提交修改的联系信息
export function updateLx (queryData) {
  return fetch({
    url: `/kukacms/self/updateContactInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//提交修改的基本信息
export function updateJb (queryData) {
  return fetch({
    url: `/kukacms/self/updateBasicInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//提交修改的家庭成员信息
export function updateFam (queryData) {
  return fetch({
    url: `/kukacms/self/updateFamilyInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//提交修改的顾家履历信息
export function updateGj (queryData) {
  return fetch({
    url: `/kukacms/self/kukawork/updateKukaworkByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//已经修改的顾家履历信息
export function backGj (queryData) {
  return fetch({
    url: `/kukacms/self/kukawork/deleteKukaworkById`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//已经提交的顾家履历信息
export function getAlreadyGj (queryData) {
  return fetch({
    url: `/kukacms/self/kukawork/listKukaworkTempByJobnumber `,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//提交修改的亲属关系信息
export function updateRel (queryData) {
  return fetch({
    url: `/kukacms/self/updateRelativesInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//提交修改的学历信息
export function updateEdu (queryData) {
  return fetch({
    url: `/kukacms/self/updateQualificationsInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//撤回修改的基本信息
export function backJb (queryData) {
  return fetch({
    url: `/kukacms/self/deleteBasicInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//撤回修改的联系信息
export function backLx (queryData) {
  return fetch({
    url: `/kukacms/self/deleteContactInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//撤回修改的家庭成员信息
export function backFam (queryData) {
  return fetch({
    url: `/kukacms/self/deleteFamilyInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//撤回修改的亲属关系信息
export function backRel (queryData) {
  return fetch({
    url: `/kukacms/self/deleteRelativesInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//撤回修改的学历信息
export function backEdu (queryData) {
  return fetch({
    url: `/kukacms/self/deleteQualificationsInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//撤回修改的社会工作履历
export function backWork (queryData) {
  return fetch({
    url: `/kukacms/self/workinfo/deleteWorkInfoById`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//撤回修改的职业资格
export function backPro (queryData) {
  return fetch({
    url: `/kukacms/self/professional/deleteProfessionalById`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取国籍
export function queryNationality (queryData) {
  return fetch({
    url: `/kukacms/self/findNationality`,
    method: 'post',
    // data: qs.stringify(queryData)
  })
}
//获取民族信息
export function queryNation (queryData) {
  return fetch({
    url: `/kukacms/self/findNation`,
    method: 'post',
    // data: qs.stringify(queryData)
  })
}
//获取银行名称信息
export function queryBank (queryData) {
  return fetch({
    url: `/kukacms/self/findBankName`,
    method: 'post',
    // data: qs.stringify(queryData)
  })
}
//获取工作地点选择信息
export function queryOffice (queryData) {
  return fetch({
    url: `/kukacms/self/findOfficeLocation`,
    method: 'post',
    // data: qs.stringify(queryData)
  })
}
//获取新增的社会履历（查看）
export function getWork (queryData) {
  return fetch({
    url: `/kukacms/self/workinfo/listWorkInfoTempByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取新增的职业职称（查看）
export function getPro (queryData) {
  return fetch({
    url: `/kukacms/self/professional/listProfessionalTempByJobnumber`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取新增的学历信息（查看）
export function getEdu (queryData) {
  return fetch({
    url: `/kukacms/self/findAddQualificationsInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取新增的家庭成员（查看）
export function getFam (queryData) {
  return fetch({
    url: `/kukacms/self/findAddFamilyInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取新增的亲属关系（查看）
export function getRel (queryData) {
  return fetch({
    url: `/kukacms/self/findAddRelativesInfo`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取修改的联系信息（查看）
export function getContact (queryData) {
  return fetch({
    url: `/kukacms/self/findAllContactUpdate`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取修改的基本信息（查看）
export function getBasic (queryData) {
  return fetch({
    url: `/kukacms/self/findAllBasicUpdate`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取审核人
export function getShr (queryData) {
  return fetch({
    url: `/kukacms/self/findSHR`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//删除上传的附件
export function deleteFile (queryData) {
  return fetch({
    url: `/kukacms/self/deleteFile`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}