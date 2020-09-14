<template>
    <div>
        <!-- 添加的信息 -->
        <div class="headerTag" v-for="(item,index) in listAdd" :key="item.id">
            <van-tag mark type="warning">已添加的家庭成员{{index+1}}</van-tag>
            <p><span>关系：</span><span>{{item.a84014}}</span></p>
            <p><span>家庭成员姓名：</span><span>{{item.a841}}</span></p>
            <p><span>成员性别：</span><span>{{item.a843}}</span></p>
            <p><span>成员工作单位：</span><span>{{item.a84013}}</span></p>
            <p><span>成员职务：</span><span>{{item.a84012}}</span></p>
            <p><span>成员联系方式：</span><span>{{item.a84015}}</span></p>
            <p><span>备注：</span><span>{{item.a84022}}</span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back(item)" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <!-- 修改的信息 -->
        <div class="headerTag" v-for="(item,index) in listUpdate" :key="item.id">
            <van-tag mark type="warning">已修改的家庭成员{{index+1}}</van-tag>
            <p><span>关系：</span><span>{{item.a84014}}</span></p>
            <p><span>家庭成员姓名：</span><span>{{item.a841}}</span></p>
            <p><span>成员性别：</span><span>{{item.a843}}</span></p>
            <p><span>成员工作单位：</span><span>{{item.a84013}}</span></p>
            <p><span>成员职务：</span><span>{{item.a84012}}</span></p>
            <p><span>成员联系方式：</span><span>{{item.a84015}}</span></p>
            <p><span>备注：</span><span>{{item.a84022}}</span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back(item)" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <div>
            <van-button type="primary" size="small" color="#fc5f10" @click="backHome" style="width:100%;font-size:16px">返回列表</van-button>
        </div>
    </div>
</template>
<script>
import { Tag,Button,Notify,Dialog } from 'vant'
import { backFam,getFam,getShr } from './api'
export default {
  data () {
    return {
        listAdd:[],
        listUpdate:[],
        shr: ''
    };
  },
  created(){
    this._getFam()
    this._getShr()
  },
  methods:{
    //获取新增家庭成员
    _getFam(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        getFam(queryData).then(res=>{
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
            backFam(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    // this._getFam()
                    this.$router.push({name:'members'})
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
        this.$router.push({name:'members'})
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