<template>
    <div>
        <div>
            <van-field v-model="a84014" label="关系：" placeholder="必填"/>
            <van-field v-model="a841" label="家庭成员姓名：" label-width="8em" placeholder="必填"/>
            <van-field v-model="a843" label="成员性别：" @click="showSure = true" readonly placeholder="必填"/>
            <van-field v-model="a84013" label="成员工作单位：" label-width="8em" placeholder="必填"/>
            <van-field v-model="a84012" label="成员职务：" placeholder="必填"/>
            <van-field v-model="a84015" label="成员联系方式：" label-width="8em" placeholder="必填"/>
            <van-field v-model="a84022" label="备注：" placeholder="选填"/>

            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="update" style="font-size:16px">确认修改</van-button>
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
        <!-- 选择男女 -->
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
import { Field,Button,DatetimePicker,Popup,Notify,Dialog } from 'vant'
import { updateFam,backFam } from './api'
export default {
  data () {
    return {
        a84014: '',
        a841: '',
        a843: '',
        sex: '',
        a84013: '',
        a84012: '',
        a84015: '',
        a84022: '',
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        showTime: false,
        showSure: false, //选择男女弹窗
        columns5: [
          {'keyId':'1','text':"男"},
          {'keyId':'2','text':"女"},
        ],
        timeFlag: '' //选择时间的标识
    };
  },
  created(){
      this.initData()
  },
  methods:{
    //提交确认修改
    update(){
        Dialog.confirm({
            title: '提示',
            message: '确认提交修改？'
            }).then(() => {
            // on confirm
            console.log(this.a843)
            if( this.a84014 == null || this.a84014 == '' ||
                this.a841 == null || this.a841 == '' ||
                this.a843 == null || this.a843 == '' ||
                this.a84013 == null || this.a84013 == '' ||
                this.a84012 == null || this.a84012 == '' ||
                this.a84015 == null || this.a84015 == ''){
                    Notify({ type: 'danger', message: '您有必填写未填写，请填写后提交！' })
                }else{
                    if(this.sex == ''){
                        this.sex = this.a843
                    }
                    let sendData = {
                        a84014: this.a84014,
                        a841: this.a841,
                        a843: this.sex,
                        a84013: this.a84013,
                        a84012: this.a84012,
                        a84015: this.a84015,
                        a84022: this.a84022,
                        a0190: localStorage.getItem('jobNum'),
                        recordid: this.$route.params.merData.recordid,
                        a0188: this.$route.params.merData.a0188,
                        flag: 1
                    }
                    console.log(sendData)
                    updateFam(sendData).then(res=>{
                        if(res.code == 1000){
                            Notify({ type: 'success', message: '已提交修改，进入待审核状态' })
                            this.$router.push({name:'members'})
                        }else{
                            Notify({ type: 'danger', message: res.msg })
                        }
                    })
                }
            }).catch(() => {
            // on cancel
            Notify({ type: 'danger', message: '已取消修改' })
        })
    },
     //选择男女
    confirm5(picker) {
        console.log(picker)
    //   this.value = value;
        this.sex = picker.keyId
        this.a843 = picker.text
        this.showSure = false;
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
                recordid: this.$route.params.merData.recordid,
                flag:1
            }
            backFam(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '撤回成功' })
                    this.$router.push({name:'members'})
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
        this.$router.push({name:'members'})
    },
    //默认带进来的数据
    initData(){
        let merData = this.$route.params.merData
        this.a84014 = merData.a84014
        this.a841 = merData.a841
        this.a843 = merData.a843
        this.a84013 = merData.a84013
        this.a84012 = merData.a84012
        this.a84015 = merData.a84015
        this.a84022 = merData.a84022
    },
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
  }
}
</script>
<style lang="stylus" scoped>
    .btn{
        padding 10px
        text-align center
    }
</style>