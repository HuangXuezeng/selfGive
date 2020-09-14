<template>
    <div>
        <div>
            <van-field v-model="titleType" label="职称类型：" placeholder="必填"/>
            <van-field v-model="titleName" label="职称名称：" placeholder="必填"/>
            <van-field v-model="certificateLevel" label="证书等级：" placeholder="必填"/>
            <van-field v-model="certificateNumber" label="证书号码：" placeholder="必填"/>
            <van-field v-model="issuingUnit" label="颁发单位：" placeholder="必填"/>
            <van-field v-model="startTime" label="有效期起：" @click="startTimeClick" readonly placeholder="必填"/>
            <van-field v-model="endTime" label="有效期止：" @click="endTimeClick" readonly placeholder="必填"/>
            <van-field v-model="remarks" label="备注：" placeholder="选填"/>
            <!-- <p><span>职业资格证书：<a :href="path">职业资格证书</a></span></p> -->
            <p style="padding:10px 10px 10px 16px;color:#323233;border-bottom:1px solid #eee;font-size:14px">
                <span style="padding-right:5px">上传证书:</span><span><van-button type="primary" color="#ccc" size="mini" @click="dialogOpen" style="font-size:12px;padding:2px">上传</van-button></span>
            </p>
            <p style="padding:10px 10px 10px 16px;color:#323233;border-bottom:1px solid #eee;font-size:14px">
                <span @click="seePdf">职业资格证书：<span style="border-bottom:1px solid #ccc;padding:2px">{{pathName}}</span></span>
            </p>
            <!-- <van-field label="上传证书:" >
                <template #button>
                    <van-button type="primary" color="#ccc" size="mini" @click="dialogOpen" style="font-size:12px;padding:2px">上传</van-button>
                </template>
            </van-field>  -->
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
                <div class="title">（请上传职业资格证书，上传内容需为图片或PDF格式）</div>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/professional/uploadProfessionalFiles"
                :data="uploadData"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handSuccess"
                multiple
                :limit="10"
                :file-list="fileList">
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadFile">上传证书</el-button>
                </el-upload>
            </div>
        </van-popup>
        <!-- 查看pdf -->
        <van-popup v-model="showPopup" get-container="body" position="top" :style="{ height: '90%' }">
            <iframe :src="pdf" width="100%" height="100%"></iframe>
        </van-popup>
        <!-- 查看图片 -->
        <van-image-preview v-model="showPhoto" get-container="body" :images="images" :closeable='true' @close="onClose">
            
        </van-image-preview>
    </div>
</template>
<script>
import { Field,Button,DatetimePicker,Popup,Notify,Dialog,ImagePreview } from 'vant'
import { updateZy,backPro,deleteFile } from './api'
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
            recordid: '',
        }, //element上传的参数
        path: '',
        pathName: '',
        showImg: false, //上传头像的弹窗
        titleType: '',
        titleName: '',
        certificateLevel: '',
        certificateNumber: '',
        issuingUnit: '',
        startTime: '',
        endTime: '',
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
                titleType: this.titleType,
                titleName: this.titleName,
                certificateLevel: this.certificateLevel,
                certificateNumber: this.certificateNumber,
                issuingUnit: this.issuingUnit,
                startTime: this.startTime,
                endTime: this.endTime,
                remarks: this.remarks,
                recordid: this.$route.params.zData.id,
                jobnumber: localStorage.getItem('jobNum'),
                a0188: this.$route.params.zData.a0188,
                flag: 1,
                filePath: this.path
            }
            let strStart = this.startTime.split('-').join('')
            let strEnd = this.endTime.split('-').join('')
            if(strStart>strEnd){
                Notify({ type: 'warning', message: '开始时间不得大于结束时间！' })
                return
            }
            if(this.titleType == null || this.titleType == '' ||
               this.titleName == null || this.titleName == '' ||
               this.certificateLevel == null || this.certificateLevel == '' ||
               this.certificateNumber == null || this.certificateNumber == '' ||
               this.issuingUnit == null || this.issuingUnit == '' ||
               this.startTime == null || this.startTime == '' ||
               this.endTime == null || this.endTime == ''){
                   Notify({ type: 'danger', message: '您有必填写未填写，请填写后提交！' })
               }else{
                   updateZy(sendData).then(res=>{
                        if(res.code == 1000){
                            Notify({ type: 'success', message: '已提交修改，进入待审核状态' })
                            this.$router.push({name:'perQualification'})
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
                recordid: this.$route.params.zData.id,
                flag:1
            }
            backPro(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    this.$router.push({name:'perQualification'})
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
        this.$router.push({name:'perQualification'})
    },
    //默认带进来的数据
    initData(){
        let zDatas = this.$route.params.zData
        this.titleType = zDatas.titleType
        this.titleName = zDatas.titleName
        this.certificateLevel = zDatas.certificateLevel
        this.certificateNumber = zDatas.certificateNumber
        this.issuingUnit = zDatas.issuingUnit
        this.startTime = zDatas.startTime
        this.endTime = zDatas.endTime
        this.remarks = zDatas.remarks
        this.path = zDatas.filePath
        this.pathName = zDatas.pathName
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
        // console.log('时间：'+strStart)
        // console.log('时间：'+strEnd)
        if(this.timeFlag == 1){
            // debugger
            // console.log(this.startTime)
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
    //上传附件弹窗
    dialogOpen(){
        this.showImg = true
    },
    //职业资格上传附件
    handleRemove(file) {
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
    handlePreview(file) {
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
    uploadFile(){
        this.uploadData.state = 1
        this.uploadData.recordid = this.$route.params.zData.id
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