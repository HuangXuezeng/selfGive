<template>
    <div>
        <div class="contentbox">
            <p><span>部门：{{jobData.dept}}</span></p>
            <p><span>岗位：{{jobData.post}}</span></p>
            <p><span>入司日期：{{jobData.A0144}}</span></p>
            <p><span>兼职岗位：{{jobData.a01130}}</span></p>
            <p><span>试用开始日期：{{jobData.A01520}}</span></p>
            <p><span>试用期限：{{jobData.a01299}}</span></p>
            <p><span>实际转正日期：{{jobData.A01103}}</span></p>
            <p><span>机构路径：{{jobData.jglj}} </span></p>
            <p><span>直接上级：{{jobData.zjxj}}</span></p>
        </div>
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
            jobnumber: localStorage.getItem('jobNum')
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