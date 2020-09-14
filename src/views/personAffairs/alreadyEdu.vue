<template>
    <div>
        <!-- 添加的信息 -->
        <div class="headerTag" v-for="(item,index) in listAdd" :key="item.id">
            <van-tag mark type="warning">已添加的学历教育{{index+1}}</van-tag>
            <p><span>学校名称：</span><span>{{item.a86007}}</span></p>
            <p><span>院校性质：</span><span>{{item.a86014}}</span></p>
            <p><span>入学时间：</span><span>{{item.A86005}}</span></p>
            <p><span>毕业（肄业）时间：</span><span>{{item.A86006}}</span></p>
            <p><span>专业：</span><span>{{item.a86008}}</span></p>
            <p><span>学习方式：</span><span>{{item.a86009}}</span></p>
            <p><span>学历：</span><span>{{item.a86010}}</span></p>
            <p><span>学位：</span><span>{{item.a86011}}</span></p>
            <p><span>是否最高学历：</span><span>{{item.a86012}}</span></p>
            <p><span>学历编号：</span><span>{{item.a86013}}</span></p>
            <p><span @click="seePdf(item)">学历证：<span style="border-bottom:1px solid #ccc;padding:2px">{{item.xlFileName}}</span></span></p>
            <p><span @click="seePdf1(item)">学位证：<span style="border-bottom:1px solid #ccc;padding:2px">{{item.xwFileName}}</span></span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <!-- <p><span>学历证：<a :href="item.xlFile">学历证</a></span></p>
            <p><span>学位证：<a :href="item.xwFile">学位证</a></span></p> -->
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back(item)" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <!-- 修改的信息 -->
        <div class="headerTag" v-for="(item,index) in listUpdate" :key="item.id">
            <van-tag mark type="warning">已修改的学历教育{{index+1}}</van-tag>
            <p><span>学校名称：</span><span>{{item.a86007}}</span></p>
            <p><span>院校性质：</span><span>{{item.a86014}}</span></p>
            <p><span>入学时间：</span><span>{{item.A86005}}</span></p>
            <p><span>毕业（肄业）时间：</span><span>{{item.A86006}}</span></p>
            <p><span>专业：</span><span>{{item.a86008}}</span></p>
            <p><span>学习方式：</span><span>{{item.a86009}}</span></p>
            <p><span>学历：</span><span>{{item.a86010}}</span></p>
            <p><span>学位：</span><span>{{item.a86011}}</span></p>
            <p><span>是否最高学历：</span><span>{{item.a86012}}</span></p>
            <p><span>学历编号：</span><span>{{item.a86013}}</span></p>
            <p><span @click="seePdf(item)">学历证：<span style="border-bottom:1px solid #ccc;padding:2px">{{item.xlFileName}}</span></span></p>
            <p><span @click="seePdf1(item)">学位证：<span style="border-bottom:1px solid #ccc;padding:2px">{{item.xwFileName}}</span></span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back(item)" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <div>
            <van-button type="primary" size="small" color="#fc5f10" @click="backHome" style="width:100%;font-size:16px">返回列表</van-button>
        </div>
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
import { Tag,Button,Dialog,Notify,ImagePreview } from 'vant'
import { backEdu,getEdu,getShr } from './api'
export default {
  data () {
    return {
        showPhoto: false, //图片
        images: [],
        showPopup: false, //pdf和图片
        pdf: '',
        listAdd:[],
        listUpdate:[],
        shr: '',
    };
  },
  created(){
    this._getEdu()
    this._getShr()
  },
  methods:{
    //获取新增的学历信息
    _getEdu(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        getEdu(queryData).then(res=>{
            this.listAdd = res.obj.add
            this.listUpdate = res.obj.update
        })
    },
    //获取审核人
    _getShr(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        getShr(queryData).then(res=>{
            this.shr = res.obj.names.join(',')
            // console.log(this.shr)
        })
    },
    //撤回添加的信息
    back(item){
        Dialog.confirm({
        title: '提示',
        message: '确定撤回添加吗？',
        })
        .then(() => {
            // on confirm
            let queryData = {}
            if(item.state == 1){
                queryData = {
                    recordid: item.recordid,
                    flag:1
                }
            }else{
                queryData = {
                    recordid: item.id,
                    flag:2
                }
            }
            console.log(queryData)
            backEdu(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    // this._getEdu()
                    this.$router.push({name:'education'})
                }else{
                    Notify({ type: 'danger', message: '撤回失败' })
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
    .headerTag{
        padding 10px
        p{
            line-height 30px
            padding 8px 4px 8px 8px
            border-bottom 1px solid #eee
            color #969799
            font-size 14px
        }
        .btn{
            padding 10px
            text-align center
        }
    }
    .van-tag--mark {
        padding .4em .8em .4em .4em
    }
</style>