<template>
    <div>
        <!-- 修改的信息 -->
        <div class="headerTag" v-for="(item,index) in listUpdate" :key="item.id">
            <van-tag mark type="warning">已修改的顾家履历{{index+1}}</van-tag>
            <p><span>开始时间：</span><span>{{item.startTime}}</span></p>
            <p><span>机构单位：</span><span>{{item.organ}}</span></p>
            <p><span>任职岗位：</span><span>{{item.station}}</span></p>
            <p><span>证明人：</span><span>{{item.witness}}</span></p>
            <p><span>主要工作职责：</span><span>{{item.mainWork}}</span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back(item)" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <van-button type="primary" size="small" color="#fc5f10" @click="backHome" style="width:100%;font-size:16px">返回列表</van-button>
    </div>
</template>
<script>
import { Tag,Button,Dialog,Notify } from 'vant'
import { backGj,getAlreadyGj,getShr } from './api'
export default {
  data () {
    return {
        listUpdate:[],
        shr: ''
    };
  },
  created(){
    this._getRel()
    this._getShr()
  },
  methods:{
    //获取修改的顾家履历信息
    _getRel(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        getAlreadyGj(queryData).then(res=>{
            this.listUpdate = res.obj
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
    //撤回添加的信息
    back(item){
        Dialog.confirm({
        title: '提示',
        message: '确定撤回添加吗？',
        })
        .then(() => {
            // on confirm
            let queryData = {
                recordid: item.recordid
            }
            backGj(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    // this._getRel()
                    this.$router.push({name:'familyExperience'})
                }else{
                    Notify({ type: 'danger', message: '撤回失败' })
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
        this.$router.push({name:'familyExperience'})
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