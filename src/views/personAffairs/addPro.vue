<template>
    <div>
        <div>
            <van-field v-model="projectName" label="项目名称：" placeholder="必填"/>
            <van-field v-model="startTime" label="进入项目时间：" @click="startTimeClick" readonly placeholder="必填"/>
            <van-field v-model="endTime" label="退出项目时间：" @click="endTimeClick" readonly placeholder="选填"/>
            <van-field v-model="trjlzb" label="投入精力占比：" placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert7"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="jobType" label="任职类型：" placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert8"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="projectRole" label="项目角色：" placeholder="必填"/>
            <van-field v-model="projectProp" label="项目性质：" placeholder="必填" @click="typeClick" readonly/>
            <van-field v-model="projectResult" label="项目成果：" placeholder="选填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert9"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="update" style="font-size:16px">确认添加</van-button>
                <van-button type="primary" size="small" color="#fc5f10" @click="backHome" style="font-size:16px">取消</van-button>
            </div>
        </div>
        <!-- 弹出选择时间 -->
        <van-popup
        get-container="body"
        v-model="showTime"
        close-icon="close"
        position="bottom"
        :style="{ height: '50%' }"
        >
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
            />
        </van-popup>
        <!-- 选择任职类型 -->
        <van-popup v-model="showType" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns1"
                @cancel="showType = false"
                value-key="content"
                @confirm="confirm1"
            />
        </van-popup>
    </div>
</template>
<script>
import { Field,Button,DatetimePicker,Popup,Notify,Dialog } from 'vant'
import { getProType,updatePro } from './api'
export default {
  data () {
    return {
        projectName: '', //项目名称
        startTime: '',
        endTime: '',
        trjlzb: '', //投入精力占比
        jobType: '', //任职类型
        projectRole: '', //项目角色
        projectProp: '', //项目性质
        propCode: '', //传给后台项目性质值
        projectResult: '', //项目成果
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        showTime: false,
        timeFlag: '', //选择时间的标识
        showType: false,
        columns1: [],
    };
  },
  created(){
    //获取任职类型
    getProType().then(res=>{
        this.columns1 = res.obj
    })
  },
  methods:{
    //提交确认修改
    update(){
        Dialog.confirm({
            title: '提示',
            message: '确认提交修改？'
            }).then(() => {
            // on confirm
            let sendData = {
                projectName:this.projectName,
                startTime:this.startTime,
                endTime:this.endTime,
                trjlzb:this.trjlzb,
                jobType:this.jobType,
                projectRole:this.projectRole,
                projectProp:this.propCode,
                projectResult:this.projectResult,
                jobnumber: localStorage.getItem('jobNum'),
                flag: 2,
            }
            let strStart = this.startTime.split('-').join('')
            let strEnd = this.endTime.split('-').join('')
            if(strStart>strEnd){
                Notify({ type: 'warning', message: '开始时间不得大于结束时间！' })
                return
            }
            if(this.projectName == null || this.projectName == '' ||
               this.trjlzb == null || this.trjlzb == '' ||
               this.jobType == null || this.jobType == '' ||
               this.projectRole == null || this.projectRole == '' ||
               this.projectProp == null || this.projectProp == '' ||
               this.startTime == null || this.startTime == '' ){
                   Notify({ type: 'danger', message: '您有必填写未填写，请填写后提交！' })
               }else{
                   updatePro(sendData).then(res=>{
                        if(res.code == 1000){
                            Notify({ type: 'success', message: '已提交修改，进入待审核状态' })
                            this.$router.push({name:'proExperience'})
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
        this.$router.push({name:'proExperience'})
    },
    //打开任职类型
    typeClick(){
        this.showType = true
    },
    //确认选择
    confirm1(picker){
        this.propCode = picker.code
        this.projectProp = picker.content
        this.showType = false
    },
    //打开时间选择器
    startTimeClick(){
        this.timeFlag = 0
        this.showTime = true
    },
    endTimeClick(){
        this.timeFlag = 1
        this.showTime = true
    },
    //确认选中时间
    confirm(val){
        if(this.timeFlag == 1){
            this.endTime = this.formatDate(val)
            let strStart = this.startTime.split('-').join('')
            let strEnd = this.endTime.split('-').join('')
            if(strStart>strEnd){
                Notify({ type: 'warning', message: '开始时间不得大于结束时间！' })
            // this.endTime = ''
            }
        }else{
            this.startTime = this.formatDate(val)
        }
        this.showTime = false
    },
    //取消选择
    cancel(){
        this.showTime = false
    },
     //转换时间戳
    formatDate(date) {    
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    m = m < 10 ? '0' + m : m;    
        var d = date.getDate();    d = d < 10 ? ('0' + d) : d;       
        return y + '-' + m + '-' + d 
    },
    showAlert7() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '如60%，根据自身精力投入情况选择百分数',
        icon: 'cubeic-alert'
      }).show()
    },
    showAlert8() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '选兼职或全职，二选一',
        icon: 'cubeic-alert'
      }).show()
    },
    showAlert9() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '填写定量化的项目目标达成情况',
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
    .uploadbtn{
        padding 60px 10px 0 10px
        .title{
            padding 15px
            line-height 20px
            color red
        }
    }
    .upload-demo{
        text-align center
    }
</style>