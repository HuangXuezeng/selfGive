<template>
    <div>
        <div class="contbox">
          <div class="select">
            <span @click="showTime" style="padding:10px">
              {{timeMsg}}
              <van-icon name="arrow-down" />
            </span>
            <p @click="sfgzClick">{{salaryList.sfgz}}</p>
          </div>
          <div class="detailed">
            <div class="de_a"><span style="font-weight:700">本月工资扣款项目：</span><span>{{salaryList.bygzkkxm}}</span></div>
            <div class="de_a" @click="htztClick"><span style="font-weight:700">合同主体：</span><span>{{salaryList.htzt}}</span></div>
            <div class="de_a"><span style="font-weight:700">明细</span></div>
            <div class="de_b">收入合计：{{salaryList.srhj}}</div>
            <!-- <p @click="detailInfo($event)">固薪合计<span>{{salaryList.fixedSalary}}</span></p> -->
            <!-- <van-collapse v-model="activeNames" accordion>
                <van-collapse-item size="large">
                  <template #title> -->
                    <div class="de_b" style="padding-left:16px">固薪合计：<span>{{salaryList.gxhj}}</span><span @click="gxqtClick" style="float:right;color:blue"><van-icon name="more-o" /></span></div>
                  <!-- </template> -->
                <!-- </van-collapse-item>
            </van-collapse> -->
            <div class="de_b" style="padding-left:16px">浮薪合计：<span>{{salaryList.fxhj}}</span></div>
            <div class="de_b" style="padding-left:16px">补贴合计：<span>{{salaryList.bthj}}</span><span @click="bthjClick" style="float:right;color:blue"><van-icon name="more-o" /></span></div>
            <div class="de_b" style="padding-left:16px">奖罚合计：<span>{{salaryList.jfhj}}</span><span @click="jfhjClick" style="float:right;color:blue"><van-icon name="more-o" /></span></div>
            <div class="de_b">扣款合计：{{salaryList.kkhj}}</div>
            <!-- <van-collapse v-model="activeNames1" >
                <van-collapse-item size="large">
                  <template #title> -->
                    <div class="de_b" style="padding-left:16px">扣社保公积金：<span>{{salaryList.sqkk}}</span><span @click="sbkkClick" style="float:right;color:blue"><van-icon name="more-o" /></span></div>
                  <!-- </template> -->
                  <!-- <p v-if="salaryList.sbkk !== 0">社保扣款：
                    <span>{{salaryList.sbkk}}</span>
                  </p>
                  <p v-if="salaryList.sbtz !== 0">社保调整：<span>{{salaryList.sbtz}}</span></p>
                  <p v-if="salaryList.gjjkk !== 0">公积金扣款：<span>{{salaryList.gjjkk}}</span>
                    <span @click="gjjkkClick" style="float:right;color:blue"><van-icon name="more-o" /></span>
                  </p>
                  <p v-if="salaryList.gjjtz !== 0">公积金扣款：<span>{{salaryList.gjjtz}}</span></p> -->
                <!-- </van-collapse-item>
            </van-collapse> -->
            <p class="de_b" style="padding-left:16px" >扣个税：<span>{{salaryList.kgs}}</span><span @click="gskkClick" style="float:right;color:blue"><van-icon name="more-o" /></span></p>
            <p class="de_b" style="padding-left:16px" >税后扣款：<span>{{salaryList.shkk}}</span><span @click="shkkClick" style="float:right;color:blue"><van-icon name="more-o" /></span></p>
            <p class="de_b">补扣上月：{{salaryList.bksy}}<span @click="bksyClick" style="float:right;color:blue"><van-icon name="more-o" /></span></p>
            <p class="de_b">本月应扣未扣：{{salaryList.byykwk}}</p>
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
        <!-- 固薪其他弹窗 -->
        <van-dialog v-model="showGxqt" get-container="body" title="固薪其他">
          <div class="gxstyle">
            <p v-if="salaryList.cqgz !== 0">出勤工资：<span>{{salaryList.cqgz}}</span></p>
            <p v-if="salaryList.jbgz !== 0">加班工资：<span>{{salaryList.jbgz}}</span></p>
            <p v-if="salaryList.kqkk !== 0">考勤扣款：<span>{{salaryList.kqkk}}</span></p>
            <p v-if="salaryList.kgkk !== 0">旷工扣款：<span>{{salaryList.kgkk}}</span></p>
            <p v-if="salaryList.qjgz !== 0">请假工资：<span>{{salaryList.qjgz}}</span></p>
            <p v-if="salaryList.jjgz !== 0">计件工资：<span>{{salaryList.jjgz}}</span></p>
            <p v-if="salaryList.gxqt !== 0">固薪其他：
              <span>{{salaryList.gxqt}}</span>
            </p>
            <p v-if="salaryList.gxqtRemarks !== ''" style="padding-left:0"><span style="font-weight:700;color:red">【固薪其他】说明：</span>{{salaryList.gxqtRemarks}}</p>
          </div>
        </van-dialog>
        <!-- 补贴合计弹窗 -->
        <van-dialog v-model="showBthj" get-container="body" title="补贴合计">
          <div class="gxstyle">
            <p v-if="salaryList.slbt !== 0">司龄补贴：{{salaryList.slbt}}</p>
            <p v-if="salaryList.hfbt !== 0">话费补贴：{{salaryList.hfbt}}</p>
            <p v-if="salaryList.zwbt !== 0">驻外补贴：{{salaryList.zwbt}}</p>
            <p v-if="salaryList.cfbt !== 0">餐费补贴：{{salaryList.cfbt}}</p>
            <p v-if="salaryList.dnbt !== 0">电脑补贴：{{salaryList.dnbt}}</p>
            <p v-if="salaryList.gwbt !== 0">岗位补贴：{{salaryList.gwbt}}</p>
            <p v-if="salaryList.qtbt !== 0">其他补贴：{{salaryList.qtbt}}</p>
          </div>
        </van-dialog>
        <!-- 奖罚合计弹窗 -->
        <van-dialog v-model="showJfhj" get-container="body" title="奖罚合计">
          <div class="gxstyle">
            <div v-for="(item,index) in salaryList.jfhjList" :key="item.recordid">
              <p>序号：{{index+1}}</p>
              <p>文件名称：{{item.filename}}</p>
              <p>奖罚金额：{{item.money}}</p>
              <p>申请人：{{item.applicant}}</p>
            </div>
          </div>
        </van-dialog>
        <!-- 社保扣款弹窗 -->
        <van-dialog v-model="showSbkk" get-container="body" title="扣社保公积金">
          <div class="gxstyle">
            <p>社保扣款：{{salaryList.sbkk0}}</p>
            <p>社保调整：{{salaryList.sbtz}}</p>
            <p>公积金扣款：{{salaryList.gjjkk0}}</p>
            <p>公积金调整：{{salaryList.gjjtz}}</p>
            <!-- <p>社保调整说明：{{salaryList.applicant}}</p> -->
          </div>
        </van-dialog>
        <!-- 公积金扣款弹窗 -->
        <van-dialog v-model="showGjjkk" get-container="body" title="公积金扣款">
          <div class="gxstyle">
            <p>公积金扣款：{{salaryList.gjjkk0}}</p>
            <p>公积金调整：{{salaryList.gjjtz}}</p>
          </div>
        </van-dialog>
        <!-- 个税扣款弹窗 -->
        <van-dialog v-model="showGskk" get-container="body" title="个税扣款">
          <div class="gxstyle">
            <p>累计收入：{{salaryList.ljsr}}</p>
            <p>累计个税起征点：{{salaryList.ljgsqzd}}</p>
            <p>累计其它扣除：{{salaryList.ljqtkc}}</p>
            <p>累计三险一金扣除：{{salaryList.ljsxyjkc}}</p>
            <p>累计专项附加扣除：{{salaryList.ljzxfjkc}}</p>
            <p>累计应纳税所得额：{{salaryList.ljynssde}}</p>
            <p>预扣率：{{salaryList.ykl}}</p>
            <p>速算扣除数：{{salaryList.sskcs}}</p>
            <p>累计应扣个税：{{salaryList.ljykgs}}</p>
            <p>累计已缴纳个税：{{salaryList.ljyjngs}}</p>
            <p>个税差额：{{salaryList.gsce}}</p>
            <p>本期预扣个税：{{salaryList.bqykgs}}</p>
            <p>
              <span style="font-weight:700">个税计算说明：</span><br>
              <span><span style="font-weight:700">本期预扣个税</span>=累计应扣个税-累计已缴纳个税+个税差额</span><br>
              <span><span style="font-weight:700">累计应扣个税</span>=累计应纳税所得税*预扣率-速算扣除数</span><br>
              <span><span style="font-weight:700">累计应纳税所得额</span>=累计收入-累计个税起征点-累计其它扣除-累计三险一金扣除-累计专项附加扣除</span><br>
            </p>
          </div>
        </van-dialog>
        <!-- 税后扣款弹窗 -->
        <van-dialog v-model="showShkk" get-container="body" title="税后扣款">
          <div class="gxstyle">
            <div v-for="(item,index) in salaryList.shkkList" :key="item.recordid">
              <p>序号：{{index+1}}</p>
              <p>扣款金额：{{item.money}}</p>
              <p>申请人：{{item.applicant}}</p>
              <p>备注：{{item.remarks}}</p>
            </div>
          </div>
        </van-dialog>
        <!-- 补扣上月 -->
        <van-dialog v-model="showBksy" get-container="body" title="【补扣上月】说明：">
          <div class="gxstyle">
            <p>
               <span>本月工资中应扣，但因收入低于应扣金额，在本月工资中未扣除的金额，显示在本月薪资查询【本月应扣未扣】科目。</span><br>
               <span>此金额需在次月工资中补扣，显示在次月薪资查询【补扣上月】科目。</span><br>
               <span style="font-weight:700"> 例：</span><br>
               <span> 4月收入为0元，需扣社保公积金共计600元，本月工资不够扣，需在5月工资中补扣。</span><br>
               <span style="font-weight:700">则：</span><br>
               <span>——4月薪资查询，显示【本月应扣未扣】：600</span><br>
               <span>——5月薪资查询，显示【补扣上月】：600</span>
            </p>
          </div>
        </van-dialog>
        <!-- 实发工资 -->
        <van-dialog v-model="showSfgz" get-container="body" title="实发工资">
          <div class="gxstyle">
            <p>
              实发工资=收入合计-扣款合计-补扣上月+本月应扣未扣
            </p>
          </div>
        </van-dialog>
        <!-- 合同主体 -->
        <van-dialog v-model="showHtzt" get-container="body" title="合同主体">
          <div class="gxstyle">
            <p>
              合同主体变更的，请于变更第3个月初15日内至个人所得税APP变更扣缴义务人至新主体。
            </p>
          </div>
        </van-dialog>
    </div>
</template>
<script>
import { DatetimePicker,Popup,Icon,Dialog } from 'vant'
import { querySalary } from './api'
import '../../components/comstyle/style.css'
export default {
  data () {
    return {
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false,
      timeMsg: '请选择时间',
      salaryList: {},
      activeNames: [],
      activeNames1: [],
      showGxqt: false,
      showBthj: false,
      showJfhj: false,
      showSbkk: false,
      showGjjkk: false,
      showShkk: false,
      showGskk: false,
      showBksy: false,
      showSfgz: false,
      showHtzt: false,
    };
  },
  created(){
    // console.log(this.$route.params.loginData)
    this.getSalary()
  },
  methods:{
    //显示弹窗时间组件
    showTime(){
      this.show = true
    },
    //确认选择好的时间
    confirm(val){
      console.log(this.formatDate(val))
      this.timeMsg = this.formatDate(val)+'工资'
      let queryData = {
        jobnumber:localStorage.getItem('jobNum'),
        time:this.timeMsg
      }
      querySalary(queryData).then(res=>{
        if(res.obj == null){
          this.salaryList = {}
          // this.timeMsg = 0
        }else{
          // console.log(res.obj.bthjList)
          this.salaryList = res.obj
          let obj1 = {}
          let obj2 = {}
          obj1 = this.salaryList.years.substring(0,4)
          obj2 = this.salaryList.years.substring(4,6)
          // console.log()
          this.timeMsg = obj1+'年'+obj2+'月工资' 
        }
      })
      this.show = false
    },
    //取消选择时关闭弹窗
    cancel(){
      this.show = false
    },
    //点击某条信息看详情
    // detailInfo($event){
    //   console.log($event)
    // },
    //登陆进来的工资
    getSalary(){
      let queryData = {
        jobnumber:localStorage.getItem('jobNum'),
        password:this.$route.params.loginData
      }
      querySalary(queryData).then(res=>{
        this.salaryList = res.obj
        let obj1 = {}
        let obj2 = {}
        obj1 = this.salaryList.years.substring(0,4)
        obj2 = this.salaryList.years.substring(4,6)
        // console.log()
        this.timeMsg = obj1+'年'+obj2+'月工资'
      })
    },
    // 打开固薪其他弹窗
    gxqtClick(){
      this.showGxqt = true
    },
    //合同主体
    htztClick(){
      this.showHtzt = true
    },
    //补贴合计
    bthjClick(){
      this.showBthj = true
    },
    //奖罚合计
    jfhjClick(){
      this.showJfhj = true
    },
    //社保扣款
    sbkkClick(){
      this.showSbkk = true
    },
    //公积金扣款
    gjjkkClick(){
      this.showGjjkk = true
    },
    //个税扣款
    gskkClick(){
      this.showGskk = true
    },
    //税后扣款
    shkkClick(){
      this.showShkk = true
    },
    //补扣上月
    bksyClick(){
      this.showBksy = true
    },
    // //本月应扣未扣
    // byykClick(){
    //   this.showByyk = true
    // },
    //实发工资说明
    sfgzClick(){
      this.showSfgz = true
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
      height 110px
      width 100%
      padding-top 10px
      background-color #ee0a24
      border-radius 6px
      text-align center
      color #fff
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
        color #403f3d
        font-size 14px
        line-height 24px
      }
      .de_b{
        border-bottom 1px solid #eee
        padding 10px 5px 5px 5px
        color #403f3d
        font-weight 700
        font-size 14px
      }
      p{
        border-bottom 1px solid #eee
        padding 10px 5px 5px 20px
        color #403f3d
        font-size 13px
        // span{
        //   float right 
        // }
      }
    }
  }
  .fl{
    float right
  }
  .van-cell{
    color #f00
  }
  .gxstyle{
    line-height 25px
    height 300px
    overflow auto
    padding 10px
    border-bottom 1px solid #eee
    color #403f3d
    p{
      padding 5px
    }
  }
 .fontweig{
   font-weight 700
 }

</style>