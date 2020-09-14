<template>
    <div>
        <!-- 修改的信息 -->
        <div class="headerTag" v-if="jobData !== null">
            <van-tag mark type="warning">已修改的联系信息</van-tag>
            <p><span>手机号码：</span><span>{{jobData.a01274}}</span></p>
            <p><span>办公电话：</span><span>{{jobData.a01093}}</span></p>
            <p><span>办公地点：</span><span>{{jobData.a01195}}</span></p>
            <p><span>工位：</span><span>{{jobData.a01193}}</span></p>
            <p><span>E—mail：</span><span>{{jobData.email}}</span></p>
            <p><span>现住址：</span><span>{{jobData.a01311}}</span></p>
            <p><span>家庭住址：</span><span>{{jobData.a01741}}</span></p>
            <p><span>紧急联系人：</span><span>{{jobData.a01506}}</span></p>
            <p><span>紧急联系方式：</span><span>{{jobData.a01172}}</span></p>
            <p><span>紧急联系人关系：</span><span>{{jobData.a011821}}</span></p>
            <p><span>紧急联系人所在单位：</span><span>{{jobData.a011831}}</span></p>
            <p><span>车牌号：</span> <span>{{jobData.a01196}}</span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <!-- <p><span>手机号码归属地：</span><span>{{jobData.a01505}}</span></p> -->
            <!-- <p><span>车位使用开始日期：</span><span>{{jobData.A01513}}</span></p> -->
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <div class="btns">
            <van-button type="primary" size="small" color="#fc5f10" @click="backHome" style="width:100%;font-size:16px">返回列表</van-button>
        </div>
    </div>
</template>
<script>
import { Tag,Button,Dialog,Notify } from 'vant'
import { backWork,getContact,backLx,getShr } from './api'
export default {
  data () {
    return {
        jobData:[],
        shr: ''
    };
  },
  created(){
    this._getContact()
    this._getShr()
  },
  methods:{
    //获取增加的信息
    _getContact(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        getContact(queryData).then(res=>{
            this.jobData = res.obj
        })
    },
    //获取审核人
    _getShr(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        getShr(queryData).then(res=>{
            this.shr = res.obj.names.join(',')
            // console.log(this.shr)
        })
    },
    //撤回修改的信息
    back(){
        Dialog.confirm({
        title: '提示',
        message: '确定撤回修改吗？',
        })
        .then(() => {
            // on confirm
            let queryData = {
                jobnumber: localStorage.getItem('jobNum')
            }
            backLx(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    this.$router.push({name:'touch'})
                }else{
                    Notify({ type: 'danger', message: '当前无提交的修改项，不可点击“撤回修改”' })
                }
            })
        })
        .catch(() => {
            // on cancel
            Notify({ type: 'danger', message: '取消撤回' })
        })
    },
    //取消
    backHome(){
        this.$router.push({name:'touch'})
    },
  }
}
</script>
<style lang="stylus" scoped>
    .headerTag{
        padding 10px
        p{
            line-height 30px
            padding 8px 4px 8px 8px
            border-bottom 1px solid #eee
            color #969799
            font-size 14px
        }
        .btn{
            padding 10px
            text-align center
        }
    }
    .van-tag--mark {
        padding .4em .8em .4em .4em
    }
</style>