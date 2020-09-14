<template>
    <div>
        <div>
            <van-field v-model="startTime" label="开始时间：" @click="startTimeClick" readonly placeholder="必填"/>
            <van-field v-model="endTime" label="结束时间：" @click="endTimeClick" readonly placeholder="必填"/>
            <van-field v-model="workUnit" label="工作单位：" placeholder="必填"/>
            <van-field v-model="department" label="任职部门：" placeholder="必填"/>
            <van-field v-model="station" label="任职岗位：" placeholder="必填"/>
            <van-field v-model="witness" label="证明人及联系方式：" placeholder="必填"/>
            <van-field v-model="description" rows="1" autosize type="textarea" label="工作内容描述：" placeholder="必填"/>
            <van-field v-model="remarks" label="备注：" placeholder="选填"/>
            <!-- <p style="padding:10px 10px 10px 16px;color:#323233"><span>离职证明：<a :href="path">离职证明</a></span></p> -->
            <p style="padding:10px 10px 10px 16px;color:#323233;border-bottom:1px solid #eee;font-size:14px">
                <span style="padding-right:5px">请上传离职证明：</span><span><van-button type="primary" color="#ccc" size="mini" @click="dialogOpen" style="font-size:12px;padding:2px">上传</van-button></span>
            </p>
            <p style="padding:10px 10px 10px 16px;color:#323233;font-size:14px;border-bottom:1px solid #eee">
                <span @click="seePdf">离职证明：<span style="border-bottom:1px solid #ccc;padding:2px">{{pathName}}</span></span>
            </p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="update" style="font-size:16px">确认修改</van-button>
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
        <!-- 上传附件 -->
        <van-popup
        v-model="showImg"
        get-container="body"
        closeable
        close-icon="close"
        position="bottom"
        :style="{ height: '50%' }"
        >
            <div class="uploadbtn">
                <div class="title">（请上传离职证明，上传内容需为图片或PDF格式）</div>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/workinfo/uploadWorkFiles"
                :data="uploadData"
                :on-preview="handlePreview2"
                :on-remove="handleRemove2"
                :on-success="handSuccess"
                multiple
                :limit="10"
                :file-list="fileList">
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadWork">上传离职证明</el-button>
                </el-upload>
            </div>
        </van-popup>
        <!-- 查看pdf -->
        <van-popup v-model="showPopup" position="top" :style="{ height: '90%' }">
            <iframe :src="pdf" width="100%" height="100%"></iframe>
        </van-popup>
        <!-- 查看图片 -->
        <van-image-preview v-model="showPhoto" get-container="body" :images="images" :closeable='true' @close="onClose">
            
        </van-image-preview>
    </div>
</template>
<script>
import { Field,Button,DatetimePicker,Popup,Notify,Dialog,ImagePreview } from 'vant'
import { updateSh,backWork,deleteFile } from './api'
export default {
  data () {
    return {
        showPhoto: false, //图片
        images: [],
        showPopup: false, //pdf和图片
        pdf: '',
        fileList: [], //element上传测试
        uploadData: {
            jobnumber: '',
            state: '',
            recordid: ''
        }, //element上传的参数
        pathName: '',
        path: '',
        showImg: false,
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
            let sendData = {
                workUnit: this.workUnit,
                department: this.department,
                station: this.station,
                witness: this.witness,
                description: this.description,
                startTime: this.startTime,
                endTime: this.endTime,
                remarks: this.remarks,
                recordid: this.$route.params.sData.recordid,
                jobnumber: localStorage.getItem('jobNum'),
                flag: 1,
                filePath: this.path
            }
            let strStart = this.startTime.split('-').join('')
            let strEnd = this.endTime.split('-').join('')
            if(strStart>strEnd){
                Notify({ type: 'warning', message: '开始时间不得大于结束时间！' })
                return
            }
            // console.log(sendData)
            if( this.workUnit == null || this.workUnit == '' ||
                this.department == null || this.department == '' ||
                this.station == null || this.station == '' ||
                this.witness == null || this.witness == '' ||
                this.description == null || this.description == '' ||
                this.startTime == null || this.startTime == '' ||
                this.endTime == null || this.endTime == ''){
                    Notify({ type: 'danger', message: '您有必填写未填写，请填写后提交！' })
                }else{
                    updateSh(sendData).then(res=>{
                        if(res.code == 1000){
                            Notify({ type: 'success', message: '已提交修改，进入待审核状态' })
                            this.$router.push({name:'socialExperience'})
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
     //撤回修改的信息
    back(){
        Dialog.confirm({
        title: '提示',
        message: '确定撤回修改吗？',
        })
        .then(() => {
            // on confirm
            let queryData = {
                recordid: this.$route.params.sData.recordid,
                flag:1
            }
            backWork(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    this.$router.push({name:'socialExperience'})
                }else{
                    Notify({ type: 'danger', message: '当前无提交的修改项，不可点击“撤回修改”' })
                }
            })
        })
        .catch(() => {
            // on cancel
            Notify({ type: 'danger', message: '取消撤回' })
        })
    },
    //取消
    backHome(){
        this.$router.push({name:'socialExperience'})
    },
    //默认带进来的数据
    initData(){
        let sDatas = this.$route.params.sData
        this.workUnit = sDatas.workUnit
        this.department = sDatas.department
        this.station = sDatas.station
        this.witness = sDatas.witness
        this.description = sDatas.description
        this.startTime = sDatas.startTime
        this.endTime = sDatas.endTime
        this.remarks = sDatas.remarks
        this.path = sDatas.filePath
        this.pathName = sDatas.pathName
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
        
        if(this.timeFlag == 1){
            this.endTime = this.formatDate(val)
            let strStart = this.startTime.split('-').join('')
            let strEnd = this.endTime.split('-').join('')
            // console.log('时间：'+strStart)
            // console.log('时间：'+this.endTime)
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
    //开始时间不得大于结束时间（社会履历）
    // onChange(val){
    //     let strStart = this.ruleForm1.starTime.split('-').join('')
    //     let strEnd = val.split('-').join('')
    //     // console.log('时间：'+strStart)
    //     if(strStart>strEnd){
    //         Notify({ type: 'warning', message: '开始时间不得大于结束时间！' })
    //         this.ruleForm1.endTime = ''
    //     }
    // },
     //转换时间戳
    formatDate(date) {    
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    m = m < 10 ? '0' + m : m;    
        var d = date.getDate();    d = d < 10 ? ('0' + d) : d;       
        return y + '-' + m + '-' + d 
    },
    //上传附件弹窗
    dialogOpen(){
        this.showImg = true
    },
    //上传工作履历附件
    handleRemove2(file) {
        let queryData = {
            filePath:file.response.obj.path
        }
        deleteFile(queryData).then(res=>{
            if(res.code == 1000){
                this.pathName = ''
            }else{
                Notify({ type: 'danger', message: res.msg })
            }
        })
    },
    handlePreview2(file) {
        console.log(file);
    },
    //上传成功
    handSuccess(response){
        if(response.code == 1001){
            Notify({ type: 'warning', message: response.msg })
        }
        this.path = response.obj.path
        this.pathName = response.obj.pathName
    },
    uploadWork(){
        this.uploadData.state = 1
        this.uploadData.recordid = this.$route.params.sData.recordid
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    seePdf(){
        if(this.path == null || this.path == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.path.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.path)
        }else{
            // this.pdf = this.path
            // this.showPopup =true
            window.open(this.path)
        }
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