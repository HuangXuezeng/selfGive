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
                </van-collapse-item>
            </van-collapse>
        </div>
        <!-- 查看图片 -->
        <van-image-preview v-model="showPhoto" get-container="body" :images="images" :closeable='true' @close="onClose">
            
        </van-image-preview>
    </div>
</template>
<script>
import { Button,Collapse,CollapseItem,Tag,ImagePreview,Notify } from 'vant'
import { queryZige } from '../../../personAffairs/api'
export default {
  data () {
    return {
        showPhoto: false, //图片
        images: [],
        zigeList: [],
        activeNames: [0,1,2,3,4,5,6,7,8],
        showImg: false, //上传头像的弹窗
    };
  },
  created(){
    this.getZige()
  },
  methods:{
    //查询职业资格信息
    getZige(){
        let queryData = {
            jobnumber:this.$store.state.jobNumber
        }
        queryZige(queryData).then(res=>{
            this.zigeList = res.obj
        })
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