<template>
    <div>
        <div>
            <van-field v-model="startTime" label="开始时间：" @click="startTimeClick"  readonly placeholder="必填"/>
            <van-field v-model="endTime" label="结束时间：" @click="endTimeClick"  readonly placeholder="必填"/>
            <van-field v-model="workUnit" label="工作单位：" placeholder="必填"/>
            <van-field v-model="department" label="任职部门：" placeholder="必填"/>
            <van-field v-model="station" label="任职岗位：" placeholder="必填"/>
            <van-field v-model="witness" label="证明人及电话：" placeholder="必填"/>
            <van-field v-model="description" label="工作内容描述：" rows="1" autosize type="textarea" placeholder="必填"/>
            <van-field v-model="remarks" label="备注：" placeholder="选填"/>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="update" style="font-size:16px">确认添加</van-button>
                <!-- <van-button type="primary" size="small" color="#fc5f10" @click="back" style="font-size:16px">撤回修改</van-button> -->
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
    </div>
</template>
<script>
import { Field,Button,DatetimePicker,Popup,Notify,Dialog } from 'vant'
import { updateSh,backWork,deleteFile } from './api'
export default {
  data () {
    return {
        path: '',
        saveId: '',
        startTime: '',
        endTime: '',
        workUnit: '',
        department: '',
        station: '',
        witness: '',
        description: '',
        remarks: '',
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        showTime: false,
        timeFlag: '' //选择时间的标识
    };
  },
  created(){
    //   this.initData()
  },
  methods:{
    //提交确认修改
    update(){
        Dialog.confirm({
            title: '提示',
            message: '确认提交？'
            }).then(() => {
            // on confirm
            let sendData = {
                workUnit: this.workUnit,
                department: this.department,
                station: this.station,
                witness: this.witness,
                description: this.description,
                startTime: this.startTime,
                endTime: this.endTime,
                remarks: this.remarks,
                // recordid: this.$route.params.sData.recordid,
                jobnumber: localStorage.getItem('jobNum'),
                flag: 2,
                id: this.saveId,
                filePath: this.path,
            }
            let strStart = this.startTime.split('-').join('')
            let strEnd = this.endTime.split('-').join('')
            if(strStart>strEnd){
                Notify({ type: 'warning', message: '开始时间不得大于结束时间！' })
                return
            }
            // console.log(sendData)
            if( this.workUnit == '' ||
                this.department == '' ||
                this.station == '' ||
                this.witness == '' ||
                this.description == '' ||
                this.startTime == '' ||
                this.endTime == '' ){
                    Notify({ type: 'danger', message: '您有必填写未填写，请填写后提交！' })
                }else{
                    updateSh(sendData).then(res=>{
                        if(res.code == 1000){
                            Notify({ type: 'success', message: '已提交添加，进入待审核状态' })
                            this.$router.push({name:'socialExperience'})
                        }else{
                            Notify({ type: 'danger', message: '修改失败' })
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
        // console.log(val)
        let strStart = this.startTime.split('-').join('')
        let strEnd = this.endTime.split('-').join('')
        // console.log('时间：'+strStart)
        // console.log('时间：'+this.endTime)
        if(strStart>strEnd){
            Notify({ type: 'warning', message: '开始时间不得大于结束时间！' })
            this.endTime = ''
        }
        if(this.timeFlag == 1){
            this.endTime = this.formatDate(val)
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
    //关闭事件
    onClose() {
        this.images = []
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