<template>
    <div>
        <div class="contentbox">
            <van-collapse v-model="activeNames" v-for="(item,index) in membersList" :key="item.recordid">
                <van-collapse-item :name="index">
                    <template #title>
                        <div class="fontweig"><van-tag mark type="primary" color="#fc5f10">家庭成员{{index+1}}</van-tag></div>
                    </template>
                    <p><span >关系：{{item.a84014}}</span></p>
                    <p><span>家庭成员姓名：{{item.a841}}</span></p>
                    <p><span>成员性别：{{item.a843}}</span></p>
                    <p><span>成员工作单位：{{item.a84013}}</span></p>
                    <p><span>成员职务：{{item.a84012}}</span></p>
                    <p><span>成员联系方式：{{item.a84015}}</span></p>
                    <p><span>备注：{{item.a84022}}</span></p>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>
<script>
import { Button,Tag,Collapse,CollapseItem } from 'vant'
import { queryMembers } from '../../../personAffairs/api'
export default {
  data () {
    return {
        membersList: [],
        activeNames: [0,1,2,3,4,5,6,7,8]
    };
  },
  created(){
      this.getMembers()
  },
  methods:{
    getMembers(){
        let queryData = {
            jobnumber:this.$store.state.jobNumber
        }
        queryMembers(queryData).then(res=>{
            this.membersList = res.obj
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