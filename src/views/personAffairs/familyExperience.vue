<template>
    <div>
        <div class="contentbox">
            <van-collapse v-model="activeNames" v-for="(item,index) in familyList" :key="item.id">
                <van-collapse-item :name="index">
                    <template #title>
                        <div class="fontweig"><van-tag mark type="primary" color="#fc5f10">顾家履历{{index+1}}</van-tag></div>
                    </template>
                    <p><span>开始时间：{{item.startTime}}</span></p>
                    <!-- <p><span>职级：{{item.position}}</span></p> -->
                    <p><span>机构单位：{{item.organ}}</span></p>
                    <p><span>任职岗位：{{item.station}}</span></p>
                    <p><span>证明人：{{item.witness}}</span></p>
                    <p><span>主要工作职责：{{item.mainWork}}</span></p>
                </van-collapse-item>
                <div class="btn">
                    <van-button v-if="item.sign == 0" type="primary" size="small" color="#fc5f10" @click="update(item)" style="width:100%;font-size:16px">修改</van-button>
                    <van-button v-if="item.sign == 1" type="primary" size="small" color="#ccc" style="width:100%;font-size:16px">修改</van-button>
                </div>
            </van-collapse>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="already" style="width:100%;font-size:16px;margin-top:10px">审核列表</van-button>
            </div>
            
            <!-- <p><span><i class="iconfont icon-tianjiabeizhu"></i> 备注：{{item.remarks}}</span></p>
            <p><span><i class="iconfont icon-riqi"></i> 工作描述：{{item.description}}</span></p>
            <p><span><i class="iconfont icon-zhengjian"></i> 附件：{{item.filePath}}</span></p> -->
            <!-- <span>
                <van-button type="primary" size="mini">修改</van-button>
            </span> -->
        </div>
    </div>
</template>
<script>
import { Button,Tag } from 'vant'
import { queryFamily } from './api'
export default {
  data () {
    return {
        familyList: [],
        activeNames: [0,1,2,3,4,5,6,7,8]
    };
  },
  created(){
      this.getFamily()
  },
  methods:{
    getFamily(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        queryFamily(queryData).then(res=>{
            this.familyList = res.obj
        })
    },
    update(item){
        // console.log(item)
        this.$router.push({name:'updateFam',params:{famData:item}})
    },
    //审核页面
    already(){
        this.$router.push({name:'alreadyFam'})
    }
  }
}
</script>
<style lang="stylus" scoped>
    .contentbox{
        line-height 27px
        width 90%
        margin 10px auto 0 auto
        padding 5px 0 5px 0
        padding-left 5px
        box-shadow:0px 8px 10px #eee
        border-radius 6px
        .van-tag--mark{
            padding-right 1.7em
            line-height 15px
        }
        p{
            padding 5px 0 5px 5px
            border-bottom  1px solid #eee
        }
        .iconfont{
            color #ee0a24
        }
    }
    .van-tag--mark {
        padding .4em .8em .4em .4em
    }
    .btn{
        padding 10px
    }
</style>