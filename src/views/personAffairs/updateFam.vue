<template>
    <div>
        <div>
            <p style="padding-left:16px">开始时间：<span>{{startTime}}</span></p>
            <p style="padding-left:16px">机构单位：<span>{{organ}}</span></p>
            <p style="padding-left:16px">任职岗位：<span>{{station}}</span></p>
            <p style="padding-left:16px">证明人：<span>{{witness}}</span></p>
            <van-field v-model="mainWork" label="主要工作职责：" placeholder="限500个字（必填）">
                <template #button>
                    <i size="small" type="primary" @click="showAlert8"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="update" style="font-size:16px">确认修改</van-button>
                <van-button type="primary" size="small" color="#fc5f10" @click="backHome" style="font-size:16px">取消</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Field,Button,Notify,Dialog } from 'vant'
import { updateGj } from './api'
export default {
  data () {
    return {
        mainWork: '',
        startTime: '',
        organ: '',
        station: '',
        witness: '',
    };
  },
  created(){
    this.initData()
  },
  methods:{
    //提交确认修改
    update(){
        Dialog.confirm({
            title: '提示',
            message: '确认提交修改？'
            }).then(() => {
            // on confirm
            //判断项目成果字符长度
            this.getStr(this.mainWork)
            if(this.lengthFlag == false){
                return
            }
            if( this.mainWork == null || this.mainWork == '' ){
                    Notify({ type: 'danger', message: '您有必填写未填写，请填写后提交！' })
                }else{
                    let sendData = {
                        mainWork: this.mainWork,
                        startTime: this.$route.params.famData.startTime,
                        organ: this.$route.params.famData.organ,
                        station: this.$route.params.famData.station,
                        witness: this.$route.params.famData.witness,
                        jobnumber:localStorage.getItem('jobNum'),
                        recordid:this.$route.params.famData.id

                    }
                    updateGj(sendData).then(res=>{
                        if(res.code == 1000){
                            Notify({ type: 'success', message: '已提交修改，进入待审核状态' })
                            this.$router.push({name:'familyExperience'})
                        }else{
                            Notify({ type: 'danger', message: res.msg })
                        }
                    })
                }
            }).catch(() => {
            // on cancel
            Notify({ type: 'danger', message: '已取消修改' })
        })
    },
    //取消
    backHome(){
        this.$router.push({name:'familyExperience'})
    },
    //默认带进来的数据
    initData(){
        let famData = this.$route.params.famData
        this.mainWork = famData.mainWork
        this.startTime = famData.startTime
        this.organ = famData.organ
        this.station = famData.station
        this.witness = famData.witness
    },
    //字符串长度检测
    getStr(str){
        if (str == null) return 0;
        if (typeof str != "string"){
            str += "";
        }
        if(str.replace(/[^\x00-\xff]/g,"01").length > 1000){
            Notify({ type: 'warning', message: '主要工作职责不得超过500个字！' })
            return this.lengthFlag = false
        }else{
            return this.lengthFlag = true
        }
    },
    //提示信息
    showAlert8() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '负责/协助XXXX工作，在此期间取得XXX成果',
        icon: 'cubeic-alert'
      }).show()
    },
  }
}
</script>
<style lang="stylus" scoped>
    .btn{
        padding 10px
        text-align center
    }
    p{
        padding 10px 0 10px 10px
        line-height 24px
        border-bottom 1px solid #eee
        color #c9c9ca
        font-size 14px
        span{
            padding-left 5px
        }
    }
</style>