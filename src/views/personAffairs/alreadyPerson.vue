<template>
    <div>
        <!-- 修改的信息 -->
        <div class="headerTag" v-if="personList !== null">
            <van-tag mark type="warning">已修改的基本信息</van-tag>
            <!-- <p><span>证件号码：</span><span>{{personList.a0177}}</span></p>
            <p><span>有效证件类型：</span><span>{{personList.yxsfzjlx}}</span></p> -->
            <p><span>身份证详细地址：</span><span>{{personList.a01121}}</span></p>
            <p><span>签证机关：</span><span>{{personList.police}}</span></p>
            <p><span>身份证有效期：</span><span>{{personList.a01157}}</span></p>
            <!-- <p><span>性别：</span><span>{{personList.a0107}}</span></p> -->
            <!-- <p><span>出生日期：</span><span>{{personList.A0111}}</span></p> -->
            <!-- <p><span>年龄：</span><span>{{personList.a01101}}</span></p> -->
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
            <!-- <p><span>公积金客户号：</span><span>{{personList.a01602}}</span></p>
            <p><span>驻外医疗：</span><span>{{personList.a01600}}</span></p> -->
            <p><span>是否为退伍军人：</span><span>{{personList.a01185}}</span></p>
            <p><span>身份证正面：</span><span @click="seePdf" style="border-bottom:1px solid #ccc;padding:2px">{{personList.idcardFileName1}}</span></p>
            <p><span>身份证反面：</span><span @click="seePdf1" style="border-bottom:1px solid #ccc;padding:2px">{{personList.idcardFileName2}}</span></p>
            <p><span>银行卡：</span><span @click="seePdf2" style="border-bottom:1px solid #ccc;padding:2px">{{personList.bankFileName}}</span></p>
            <p><span>体检报告：</span><span @click="seePdf3" style="border-bottom:1px solid #ccc;padding:2px">{{personList.reportFileName}}</span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <div class="btns">
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
import { Tag,Button,Dialog,Notify,ImagePreview,Popup } from 'vant'
import { getBasic,backJb,getShr } from './api'
export default {
  data () {
    return {
        showPhoto: false, //图片
        images: [],
        personList:[],
        show: false,
        showPopup: false, //pdf和图片
        pdf: '',
        shr: ''
        // pdf: 'http://kukacms.kukahome.com:7020/employeeReal/1007009149107021/%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF/20200903/9107021_%E7%8E%8B%E7%A2%A7%E5%A8%9F_%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2_20200903004109985.png'
        // pdf: 'http://kukacms.kukahome.com:7020/employeeReal/9050104/20200901/%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF/9050104_%E7%8E%8B%E6%80%A1_%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF_20200901163917690.pdf'
    };
  },
  created(){
    this._getBasic()
    this._getShr()
  },
  methods:{
    //获取增加的信息
    _getBasic(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        getBasic(queryData).then(res=>{
            this.personList = res.obj
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
    //撤回修改的信息
    back(){
        Dialog.confirm({
        title: '提示',
        message: '确定撤回修改吗？',
        })
        .then(() => {
            // on confirm
            let queryData = {
                jobnumber: localStorage.getItem('jobNum')
            }
            backJb(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    this.$router.push({name:'searchInformation'})
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
        this.$router.push({name:'searchInformation'})
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