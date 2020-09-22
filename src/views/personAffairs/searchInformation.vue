<template>
    <div class="content">
        <div class="sidebox">
            <!-- <div class="header">
                <img src="../../assets/timg.jpg" alt="">
                <p>{{personList.a0101}}</p>
            </div> -->
            <!-- 内容部分 -->
            <div class="contain clearfix">
                <div>
                    <div><span style="font-weight:700">{{personObj.a0101}}</span><span style="float:right"><img :src="personObj.photo" alt=""></span></div>
                    <span> 工号：{{personObj.a0190}}</span>
                    <!-- <span style="float:right"><i class="iconfont icon-nianling1"></i> 年龄：{{personList.a01101}}</span> -->
                </div>
                <div>
                    <span> 岗位：</span><span>{{personObj.post}}</span><br>
                    <span> 部门：</span>{{personObj.dept}}<span></span>
                </div>
            </div>
        </div> 
        <div class="message">
            <p><span>证件号码：</span><span>{{personList.a0177}}</span></p>
            <p><span>有效证件类型：</span><span>{{personList.yxsfzjlx}}</span></p>
            <p><span>身份证详细地址：</span><span>{{personList.a01121}}</span></p>
            <p><span>签证机关：</span><span>{{personList.police}}</span></p>
            <p><span>身份证有效期：</span><span>{{personList.a01157}}</span></p>
            <p><span>性别：</span><span>{{personList.a0107}}</span></p>
            <p><span>出生日期：</span><span>{{personList.A0111}}</span></p>
            <p><span>年龄：</span><span>{{personList.a01101}}</span></p>
            <p><span>户籍性质：</span><span>{{personList.a01503}}</span></p>
            <p><span>民族：</span><span>{{personList.a0121}}</span></p>
            <p><span>籍贯：</span><span>{{personList.a01740}}</span></p>
            <p><span>国籍：</span><span>{{personList.a01188}}</span></p>
            <p><span>婚姻状况：</span><span>{{personList.a0127}}</span></p>
            <p><span>政治面貌：</span><span>{{personList.a01577}}</span></p>
            <p><span>参加工作时间：</span><span>{{personList.A0141}}</span></p>
            <p><span>银行名称：</span><span>{{personList.a01191}}</span></p>
            <p><span>开户行：</span><span>{{personList.a01113}}</span></p>
            <p><span>银行卡号：</span><span>{{personList.a01102}}</span></p>
            <p><span>公积金客户号：</span><span>{{personList.a01602}}</span></p>
            <p><span>驻外医疗：</span><span>{{personList.a01600}}</span></p>
            <p><span>是否为退伍军人：</span><span>{{personList.a01185}}</span></p>
            <p><span>英语是否可做工作语言：</span><span>{{personList.a01003}}</span></p>
            <p><span>身份证正面：</span><span @click="seePdf" style="border-bottom:1px solid #ccc;padding:2px">{{personList.idcardFileName1}}</span></p>
            <p><span>身份证反面：</span><span @click="seePdf1" style="border-bottom:1px solid #ccc;padding:2px">{{personList.idcardFileName2}}</span></p>
            <p><span>银行卡：</span><span @click="seePdf2" style="border-bottom:1px solid #ccc;padding:2px">{{personList.bankFileName}}</span></p>
            <p><span>体检报告：</span><span @click="seePdf3" style="border-bottom:1px solid #ccc;padding:2px">{{personList.reportFileName}}</span></p>
            <!-- <p>
                <span>请上传身份证（双面）/体检报告附件/银行卡/头像:</span>
                <span>
                    <van-button type="primary" color="#ccc" size="mini" @click="dialogOpen" style="font-size:12px;padding:2px">上传</van-button>
                </span>
            </p> -->
            <span>
                <van-button v-if="personList.sign == 0" type="primary" size="small" color="#fc5f10" @click="update" style="width:100%;font-size:16px">修改</van-button>
                <van-button v-if="personList.sign == 1" type="primary" size="small" color="#ccc" style="width:100%;font-size:16px">修改</van-button>
            </span>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="already" style="width:100%;font-size:16px;margin-top:10px">审核列表</van-button>
            </div>
        </div>
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
                <div class="title">（请上传身份证（双面)、体检报告、银行卡，上传内容需为图片或PDF）</div>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/uploadBasicFiles"
                :data="uploadData"
                :on-preview="handlePreview3"
                :on-remove="handleRemove3"
                :on-success="handSuccess"
                multiple
                :limit="10"
                :file-list="fileList">
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadCard">上传身份证正面</el-button>
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadCard1">上传身份证反面</el-button>
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadBank">上传银行卡</el-button>
                <el-button style="background:#fc5f10;border:1px #fc5f10;margin-top:10px;margin-right:90%" size="small" type="primary" @click="uploadTijian">上传体检报告</el-button>
                </el-upload>
            </div>
            <div class="uploadbtn" style="padding-top:20px">
                <el-upload
                class="upload-demo"
                action="/kukacms/self/uploadAvatar"
                :data="uploadData"
                :on-preview="handlePreview4"
                :on-remove="handleRemove4"
                multiple
                :limit="10"
                :file-list="fileList">
                <el-button size="small" type="primary" @click="uploadTou">上传头像</el-button>
                </el-upload>
            </div>
        </van-popup>
        <!-- 查看pdf -->
        <van-popup v-model="showPopup" position="top" get-container="body" :style="{ height: '90%' }">
            <iframe id="iframe-shrink" :src="pdf" width="100%" height="100%"></iframe>
        </van-popup>
        <!-- 查看图片 -->
        <van-image-preview v-model="showPhoto" get-container="body" :images="images" :closeable='true' @close="onClose">
            
        </van-image-preview>
    </div>
</template>
<script>
import '../../components/comstyle/style.css'
import { Button,Uploader,ImagePreview,Notify } from 'vant'
import { queryPerson,querySome } from './api'
export default {
  data () {
    return {
        showPopup: false, //pdf和图片
        showPhoto: false, //图片
        images: [],
        value: '',
        pdf: '',
        // url: 'http://kukacms.kukahome.com:7020/menuImage/gzcx.png',
        // url: 'http://kukacms.kukahome.com:7020/employeeReal/9050104/20200901/%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF/9050104_%E7%8E%8B%E6%80%A1_%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF_20200901163917690.pdf',
        personList: {},
        personObj: {},
        fileList: [], //element上传测试
        uploadData: {
            jobnumber: '',
            state: '',
            type: '',
            id: ''
        }, //element上传的参数
        saveId: '',
        showImg: false, //上传头像的弹窗
    };
  },
  created(){
      this.getPerson()
      this.getSome()
  },
  methods:{
    //获取个人基本信息
    getPerson(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        queryPerson(queryData).then(res=>{
            this.personList = res.obj
        })
    },
    //获取头部用户基本信息
    getSome(){
      let queryData = {
        jobnumber:localStorage.getItem('jobNum')
      }
      querySome(queryData).then(res=>{
        // console.log(res.obj.photo)
        if(res.obj.photo == null || res.obj.photo == undefined || res.obj.photo == ''){
          res.obj.photo = require('@/assets/timg.jpg')
          this.personObj = res.obj
        }else{
          this.personObj = res.obj
        }
      })
    },
    //修改基本信息
    update(){
        this.$router.push({name:'updatePerson',params:{jbData:this.personList}})
    },
    //进入审核中的页面
    already(){
        this.$router.push({name:'alreadyPerson'})
    },
    //上传附件弹窗
    dialogOpen(){
        this.showImg = true
    },
    //选择上传附件
    filesAdded(){
        this.actions = `/kukacms/self/uploadFiles?module=jbxx&jobnumber=${localStorage.getItem('jobNum')}`
        this.showImg = false
    },
     //上传身份证正面
    handleRemove3(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview3(file) {
    console.log(file);
    },
    //上传成功
    handSuccess(response){
        console.log(response)
        this.saveId = response.obj.id
    },
    uploadCard(){
        this.uploadData.id = this.saveId
        this.uploadData.state = 1
        this.uploadData.type = 1
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
     //上传身份证反面
    handleRemove3(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview3(file) {
    console.log(file);
    },
    //上传成功
    handSuccess(response){
        console.log(response)
        this.saveId = response.obj.id
    },
    uploadCard1(){
        this.uploadData.id = this.saveId
        this.uploadData.state = 1
        this.uploadData.type = 2
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    //上传银行卡
    handleRemove3(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview3(file) {
    console.log(file);
    },
    //上传成功
    handSuccess(response){
        console.log(response)
        this.saveId = response.obj.id
    },
    uploadBank(){
        this.uploadData.id = this.saveId
        this.uploadData.state = 1
        this.uploadData.type = 4
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    //上传体检报告
    handleRemove3(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview3(file) {
        console.log(file);
    },
    //上传成功
    handSuccess(response){
        console.log(response)
        this.saveId = response.obj.id
    },
    uploadTijian(){
        this.uploadData.id = this.saveId
        this.uploadData.state = 1
        this.uploadData.type = 3
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    //上传头像
    handleRemove4(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview4(file) {
    console.log(file);
    },
    uploadTou(){
        this.uploadData.type = 2
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    seePdf(){
        if(this.personList.idcardFile1 == null || this.personList.idcardFile1 == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.personList.idcardFile1.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.personList.idcardFile1)
        }else{
            // this.showPopup = true
            // this.pdf = this.personList.idcardFile1
            window.open(this.personList.idcardFile1)
        }
    },
    seePdf1(){
        if(this.personList.idcardFile2 == null || this.personList.idcardFile2 == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.personList.idcardFile2.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.personList.idcardFile2)
        }else{
            // this.showPopup = true
            // this.pdf = this.personList.idcardFile2
            window.open(this.personList.idcardFile2)
        }
    },
    seePdf2(){
        if(this.personList.bankFile == null || this.personList.bankFile == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.personList.bankFile.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.personList.bankFile)
        }else{
            // this.showPopup = true
            // this.pdf = this.personList.bankFile
            window.open(this.personList.bankFile)
        }
    },
    seePdf3(){
        if(this.personList.reportFile == null || this.personList.reportFile == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.personList.reportFile.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.personList.reportFile)
        }else{
            // this.showPopup = true
            // this.pdf = this.personList.reportFile
            window.open(this.personList.reportFile)
        }
    },
    //关闭事件
    onClose() {
        this.images = []
    },
    
  },
  mounted(){

  }
}
</script>
<style lang="stylus" scoped>
    .content{
        background-color #fff
        .sidebox{
            margin  10px
            border-radius 6px
            box-shadow 0px 10px 10px #eee
        }
        .header{
            padding-top 20px
            text-align center
            img{
                width 60px
                height 60px
                border-radius 50%
            }
            p{
                text-align center
                padding-top 4px
                font-weight 700
            }
        }
        .contain{
            padding 10px
            line-height 35px
            .iconfont{
                color #ee0a24
            }
        }
        .message{
            padding 10px
            line-height 25px
            font-size 14px
            color #969799
            box-shadow 0px 10px 10px #eee
            .iconfont{
                color #ee0a24
            }
            p{
                border-bottom 1px solid #eee
                padding 5px 0 5px 5px
            }
        }
        img{
                width 60px
                height 60px
                border-radius 50%
            }
    }
    .uploadbtn{
        padding 60px 10px 0 10px
        .title{
            padding 15px
            line-height 20px
            color red
        }
    }
    .el-upload{
        text-align left
        line-height 42px
    }
</style>