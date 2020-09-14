<template>
    <div>
        <div class="contentbox">
            <van-collapse v-model="activeNames" v-for="(item,index) in relativesList" :key="item.recordid">
                <van-collapse-item :name="index">
                    <template #title>
                        <div class="fontweig"><van-tag mark type="primary" color="#fc5f10">亲属关系{{index+1}}</van-tag></div>
                    </template>
                    <p><span >关系：{{item.a805005}}</span></p>
                    <p><span>关系人姓名：{{item.a805006}}</span></p>
                    <p><span>关系人工号：{{item.a805007}}</span></p>
                    <p><span>关系人所在部门：{{item.a805008}}</span></p>
                    <p><span>关系人岗位：{{item.a805009}}</span></p>
                    <p><span>关系人电话：{{item.a805010}}</span></p>
                    <p><span>是否在职：{{item.a805012}}</span></p>
                    <p><span>备注：{{item.a805011}}</span></p>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>
<script>
import { Button,Tag } from 'vant'
import { queryRelatives } from '../../../personAffairs/api'
export default {
  data () {
    return {
        relativesList: [],
        activeNames: [0,1,2,3,4,5,6,7,8]
    };
  },
  created(){
      this.getRelatives()
  },
  methods:{
    getRelatives(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        queryRelatives(queryData).then(res=>{
            this.relativesList = res.obj
        })
    },
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
        .btn{
            padding 10px
        }
    }
    .van-tag--mark {
        padding .4em .8em .4em .4em
    }
</style>