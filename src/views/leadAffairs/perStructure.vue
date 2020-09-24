<template>
    <div>
        <div class="header">
            <van-field v-model="selectTime" label="选择时间：" placeholder="请选择" @click="timeClick=showTime=true" readonly/>
            <van-field v-model="selectDept" label="选择单位：" placeholder="请选择" @click="deptClick" readonly/>
        </div>
        <div class="total">
            <p>13951人</p>
            <p>总人数</p>
        </div>
        <div class="post">
            <p>按岗位分类</p>
            <div class="postfenlei">
                <div class="post_itema"></div>
                <div class="post_itemb"></div>
                <div class="post_itemc"></div>
                <div class="post_itemd"></div>
            </div>
        </div>
        <!-- 选择时间 -->
        <van-popup v-model="showTime" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns1"
                @cancel="selectTime = false"
                @confirm="confirmTime"
            />
        </van-popup>
    </div>
</template>
<script>
import { querySelectTime } from './api'
export default {
  data () {
    return {
        selectTime: '',
        selectChangeTime: '', //传给后台的时间值
        selectDept: '',
        showTime: false, //选择时间弹窗
        columns1: [],
    };
  },
  created(){
    this.initData()
  },
  methods:{
    //确认时间
    confirmTime(picker){
        this.selectTime = picker
        let arr1 = []
        let newArr = []
        for( let i in this.columns1){
            arr1.push(this.columns1[i].replace("年",""))
        }
        for( let i in arr1){
            newArr.push(arr1[i].replace("月",""))
        }
        console.log(newArr)
        this.showTime = false
    },
    //页面初始化数据
    initData(){
        //获取选择的时间
        querySelectTime().then(res=>{
            this.columns1 = res.obj
        })
    },
    deptClick(){
        
    }
  }
}
</script>
<style lang="stylus" scoped>
    .header{
        padding 10px
    }
    .total{
        height 60px
        line-height 30px
        background-color #eaebeb
        text-align center
        p:nth-child(1){
            font-weight 700
            color #4f8fa0
        }
        p:nth-child(2){
            font-size 14px
        }
    }
    .post{
        p{
            height 30px
            line-height 30px
            color #f39f57
            font-size 14px
            text-align center
        }
        .postfenlei{
            height 80px
            display flex
            .post_itema{
                flex 1
                background-color #0f6b83
            }
            .post_itemb{
                flex 1
                background-color #53958c
            }
            .post_itemc{
                flex 1
                background-color #fda677
            }
            .post_itemd{
                flex 1
                background-color #d45348
            }
            
        }
    }
</style>