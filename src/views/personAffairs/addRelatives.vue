<template>
    <div>
        <div>
            <van-field v-model="a805005" label="关系：" placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert11"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="a805006" label="关系人姓名：" placeholder="必填"/>
            <van-field v-model="a805007" label="关系人工号：" placeholder="必填"/>
            <van-field v-model="a805015" label="关系人所在公司：" label-width="8em" placeholder="必填"/>
            <van-field v-model="a805008" label="关系人所在部门："  label-width="8em" placeholder="必填"/>
            <van-field v-model="a805009" label="关系人岗位：" placeholder="必填"/>
            <van-field v-model="a805010" label="关系人电话：" placeholder="必填"/>
            <van-field v-model="a805012" label="是否在职："  @click="showSure = true" readonly placeholder="必填"/>
            <van-field v-model="a805011" label="备注：" placeholder="选填"/>

            <div class="btn">
               <van-button type="primary" size="small" color="#fc5f10" @click="update" style="font-size:16px">确认添加</van-button>
               <!-- <van-button type="primary" size="small" color="#fc5f10" @click="back" style="font-size:16px">撤回修改</van-button> -->
               <van-button type="primary" size="small" color="#fc5f10" @click="backHome" style="font-size:16px">取消</van-button>
            </div>
        </div>
        <!-- 弹出选择时间 -->
        <van-popup
        get-container="body"
        v-model="showTime"
        close-icon="close"
        position="bottom"
        :style="{ height: '50%' }"
        >
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
            />
        </van-popup>
        <!-- 是否在职 -->
        <van-popup v-model="showSure" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns5"
                @cancel="showSure = false"
                value-key="text"
                @confirm="confirm5"
            />
        </van-popup>
    </div>
</template>
<script>
import { Field,Button,DatetimePicker,Popup,Notify,Dialog,Picker } from 'vant'
import { updateRel,backRel } from './api'
export default {
  data () {
    return {
        a805005: '',
        a805006: '',
        a805007: '',
        a805015: '',
        a805008: '',
        a805009: '',
        a805010: '',
        a805012: '',
        sure: '', //是否在职发送值
        a805011: '',
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        showTime: false,
        showSure: false, //是否在职弹窗
        timeFlag: '', //选择时间的标识
        columns5: [
          {'keyId':'1','text':"是"},
          {'keyId':'2','text':"否"},
        ],
    };
  },
  created(){
    //   this.initData()
  },
  methods:{
    //提交确认修改
    update(){
        Dialog.confirm({
            title: '提示',
            message: '确认提交？'
            }).then(() => {
            // on confirm
            let sendData = {
                a805005: this.a805005,
                a805006: this.a805006,
                a805007: this.a805007,
                a805015: this.a805015,
                a805008: this.a805008,
                a805009: this.a805009,
                a805010: this.a805010,
                a805012: this.sure,
                a805011: this.a805011,
                a0190: localStorage.getItem('jobNum'),
                // recordid: this.$route.params.relData.recordid,
                // a0188: this.$route.params.relData.a0188,
                flag: 2
            }
            // console.log(sendData)
            if( this.a805005 == '' ||
                this.a805006 == '' ||
                this.a805007 == '' ||
                this.a805015 == '' ||
                this.a805008 == '' ||
                this.a805009 == '' ||
                this.a805010 == '' ||
                this.a805012 == '' ){
                    Notify({ type: 'danger', message: '您有必填写未填写，请填写后提交！' })
                }else{
                    updateRel(sendData).then(res=>{
                        if(res.code == 1000){
                            Notify({ type: 'success', message: '已提交添加，进入待审核状态' })
                            this.$router.push({name:'relatives'})
                        }else{
                            Notify({ type: 'danger', message: '添加失败' })
                        }
                    })
                }
            }).catch(() => {
            // on cancel
            Notify({ type: 'danger', message: '已取消添加' })
        })
    },
     //撤回修改的信息
    // back(){
    //     Dialog.confirm({
    //     title: '提示',
    //     message: '确定撤回修改吗？',
    //     })
    //     .then(() => {
    //         // on confirm
    //         let queryData = {
    //             recordid: this.$route.params.relData.recordid,
    //         }
    //         backRel(queryData).then(res=>{
    //             if(res.code == 1000){
    //                 Notify({ type: 'success', message: '撤回成功' })
    //             }else{
    //                 Notify({ type: 'danger', message: '撤回失败' })
    //             }
    //         })
    //     })
    //     .catch(() => {
    //         // on cancel
    //         Notify({ type: 'danger', message: '取消撤回' })
    //     })
    // },
    //取消
    backHome(){
        this.$router.push({name:'relatives'})
    },
    //是否最高学历
    confirm5(picker) {
        console.log(picker)
    //   this.value = value;
        this.sure = picker.keyId
        this.a805012 = picker.text
        this.showSure = false;
    },
    //默认带进来的数据
    // initData(){
    //     let relData = this.$route.params.relData
    //     this.a805005 = relData.a805005
    //     this.a805006 = relData.a805006
    //     this.a805007 = relData.a805007
    //     this.a805008 = relData.a805008
    //     this.a805009 = relData.a805009
    //     this.a805010 = relData.a805010
    //     this.a805012 = relData.a805012
    //     this.a805011 = relData.a805011
    // },
    //打开时间选择器
    startTimeClick(){
        this.timeFlag = 0
        this.showTime = true
    },
    endTimeClick(){
        this.timeFlag = 1
        this.showTime = true
    },
    //确认选中时间
    confirm(val){
        // console.log(val)
        if(this.timeFlag == 1){
            this.A86006 = this.formatDate(val)
        }else{
            this.A86005 = this.formatDate(val)
        }
        this.showTime = false
    },
    //取消选择
    cancel(){
        this.showTime = false
    },
     //转换时间戳
    formatDate(date) {    
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    m = m < 10 ? '0' + m : m;    
        var d = date.getDate();    d = d < 10 ? ('0' + d) : d;       
        return y + '-' + m + '-' + d 
    },
    //提示信息
    showAlert11() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '请主动提报您的社会关系（包括但不限于公司内外亲属、朋友关系等。公司外社会关系主要指任职在与公司业务相关的供应商、合作商、经销商、竞品单位人员）',
        icon: 'cubeic-alert'
      }).show()
    },
  }
}
</script>
<style lang="stylus" scoped>
    .btn{
        padding 10px
        text-align center
    }
</style>