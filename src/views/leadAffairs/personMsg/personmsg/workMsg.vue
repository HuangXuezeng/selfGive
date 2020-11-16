<template>
    <div>
        <div class="contentbox">
            <p><span>机构路径：{{jobData.jglj}} </span></p>
            <p><span>部门：{{jobData.dept}}</span></p>
            <p><span>岗位：{{jobData.post}}</span></p>
            <p><span>岗位分类一：{{jobData.gwfl1}}</span></p>
            <p><span>岗位分类二：{{jobData.gwfl2}}</span></p>
            <p><span>顾家职类：{{jobData.a01515}}</span></p>
            <p><span>顾家职级：{{jobData.a01515}}</span></p>
            <p><span>兼职岗位：{{jobData.a01130}}</span></p>
            <p><span>入司日期：{{jobData.A0144}}</span></p>
            <p><span>司龄：{{jobData.a0122}}</span></p>
            <p><span>试用开始日期：{{jobData.A01520}}</span></p>
            <p><span>试用期限：{{jobData.a01299}}</span></p>
            <p><span>试用结束日期：{{jobData.A01521}}</span></p>
            <p><span>实际转正日期：{{jobData.A01103}}</span></p>
            <p><span>专业线标签：{{jobData.a01216}}</span></p>
            <p><span>直接上级：{{jobData.zjxj}}</span></p>
            <p><span>是否签订培训协议：{{jobData.a01187}}</span></p>
            <p><span>是否签订竞业协议：{{jobData.a01189}}</span></p>
        </div>
        <van-empty v-if="jobData == ''" description="无数据" />
    </div>
</template>
<script>
import { Button } from 'vant'
import { queryJob } from '../../../personAffairs/api'
export default {
  data () {
    return {
        jobData: {}
    };
  },
  created(){
      this.getJob()
  },
  methods:{
    //获取工作信息
    getJob(){
        let queryData = {
            jobnumber: this.$store.state.jobNumber
        }
        queryJob(queryData).then(res=>{
            this.jobData = res.obj
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
    .contentbox{
        line-height 27px
        width 90%
        margin 10px auto 0 auto
        padding 5px 0 10px 5px
        box-shadow:0px 8px 10px #eee
        border-radius 6px
        font-size 14px
        color #969799
        p{
            padding 5px 0 5px 5px
            border-bottom  1px solid #eee
        }
        .iconfont{
            color #ee0a24
        }
    }
</style>