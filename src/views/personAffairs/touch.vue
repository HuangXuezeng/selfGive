<template>
    <div>
        <div class="contentbox">
            <p><span>手机号码：{{jobData.a01274}}</span></p>
            <p><span>手机号码归属地：{{jobData.a01505}}</span></p>
            <p><span>办公电话：{{jobData.a01093}}</span></p>
            <p><span>办公地点：{{jobData.a01195}}</span></p>
            <p><span>工位：{{jobData.a01193}}</span></p>
            <p><span>E-mail：{{jobData.email}}</span></p>
            <p><span>现住址：{{jobData.a01311}}</span></p>
            <p><span>家庭住址：{{jobData.a01741}}</span></p>
            <p><span>紧急联系人：{{jobData.a01506}}</span></p>
            <p><span>紧急联系方式：{{jobData.a01172}}</span></p>
            <p><span>紧急联系人关系：{{jobData.a011821}}</span></p>
            <p><span>紧急联系人所在单位：{{jobData.a011831}}</span></p>
            <p><span>车牌号：{{jobData.a01196}} </span></p>
            <p><span>车位使用开始日期：{{jobData.A01513}}</span></p>
             <span>
                <van-button v-if="jobData.sign == 0" type="primary" size="small" color="#fc5f10" @click="update" style="width:100%;font-size:16px">修改</van-button>
                <van-button v-if="jobData.sign == 1" type="primary" size="small" color="#ccc" style="width:100%;font-size:16px">修改</van-button>
            </span>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="already" style="width:100%;font-size:16px;margin-top:10px">审核列表</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Button } from 'vant'
import { queryLx } from './api'
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
        queryLx(queryData).then(res=>{
            this.jobData = res.obj
        })
    },
    //修改联系信息
    update(){
        // console.log(this.jobData)
        this.$router.push({name:'updateTouch',params:{lxData:this.jobData}})
    },
    //进入审核中的页面
    already(){
        this.$router.push({name:'alreadyTouch'})
    },
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
        color #969799
        font-size 14px
        p{
            padding 5px 0 5px 5px
            border-bottom  1px solid #eee
        }
        .iconfont{
            color #ee0a24
        }
    }
</style>