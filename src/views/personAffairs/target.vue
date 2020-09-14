<template>
    <div>
        <div class="contentbox">
            <van-collapse v-model="activeNames" v-for="(item,index) in targetList" :key="item.id">
                <van-collapse-item :title="'发展目标'+(index+1)" :name="index">
                    <p><span> 填写日期：{{item.fillTime}}</span></p>
                    <p><span> 发展目标类型：{{item.targetType}}</span></p>
                    <p><span> 发展目标：{{item.target}}</span></p>
                    <p><span> 备注：{{item.remarks}}</span></p>
                </van-collapse-item>
            </van-collapse>
            <!-- <span>
                <van-button type="primary" size="mini">修改</van-button>
            </span> -->
        </div>
    </div>
</template>
<script>
import { Button,Tag,Dialog } from 'vant'
import { queryTarget } from './api'
export default {
  data () {
    return {
        targetList: [],
        activeNames: [0,1,2,3,4,5,6,7,8]
    };
  },
  created(){
      this.getTarget()
  },
  methods:{
    getTarget(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        queryTarget(queryData).then(res=>{
            this.targetList = res.obj
        })
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
</style>