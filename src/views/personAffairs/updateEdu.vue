<template>
    <div>
        <div>
            <van-field v-model="a86007" label="学校名称：" placeholder="必填"/>
            <van-field v-model="a86014" label="院校性质：" @click="showXingzhi = true" readonly placeholder="必填"/>
            <van-field v-model="A86005" label="入学时间：" @click-input="startTimeClick" readonly placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert8"><van-icon name="question-o" color="red" /></i>
                </template>
            </van-field>
            <van-field v-model="A86006" label="毕业（肄业）时间：" @click-input="endTimeClick" readonly placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert8"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="a86008" label="专业：" placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert11"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="a86009" label="学习方式：" @click="showstyle = true" readonly placeholder="必填"/>
            <van-field v-model="a86010" label="学历：" @click="showXueli = true" readonly placeholder="必填"/>
            <van-field v-model="a86011" label="学位：" @click-input="showXuewei = true" readonly placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert12"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="a86012" label="是否最高学历：" @click-input="showSure = true" readonly label-width="8em" placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert9"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="a86013" label="学历编号：" placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert10"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <p style="padding:10px 10px 10px 16px;color:#323233;border-bottom:1px solid #eee;font-size:14px">
                请上传学历证/学位证:
                <span><van-button type="primary" color="#ccc" size="mini" @click="dialogOpen" style="font-size:12px;padding:2px">上传</van-button></span>
            </p>
            <p style="padding:10px 10px 10px 16px;color:#323233;border-bottom:1px solid #eee;font-size:14px">
                <span @click="seePdf">学历证：<span style="border-bottom:1px solid #ccc;padding:2px">{{xlFileName}}</span></span>
            </p>
            <p style="padding:10px 10px 10px 16px;color:#323233;border-bottom:1px solid #eee;font-size:14px">
                <span @click="seePdf1">学位证：<span style="border-bottom:1px solid #ccc;padding:2px">{{xwFileName}}</span></span>
            </p>
            <!-- <p style="padding:10px 10px 10px 16px;color:#323233"><span>学历证：<a :href="xuliPath">学历证</a></span></p>
            <p style="padding:10px 10px 10px 16px;color:#323233"><span>学位证：<a :href="xuweiPath">学位证</a></span></p> -->

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
        <!-- 选择院校性质弹窗 -->
        <van-popup v-model="showXingzhi" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns1"
                @cancel="showXingzhi = false"
                value-key="text"
                @confirm="confirm1"
            />
        </van-popup>
        <!-- 选择学习方式弹窗 -->
        <van-popup v-model="showstyle" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns2"
                @cancel="showstyle = false"
                value-key="text"
                @confirm="confirm2"
            />
        </van-popup>
        <!-- 选择学历 -->
        <van-popup v-model="showXueli" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns3"
                @cancel="showXueli = false"
                value-key="text"
                @confirm="confirm3"
            />
        </van-popup>
        <!-- 选择学位 -->
        <van-popup v-model="showXuewei" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns4"
                @cancel="showXuewei = false"
                value-key="text"
                @confirm="confirm4"
            />
        </van-popup>
        <!-- 是否最高学历 -->
        <van-popup v-model="showSure" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns5"
                @cancel="showSure = false"
                value-key="text"
                @confirm="confirm5"
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
                <div class="title">（请上传学历证、学位证，上传内容需为图片或PDF格式）</div>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/uploadQualificationsFiles"
                :data="uploadData"
                :on-preview="handlePreview1"
                :on-remove="handleRemove"
                :on-success="handSuccess"
                multiple
                :limit="10"
                :file-list="fileList">
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadXueli">上传学历证</el-button>
                <!-- <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadXuewei">上传学位证</el-button> -->
                </el-upload>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/uploadQualificationsFiles"
                :data="uploadData"
                :on-preview="handlePreview1"
                :on-remove="handleRemove1"
                :on-success="handSuccess1"
                multiple
                :limit="10"
                :file-list="fileList">
                <!-- <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadXueli">上传学历证</el-button> -->
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadXuewei">上传学位证</el-button>
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
import { Field,Button,DatetimePicker,Popup,Notify,Dialog,Picker,ImagePreview } from 'vant'
import { updateEdu,backEdu,deleteFile } from './api'
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
            type: '',
            recordid: '',
            id: '',
        }, //element上传的参数
        saveId: '',
        xuliPath: '',
        xuweiPath: '',
        xlFileName: '',
        xwFileName: '',
        showImg: false, //上传头像的弹窗
        a86014: '',
        xingzhi: '', //发送性质值
        A86005: '',
        A86006: '',
        a86007: '',
        a86008: '',
        a86009: '',
        studyStyle: '', //发送学习方式值
        a86010: '',
        xueli: '', //发送学历值
        a86011: '',
        xuewei: '', //学位的值
        a86012: '',
        sure: '', //是否最高学历值
        a86013: '',
        a86011Key: '',
        a86010Key: '',
        a86009Key: '',
        a86014Key: '',
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        showTime: false,
        timeFlag: '', //选择时间的标识
        showXingzhi: false, //选择院校性质
        showstyle: false, //选择学习方式
        showXueli: false, //选择学历
        showXuewei: false, //选择学位
        showSure: false, //是否最高学历
        columns1: [
          {'keyId':'01','text':"985院校"},
          {'keyId':'02','text':"211院校"},
          {'keyId':'03','text':"普通院校"},
        ],
        columns2: [
          {'keyId':'1','text':"全日制院校"},
          {'keyId':'2','text':"夜大学"},
          {'keyId':'3','text':"函授"},
          {'keyId':'4','text':"研修班"},
          {'keyId':'9','text':"其他"},
        ],
        columns3: [
          {'keyId':'01','text':"小学"},
          {'keyId':'02','text':"初中"},
          {'keyId':'03','text':"高中"},
          {'keyId':'04','text':"中技（中专/技校/职高）"},
          {'keyId':'05','text':"大专"},
          {'keyId':'06','text':"本科"},
          {'keyId':'07','text':"硕士研究生"},
          {'keyId':'08','text':"MBA"},
          {'keyId':'09','text':"博士研究生"},
        ],
        columns4: [
          {'keyId':'01','text':"博士"},
          {'keyId':'02','text':"硕士"},
          {'keyId':'03','text':"MBA"},
          {'keyId':'04','text':"双学士"},
          {'keyId':'05','text':"学士"},
          {'keyId':'06','text':"其他"},
        ],
        columns5: [
          {'keyId':'1','text':"是"},
          {'keyId':'2','text':"否"},
        ],
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
            let strStart = this.A86005.split('-').join('')
            let strEnd = this.A86006.split('-').join('')
            if(strStart>strEnd){
                Notify({ type: 'warning', message: '开始时间不得大于结束时间！' })
                return
            }
            if( this.a86014 == null || this.a86014 == '' ||
                this.A86005 == null || this.A86005 == '' ||
                this.A86006 == null || this.A86006 == '' ||
                this.a86007 == null || this.a86007 == '' ||
                this.a86008 == null || this.a86008 == '' ||
                this.a86009 == null || this.a86009 == '' ||
                this.a86010 == null || this.a86010 == '' ||
                this.a86013 == null || this.a86013 == '' ||
                this.a86011 == null || this.a86011 == '' ||
                this.a86012 == null || this.a86012 == '' ){
                    Notify({ type: 'danger', message: '您有必填写未填写，请填写后提交！' })
                }else{
                    if(this.studyStyle == ''){
                        this.studyStyle = this.a86009Key
                    }
                    if(this.xingzhi == ''){
                        this.xingzhi = this.a86014Key
                    }
                    if(this.xueli == ''){
                        this.xueli = this.a86010Key
                    }
                    if(this.xuewei == ''){
                        this.xuewei = this.a86011Key
                    }
                    if(this.sure == ''){
                        this.sure = this.a86012
                    }
                    let sendData = {
                        a86014: this.xingzhi,
                        A86005: this.A86005,
                        A86006: this.A86006,
                        a86007: this.a86007,
                        a86008: this.a86008,
                        a86009: this.studyStyle,
                        a86010: this.xueli,
                        a86011: this.xuewei,
                        a86012: this.sure,
                        a86013: this.a86013,
                        a0190: localStorage.getItem('jobNum'),
                        recordid: this.$route.params.eduData.recordid,
                        a0188: this.$route.params.eduData.a0188,
                        flag: 1,
                        xlFile: this.xuliPath,
                        xwFile: this.xuweiPath,
                    }
                    console.log(sendData)
                    updateEdu(sendData).then(res=>{
                        if(res.code == 1000){
                            Notify({ type: 'success', message: '已提交修改，进入待审核状态' })
                            this.$router.push({name:'education'})
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
                recordid: this.$route.params.eduData.recordid,
                flag:1
            }
            backEdu(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    this.$router.push({name:'education'})
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
        this.$router.push({name:'education'})
    },
    //选择院校性质
    confirm1(picker) {
        console.log(picker)
    //   this.value = value;
        this.xingzhi = picker.keyId
        this.a86014 = picker.text
        this.showXingzhi = false;
    },
    //选择院校性质
    confirm2(picker) {
        console.log(picker)
    //   this.value = value;
        this.studyStyle = picker.keyId
        this.a86009 = picker.text
        this.showstyle = false;
    },
    //选择学历
    confirm3(picker) {
        console.log(picker)
    //   this.value = value;
        this.xueli = picker.keyId
        this.a86010 = picker.text
        this.showXueli = false;
    },
    //选择学位
    confirm4(picker) {
        console.log(picker)
    //   this.value = value;
        this.xuewei = picker.keyId
        this.a86011 = picker.text
        this.showXuewei = false;
    },
    //是否最高学历
    confirm5(picker) {
        console.log(picker)
    //   this.value = value;
        this.sure = picker.keyId
        this.a86012 = picker.text
        this.showSure = false;
    },
    //默认带进来的数据
    initData(){
        let eduData = this.$route.params.eduData
        this.a86014 = eduData.a86014
        this.a86014Key = eduData.a86014Key
        this.A86005 = eduData.A86005
        this.A86006 = eduData.A86006
        this.a86007 = eduData.a86007
        this.a86008 = eduData.a86008
        this.a86009 = eduData.a86009
        this.a86009Key = eduData.a86009Key
        this.a86010 = eduData.a86010
        this.a86010Key = eduData.a86010Key //如果没有选择值默认之前的值
        this.a86011 = eduData.a86011
        this.a86011Key = eduData.a86011Key
        this.a86012 = eduData.a86012
        this.a86013 = eduData.a86013
        this.xuliPath = eduData.xlFile
        this.xuweiPath = eduData.xwFile
        this.xlFileName = eduData.xlFileName
        this.xwFileName = eduData.xwFileName
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
            this.A86006 = this.formatDate(val)
            // console.log('时间：'+this.A86005)
            // console.log('时间：'+this.A86006)
            let strStart = this.A86005.split('-').join('')
            let strEnd = this.A86006.split('-').join('')
            if(strStart>strEnd){
                Notify({ type: 'warning', message: '开始时间不得大于结束时间！' })
                // this.endTime = ''
            }
        }else{
            this.A86005 = this.formatDate(val)
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
    //提示信息
    showAlert8() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '请填写毕业证书上的时间。',
        icon: 'cubeic-alert'
      }).show()
    },
    showAlert9() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '若存在多条学历信息，请将其中最高的一条学历选择”是”，其余的选择”否”。',
        icon: 'cubeic-alert'
      }).show()
    },
    showAlert10() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '请填写毕业证书上的编号，如没有请填‘无’',
        icon: 'cubeic-alert'
      }).show()
    },
    showAlert11() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '如没有请填‘无’',
        icon: 'cubeic-alert'
      }).show()
    },
    showAlert12() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '如没有请选择‘其他’',
        icon: 'cubeic-alert'
      }).show()
    },
    //上传附件弹窗
    dialogOpen(){
        this.showImg = true
    },
    //上传学历证
    handleRemove(file) {
        // console.log(file);
        let queryData = {
            filePath:file.response.obj.xlPath
        }
        deleteFile(queryData).then(res=>{
            if(res.code == 1000){
                this.xlFileName = ''
            }else{
                Notify({ type: 'danger', message: res.msg })
            }
        })
    },
    handlePreview1(file) {
    console.log(file);
    },
    //上传成功
    handSuccess(response){
        if(response.code == 1001){
            Notify({ type: 'warning', message: response.msg })
        }
        console.log(response)
        this.saveId = response.obj.id
        this.xuliPath = response.obj.xlPath
        this.xlFileName = response.obj.xlPathName
    },
    uploadXueli(){
        this.uploadData.id = this.saveId
        this.uploadData.state = 1
        this.uploadData.type = 1
        this.uploadData.recordid = this.$route.params.eduData.recordid
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    //上传学位证
    handleRemove1(file) {
        // console.log(file);
        let queryData = {
            filePath:file.response.obj.xwPath
        }
        deleteFile(queryData).then(res=>{
            if(res.code == 1000){
                this.xwFileName = ''
            }else{
                Notify({ type: 'danger', message: res.msg })
            }
        })
    },
    handlePreview1(file) {
    console.log(file);
    },
    //上传成功
    handSuccess1(response){
        if(response.code == 1001){
            Notify({ type: 'warning', message: response.msg })
        }
        console.log(response)
        this.saveId = response.obj.id
        this.xuweiPath = response.obj.xwPath
        this.xwFileName = response.obj.xwPathName
    },
    uploadXuewei(){
        this.uploadData.id = this.saveId
        this.uploadData.state = 1
        this.uploadData.type = 2
        this.uploadData.recordid = this.$route.params.eduData.recordid
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    seePdf(){
        if(this.xuliPath == null || this.xuliPath == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.xuliPath.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.xuliPath)
        }else{
            // this.pdf = this.xuliPath
            // this.showPopup =true
            window.open(this.xuliPath)
        }
    },
    seePdf1(){
        if(this.xuweiPath == null || this.xuweiPath == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.xuweiPath.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.xuweiPath)
        }else{
            // this.pdf = this.xuweiPath
            // this.showPopup =true
            window.open(this.xuweiPath)
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
        line-height 50px
        text-align center
    }
</style>