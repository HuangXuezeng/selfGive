import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/selfHome'
    },
    {
      path: '/selfHome',
      name: 'selfHome',
      component: () => import('@/views/selfHome/selfHome'),
      meta: {
        keepAlive: true
      }
    },
    //员工事务管理
    {
      path: '/selfThings',
      name: 'selfThings',
      component: () => import('@/views/personAffairs/selfThings'),
      children:[
        //基本信息
        {
          path: '/searchInformation',
          name: 'searchInformation',
          component: () => import('@/views/personAffairs/searchInformation'),
        },
        //修改基本信息
        {
          path: '/updatePerson',
          name: 'updatePerson',
          component: () => import('@/views/personAffairs/updatePerson'),
        },
        //查看修改的基本信息
        {
          path: '/alreadyPerson',
          name: 'alreadyPerson',
          component: () => import('@/views/personAffairs/alreadyPerson'),
        },
        //查看修改的联系信息
        {
          path: '/alreadyTouch',
          name: 'alreadyTouch',
          component: () => import('@/views/personAffairs/alreadyTouch'),
        },
        //工资查询---登录
        {
          path: '/searchWage',
          name: 'searchWage',
          component: () => import('@/views/personAffairs/searchWage'),
        },
        //工资查询---界面
        {
          path: '/searchWageInfo',
          name: 'searchWageInfo',
          component: () => import('@/views/personAffairs/searchWageInfo'),
        },
        //职业资格
        {
          path: '/perQualification',
          name: 'perQualification',
          component: () => import('@/views/personAffairs/perQualification'),
        },
        //修改职业资格
        {
          path: '/updateQualification',
          name: 'updateQualification',
          component: () => import('@/views/personAffairs/updateQualification'),
        },
        //添加职业资格
        {
          path: '/addQualification',
          name: 'addQualification',
          component: () => import('@/views/personAffairs/addQualification'),
        },
        //添加职业资格查看
        {
          path: '/alreadyQualification',
          name: 'alreadyQualification',
          component: () => import('@/views/personAffairs/alreadyQualification'),
        },
        //项目经历
        {
          path: '/proExperience',
          name: 'proExperience',
          component: () => import('@/views/personAffairs/proExperience'),
        },
        //添加项目经历
        {
          path: '/addPro',
          name: 'addPro',
          component: () => import('@/views/personAffairs/addPro'),
        },
        //修改项目经历
        {
          path: '/updatePro',
          name: 'updatePro',
          component: () => import('@/views/personAffairs/updatePro'),
        },
        //审核中项目经历
        {
          path: '/alreadyPro',
          name: 'alreadyPro',
          component: () => import('@/views/personAffairs/alreadyPro'),
        },
        //工作信息
        {
          path: '/workInformation',
          name: 'workInformation',
          component: () => import('@/views/personAffairs/workInformation'),
        },
        //联系信息
        {
          path: '/touch',
          name: 'touch',
          component: () => import('@/views/personAffairs/touch'),
        },
        //修改联系信息
        {
          path: '/updateTouch',
          name: 'updateTouch',
          component: () => import('@/views/personAffairs/updateTouch'),
        },
        //社会工作履历
        {
          path: '/socialExperience',
          name: 'socialExperience',
          component: () => import('@/views/personAffairs/socialExperience'),
        },
        //修改社会工作履历
        {
          path: '/updateSocialExp',
          name: 'updateSocialExp',
          component: () => import('@/views/personAffairs/updateSocialExp'),
        },
        //添加社会工作履历
        {
          path: '/addSocial',
          name: 'addSocial',
          component: () => import('@/views/personAffairs/addSocial'),
        },
        //添加社会工作履历查看
        {
          path: '/alreadySocial',
          name: 'alreadySocial',
          component: () => import('@/views/personAffairs/alreadySocial'),
        },
        //顾家工作履历
        {
          path: '/familyExperience',
          name: 'familyExperience',
          component: () => import('@/views/personAffairs/familyExperience'),
        },
        //修改顾家工作履历
        {
          path: '/updateFam',
          name: 'updateFam',
          component: () => import('@/views/personAffairs/updateFam'),
        },
        //已经修改顾家工作履历
        {
          path: '/alreadyFam',
          name: 'alreadyFam',
          component: () => import('@/views/personAffairs/alreadyFam'),
        },
        //学历信息
        {
          path: '/education',
          name: 'education',
          component: () => import('@/views/personAffairs/education'),
        },
        //修改学历信息
        {
          path: '/updateEdu',
          name: 'updateEdu',
          component: () => import('@/views/personAffairs/updateEdu'),
        },
        //添加学历信息
        {
          path: '/addEdu',
          name: 'addEdu',
          component: () => import('@/views/personAffairs/addEdu'),
        },
        //已添加的学历信息页
        {
          path: '/alreadyEdu',
          name: 'alreadyEdu',
          component: () => import('@/views/personAffairs/alreadyEdu'),
        },
        //绩效考核
        {
          path: '/performance',
          name: 'performance',
          component: () => import('@/views/personAffairs/performance'),
        },
        //亲属关系
        {
          path: '/relatives',
          name: 'relatives',
          component: () => import('@/views/personAffairs/relatives'),
        },
        //修改亲属关系
        {
          path: '/updateRelatives',
          name: 'updateRelatives',
          component: () => import('@/views/personAffairs/updateRelatives'),
        },
        //新增亲属关系
        {
          path: '/addRelatives',
          name: 'addRelatives',
          component: () => import('@/views/personAffairs/addRelatives'),
        },
        //新增亲属关系查看
        {
          path: '/alreadyRelatives',
          name: 'alreadyRelatives',
          component: () => import('@/views/personAffairs/alreadyRelatives'),
        },
        //家庭成员
        {
          path: '/members',
          name: 'members',
          component: () => import('@/views/personAffairs/members'),
        },
        //修改家庭成员
        {
          path: '/updateMember',
          name: 'updateMember',
          component: () => import('@/views/personAffairs/updateMember'),
        },
        //新增家庭成员
        {
          path: '/addMember',
          name: 'addMember',
          component: () => import('@/views/personAffairs/addMember'),
        },
        //新增家庭成员查看
        {
          path: '/alreadyMember',
          name: 'alreadyMember',
          component: () => import('@/views/personAffairs/alreadyMember'),
        },
        //奖惩信息
        {
          path: '/rewardsAndpunish',
          name: 'rewardsAndpunish',
          component: () => import('@/views/personAffairs/rewardsAndpunish'),
        },
        //发展目标
        {
          path: '/target',
          name: 'target',
          component: () => import('@/views/personAffairs/target'),
        },
        //考勤
        {
          path: '/checkwork',
          name: 'checkwork',
          component: () => import('@/views/personAffairs/checkwork'),
        },
        //团队培育
        {
          path: '/teamFoster',
          name: 'teamFoster',
          component: () => import('@/views/personAffairs/teamFoster/teamFoster'),
        },
        {
          path: '/addTeamFoster',
          name: 'addTeamFoster',
          component: () => import('@/views/personAffairs/teamFoster/addTeamFoster'),
        },
        {
          path: '/alreadyTeamFoster',
          name: 'alreadyTeamFoster',
          component: () => import('@/views/personAffairs/teamFoster/alreadyTeamFoster'),
        },
        {
          path: '/editTeamFoster',
          name: 'editTeamFoster',
          component: () => import('@/views/personAffairs/teamFoster/editTeamFoster'),
        },
      ]
    },
    //我的团队----------------------------------------------------------------------
    {
      path: '/selfSalary',
      name: 'selfSalary',
      component: () => import('@/views/leadAffairs/selfSalary'),
      children:[
        //花名册
        {
          path: '/selfPersonCost',
          name: 'selfPersonCost',
          component: () => import('@/views/leadAffairs/selfPersonCost'),
        },
        //花名册
        {
          path: '/roster',
          name: 'roster',
          component: () => import('@/views/leadAffairs/roster'),
          meta: {
            keepAlive: true
          }
        },
        //流失率
        {
          path: '/retention',
          name: 'retention',
          component: () => import('@/views/leadAffairs/retention'),
        },
        //人员结构
        {
          path: '/perStructure',
          name: 'perStructure',
          component: () => import('@/views/leadAffairs/perStructure'),
        },
        //人效分析
        {
          path: '/humanEffect',
          name: 'humanEffect',
          component: () => import('@/views/leadAffairs/humanEffect'),
        },
      ],
    },
    /***
     * 干部档案
     */
    {
      path: '/cadreArchives',
      name: 'cadreArchives',
      component: () => import('@/views/leadAffairs/cadreArchives/cadreArchives'),
    },
    //机构展示
    {
      path: '/institutions',
      name: 'institutions',
      component: () => import('@/views/leadAffairs/cadreArchives/institutions'),
    },
    {
      path: '/institutionsMore',
      name: 'institutionsMore',
      component: () => import('@/views/leadAffairs/cadreArchives/institutionsMore'),
      meta: { keepAlive: true }
    },
    {
      path: '/cadreArchivesInfo',
      name: 'cadreArchivesInfo',
      component: () => import('@/views/leadAffairs/cadreArchives/cadreArchivesInfo'),
    },
    /**
     * 干部档案结束
     */
    /**
     * 薪酬开始
     */
    {
      path: '/ProgressRewards',
      name: 'ProgressRewards',
      component: () => import('@/views/PayLibrary/ProgressRewards'),
    },
    {
      path: '/perCapitaWage',
      name: 'perCapitaWage',
      component: () => import('@/views/PayLibrary/perCapitaWage'),
    },
    /**
     * 薪酬结束
     */
    //查询员工信息
    {
      path: '/personHome',
      name: 'personHome',
      component: () => import('@/views/leadAffairs/personMsg/personHome'),
      children:[
        //查看员工基本信息
        {
          path: '/basicMsg',
          name: 'basicMsg',
          component: () => import('@/views/leadAffairs/personMsg/personmsg/basicMsg'),
        },
        //查看员工基学历信息
        {
          path: '/eduMsg',
          name: 'eduMsg',
          component: () => import('@/views/leadAffairs/personMsg/personmsg/eduMsg'),
        },
        //查看员工顾家履历
        {
          path: '/kukaExp',
          name: 'kukaExp',
          component: () => import('@/views/leadAffairs/personMsg/personmsg/kukaExp'),
        },
        //查看员工社会履历
        {
          path: '/socialExp',
          name: 'socialExp',
          component: () => import('@/views/leadAffairs/personMsg/personmsg/socialExp'),
        },
        //查看员工工作信息
        {
          path: '/workMsg',
          name: 'workMsg',
          component: () => import('@/views/leadAffairs/personMsg/personmsg/workMsg'),
        },
        //查看员工职业资格信息
        {
          path: '/zhiyeMsg',
          name: 'zhiyeMsg',
          component: () => import('@/views/leadAffairs/personMsg/personmsg/zhiyeMsg'),
        },
        //查看员工联系信息
        {
          path: '/touchMsg',
          name: 'touchMsg',
          component: () => import('@/views/leadAffairs/personMsg/personmsg/touchMsg'),
        },
        //查看员工亲属关系信息
        {
          path: '/relMsg',
          name: 'relMsg',
          component: () => import('@/views/leadAffairs/personMsg/personmsg/relMsg'),
        },
        //查看员工家庭成员信息
        {
          path: '/memberMsg',
          name: 'memberMsg',
          component: () => import('@/views/leadAffairs/personMsg/personmsg/memberMsg'),
        },
        //查看员工绩效考核信息
        {
          path: '/jixiaoMsg',
          name: 'jixiaoMsg',
          component: () => import('@/views/leadAffairs/personMsg/personmsg/jixiaoMsg'),
        },
      ],
    },
  ]
})
