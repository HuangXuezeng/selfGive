<template>
    <div>
        <div class="contbox">
          <div class="select" @click="showTime">
            {{timeMsg}}
            <van-icon name="arrow-down" />
          </div>
          <div class="detailed" v-for="item in checkList" :key="item.id">
            <div class="de_a">考勤结果</div>
            <p>应出勤<span>{{item.sattendance}}</span></p>
            <p>实出勤<span>{{item.rattendance}}</span></p>
            <p>转正前出勤<span>{{item.battendance}}</span></p>
            <p>转正后出勤<span>{{item.aattendance}}</span></p>
            <p>迟到<span>{{item.late}}</span></p>
            <p>调休<span>{{item.takeWorking}}</span></p>
            <p>早退<span>{{item.leave}}</span></p>
            <p>补签卡<span>{{item.bsign}}</span></p>
            <p>旷工<span>{{item.absenteeism}}</span></p>
            <p>事假<span>{{item.thingsLeave}}</span></p>
            <p>病假<span>{{item.sickLeave}}</span></p>
            <p>婚假<span>{{item.marriageLeave}}</span></p>
            <p>丧假<span>{{item.funeralLeave}}</span></p>
            <p>陪产假<span>{{item.paternityLeave}}</span></p>
            <p>产检假<span>{{item.checkLeave}}</span></p>
            <p>产假<span>{{item.maternityLeave}}</span></p>
            <p>出差<span>{{item.businessTrip}}</span></p>
            <p>延时加班<span>{{item.ywork}}</span></p>
            <p>休息日加班<span>{{item.rwork}}</span></p>
            <p>法定日加班<span>{{item.swork}}</span></p>
            <p>加班计调休<span>{{item.workRest}}</span></p>
            <!-- <p>操作人<span>{{checkList.sattendance}}</span></p>
            <p>操作日期<span>{{checkList.sattendance}}</span></p> -->
          </div>
        </div>
        <van-popup
        v-model="show" 
        get-container="body"
        position="bottom" 
        :style="{ height: '50%' }">
          <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            title="选择年月"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
          />
        </van-popup> 
    </div>
</template>
<script>
import { DatetimePicker,Popup,Icon,Dialog } from 'vant'
import { queryCheck } from './api'
export default {
  data () {
    return {
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false,
      timeMsg: '请选择时间',
      checkList: []
    };
  },
  created(){
    this.getCheck()
  },
  methods:{
    //默认展示的最新年月的数据
    getCheck(){
      let queryData = {
        jobnumber:localStorage.getItem('jobNum')
      }
      queryCheck(queryData).then(res=>{
        if(res.obj == []){
          return
        }else{
          this.checkList = res.obj
          // console.log(this.checkList)
        }
      })
    },
    //显示弹窗时间组件
    showTime(){
      this.show = true
    },
    //确认选择好的时间
    confirm(val){
      console.log(this.formatDate(val))
      this.timeMsg = this.formatDate(val)+'考勤'
      let queryData = {
        jobnumber:localStorage.getItem('jobNum'),
        time:this.timeMsg
      }
      queryCheck(queryData).then(res=>{
        if(res.obj == []){
          this.checkList = []
          Dialog.alert({
            title: '提示',
            message: '没有当前年份的考勤哦~',
          }).then(() => {
            // on close
          })
        }else{
          this.checkList = res.obj
        }
      })
      this.show = false
    },
    //取消选择时关闭弹窗
    cancel(){
      this.show = false
    },
    //时间转换
    //转换时间戳
    formatDate(date) {    
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    m = m < 10 ? '0' + m : m;    
        // var d = date.getDate();    d = d < 10 ? ('0' + d) : d;       
        return y + '年' + m + '月' 
    },
  }
}
</script>
<style lang="stylus" scoped>
  .contbox{
    padding 10px
    .select{
      height 50px
      line-height 50px
      width 100%
      // background-color #ee0a24
      border-radius 6px
      text-align center
      color #969799
      font-size 16px
      box-shadow:0px 10px 10px #eee
      p{
        padding-top 30px
        font-weight 700
        font-size 26px
      }
    }
    .detailed{
      margin-top 10px
      border-radius 6px
      padding 6px
      box-shadow:0px 10px 10px #eee
      .de_a{
        border-bottom 1px solid #eee
        padding 10px 5px 5px 5px
        color orange
      }
      p{
        border-bottom 1px solid #eee
        padding 10px 5px 5px 20px
        color #969799
        font-size 15px
        span{
            float right
        }
      }
    }
  }
</style>