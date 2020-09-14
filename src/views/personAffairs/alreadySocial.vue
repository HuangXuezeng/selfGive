<template>
    <div>
        <!-- 添加的信息 -->
        <div class="headerTag" v-for="(item,index) in listAdd" :key="item.id">
            <van-tag mark type="warning">已添加的社会履历{{index+1}}</van-tag>
            <p><span>开始时间：</span><span>{{item.startTime}}</span></p>
            <p><span>结束时间：</span><span>{{item.endTime}}</span></p>
            <p><span>工作单位：</span><span>{{item.workUnit}}</span></p>
            <p><span>任职部门：</span><span>{{item.department}}</span></p>
            <p><span>任职岗位：</span><span>{{item.station}}</span></p>
            <p><span>证明人及电话：</span><span>{{item.witness}}</span></p>
            <p><span>工作内容描述：</span><span>{{item.description}}</span></p>
            <p><span>备注：</span><span>{{item.remarks}}</span></p>
            <p><span @click="seePdf(item)">离职证明：</span><span style="border-bottom:1px solid #ccc;padding:2px">{{item.pathName}}</span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back(item)" style="font-size:16px">撤回</van-button>
            </div>
        </div>
        <!-- 修改的信息 -->
        <div class="headerTag" v-for="(item,index) in listUpdate" :key="item.id">
            <van-tag mark type="warning">已修改的社会履历{{index+1}}</van-tag>
            <p><span>开始时间：</span><span>{{item.startTime}}</span></p>
            <p><span>结束时间：</span><span>{{item.endTime}}</span></p>
            <p><span>工作单位：</span><span>{{item.workUnit}}</span></p>
            <p><span>任职部门：</span><span>{{item.department}}</span></p>
            <p><span>任职岗位：</span><span>{{item.station}}</span></p>
            <p><span>证明人及电话：</span><span>{{item.witness}}</span></p>
            <p><span>工作内容描述：</span><span>{{item.description}}</span></p>
            <p><span>备注：</span><span>{{item.remarks}}</span></p>
            <p><span @click="seePdf(item)">离职证明：<span style="border-bottom:1px solid #ccc;padding:2px">{{item.pathName}}</span></span></p>
            <p><span>审核人：</span><span>{{shr}}</span></p>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="back(item)" style="font-size:16px">撤回</van-button>
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
import { Tag,Button,Dialog,Notify,ImagePreview } from 'vant'
import { backWork,getWork,getShr } from './api'
export default {
  data () {
    return {
        showPhoto: false, //图片
        images: [],
        showPopup: false, //pdf和图片
        pdf: '',
        listAdd:[],
        listUpdate:[],
        shr: ''
    };
  },
  created(){
    this._getWork()
    this._getShr()
  },
  methods:{
    //获取增加的信息
    _getWork(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        getWork(queryData).then(res=>{
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
        console.log(item)
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
            backWork(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    // this._getWork()
                    this.$router.push({name:'socialExperience'})
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
        this.$router.push({name:'socialExperience'})
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