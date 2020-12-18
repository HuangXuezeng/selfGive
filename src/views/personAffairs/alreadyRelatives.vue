<template>
    <div>
        <!-- 添加的信息 -->
        <div class="headerTag" v-for="(item,index) in listAdd" :key="item.id">
            <van-tag mark type="warning">已添加的亲属关系{{index+1}}</van-tag>
            <p><span>关系：</span><span>{{item.a805005}}</span></p>
            <p><span>关系人姓名：</span><span>{{item.a805006}}</span></p>
            <p><span>关系人工号：</span><span>{{item.a805007}}</span></p>
            <p><span>关系人所在公司：</span><span>{{item.a805015}}</span></p>
            <p><span>关系人所在部门：</span><span>{{item.a805008}}</span></p>
            <p><span>关系人岗位：</span><span>{{item.a805009}}</span></p>
            <p><span>关系人电话：</span><span>{{item.a805010}}</span></p>
            <p><span>是否在职：</span><span>{{item.a805012}}</span></p>
            <p><span>备注：</span><span>{{item.a805011}}</span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back(item)" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <!-- 修改的信息 -->
        <div class="headerTag" v-for="(item,index) in listUpdate" :key="item.id">
            <van-tag mark type="warning">已修改的亲属关系{{index+1}}</van-tag>
            <p><span>关系：</span><span>{{item.a805005}}</span></p>
            <p><span>关系人姓名：</span><span>{{item.a805006}}</span></p>
            <p><span>关系人工号：</span><span>{{item.a805007}}</span></p>
            <p><span>关系人所在公司：</span><span>{{item.a805015}}</span></p>
            <p><span>关系人所在部门：</span><span>{{item.a805008}}</span></p>
            <p><span>关系人岗位：</span><span>{{item.a805009}}</span></p>
            <p><span>关系人电话：</span><span>{{item.a805010}}</span></p>
            <p><span>是否在职：</span><span>{{item.a805012}}</span></p>
            <p><span>备注：</span><span>{{item.a805011}}</span></p>
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
import { backRel,getRel,getShr } from './api'
export default {
  data () {
    return {
        listAdd:[],
        listUpdate:[],
        shr: ''
    };
  },
  created(){
    this._getRel()
    this._getShr()
  },
  methods:{
    //获取添加的亲属信息
    _getRel(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        getRel(queryData).then(res=>{
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
            backRel(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    // this._getRel()
                    this.$router.push({name:'relatives'})
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
        this.$router.push({name:'relatives'})
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