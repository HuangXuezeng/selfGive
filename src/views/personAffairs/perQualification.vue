<template>
    <div>
        <div class="contentbox">
            <van-collapse v-model="activeNames" v-for="(item,index) in zigeList" :key="item.id">
                <van-collapse-item :name="index">
                    <template #title>
                        <div class="fontweig"><van-tag mark type="primary" color="#fc5f10">职业资格{{index+1}}</van-tag></div>
                    </template>
                    <p><span>职业类型：{{item.titleType}}</span></p>
                    <p><span>职业名称：{{item.titleName}}</span></p>
                    <p><span>证书等级：{{item.certificateLevel}}</span></p>
                    <p><span>证书号码：{{item.certificateNumber}}</span></p>
                    <p><span>颁发单位：{{item.issuingUnit}}</span></p>
                    <p><span>有效期起：{{item.startTime}}</span></p>
                    <p><span>有效期止：{{item.endTime}}</span></p>
                    <p><span>备注：{{item.remarks}}</span></p>
                    <!-- <p><span>职业资格证书：<a :href="item.filePath">职业资格证书</a></span></p> -->
                    <p><span @click="seePdf(item)">职业资格证书：<span style="border-bottom:1px solid #ccc;padding:2px">{{item.pathName}}</span></span></p>
                    <!-- <p>
                        <span>请上传职业资格附件:</span>
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
                <van-button type="primary" size="small" @click="already" color="#fc5f10" style="width:100%;font-size:16px;margin-top:10px">审核列表</van-button>
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
                <div class="title">（请上传职业资格证书，上传内容需为图片或PDF）</div>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/professional/uploadProfessionalFiles"
                :data="uploadData"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                multiple
                :limit="10"
                :file-list="fileList">
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadFile">上传证书</el-button>
                </el-upload>
            </div>
        </van-popup>
        <!-- 查看pdf -->
        <van-popup v-model="showPopup" get-container="body" position="top" :style="{ height: '90%' }">
            
            <iframe id="ifram" :src="pdf" width="100%" height="100%"></iframe>
        </van-popup>
        <!-- 查看图片 -->
        <van-image-preview v-model="showPhoto" get-container="body" :images="images" :closeable='true' @close="onClose">
            
        </van-image-preview>
    </div>
</template>
<script>
import { Button,Collapse,CollapseItem,Tag,ImagePreview,Notify } from 'vant'
import { queryZige } from './api'
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
        zigeList: [],
        activeNames: [0,1,2,3,4,5,6,7,8],
        showImg: false, //上传头像的弹窗
        fileData: [], //上传附件的数据
        actions: '',
        recordId: ''
    };
  },
  created(){
    this.getZige()
  },
  methods:{
    //查询职业资格信息
    getZige(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        queryZige(queryData).then(res=>{
            this.zigeList = res.obj
        })
    },
    //跳转到修改页
    update(item){
        console.log(item)
        this.$router.push({name:'updateQualification',params:{zData:item}})
    },
    //添加
    add(){
        this.$router.push({name:'addQualification'})
    },
    //查看已添加的页面
    already(){
        this.$router.push({name:'alreadyQualification'})
    },
    //上传附件弹窗
    dialogOpen(item){
        this.recordId = item.id
        this.showImg = true
    },
    //选择上传附件
    filesAdded(){
        this.actions = `/kukacms/self/uploadFiles?module=zyzg&recordid=${this.recordId}&jobnumber=${localStorage.getItem('jobNum')}`
        this.showImg = false
    },
    //职业资格上传附件
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
    console.log(file);
    },
    uploadFile(){
        this.uploadData.state = 1
        this.uploadData.recordid = this.recordId
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    seePdf(item){
        if(item.filePath == null || item.filePath == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(item.filePath.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(item.filePath)
        }else{
            window.open(item.filePath)
            // this.showPopup =true
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
    .contentbox{
        line-height 27px
        width 90%
        margin 10px auto 0 auto
        padding-left 5px
        box-shadow:0px 8px 10px #eee
        border-radius 6px
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
        padding .2em .8em .5em .4em
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