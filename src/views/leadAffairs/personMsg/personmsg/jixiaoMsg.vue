<template>
    <div>
        <div class="contentbox">
            <div class="select" @click="showTime">
                {{timeMsg}}
                <van-icon name="arrow-down" />
            </div>
            <div class="searchCont">
                <van-collapse v-model="activeNames" v-for="(item,index) in performanceList" :key="item.id">
                    <van-collapse-item :name="index">
                        <template #title>
                            <div class="fontweig"><van-tag mark type="primary" color="#fc5f10">绩效考核{{index+1}}</van-tag></div>
                        </template>
                        <p><span >一级部门：{{item.primaryDep}}</span></p>
                        <p><span>二级部门：{{item.secondDep}}</span></p>
                        <!-- <p><span>岗位：{{item.station}}</span></p> -->
                        <!-- <p><span>入职时间：{{item.hiredate}}</span></p> -->
                        <p><span>考核年份：{{item.assessmentYear}}</span></p>
                        <p><span>考核周期：{{item.assessmentCycle}}</span></p>
                        <p><span>绩效等级：{{item.performanceLevel}}</span></p>
                        <!-- <p><span>考核分数：{{item.assessmentScore}}</span></p>
                        <p><span>是否发起绩效面谈：{{item.isInterview}}</span></p>
                        <p><span>绩效面谈记录：{{item.interviewRecord}}</span></p>
                        <p><span>备注：{{item.remarks}}</span></p> -->
                    </van-collapse-item>
                </van-collapse>
            </div>
            <van-popup
            v-model="show" 
            get-container="body"
            position="bottom" 
            :style="{ height: '50%' }">
            <!-- <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                title="选择年"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="confirm"
                @cancel="cancel"
            /> -->
              <van-picker
                title="年份"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
                :default-index="50"
              />
            </van-popup> 
            <!-- <span>
                <van-button type="primary" size="mini">修改</van-button>
            </span> -->
        </div>
    </div>
</template>
<script>
import { Button,Tag,Dialog } from 'vant'
import { queryPerformance } from '../../../personAffairs/api'
export default {
  data () {
    return {
        performanceList: [],
        activeNames: [0,1,2,3,4,5,6,7,8],
        timeMsg: '请选择时间',
        show: false,
        minDate: new Date(2010, 0,0),
        maxDate: new Date(2025, 0,0),
        currentDate: new Date(),
        columns: [],
    };
  },
  created(){
      this.getPerformance()
      this.pickerYear()
  },
  methods:{
    //获取绩效
    getPerformance(){
        let queryData = {
            jobnumber:this.$store.state.jobNumber
        }
        queryPerformance(queryData).then(res=>{
            this.performanceList = res.obj
        })
    },
    //显示弹窗时间组件
    showTime(){
      this.show = true
    },
    // //确认选择好的时间
    // confirm(val){
    //   console.log(this.formatDate(val))
    //   this.timeMsg = this.formatDate(val)+'绩效'
    //   let queryData = {
    //     jobnumber:localStorage.getItem('jobNum'),
    //     time:this.timeMsg
    //   }
    //   queryPerformance(queryData).then(res=>{
    //     if(res.obj == ''){
    //       this.performanceList = []
    //       Dialog.alert({
    //         title: '提示',
    //         message: '没有当前年份的绩效哦~',
    //       }).then(() => {
    //         // on close
    //       })
    //     }else{
    //       this.performanceList = res.obj
    //     }
    //   })
    //   this.show = false
    // },
    // //取消选择时关闭弹窗
    // cancel(){
    //   this.show = false
    // },
    //转换时间戳
    formatDate(date) {    
        var y = date.getFullYear();    
        // var m = date.getMonth() + 1;    m = m < 10 ? '0' + m : m;    
        // var d = date.getDate();    d = d < 10 ? ('0' + d) : d;       
        return y + '年' 
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
       this.timeMsg = value+'绩效'
      let queryData = {
        jobnumber:localStorage.getItem('jobNum'),
        time:this.timeMsg
      }
      queryPerformance(queryData).then(res=>{
        if(res.obj == ''){
          this.performanceList = []
          Dialog.alert({
            title: '提示',
            message: '没有当前年份的绩效哦~',
          }).then(() => {
            // on close
          })
        }else{
          this.performanceList = res.obj
        }
      })
      this.show = false
    },
    // onChange(picker, value, index) {
    //   Toast(`当前值：${value}, 当前索引：${index}`);
    // },
    onCancel() {
      this.show = false
    },
    MySort() {
      return this.sort((a, b) => a - b)
    },
    pickerYear(){
      let myDate = new Date();
      let tYear = myDate.getFullYear()
      this.columns.push(tYear)
      for(let i=1;i<=50;i++){
        this.columns.push(tYear+i)
        this.columns.push(tYear-i)
      }
      this.columns.sort(function(a, b) { //callback
      if (a > b) { // a b 分别是Arr中的 56 21
          return 1  //返回正数 ，b排列在a之前
      } else {
          return -1 //返回负数 ，a排列在b之前
      }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
    .contentbox{
        padding 10px
        .select{
            height 50px
            line-height 50px
            width 100%
            border-radius 6px
            text-align center
            color #969799
            font-size 16px
            box-shadow:0px 10px 10px #eee
        }
        .searchCont{
            padding-top 12px
        }
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
</style>