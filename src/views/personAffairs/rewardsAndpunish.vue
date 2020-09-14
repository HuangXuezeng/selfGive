<template>
    <div>
        <div class="contentbox" v-for="(item,index) in rewardsList" :key="item.id">
            <div><van-tag mark type="danger">奖惩信息{{ index+1 }}</van-tag></div>
            <p><span >日期：{{item.a805005}}</span></p>
            <p><span>奖惩内容：{{item.a805006}}</span></p>
            <p><span>奖惩结果：{{item.a805007}}</span></p>
            <p><span>奖惩单位：{{item.a805008}}</span></p>
            <p><span>奖惩文件名称：{{item.a805009}}</span></p>
            <p><span>奖惩文件路径：{{item.a805010}}</span></p>
            <p><span>提交人：{{item.a805012}}</span></p>
            <!-- <span>
                <van-button type="primary" size="mini">修改</van-button>
            </span> -->
        </div>
    </div>
</template>
<script>
import { Button,Tag } from 'vant'
import { queryRewards } from './api'
export default {
  data () {
    return {
        rewardsList: []
    };
  },
  created(){
      this.getRewards()
  },
  methods:{
    getRewards(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        queryRewards(queryData).then(res=>{
            this.rewardsList = res.obj
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
        p{
            padding 5px 0 5px 5px
            border-bottom  1px solid #eee
        }
        .iconfont{
            color #ee0a24
        }
    }
</style>