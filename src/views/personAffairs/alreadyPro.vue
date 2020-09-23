<template>
    <div>
        <!-- 添加的信息 -->
        <div class="headerTag" v-for="(item,index) in listAdd" :key="item.id">
            <van-tag mark type="warning">已添加的项目经历{{index+1}}</van-tag>
            <p><span>项目名称：</span><span>{{item.projectName}}</span></p>
            <p><span>进入项目时间：</span><span>{{item.startTime}}</span></p>
            <p><span>退出项目时间：</span><span>{{item.endTime}}</span></p>
            <p><span>投入精力占比：</span><span>{{item.trjlzb}}</span></p>
            <p><span>任职类型：</span><span>{{item.jobType}}</span></p>
            <p><span>项目角色：</span><span>{{item.projectRole}}</span></p>
            <p><span>项目性质：</span><span>{{item.projectProp}}</span></p>
            <p><span>项目成果：</span><span>{{item.projectResult}}</span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back(item)" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <!-- 修改的信息 -->
        <div class="headerTag" v-for="(item,index) in listUpdate" :key="item.id">
            <van-tag mark type="warning">已修改的职业资格{{index+1}}</van-tag>
            <p><span>项目名称：</span><span>{{item.projectName}}</span></p>
            <p><span>进入项目时间：</span><span>{{item.startTime}}</span></p>
            <p><span>退出项目时间：</span><span>{{item.endTime}}</span></p>
            <p><span>投入精力占比：</span><span>{{item.trjlzb}}</span></p>
            <p><span>任职类型：</span><span>{{item.jobType}}</span></p>
            <p><span>项目角色：</span><span>{{item.projectRole}}</span></p>
            <p><span>项目性质：</span><span>{{item.projectProp}}</span></p>
            <p><span>项目成果：</span><span>{{item.projectResult}}</span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back(item)" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <van-button type="primary" size="small" color="#fc5f10" @click="backHome" style="width:100%;font-size:16px">返回列表</van-button>
    </div>
</template>
<script>
import { Tag,Button,Notify,Dialog } from 'vant'
import { getCheckPro,getShr,backCheckPro } from './api'
export default {
  data () {
    return {
        listAdd:[],
        listUpdate:[],
        shr: ''
    };
  },
  created(){
    this._getPro()
    this._getShr()
  },
  methods:{
    //获取新增信息
    _getPro(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        getCheckPro(queryData).then(res=>{
            this.listAdd = res.obj.add
            this.listUpdate = res.obj.update
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
            let queryData = {}
            if(item.state == 1){
                queryData = {
                    recordid: item.recordid,
                    flag:1
                }
            }else{
                queryData = {
                    recordid: item.id,
                    flag:2
                }
            }
            backCheckPro(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    // this._getPro()
                    this.$router.push({name:'proExperience'})
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
        this.$router.push({name:'proExperience'})
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