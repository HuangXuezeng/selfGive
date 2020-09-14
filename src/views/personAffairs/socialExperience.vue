<template>
    <div>
        <div class="contentbox">
            <van-collapse v-model="activeNames" v-for="(item,index) in socialList" :key="item.recordid">
                <van-collapse-item :name="index">
                    <template #title>
                        <div class="fontweig"><van-tag mark type="primary" color="#fc5f10">社会履历{{index+1}}</van-tag></div>
                    </template>
                    <p><span>开始时间：{{item.startTime}}</span></p>
                    <p><span>结束时间：{{item.endTime}}</span></p>
                    <p><span>工作单位：{{item.workUnit}}</span></p>
                    <p><span>任职部门：{{item.department}}</span></p>
                    <p><span>任职岗位：{{item.station}}</span></p>
                    <p><span>证明人及联系方式：{{item.witness}}</span></p>
                    <p><span>备注：{{item.remarks}}</span></p>
                    <p><span>工作描述：{{item.description}}</span></p>
                    <!-- <p><span>离职证明：<a :href="item.filePath">离职证明</a></span></p> -->
                    <p><span @click="seePdf(item)">离职证明：<span style="border-bottom:1px solid #ccc;padding:2px">{{item.pathName}}</span></span></p>
                    <!-- <p>
                        <span>上传离职证明附件:</span>
                        <span>
                            <van-button type="primary" color="#ccc" size="mini" @click="dialogOpen(item)" style="font-size:12px;padding:2px">上传</van-button>
                        </span>
                    </p> -->
                    <!-- <p><span>附件：{{item.filePath}}</span></p> -->
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
                <div class="title">（请上传离职证明，上传内容需为图片或PDF）</div>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/workinfo/uploadWorkFiles"
                :data="uploadData"
                :on-preview="handlePreview2"
                :on-remove="handleRemove2"
                multiple
                :limit="10"
                :file-list="fileList">
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadWork">上传离职证明</el-button>
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
import { Button,Tag,Collapse,CollapseItem,Popup,ImagePreview,Notify } from 'vant'
import { querySocial } from './api'
export default {
  data () {
    return {
        showPhoto: false, //图片
        images: [],
        showPopup: false, //pdf和图片
        pdf: '',
        socialList: [],
        activeNames: [0,1,2,3,4,5,6,7,8],
        showImg: false, //上传头像的弹窗
        fileList: [], //element上传测试
        uploadData: {
            jobnumber: '',
            state: '',
            recordid: ''
        }, //element上传的参数
        actions: '',
        recordId: '',
        saveId: '',
    };
  },
  created(){
      this.getSocial()
  },
  methods:{
    getSocial(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        querySocial(queryData).then(res=>{
            this.socialList = res.obj
        })
    },
    //跳转到修改页
    update(item){
        // console.log(item)
        this.$router.push({name:'updateSocialExp',params:{sData:item}})
    },
    add(){
        this.$router.push({name:'addSocial'})
    },
    //查看已添加的页面
    already(){
        this.$router.push({name:'alreadySocial'})
    },
    //上传附件弹窗
    dialogOpen(item){
        // console.log(item)
        this.recordId = item.recordid
        this.showImg = true

    },
    //选择上传附件
    filesAdded(){
        this.actions = `/kukacms/self/uploadFiles?module=shll&recordid=${this.recordId}&jobnumber=${localStorage.getItem('jobNum')}`
        this.showImg = false
    },
    //上传工作履历附件
    handleRemove2(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview2(file) {
        console.log(file);
    },
    uploadWork(){
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
            // this.pdf = item.filePath
            // this.showPopup =true
            window.open(item.filePath)
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
    .upload-demo{
        text-align center
    }
</style>