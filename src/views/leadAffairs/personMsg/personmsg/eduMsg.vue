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
            </van-collapse>
        </div>
        <!-- 查看图片 -->
        <van-image-preview v-model="showPhoto" get-container="body" :images="images" :closeable='true' @close="onClose">
            
        </van-image-preview>
    </div>
</template>
<script>
import { Button,Tag,Dialog,Notify,ImagePreview } from 'vant'
import { queryEducation } from '../../../personAffairs/api'
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
            jobnumber:this.$store.state.jobNumber
        }
        queryEducation(queryData).then(res=>{
            if(res.obj !== null){
                this.shixi = res.obj[0].a0191
            }
            this.educationList = res.obj
            // console.log(this.shixi)
        })
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