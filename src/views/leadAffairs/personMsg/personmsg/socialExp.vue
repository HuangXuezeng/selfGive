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
                </van-collapse-item>
            </van-collapse>
        </div>
        <van-empty v-if="socialList == ''" description="无数据" />
        <!-- 查看图片 -->
        <van-image-preview v-model="showPhoto" get-container="body" :images="images" :closeable='true' @close="onClose">
            
        </van-image-preview>
    </div>
</template>
<script>
import { Button,Tag,Collapse,CollapseItem,Popup,ImagePreview,Notify } from 'vant'
import { querySocial } from '../../../personAffairs/api'
export default {
  data () {
    return {
        showPhoto: false, //图片
        images: [],
        pdf: '',
        socialList: [],
        activeNames: [0,1,2,3,4,5,6,7,8],
    };
  },
  created(){
      this.getSocial()
  },
  methods:{
    getSocial(){
        let queryData = {
            jobnumber:this.$store.state.jobNumber
        }
        querySocial(queryData).then(res=>{
            this.socialList = res.obj
        })
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