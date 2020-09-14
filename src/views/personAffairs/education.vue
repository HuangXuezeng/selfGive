<template>
    <div>
        <div class="contentbox">
            <van-collapse v-model="activeNames" v-for="(item,index) in educationList" :key="item.id">
                <van-collapse-item :name="index">
                    <template #title>
                        <div class="fontweig"><van-tag mark type="primary" color="#fc5f10">学历信息{{index+1}}</van-tag></div>
                    </template>
                    <p><span>院校性质：{{item.a86014}}</span></p>
                    <p><span>入学时间：{{item.A86005}}</span></p>
                    <p><span>毕业（肄业）时间：{{item.A86006}}</span></p>
                    <p><span>学校名称：{{item.a86007}}</span></p>
                    <p><span>专业：{{item.a86008}}</span></p>
                    <p><span>学习方式：{{item.a86009}}</span></p>
                    <p><span>学历：{{item.a86010}}</span></p>
                    <p><span>学位：{{item.a86011}}</span></p>
                    <p><span>是否最高学历：{{item.a86012}}</span></p>
                    <p><span>学历编号：{{item.a86013}}</span></p>
                    <p><span @click="seePdf(item)">学历证：<span style="border-bottom:1px solid #ccc;padding:2px">{{item.xlFileName}}</span></span></p>
                    <p><span @click="seePdf1(item)">学位证：<span style="border-bottom:1px solid #ccc;padding:2px">{{item.xwFileName}}</span></span></p>
                    <!-- <p>
                        <span>请上传学历证/学位证附件:</span>
                        <span>
                            <van-button type="primary" color="#ccc" size="mini" @click="dialogOpen(item)" style="font-size:12px;padding:2px">上传</van-button>
                        </span>
                    </p> -->
                </van-collapse-item>
                <div class="btn">
                    <van-button v-if="item.sign == 0" type="primary" size="small" color="#fc5f10" @click="update(item)" style="width:100%;font-size:16px">修改</van-button>
                    <van-button v-if="item.sign == 1" type="primary" size="small" color="#ccc" style="width:100%;font-size:16px">修改</van-button>
                </div>
            </van-collapse>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="add" style="width:100%;font-size:16px">添加</van-button>
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
                <div class="title">（请上传学历证、学位证，上传内容需为图片或PDF）</div>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/uploadQualificationsFiles"
                :data="uploadData"
                :on-preview="handlePreview1"
                :on-remove="handleRemove1"
                :on-success="handSuccess"
                multiple
                :limit="10"
                :file-list="fileList">
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadXueli">上传学历证</el-button>
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadXuewei">上传学位证</el-button>
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
import { Button,Tag,Dialog,Notify,ImagePreview } from 'vant'
import { queryEducation } from './api'
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
            id: ''
        }, //element上传的参数
        saveId: '',
        xuliPath: '',
        xuweiPath: '',
        educationList: [],
        activeNames: [0,1,2,3,4,5,6,7,8],
        showImg: false, //上传头像的弹窗
        fileData: [], //上传附件的数据
        actions: '',
        recordId: '',
        shixi: '', //实习员工表示'04'
    };
  },
  created(){
    this.getEducation()
    
  },
  methods:{
    getEducation(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        queryEducation(queryData).then(res=>{
            if(res.obj !== null){
                this.shixi = res.obj[0].a0191
            }
            this.educationList = res.obj
            // console.log(this.shixi)
        })
    },
    //跳转到修改页
    update(item){
        // console.log(item)
        this.$router.push({name:'updateEdu',params:{eduData:item}})
    },
    add(){
        this.$router.push({name:'addEdu',params:{a0191:this.shixi}})
    },
    //查看已添加的页面
    already(){
        this.$router.push({name:'alreadyEdu'})
    },
    //上传附件弹窗
    dialogOpen(item){
        this.recordId = item.recordid
        this.showImg = true
    },
    //选择上传附件
    filesAdded(){
        this.actions = `/kukacms/self/uploadFiles?module=xlxx&recordid=${this.recordId}&jobnumber=${localStorage.getItem('jobNum')}`
        this.showImg = false
    },
    //上传学历证
    handleRemove1(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview1(file) {
    console.log(file);
    },
    //上传成功
    handSuccess(response){
        console.log(response)
        this.saveId = response.obj.id
        this.xuliPath = response.obj.xlPath
    },
    uploadXueli(){
        this.uploadData.state = 1
        this.uploadData.id = this.saveId
        this.uploadData.type = 1
        this.uploadData.recordid = this.recordId
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    //上传学位证
    handleRemove1(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview1(file) {
    console.log(file);
    },
    //上传成功
    handSuccess(response){
        console.log(response)
        this.saveId = response.obj.id
        this.xuweiPath = response.obj.xwPath
    },
    uploadXuewei(){
        this.uploadData.state = 1
        this.uploadData.id = this.saveId
        this.uploadData.type = 2
        this.uploadData.recordid = this.recordId
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    seePdf(item){
        if(item.xlFile == null || item.xlFile == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(item.xlFile.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(item.xlFile)
        }else{
            // this.pdf = item.xlFile
            // this.showPopup =true
            window.open(item.xlFile)
        }
    },
    seePdf1(item){
        if(item.xwFile == null || item.xwFile == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(item.xwFile.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(item.xwFile)
        }else{
            // this.pdf = item.xwFile
            // this.showPopup =true
            window.open(item.xwFile)
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
    .contentbox{
        line-height 27px
        width 90%
        margin 10px auto 0 auto
        padding 5px 0 5px 0
        padding-left 5px
        box-shadow:0px 8px 10px #eee
        border-radius 6px
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
        .btn{
            padding 10px
        }
    }
    .van-tag--mark {
        padding .4em .8em .4em .4em
    }
    .uploadimg{
        text-align center
        padding-top 10vh
        padding-left 40%
    }
    .imgText{
        text-align center
        font-size 12px
        color #ccc
    }
    .uploadbtn{
        padding 60px 10px 0 10px
        .title{
            padding 15px
            line-height 20px
            color red
        }
    }
</style>